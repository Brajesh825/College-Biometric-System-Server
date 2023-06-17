const express = require("express");
const upload = require("../utils/fileUpload");
const AttendenceController = require("../controller/attendenceController");
const attendenceController = new AttendenceController();

const router = express.Router();

router.post(
  "/api/v1/uploadAttendence",
  upload.single("attendence"),
  attendenceController.uploadCSV
);

module.exports = router;
