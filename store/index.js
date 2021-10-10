export const state = () => ({
  player: null,
  players: [],
  messages: [],
  uuid: null,
});

export const mutations = {
  add(state, message) {
    state.messages.push(message);
  },
  set(state, messages) {
    state.messages = messages;
  },
  player(state, player) {
    state.player = player;
  },
  players(state, players) {
    state.players = players;
  },
  uuid(state, uuid) {
    state.uuid = uuid;
  },
};
