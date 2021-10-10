<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" app fixed>
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
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container fluid>
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
          title: 'Rules',
          to: '/rules',
        },
        {
          icon: 'mdi-microsoft-xbox-controller',
          title: 'Game',
          to: '/game',
        },
      ],
      title: `The Game`,
    };
  },
};
</script>
