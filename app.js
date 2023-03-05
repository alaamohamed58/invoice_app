const express = require("express");
const morgan = require("morgan");
const invoiceRoute = require("./routes/invoiceRoutes");
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorController");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

//mounting routes
app.use("/api/v1/invoice", invoiceRoute);

//handle errors
app.all("*", (req, res, next) => {
  const err = new AppError(`not found page  ${req.originalUrl}`, 404);
  next(err);
});

app.use(globalError);

module.exports = app;
