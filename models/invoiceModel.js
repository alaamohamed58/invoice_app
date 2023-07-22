const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const InvoiceItem = new mongoose.Schema({
  item_name: {
    type: String,
    required: [true, "item name is required"],
  },
  quantity: {
    type: Number,
    required: [true, "item price is required"],
  },
  price: {
    type: Number,
    required: [true, "item price is required"],
  },
  total: {
    type: Number,
  },
});

const InvoiceSchema = new mongoose.Schema({
  bill_from: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: [true, "Company is required"],
  },
  client_name: {
    type: String,
    required: [true, "Client name is required"],
    trim: true,
    minlength: [2, "client name must be at least 4 characters long"],
    maxlength: [30, "client name cannot exceed 30 characters"],
  },
  client_email: {
    type: String,
    trim: true,
    minlength: [2, "client email must be at least 1 character long"],
    maxlength: [30, "client email cannot exceed 30 characters"],
    match: /@/,
    sparse: true, // allow null or empty string
  },
  client_phone: {
    type: Number,
    trim: true,
    minlength: [10, "client phone cannot be below 10 characters"],
    maxlength: [20, "client phone cannot exceed 20 characters"],
  },
  client_city: {
    type: String,
    trim: true,
    minlength: [4, "client city must be at least 4 characters long"],
    maxlength: [20, "client city cannot exceed 30 characters"],
  },
  client_country: {
    type: String,
    trim: true,
    minlength: [4, "client country must be at least 4 characters long"],
    maxlength: [20, "client country cannot exceed 30 characters"],
  },
  client_address: {
    type: String,
    trim: true,
    minlength: [4, "client address must be at least 4 characters long"],
    maxlength: [30, "client address cannot exceed 30 characters"],
  },
  zip_code: {
    type: Number,
    trim: true,
  },
  payment_due: {
    type: Date,
    required: [true, "payment due date is required"],
    default: new Date().toUTCString(),
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Paid", "pending", "paid"],
    required: [true, "Status must be included in"],
  },
  items: {
    type: [InvoiceItem],
  },

  created_at: {
    type: Date,
    default: new Date().toDateString(),
  },
  created_by: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

InvoiceSchema.path("items").validate(function (items) {
  if (!items) {
    return false;
  } else if (items.length === 0) {
    return false;
  }
  return true;
}, "Invoice items needs to have at least one item");

// InvoiceItem.pre("save", async function (next) {
//   const company = await mongoose.model("Company").findById(this.bill_from);
//   if (!company) {
//     return next(new AppError("No Company found", 404));
//   }
//   next();
// });

// Set the total field using the calculateTotal function
InvoiceItem.pre("save", function (next) {
  this.total = this.calculateTotal();
  next();
});

InvoiceSchema.pre(/^find/, function (next) {
  this.populate("created_by", "name");
  this.populate("bill_from", "company_name");
  next();
});

// Define a function to calculate the total based on price and quantity
InvoiceItem.methods.calculateTotal = function () {
  return this.price * this.quantity;
};

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
