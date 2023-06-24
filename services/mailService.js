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
    try {
      console.log(options);
      let res = await mail(options);
      console.log(res);
      return res;
    } catch (error) {
      return
    }

  };
}

module.exports = MailService;
