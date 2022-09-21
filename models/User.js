const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true , "Username kiritilmagan."],
  },
  email: {
    type: String,
    required: [true , "Email kiritilmagan."],
    unique: true,
  },
  password: {
    type: String,
    required: [true , "Parol kiritilmagan."],
  },
});

// userSchema.pre("save", function (next) {
//   const user = this;
//   bcrypt.hash("user.password", 10, function (err, encrypted) {
//     user.password = encrypted;
//     next();
//   });
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
