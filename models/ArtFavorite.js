const { model, Types, Schema } = require("mongoose");

const schema = Schema({
  artId: { type: Types.ObjectId, ref: "Art" },
  customerId: { type: Types.ObjectId, ref: "Customer" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("ArtFavorite", schema);
