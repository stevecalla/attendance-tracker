const nodemailer = require("nodemailer");
require("dotenv").config();

// First, define send settings by creating a new transporter:
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
  port: 587, // Port for SMTP (usually 465)
  secure: false, // Usually true if connecting to port 465
  auth: {
    user: process.env.SENDER_EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
    // ⚠️ For better security, use environment variables set on the server for these values when deploying
  },
});

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

const mailDetails = (toEmail, fromEmail, subject, textContent, htmlContent) => {
  //construct mail details/options object
  const mailOptions = {
    from: {
      name: "The Attendance Tracker",
      address: fromEmail,
    },
    to: [toEmail],
    subject: subject,
    text: textContent,
    html: htmlContent,
  };
  
  //pass mail options to sendMail
  sendMail(mailOptions);
}

// SEND THE EMAIL INSIDE transporter.sendEmail() USING MAIL OPTIONS AND AWAIT INFO STATUS FORM SEND; PASS INFO STATUS TO EMAILSEND DB/MODEL
// const sendMail = async (transporter, mailOptions) => {
const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(info.messageId); //<d593580d-54c4-acf9-0003-d2dfeca67038@gmail.com>
    console.log(info.envelope); //{ from: 'callasteven@gmail.com', to: [ 'scalla2@instructors.2u.com' ] }
    console.log('successfully delivered', info.accepted); //successfully delivered [ 'scalla2@instructors.2u.com' ]
    console.log('rejected delivery', info.rejected); //rejected delivery []
    console.log('pending delivery', info.pending); //pending delivery undefined
    console.log('response', info.response); //response 250 2.0.0 OK  1702444461 g3-20020a92c7c3000000b0035d6800582dsm147616ilk.37 - gsmtp
    console.log("Successful send"); // Random ID generated after successful send (optional)

  } catch (error) {
    console.log("1)", error);
  }
};

// SETUP CODE TO UPDATE THE DB WITH THE EMAIL INFORMATION

// sendMail(transporter, mailOptions);

module.exports = {
  mailDetails,
  // transporter,
  // sendMail
};


// SECTION - SOURCES
// https://www.youtube.com/watch?v=QDIOBsMBEI0
// https://openjavascript.info/2023/01/10/nodemailer-tutorial-send-emails-in-node-js/#Basic%20example
//https://mailtrap.io/blog/sending-emails-with-nodemailer/
// templates https://codedmails.com/reset-emails-preview
// mock app at /Users/stevecalla/du_coding/utilities/node-mailer/index.js 
