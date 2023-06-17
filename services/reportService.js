const Student = require("../model/student");
const Attendence = require("../model/attendence");
const Report = require("../model/report");
const { report } = require("../route/reportRoute");

class ReportService {
  constructor() {}
  generateReport = async (options) => {
    let { batch, branch, month, year } = options;

    let attendReport = await Report.find({ batch, branch, year, month });
    if (attendReport.length != 0) {
      console.log("Report Already Exist");
      return attendReport;
    }

    let attendences = await Attendence.find({ batch, branch });

    // report data
    let myReport = {};
    myReport.batch = batch;
    myReport.branch = branch;
    myReport.month = month;
    myReport.year = year;

    let reports = [];

    for (const attendence of attendences) {
      let report = {};

      // attendence data
      report.EmpCode = attendence.EmpCode;
      report.batch = attendence.batch;
      report.registrationNumber = attendence.registrationNumber;
      report.rollNumber = attendence.rollNumber;

      // student data
      let student = await Student.findOne({ EmpCode: attendence.EmpCode });
      report.name = student.name;
      report.email = student.email;

      // attendence percenatage check
      let currmonthAttendence = attendence.attendence.filter(
        (el) => el.month == month && el.year == year
      );

      let workingAttend = currmonthAttendence[0];

      let daysPresentList = workingAttend.days.filter(
        (el) => el.isPresent == true && el.isWorkingDay == true
      );
      let daysAbsentList = workingAttend.days.filter(
        (el) => el.isPresent == false && el.isWorkingDay == true
      );

      let daysPresent = daysPresentList.length;
      let daysAbsent = daysAbsentList.length;
      report.daysPresent = daysPresent;
      report.daysAbsent = daysAbsent;

      // eligibility check
      let attendencePercent = (daysPresent / (daysPresent + daysAbsent)) * 100;
      report.attendencePercent = Math.floor(attendencePercent);
      report.isEligible = attendencePercent >= 50;

      reports.push(report);
    }

    myReport.reports = reports;

    let attendenceReport = new Report(myReport);
    await attendenceReport.save();

    return attendenceReport;
  };
  getReport = async (options) => {};
}

module.exports = ReportService;
