const { model, Types, Schema } = require("mongoose");

const schema = Schema({
  reply: String,
  replyAuthor: { type: Types.ObjectId, ref: "Customer" },
  likes: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("CommentReply", schema);
