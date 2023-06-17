const mail = require("../utils/mailing/mail");

class MailService {
  constructor() {}

  composeMail = async (from, to, subject, text, html) => {
    let options = {
      from,
      to,
      subject,
      text,
      html,
    };


    return options;
  };

  sendMail = async (options) => {
    console.log(options);
    let res = await mail(options);
    console.log(res);
    return res;
  };
}

module.exports = MailService;
