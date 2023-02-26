const mongoose = require("mongoose");
const invoiceItem = new mongoose.Schema({
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
});

const invoiceSchema = new mongoose.Schema({
  client_name: {
    type: String,
    required: [true, "Client name is required"],
    trim: true,
    minlength: [4, "client name must be at least 4 characters long"],
    maxlength: [30, "client name cannot exceed 30 characters"],
  },
  client_email: {
    type: String,
    match: /@/,
    unique: true,
    required: [true, "client email is required"],
    trim: true,
    minlength: [2, "client email must be at least 1 character long"],
    maxlength: [30, "client email cannot exceed 30 characters"],
  },
  client_phone: {
    type: Number,
    unique: true,
    required: [true, "client phone is required"],
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
    required: [true, "client zip code is required"],
    trim: true,
  },
  payment_due: {
    type: Date,
    required: [true, "payment due date is required"],
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Paid", "pending", "paid"],
    required: [true, "Status must be included in"],
  },
  items: {
    type: [invoiceItem],
  },
});
invoiceSchema.path("items").validate(function (items) {
  if (!items) {
    return false;
  } else if (items.length === 0) {
    return false;
  }
  return true;
}, "Invoice items needs to have at least one item");

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
