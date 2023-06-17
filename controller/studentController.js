const StudentService = require("../services/studentService");
const studentService = new StudentService();

class StudentController {
  constructor() {}

  uploadCSV = async (req, res) => {
    let records = await studentService.csvToArray(
      __dirname + "/.." + "/uploads/" + req.file.filename
    );
    let result = await studentService.uploadStudents(records);
    console.log(result);
    res.json({
      msg: "Successfully updated attendence",
      errs : result.errs,
      myStudents : result.myStudents ,
    });
  };
}

module.exports = StudentController;
