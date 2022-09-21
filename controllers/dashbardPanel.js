const Post = require("../models/Post");

module.exports = async (req , res) => {
  const Posts = await Post.find();
  const UserID = req.session.userId
  res.render("dashboard", {Posts, UserID})
  console.log();
}