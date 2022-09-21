const Users = require("../models/User")
const Post = require("../models/Post")

module.exports =  (req , res) => {
  const { id } = req.params
  Users.findOne({_id:  id }, (err, user) => {
    // console.log(user);
    if(user){
      Post.find({ author:  id }, (err, post) => {
        console.log(post);
        console.log(user);
        res.render("profile", {post, user})
      })
    }else{
      res.redirect("/")
    }
  }); 
}