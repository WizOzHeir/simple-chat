import chatkit from '../chatkit';
import * as constants from '../constants/functionNames';

function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  [constants.LOGIN]: async function ({ commit, state }, userId) {
    try {
      commit(constants.SET_ERROR, '');
      commit(constants.SET_LOADING, true);

      const currentUser = await chatkit.connectUser(userId);
      commit(constants.SET_USER, {
        username: currentUser.id,
        name: currentUser.name,
      });

      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name,
      }));
      commit(constants.SET_ROOMS, rooms);

      const activeRoom = state.activeRoom || rooms[0];
      commit(constants.SET_ACTIVE_ROOM, {
        id: activeRoom.id,
        name: activeRoom.name,
      });
      await chatkit.subscribeToRoom(activeRoom.id);
      commit(constants.SET_RECONNECT, false);
      return true;
    }
    catch(error) {
      handleError(commit, error);
    }
    finally {
      commit(constants.SET_LOADING, false);
    }
  },
  [constants.LOGOUT]: async function ({ commit}) {
    commit(constants.RESET);
    chatkit.disconnectUser();
    window.localStorage.clear();
  },
  [constants.CHANGE_ROOM]: async function ({ commit }, roomId) {
    try {
      const {id, name} = await chatkit.subscribeToRoom(roomId);
      commit(constants.SET_ACTIVE_ROOM, {id, name});
    } catch (error) {
      handleError(commit, error);
    }
  },
  [constants.SEND_MESSAGE]: async function({ commit }, message) {
    try {
      commit(constants.SET_ERROR, '');
      commit(constants.SET_SENDING, true);
      const messageId = await chatkit.sendMessage(message);
      return messageId;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit(constants.SET_SENDING, false);
    }
  }
}
