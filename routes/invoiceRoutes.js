const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(invoiceController.createInvoice)
  .get(invoiceController.getInvoices);

router
  .route("/:id")
  .patch(invoiceController.updateInvoice)
  .delete(invoiceController.deleteInvoice)
  .get(invoiceController.getInvoice);

module.exports = router;
