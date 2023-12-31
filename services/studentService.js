const fs = require("fs");
const csv = require("fast-csv");

const Student = require("../model/student");
const Attendence = require("../model/attendence");

class StudentService {
  constructor() {}

  csvToArray = async (csvPath) => {
    return new Promise((resolve, reject) => {
      let stream = fs.createReadStream(csvPath);
      let collectionCsv = [];
      let csvFileStream = csv
        .parse()
        .on("data", function (data) {
          collectionCsv.push(data);
        })
        .on("end", function () {
          let keys = collectionCsv[0];
          let records = [];

          for (let i = 1; i < collectionCsv.length; i++) {
            const datas = collectionCsv[i];
            const myData = {};
            for (let j = 0; j < keys.length; j++) {
              const key = keys[j];
              myData[key] = datas[j];
            }
            records.push(myData);
          }
          resolve(records);

          fs.unlinkSync(csvPath);
        });
      stream.pipe(csvFileStream);
    });
  };

  uploadStudents = async (records) => {
    let myStudents = [];
    let errs = [];

    for (let i = 0; i < records.length; i++) {
      const element = records[i];
      try {
        let student = new Student(element);
        await student.save();
        myStudents.push(student);
      } catch (error) {
        errs.push({ error: error.message, data: element });
      }
    }

    return { myStudents, errs };
  };

  getAttendence = async (EmpCode) => {
    let student = await Attendence.findOne({ EmpCode });

    console.log(student);

    if (!student) {
      return false;
    }

    return student;
  };

  getDetails = async (EmpCode) => {
    console.log("Here");
    let student = await Student.findOne({ EmpCode });
    if (!student) {
      return false;
    }
    return student;
  };

  getAllStudents = async()=>{
    let allStudentsData = await Student.find();
    if (!allStudentsData) {
      return false;
    }
    return allStudentsData;
  }
}

module.exports = StudentService;
