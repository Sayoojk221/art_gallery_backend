const { Types, Schema, model } = require("mongoose");

const schema = Schema({
  artImage: String,
  tags: [{ type: String }],
  topics: [{ type: String }],
  author: { type: Types.ObjectId, ref: "Customer" },
  favorites: Number,
  comments: Number,
  viewers: Number,
  published_date: { type: Date, default: Date.now },
  imageDetails: { size: String, ratio: String },
});


module.exports = model('Art', schema)