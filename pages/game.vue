<template>
  <v-row>
    <v-col>
      {{ messages }}
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
