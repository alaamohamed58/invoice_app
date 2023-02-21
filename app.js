const express = require("express");
const morgan = require("morgan");
const invoiceRoute = require("./routes/invoiceRoutes");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

//mounting routes
app.use("/api/v1/invoice", invoiceRoute);

module.exports = app;
