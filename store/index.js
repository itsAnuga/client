export const state = () => ({
  player: null,
  players: [],
  messages: [],
});

export const mutations = {
  add(state, message) {
    state.messages.push(message);
  },
  player(state, player) {
    state.player = player;
  },
  players(state, players) {
    state.players = players;
  },
};
