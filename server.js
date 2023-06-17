const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();
const connect = require("./config/dbConnect");
require("dotenv").config();
// routes
const attendenceRoutes = require("./route/attendenceRoute");
const studentRoutes = require("./route/studentRoute");
const reportRoutes = require("./route/reportRoute");
const mailRoutes = require("./route/mailRoute");

// middlewares
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

// attendence route
app.use(attendenceRoutes);
app.use(studentRoutes);
app.use(reportRoutes);
app.use(mailRoutes);

const start = async () => {
  await connect(process.env.MONGOURI);
  const PORT = process.env.PORT || 5555;
  app.listen(PORT, () => console.log(`Node app serving on port: ${PORT}`));
};

start();
