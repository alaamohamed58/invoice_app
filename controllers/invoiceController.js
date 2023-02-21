const Invoice = require("../models/invoiceModel");
//Create Invoice

exports.createInvoice = async (req, res) => {
  //insert invoice
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json({
      message: "Invoice Created",
      data: {
        invoice: invoice,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//Get All Invoices

//Get Specific Invoice

//Update Invoice

//Delete Invoice
