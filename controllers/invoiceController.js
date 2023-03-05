const Invoice = require("../models/invoiceModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

//handle async errors

//Create Invoice
exports.createInvoice = catchAsync(async (req, res) => {
  //insert invoice

  const invoice = await Invoice.create(req.body);
  res.status(201).json({
    message: "Invoice Created",
    data: {
      invoice: invoice,
    },
  });
});

//Get All Invoices
exports.getInvoices = catchAsync(async (req, res) => {
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
});

//Get Specific Invoice
exports.getInvoice = catchAsync(async (req, res) => {
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
});

//Update Invoice
exports.updateInvoice = catchAsync(async (req, res) => {
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
});

//Delete Invoice
exports.deleteInvoice = catchAsync(async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Invoice Deleted",
  });
});

// const deleteAll = async () => {
//   try {
//     await Invoice.deleteMany({});
//   } catch (err) {
//     console.log(err);
//   }
// };
// deleteAll();
