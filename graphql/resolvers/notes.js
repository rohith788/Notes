const Note = require("../../models/note");

module.exports = {
  Query: {
    async getNotes() {
      try {
        const notes = await Note.find();
        return notes;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
