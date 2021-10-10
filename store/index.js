export const state = () => ({
  player: null,
  players: [],
  messages: [],
  turn: null,
  uuid: null,
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
  set(state, messages) {
    state.messages = messages;
  },
  turn(state, turn) {
    state.turn = turn;
  },
  uuid(state, uuid) {
    state.uuid = uuid;
  },
};
