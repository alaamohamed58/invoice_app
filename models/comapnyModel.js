const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    unique: true,
  },
  location: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  sector: {
    type: String,
    required: [true, "Company sector is required"],
    trim: true,
  },
  company_logo: String,
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
