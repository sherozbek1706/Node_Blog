const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (error, user) => {
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      return res.redirect("/  login");
    }
  });
};

// const User = require("../models/User");
// const bcrypt = require("bcrypt")
// module.exports = (req, res) => {
//   User.find({$and :[
//     {email: req.body.email}
//   ]}, (err , user) => {

//     // console.log(bcrypt.compare(req.body.password , user.password);
//     bcrypt.compare().then(result => {
//       console.log(result)
//    })

//   });
//   res.redirect("/");
// };
