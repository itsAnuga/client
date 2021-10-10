<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      disable-resize-watcher
      disable-route-watcher
      mobile-breakpoint="0"
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :href="item.to" exact nuxt>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item v-for="player in players" :key="player.uuid" dense exact shaped>
          <v-icon :style="`color:` + (player.online ? `green` : `red`)">mdi-circle</v-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ player.name }}
              <span v-if="uuid() === player.uuid"> - you </span>
            </v-list-item-title>
            <v-list-item-subtitle>{{ player.uuid }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-icon v-if="player.turn">mdi-less-than</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app fixed>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app height="120" inset>
      <v-row>
        <v-col>
          <v-form @submit.prevent="send">
            <v-text-field
              v-model="word"
              :rules="rules"
              autofocus
              clearable
              dense
              hide-details="auto"
              hint="Psst! match the beginning with the end."
              label="Send a Word"
            >
              <template #append-outer>
                <v-btn type="submit">Send</v-btn>
                <v-btn @click.prevent="forfeit">Forfeit</v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-microsoft-xbox-controller',
          title: 'Game',
        },
      ],
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 2) || 'Minimum of 2 characters.',
        (value) => (value && !/ /.test(value)) || 'No spaces, just one word.',
      ],
      title: `The Game`,
      word: null,
    };
  },
  computed: {
    players: {
      get() {
        return this.$store.state.players;
      },
      set(players) {
        this.$store.commit('players', players);
      },
    },
  },
  beforeMount() {
    this.ws = new WebSocket(process.env.WS);

    /**
     * What happens on successfull connection.
     */
    this.ws.onopen = (event) => {
      this.ws.send(JSON.stringify({ data: { uuid: this.uuid() }, type: 'register' }));
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case `PlayerList`:
          this.players = message.data;
          break;

        case `Loser`:
          this.$store.commit('add', message.data.message);
          break;

        case `Lost`:
          this.$store.commit('add', message.data.message);
          this.$store.commit('player', null);
          this.$store.commit('players', []);
          this.$store.commit('uuid', null);
          this.cookie(`uuid`, ``);
          break;

        case `NotYourTurn`:
          this.$store.commit('add', message.data.message);
          break;

        case `UserInfo`:
          if (this.uuid() === null) {
            this.cookie(`uuid`, message.data.uuid);
          }
          this.$store.commit('uuid', message.data.uuid);
          this.$store.commit('player', message.data.player);
          break;

        case `Won`:
          this.$store.commit('add', message.data.message);
          break;

        case `Word`:
          this.message({
            message: message.data.message,
            player: message.data.player,
          });
          break;

        case `Words`:
          this.$store.commit('set', message.data);
          break;

        case `Victory`:
          break;
      }
    };
  },
  methods: {
    cookie(name, value) {
      const date = new Date();
      const time = date.getTime() + 1 * 24 * 60 * 60 * 1000 * (value === `` ? -1 : 1);

      date.setTime(time);

      const expires = date.toUTCString();

      document.cookie = `${name}=${value};expires=${expires};`;
    },
    forfeit() {
      this.ws.send(JSON.stringify({ type: 'forfeit' }));
    },
    message(message) {
      this.$store.commit('add', {
        message: message.message,
        player: message.player,
      });
    },
    send() {
      this.$store.commit('add', {
        message: this.word,
        player: this.$store.state.player,
      });

      this.ws.send(JSON.stringify({ data: this.word, type: 'word' }));

      this.word = '';
    },
    uuid() {
      if (document.cookie.split(';').some((item) => item.trim().startsWith('uuid='))) {
        const uuid = document.cookie
          .split('; ')
          .find((row) => row.startsWith('uuid='))
          .split('=')[1];
        return uuid !== `` ? uuid : null;
      }
      return null;
    },
  },
};
</script>
