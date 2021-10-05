<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;Testing grounds.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>
<script>
export default {
  beforeMount() {
    this.ws = new WebSocket(process.env.WS)
    this.ws.addEventListener('open', (event) => {
      this.ws.send(
        JSON.stringify({ data: { player: 'Anuga' }, type: 'handshake' })
      )
    })
    this.ws.addEventListener('message', function (event) {
      console.log('Message from server ', event.data)
    })
  },
}
</script>