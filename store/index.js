export const state = () => ({
  players: [],
  messages: [],
});

export const mutations = {
  add(state, message) {
    state.messages.push(message);
  },
  players(state, players) {
      console.info(players)
    state.players = players;
  },
};
