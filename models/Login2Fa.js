const { model, Types, Schema } = require("mongoose");

const schema = Schema({
  customerId: { type: Types.ObjectId, ref: "Customer" },
  expire: Date,
  token: String,
  status: String
});

module.exports = model("Login2Fa", schema);
