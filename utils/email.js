const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //create email options
  const emailOptions = {
    from: "Alaa Mohamed <Application Developer>",
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  //send email
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
