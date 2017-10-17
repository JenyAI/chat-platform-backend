const utils = require('../utils');
let sockets = require('../sockets');

const typingOff = (data, user) => {
  let emitter = utils.getEmitter(sockets, user);
  if (emitter === null) {
    return;
  }

  let recipientType = utils.mirrorType(user);
  let recipient = utils.getEmitter(sockets, { userId: emitter.recipient, roomId: user.roomId, type: recipientType });
  if (recipient === null) { return; }

  let msg = {
    emitter: user.userId
  };
  recipient.socket.emit('typing-off', msg);
};

module.exports = typingOff;
