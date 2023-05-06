const {model,Schema} = require("mongoose");

const schema = Schema({
  fname: String,
  lname: String,
  email: String,
  country: String,
  isEmailVerified: Boolean,
  socialMedia: [{ url: String, name: String }],
  created_at: { type: Date, default: Date.now },
});

module.exports = model("Customer", schema);
