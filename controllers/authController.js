const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//signIn token

const signInToken = function (id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//sign up
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword,
  });

  user.__v = undefined;

  const token = signInToken(user._id);

  res.status(200).json({
    message: "Your account has been created",
    token,
    data: {
      user,
    },
  });
});

//login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exists
  if (!email || !password) {
    return next(new AppError("please provide both email and password", 400));
  }
  // 2) check if email && password are correct

  const user = await User.findOne({ email }).select("+passowrd");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  //3) if everything is correct send back the token to client
  const token = signInToken(user.id);

  res.status(200).json({
    message: "Successfully logged in",
    token,
  });
});
