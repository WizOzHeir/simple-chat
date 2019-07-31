import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

import store from './store';
import * as constants from './constants/functionNames'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null, activeRoom = null;

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presenceStore[user.id],
  }));
  store.commit(constants.SET_USERS, members);
}

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId,
  });
  currentUser = await chatManager.connect();
  return currentUser;
}

async function subscribeToRoom(roomId) {
  store.commit(constants.CLEAR_CHAT_ROOM);
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => {
        store.commit(constants.ADD_MESSAGE, {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: new Date(message.createdAt).toLocaleString('en-GB'),
        });
      },
      onPresenceChanged: () => {
        setMembers();
      },
      onUserStartedTyping: user => {
        store.commit(constants.SET_USER_TYPING, user.id);
      },
      onUserStoppedTyping: () => {
        store.commit(constants.SET_USER_TYPING, null);
      },
    },
  });
  setMembers();
  return activeRoom;
}

export default {
  connectUser,
  subscribeToRoom
};
