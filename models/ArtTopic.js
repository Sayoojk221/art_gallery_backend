const { Schema, model } = require("mongoose");

const schema = Schema({
  topic: String,
});

module.exports = model("ArtTopic", schema);
