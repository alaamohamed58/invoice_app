const jwt = require("jsonwebtoken");
const Invoice = require("../models/invoiceModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
//handle async errors

//Create Invoice
exports.createInvoice = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization,
    token = authHeader.split(" ")[1],
    decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  const invoice = await Invoice.create({ ...req.body, created_by: user._id });
  invoice.__v = undefined;

  await invoice.populate("created_by", "name");

  const { name } = invoice.created_by;

  res.status(201).json({
    message: "Invoice Created",
    data: {
      invoice: {
        ...invoice.toObject(),
        created_by: name,
      },
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
  const populatedInvoice = await Invoice.populate(invoices, {
    path: "created_by",
    select: "name",
  });

  const modifiedInvoice = populatedInvoice.map((invoice) => ({
    ...invoice.toObject(),
    created_by: invoice.created_by.name,
  }));

  const count = (await Invoice.find()).length;

  res.status(200).json({
    message: "Successfully retrieved all",
    count: count,
    data: {
      invoices: modifiedInvoice,
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
exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) {
    return next(new AppError(404, "Invoice not found"));
  }
  res.status(204).json({
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
