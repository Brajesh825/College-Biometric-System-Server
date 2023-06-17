const MailService = require("../services/mailService");
const mailService = new MailService();

class MailController {
  sendAttendence = async (req, res) => {
    let datas = req.body;
    for (const mailData of datas) {
      console.log(mailData);
      let from = "AMS";
      let to = mailData.email;
      let attendencePercentage = mailData.attendencePercentage;
      let text = `Your Attendence percent is ${attendencePercentage}`;
      let subject = "Attendence Report For The Month";
      let html = `Your Attendence percent is ${attendencePercentage}`;
      let mail = await mailService.composeMail(from, to, subject, text, html);
      await mailService.sendMail(mail);
    }

    res.status(200).json({ status: "success" });
  };
}

module.exports = MailController;
