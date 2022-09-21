const Post = require("../models/Post");
module.exports = async (req, res) => {
  console.log(req.session);
  const posts = await Post.find().sort({ _id: -1 }).limit(3).populate("author", "username");
  res.render("index", { posts });
};
