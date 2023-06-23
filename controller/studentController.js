const StudentService = require("../services/studentService");
const studentService = new StudentService();

class StudentController {
  constructor() {}

  uploadCSV = async (req, res) => {
    let records = await studentService.csvToArray(
      __dirname + "/.." + "/uploads/" + req.file.filename
    );
    let result = await studentService.uploadStudents(records);
    res.json({
      msg: "Successfully updated attendence",
      errs: result.errs,
      myStudents: result.myStudents,
    });
  };

  getAttendence = async (req, res) => {
    let { empCode } = req.params;

    let student = await studentService.getAttendence(empCode);

    if (!student) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    return res.status(200).json({ message: "successfully found", student });
  };

  getDetails = async (req, res) => {
    let { empCode } = req.params;

    let student = await studentService.getDetails(empCode);

    if (!student) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    return res.status(200).json({ message: "successfully found", student });
  };

  getAllStudentDetails = async (req, res) => {

    let allStudentsData = await studentService.getAllStudents();

    if (!allStudentsData) {
      return res.status(404).json({ message: "Students Not Found" });
    }

    return res.status(200).json({ message: "Students Found", allStudentsData });
  };

}

module.exports = StudentController;
