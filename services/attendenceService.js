const fs = require("fs");
const csv = require("fast-csv");

const Student = require("../model/student");
const Attendence = require("../model/attendence");

class AttendenceService {
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
              let key = keys[j];
              if (key[j] != "Emp. Code") {
                key = keys[j].split(" ")[0];
              }
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

  uploadAttendence = async (records, year, month) => {
    let myDocs = [];
    let errs = [];

    for (let i = 0; i < records.length; i++) {
      const element = records[i];

      let EmpCode = element["Emp.Code"];
      // check for student
      let student = await Student.findOne({ EmpCode });

      element.registrationNumber = student.registrationNumber;
      element.rollNumber = student.rollNumber;
      element.batch = student.batch;
      element.branch = student.branch;
      element.EmpCode = EmpCode;

      // check whether there is need to update the attendence or create new
      let currAtten = await Attendence.findOne({ EmpCode });
      if (!currAtten) {
        let attendence = [];
        let workingAtten = {};
        workingAtten.month = month;
        workingAtten.year = year;
        workingAtten.days = this.filterDays(element, month);

        attendence.push(workingAtten);

        element.attendence = attendence;

        let studentAttendence = new Attendence(element);

        await studentAttendence.save();
        myDocs.push(studentAttendence);
      } else {
        let workingAtten = {};
        workingAtten.month = month;
        workingAtten.year = year;
        workingAtten.days = this.filterDays(element, month);

        currAtten.attendence.push(workingAtten);
        await currAtten.save();
        myDocs.push(currAtten);
      }
    }

    return myDocs;
  };

  filterDays = (record, month) => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      const element = record[i];
      if (element) {
        let day = i;
        if (element == "A") {
          let isPresent = false;
          let isWorkingDay = true;
          days.push({ day, isPresent, isWorkingDay });
        } else if (element == "WO") {
          let isPresent = false;
          let isWorkingDay = false;
          days.push({ day, isPresent, isWorkingDay });
        } else {
          let isPresent = true;
          let isWorkingDay = true;
          days.push({ day, isPresent, isWorkingDay });
        }
      }
    }
    return days;
  };
}

module.exports = AttendenceService;
