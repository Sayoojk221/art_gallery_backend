const mongoose = require("mongoose");

const schema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", schema);
