// Fetch One Student Complete Attendence

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let report = new Schema({
  batch: {
    type: "String",
  },
  branch: {
    type: "String",
  },
  month: {
    type: "String",
  },
  year: {
    type: "Number",
    enum: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
  },
  reports: [
    {
      EmpCode: "String",
      registrationNumber: "Number",
      rollNumber: "String",
      batch: "String",
      name: "String",
      email: "String",
      daysAbsent: "Number",
      daysPresent: "Number",
      attendencePercent: "Number",
      isEligible: "Boolean",
    },
  ],
});

const model = mongoose.model("reports", report);

module.exports = model;
