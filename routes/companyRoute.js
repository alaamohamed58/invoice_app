const express = require("express");
const {
  createCompany,
  getAllCompanies,
  getOneCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").post(createCompany).get(getAllCompanies);

router
  .route("/:id")
  .get(getOneCompany)
  .patch(updateCompany)
  .delete(deleteCompany);

module.exports = router;
