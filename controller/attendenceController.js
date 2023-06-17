const AttendenceService = require("../services/attendenceService");
const attendenceService = new AttendenceService();

class AttendenceController {
  constructor() {}

  uploadCSV = async (req, res) => {
    let {year, month} = req.body
    let records = await attendenceService.csvToArray(
      __dirname + "/.." + "/uploads/" + req.file.filename
    );
    let attendence = await attendenceService.uploadAttendence(records,year,month)
    res.json({
      msg: "Successfully updated attendence",
      attendence
    });
  };
}

module.exports = AttendenceController;
