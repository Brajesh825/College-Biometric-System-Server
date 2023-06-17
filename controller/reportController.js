const ReportService = require("../services/reportService");
const reportService = new ReportService();

class ReportController {
  constructor() {}

  getReport = async (req, res) => {};

  generateReport = async (req, res) => {
    let options = req.body;
    if (!options) {
      return res.status(400).json({ status: "failure" });
    }
    let report = await reportService.generateReport(options);

    res.status(200).json({ status: "success", report });
  };
}

module.exports = ReportController;
