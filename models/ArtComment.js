const { model, Types, Schema } = require("mongoose");

const schema = Schema({
  artId: { type: Types.ObjectId, ref: "Art" },
  comment: String,
  author: { type: Types.ObjectId, ref: "Customer" },
  createdAt: { type: Date, default: Date.now },
  likes: Number,
  reply: [{ type: Types.ObjectId, ref: "CommentReply" }],
});

module.exports = model("ArtComment", schema);
