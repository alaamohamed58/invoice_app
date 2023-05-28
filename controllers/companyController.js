const Company = require("../models/comapnyModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHanlder");

exports.createCompany = createOne(Company, "Company");
exports.getAllCompanies = getAll(Company);
exports.getOneCompany = getOne(Company);
exports.updateCompany = updateOne(Company, "Company");
exports.deleteCompany = deleteOne(Company, "Company");
