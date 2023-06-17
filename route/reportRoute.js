const express = require("express");
const ReportController = require("../controller/reportController");
const reportController = new ReportController();

const router = express.Router();

router.post(
  "/api/v1/report/",
  reportController.generateReport
);

router.post(
  "/api/v1/reports/",
  reportController.generateReports
);

router.get(
  "/api/v1/reports/",
  reportController.getReport  
);

module.exports = router;
