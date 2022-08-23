const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
});

const posts = new mongoose.model("posts", postSchema);

module.exports = posts;
