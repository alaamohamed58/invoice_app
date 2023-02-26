const Invoice = require("../models/invoiceModel");
const ApiFeatures = require("../utils/apiFeatures");
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
exports.getInvoices = async (req, res) => {
  try {
    const features = new ApiFeatures(req.query, Invoice.find())
      .ordering()
      .filtering()
      .limitFields()
      .paginate();
    const invoices = await features.query;

    res.status(200).json({
      message: "Successfully retrieved all",
      count: invoices.length,
      data: {
        invoices: invoices,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//Get Specific Invoice
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.status(200).json({
      message: "Successfully retrieved specific invoice",
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

//Update Invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "Invoice Updated",
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

//Delete Invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Invoice Deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// const deleteAll = async () => {
//   try {
//     await Invoice.deleteMany({});
//   } catch (err) {
//     console.log(err);
//   }
// };
// deleteAll();
