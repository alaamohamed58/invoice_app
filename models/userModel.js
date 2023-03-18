const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [2, "minimum length of user name is 2 characters"],
    required: [true, "please enter your name"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
  },
  role: {
    type: String,
    enum: ["admin", "staff"],
    default: "staff",
  },
  password: {
    type: String,
    required: [true, "please provide the password"],
  },
  confirmedPassword: {
    type: String,
    required: [true, "please provide the password"],
    validate: {
      validator: function (pass) {
        return this.password === pass;
      },
      message: `Passwords doesn't match!`,
    },
  },
});

//crypt password

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.confirmedPassword = undefined;

  next();
});

//compare password and confirmation
UserSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassowrd
) {
  return await bcrypt.compare(enteredPassword, userPassowrd);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
