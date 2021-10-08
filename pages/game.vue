<template>
  <v-row>
    <v-col v-for="(message, index) in messages" :key="index" cols="12">
      <span v-if="message.player">{{ message.player }} : {{ message.message }}</span>
      <span v-else>{{ message }}</span>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'game',
  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },
};
</script>
