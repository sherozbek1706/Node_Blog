const Post = require("../models/Post");

module.exports = async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 }).populate("author", "username");
  res.render("allPost", { posts });
};
