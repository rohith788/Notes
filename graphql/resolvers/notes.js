const Note = require("../../models/note");
const checkAuth = require("../../util/check_auth");
const { AuthenticationError } = require("apollo-server");
const { argsToArgsConfig } = require("graphql/type/definition");

module.exports = {
  Query: {
    async getNotes() {
      try {
        const notes = await Note.find().sort({ createdAt: -1 });
        return notes;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getNote(_, { noteId }) {
      try {
        const note = await Note.findById(noteId);
        if (note) {
          return note;
        } else {
          throw new Error("Note not found");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createNote(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Note must not be empty");
      }

      const newNote = new Note({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const note = await newNote.save();
      return note;
    },
    async deleteNote(_, { noteId }, context) {
      const user = checkAuth(context);

      const note = await Note.findById(noteId);
      try {
        if (user.username === note.username) {
          await note.delete();
          return "Note deleated";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
