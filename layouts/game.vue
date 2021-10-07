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
          v-for="player in list"
          :key="player.uuid"
          dense
          exact
          shaped
        >
          <v-list-item-content>
            <v-list-item-title v-text="player.name" />
            <v-list-item-subtitle v-text="player.uuid" />
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
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
      playerlist: {},
      right: true,
      rightDrawer: false,
      title: `The Game`,
    };
  },
  computed: {
    list: {
      get() {
        return this.playerlist;
      },
      set(list) {
        this.playerlist = list;
      },
    },
  },
  beforeMount() {
    setInterval(() => {
      // eslint-disable-next-line no-console
      // console.clear()
    }, 10000);

    this.ws = new WebSocket(process.env.WS);

    this.ws.addEventListener('open', (event) => {});

    this.ws.onmessage = (event) => {
      // eslint-disable-next-line no-console
      console.log(event.data);
      this.message(JSON.parse(event.data));
    };

    this.ws.addEventListener('ping', (event) => {
      // eslint-disable-next-line no-console
      console.log(`Received a ping!`, event.data);
      // this.ws.send()
    });

    this.ws.addEventListener('pong', (event) => {
      // eslint-disable-next-line no-console
      console.log(`Received a pong!`, event.data);
      // this.message(event.data)
    });
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
      switch (message.type) {
        case `PlayerList`:
          // console.info(message.data)
          this.players(message.data);
          break;

        case `UserInfo`:
          if (this.uuid() !== null) {
            this.ws.send(JSON.stringify({ data: this.uuid(), type: 'uuid' }));
          } else {
            this.cookie(`uuid`, message.data.uuid);
          }
          // connected = connected.parse(message.data.connected) + (24 * 60 * 60 * 1000)
          // connected = connected.toUTCString()
          // document.cookie = `uuid=${message.data.uuid};expires=${ connected };`;
          // this.players(message.data)
          break;
      }
    },
    players(players) {
      this.list = players;
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
