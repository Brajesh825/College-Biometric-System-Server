const fs = require("fs");
const csv = require("fast-csv");

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
              const key = keys[j];
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

      let EmpCode = element["Emp.Code"]
      console.log(EmpCode);

      // check for student
    }
  };

  filterDays = async (record, month) => {};
}

module.exports = AttendenceService;
