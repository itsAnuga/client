<template>
  <v-row>
    <v-col v-for="(message, index) in messages" :key="index" cols="12">
      {{ message.player }} : {{ message.message }}
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
