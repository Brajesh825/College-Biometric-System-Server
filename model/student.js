// Fetch One Student Complete Attendence

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let student = new Schema({
    EmpCode: {
        type: "String",
        required : true
    },
    name: {
        type : "String",
        required : true
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
    email : {
        type : "String"
    }
}
)


const model = mongoose.model("student", student);

module.exports = model;