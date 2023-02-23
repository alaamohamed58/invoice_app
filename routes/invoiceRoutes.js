const express = require("express");
const invoiceController = require("../controllers/invoiceController");

const router = express.Router();

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
