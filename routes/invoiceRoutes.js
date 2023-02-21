const express = require("express");
const invoiceController = require("../controllers/invoiceController");

const router = express.Router();

router.route("/").post(invoiceController.createInvoice);

module.exports = router;
