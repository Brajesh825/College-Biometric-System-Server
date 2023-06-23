const express = require("express");
const upload = require("../utils/fileUpload");
const StudentController = require("../controller/studentController");
const studentController = new StudentController();

const router = express.Router();

router.post(
  "/api/v1/uploadStudents",
  upload.single("student"),
  studentController.uploadCSV
);

router.get(
  "/api/v1/students",
  studentController.getAllStudentDetails
);

router.get("/api/v1/student/:empCode", studentController.getDetails);

router.get(
  "/api/v1/student/attendence/:empCode",
  studentController.getAttendence
);

module.exports = router;
