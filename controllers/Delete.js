const Post = require("./../models/Post")
module.exports = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
    }
});  
  console.log("Delete Progress " + id);
  res.redirect("/dashboard/admin");
}