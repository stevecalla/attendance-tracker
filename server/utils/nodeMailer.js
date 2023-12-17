const nodemailer = require("nodemailer");
require("dotenv").config();

// First, define send settings by creating a new transporter:
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
  pool: true,
  port: 587, // Port for SMTP (usually 465)
  secure: false, // Usually true if connecting to port 465
  auth: {
    user: process.env.SENDER_EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
    // ⚠️ For better security, use environment variables set on the server for these values when deploying
  },
});

const verifyTransporterConnection = async () => {
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      // console.log(error);
    } else {
      // console.log("External Email Server is ready to take our messages");
      // console.log(success);
    }
  });
};

// const mailOptionsTemplate = {
//   from: {
//     name: "Calla",
//     address: process.env.SENDER_EMAIL,
//   },
//   to: ["scalla2@instructors.2u.com"],
//   subject: "Testing, testing, 123",
//   text: "Hello World",
//   html: `<h1>Hello there</h1>
//     <p>Isn't NodeMailer useful?</p>
//     `,
// };

const mailDetails = (args) => {
  //construct mail details/options object
  const mailOptions = {
    from: {
      name: "The Attendance Tracker",
      address: args.fromEmail,
    },
    to: [args.toEmail],
    subject: args.subject,
    text: args.textContent,
    html: args.htmlContent,
  };

  // pass mail options to sendMail
  // sendMail(args, mailOptions);
  return mailOptions;
};

const sendMail = async (mailOptions, dev) => {
  let info;
  verifyTransporterConnection();

  if (dev) {
    // Example repsonse object
    info = {
      accepted: ["scalla2@instructors.2u.com"],
      rejected: [],
      // accepted: [],
      // rejected: ["scalla2@instructors.2u.com"],
      ehlo: [
        "SIZE 35882577",
        "8BITMIME",
        "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
        "ENHANCEDSTATUSCODES",
        "PIPELINING",
        "CHUNKING",
        "SMTPUTF8",
      ],
      envelopeTime: 212,
      messageTime: 569,
      messageSize: 592,
      response:
        "DEVELOPMENT EXAMPLE 250 2.0.0 OK  1702779031 fi3-20020a056638630300b0046b3ee6c730sm167894jab.118 - gsmtp",
      envelope: { from: "test@gmail.com", to: ["scalla2@instructors.2u.com"] },
      messageId: "DEVELOPMENT EXAMPLE  <da829168-b46d-23a1-74d0-c9887e14d468@gmail.com>",
    };
  } else {
    info = await transporter.sendMail(mailOptions);
  }

  return info;
};

module.exports = {
  mailDetails,
  sendMail,
};

// SECTION - SOURCES
// https://www.youtube.com/watch?v=QDIOBsMBEI0
// https://openjavascript.info/2023/01/10/nodemailer-tutorial-send-emails-in-node-js/#Basic%20example
//https://mailtrap.io/blog/sending-emails-with-nodemailer/
// templates https://codedmails.com/reset-emails-preview
// mock app at /Users/stevecalla/du_coding/utilities/node-mailer/index.js
