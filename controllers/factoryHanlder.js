const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createOne = (Model, docName) =>
  catchAsync(async (req, res) => {
    if (!req.body.created_by) req.body.created_by = req.user;
    const doc = await Model.create(req.body);
    doc.__v = undefined;

    res.status(201).json({
      message: `${docName} Created`,
      results: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const features = new ApiFeatures(req.query, Model.find())
      .ordering()
      .filtering()
      .limitFields()
      .paginate();
    const doc = await features.query;
    const count = await Model.countDocuments();
    res.status(200).json({
      message: "Successfully retrieved all",
      count,
      results: {
        doc,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("There is no document with that id", 404));
    }
    res.status(200).json({
      message: "Successfully retrieved specific document",
      results: {
        doc,
      },
    });
  });

exports.updateOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError(`There is no ${docName} with that id`, 404));
    }
    res.status(200).json({
      message: `${docName} Updated`,
      results: {
        doc,
      },
    });
  });

exports.deleteOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const invoice = await Model.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return next(new AppError(404, `${docName} not found`));
    }
    res.status(204).json({
      message: `${docName} Deleted`,
      data: null,
    });
  });
