const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    minLength: [2, "Company name must have at least two characters"],
    unique: true,
  },
  location: {
    type: String,
    trim: true,
    minLength: [4, "Company location must have at least four characters"],
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
