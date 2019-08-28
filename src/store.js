const uid = require("uid-promise");

class Store {
  constructor() {
    this._messages = new Map();
  }

  getMessagesForUser(userUID) {
    console.log(userUID);
    const msgs = this._messages.get(userUID);
    console.log(msgs);

    return msgs ? Array.from(msgs.values()) : null;
  }

  async createMessage(userUID, status) {
    const now = new Date();
    const msg = {
      uid: await uid(20),
      status,
      createdAt: now,
      updatedAt: now
    };

    let messages = this._messages.get(userUID) || new Map();
    messages.set(msg.uid, msg);
    this._messages.set(userUID, messages);

    return msg;
  }

  deleteMessage(userUID, messageUID) {
    const msgs = this._messages.get(userUID);
    if (msgs) {
      msgs.delete(messageUID);
    }
  }

  editMessage(userUID, messageUID, status) {
    const msgs = this._messages.get(userUID);
    if (msgs) {
      const msg = msgs.get(messageUID);
      if (!msg) {
        // be nice and upsert
        return this.createMessage(userUID, status);
      }

      msg.status = status;
      msg.updatedAt = new Date();
      msgs.set(messageUID, msg);
      this._messages.set(userUID, msgs);
      return msg;
    }

    // be nice and upsert
    return this.createMessage(userUID, status);
  }
}

module.exports = new Store();
