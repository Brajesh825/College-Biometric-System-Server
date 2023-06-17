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

module.exports = router;
