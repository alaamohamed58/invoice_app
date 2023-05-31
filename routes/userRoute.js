const express = require("express");
const {
  signup,
  login,
  protect,
  forgetPassword,
} = require("../controllers/authController");
const {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getMe,
} = require("../controllers/userController");

const router = express.Router();

router.post("/forgetPassword", forgetPassword);

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);

router.get("/me", getMe, getUser);

router.get("/", getAllUsers);
router.route("/:id").delete(deleteUser).patch(updateUser).get(getUser);

module.exports = router;
