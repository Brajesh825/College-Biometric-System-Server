const express = require("express");
const MailController = require("../controller/mailController");
const mailController = new MailController();

const router = express.Router();

router.post(
  "/api/v1/sendAttendence",
  mailController.sendAttendence
);

module.exports = router;
