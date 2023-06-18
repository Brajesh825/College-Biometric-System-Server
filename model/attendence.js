// Fetch One Student Complete Attendence

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let smartphone = new Schema({
    EmpCode: {
        type: "String"
    },
    nsme : {
        type : "String"
    },
    registrationNumber: {
        type: "Number",
        unique : true
    },
    rollNumber: {
        type: "String"
    },
    batch: {
        type: "String"
    },
    branch : {
        type : "String"
    },
    attendence: [
        {
            month: {
                type: "String"
            },
            year: {
                type: "Number",
                enum: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027]
            },
            days: [{
                day: {
                    type: "Number",
                },
                isPresent: {
                    type: "Boolean",
                },
                isWorkingDay : {
                    type : "Boolean"
                }
            }
            ]
        }
    ]
}
)


const model = mongoose.model("attendence", smartphone);

module.exports = model;