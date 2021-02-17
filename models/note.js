const { model, Schema } = require("mongoose");

const noteSchema = new Schema({
  body: String,
  createdAt: String,
  username: String,
});

module.exports = model("Note", noteSchema);
