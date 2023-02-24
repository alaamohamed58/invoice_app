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
  customer_name: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
    minlength: [4, "customer name must be at least 4 characters long"],
    maxlength: [30, "customer name cannot exceed 30 characters"],
  },
  customer_email: {
    type: String,
    match: /@/,
    unique: true,
    required: [true, "Customer email is required"],
    trim: true,
    minlength: [2, "Customer email must be at least 1 character long"],
    maxlength: [30, "customer email cannot exceed 30 characters"],
  },
  customer_phone: {
    type: Number,
    unique: true,
    required: [true, "Customer phone is required"],
    trim: true,
    minlength: [10, "customer phone cannot be below 10 characters"],
    maxlength: [20, "customer phone cannot exceed 20 characters"],
  },
  customer_address: {
    type: String,
    unique: true,
    //  required: [true, "Customer address is required"],
    trim: true,
    minlength: [4, "customer address must be at least 4 characters long"],
    maxlength: [30, "customer address cannot exceed 30 characters"],
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
