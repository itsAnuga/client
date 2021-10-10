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
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :href="item.to"
          exact
          nuxt
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          v-for="player in players"
          :key="player.uuid"
          dense
          exact
          shaped
        >
          <v-list-item-content>
            <v-list-item-title
              >{{ player.name
              }}<span v-if="uuid() === player.uuid">
                - you</span
              ></v-list-item-title
            >
            <v-list-item-subtitle>{{ player.uuid }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app fixed>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app height="120" inset>
      <v-text-field
        :rules="rules"
        autofocus
        clearable
        dense
        hide-details="auto"
        hint="Psst! match the beginning with the end."
        label="Send a Word"
        @keyup.enter.prevent="message"
      >
        <template #append-outer>
          <v-btn>Send</v-btn>
          <v-btn>Forfeit</v-btn>
        </template>
      </v-text-field>
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

    // this.ws.addEventListener('open', (event) => {});

    this.ws.addEventListener('open', () => {
      this.ws.send(
        JSON.stringify({ data: { uuid: this.uuid() }, type: 'register' })
      );
    });

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

        case `UserInfo`:
          if (this.uuid() === null) {
            this.cookie(`uuid`, message.data.uuid);
          }
          this.$store.commit('uuid', message.data.uuid);
          this.$store.commit('player', message.data.player);
          break;

        case `Word`:
          this.message({
            message: message.data.message,
            player: message.data.player,
          });
          break;

        case `Victory`:
          break;
      }
    };

    // this.ws.addEventListener('ping', (event) => {
    //   // eslint-disable-next-line no-console
    //   console.log(`Received a ping!`, event.data);
    //   // this.ws.send()
    // });

    // this.ws.addEventListener('pong', (event) => {
    //   // eslint-disable-next-line no-console
    //   console.log(`Received a pong!`, event.data);
    //   // this.message(event.data)
    // });
  },
  methods: {
    cookie(name, value) {
      const date = new Date();
      const time = date.getTime() + 1 * 24 * 60 * 60 * 1000;

      date.setTime(time);

      const expires = date.toUTCString();

      document.cookie = `${name}=${value};expires=${expires};`;
    },
    message(message) {
      if (message.target !== undefined) {
        this.$store.commit('add', {
          message: message.target.value,
          player: this.$store.state.player,
        });
        this.ws.send(
          JSON.stringify({ data: message.target.value, type: 'word' })
        );
        message.target.value = '';
      } else {
        this.$store.commit('add', {
          message: message.message,
          player: message.player,
        });
      }
    },
    uuid() {
      if (
        document.cookie
          .split(';')
          .some((item) => item.trim().startsWith('uuid='))
      ) {
        return document.cookie
          .split('; ')
          .find((row) => row.startsWith('uuid='))
          .split('=')[1];
      }
      return null;
    },
  },
};
</script>
