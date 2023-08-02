const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");
mongoose.set("strictQuery", true);

//server connect
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Server listening on port ${port} and ${process.env.NODE_ENV} environment`
  );
});

//mongoose connect


 const  db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose.connect(db).then(() => console.log("Database connected"));
