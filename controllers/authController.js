const { promisify } = require("util");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
//signIn token

const signInToken = function (id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//sign up
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmedPassword: req.body.confirmedPassword,
  });

  user.__v = undefined;
  user.password = undefined;

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

//protected route
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //check if authorization is exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("you are not authenticated", 401));
  }
  //check if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token is no longer exits", 401)
    );
  }

  req.user = currentUser;

  next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1) Get User Based on Posted Email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError(
        "There is no user with provided email, please make sure your email",
        404
      )
    );
  }

  // 2) generate random reset token

  const resetToken = user.passwordRandomResetToken();

  user.save({ validateBeforeSave: false });

  //3) send reset token via email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/resetPassword/${resetToken}`;

    const message = `Forgot your password ? Submit this link to set new password : ${resetURL}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password (valid for 10 minutes)",
      message,
    });
    res.status(200).json({
      message: "token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    return next(
      new AppError("there was an error sending an email, please try later", 500)
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {});
