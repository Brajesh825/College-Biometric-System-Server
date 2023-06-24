const branches = require("../config/branchs");

const Student = require("../model/student");
const Attendence = require("../model/attendence");
const Report = require("../model/report");

//Service
const MailService = require("./mailService");
const mailService = new MailService();

const { report } = require("../route/reportRoute");

class ReportService {
  constructor() {}
  generateReport = async (options) => {
    let { batch, branch, month, year } = options;

    let attendReport = await Report.findOne({ batch, branch, year, month });
    if (attendReport) {
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

      if (currmonthAttendence.length == 0) {
        return;
      }

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

      // Send Mail
      let from = "AMS";
      let to = report.email;
      let attendencePercentage = report.attendencePercent;
      let text = `Your Attendence percent is ${attendencePercentage}`;
      let subject = `Attendence Report For  ${workingAttend.month}  ${workingAttend.year}`;
      let html = `Your Attendence percent is ${attendencePercentage}`;
      let mail = await mailService.composeMail(from, to, subject, text, html);
      mailService.sendMail(mail);

      reports.push(report);
    }

    myReport.reports = reports;

    let attendenceReport = new Report(myReport);
    if (myReport.reports.length == 0) {
      return attendenceReport;
    }
    await attendenceReport.save();

    return attendenceReport;
  };

  generateReports = async (options) => {
    let reports = [];
    let { batch, month, year } = options;

    for (let i = 0; i < branches.length; i++) {
      const branch = branches[i];
      let report = await this.generateReport({
        batch,
        month,
        year,
        branch,
      });
      reports.push(report);
    }

    return reports;
  };

  getReport = async (options) => {};
}

module.exports = ReportService;
