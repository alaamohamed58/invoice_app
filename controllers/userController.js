const User = require("../models/userModel");
const { getOne, deleteOne, updateOne, getAll } = require("./factoryHanlder");

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUser = updateOne(User, "user");
exports.deleteUser = deleteOne(User, "user");

//get user profile
exports.getMe = (req, res, next) => {
  req.params.id = req.user;
  next();
};
