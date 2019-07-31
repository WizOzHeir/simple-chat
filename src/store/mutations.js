import * as constants from '../constants/functionNames';

export default {
  [constants.SET_ERROR]: function(state, error) {
    state.error = error;
  },
  [constants.SET_LOADING]: function(state, loading) {
    state.loading = loading;
  },
  [constants.SET_USER]: function(state, user) {
    state.user = user;
  },
  [constants.SET_USERS]: function(state, users) {
    state.users = users;
  },
  [constants.SET_RECONNECT]: function(state, reconnect) {
    state.reconnect = reconnect;
  },
  [constants.SET_ACTIVE_ROOM]: function(state, roomId) {
    state.activeRoom = roomId;
  },
  [constants.SET_ROOMS]: function(state, rooms) {
    state.rooms = rooms;
  },
  [constants.SET_MESSAGES]: function(state, messages) {
    state.messages = messages;
  },
  [constants.ADD_MESSAGE]: function(state, message) {
    state.messages.push(message);
  },
  [constants.SET_SENDING]: function(state, status) {
    state.status = status;
  },
  [constants.SET_USER_TYPING]: function(state, userId) {
    state.userTyping = userId;
  },
  [constants.CLEAR_CHAT_ROOM]: function(state) {
    state.users = [];
    state.messages = [];
  },
  [constants.RESET]: function(state) {
    state.user = null;
    state.users = [];
    state.error = null;
    state.messages = [];
    state.rooms = [];
  }
};
