const { Types, Schema, model } = require("mongoose");

const schema = new Schema({
  artImage: String,
  name: String,
  tags: [{ type: String }],
  topics: [{ type: String }],
  author: { type: Types.ObjectId, ref: "Customer" },
  favorites: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  viewers: { type: Number, default: 0 },
  published_date: { type: Date, default: Date.now },
  imageDetails: { size: String, ratio: String },
});

schema.index({ name: "text", tags: "text" });

module.exports = model("Art", schema);
