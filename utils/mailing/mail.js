const fs = require("fs");
const path = require("path");
const sendMail = require("./gmail");

const mail = async (mailData) => {
  console.log(mailData);

  const option = {
    to: mailData.to,
    subject: mailData.subject,
    text: mailData.text,
    html: mailData.html,
    textEncoding: "base64",
    headers: [
      { key: "X-Application-Developer", value: "Brajesh Mishra" },
      { key: "X-Application-Version", value: "v1.0.0.2" },
    ],
  };

  const messageId = await sendMail(option);
  return messageId;
};

module.exports = mail;
