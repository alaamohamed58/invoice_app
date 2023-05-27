const Invoice = require("../models/invoiceModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHanlder");

//Create Invoice
exports.createInvoice = createOne(Invoice, "invoice");
//Get All Invoices
exports.getInvoices = getAll(Invoice, "Invoices");
//Get Specific Invoice
exports.getInvoice = getOne(Invoice);
//Update Invoice
exports.updateInvoice = updateOne(Invoice, "Invoice");
//Delete Invoice
exports.deleteInvoice = deleteOne(Invoice, "Invoice");
