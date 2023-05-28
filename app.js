const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const invoiceRoute = require("./routes/invoiceRoute");
const userRoute = require("./routes/userRoute");
const companyRoute = require("./routes/companyRoute");
const globalError = require("./controllers/errorController");

const AppError = require("./utils/appError");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
//mounting routes
app.use("/api/v1/invoice", invoiceRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/user", userRoute);

//handle errors
app.all("*", (req, res, next) => {
  const err = new AppError(`not found page  ${req.originalUrl}`, 404);
  next(err);
});

app.use(globalError);

module.exports = app;
