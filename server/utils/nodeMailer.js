// https://www.youtube.com/watch?v=QDIOBsMBEI0
//https://openjavascript.info/2023/01/10/nodemailer-tutorial-send-emails-in-node-js/#Basic%20example
//https://mailtrap.io/blog/sending-emails-with-nodemailer/
// templates https://codedmails.com/reset-emails-preview
// mock app at /Users/stevecalla/du_coding/utilities/node-mailer/index.js 

const nodemailer = require("nodemailer");
require("dotenv").config();
// Import NodeMailer (after npm install)

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

const mailOptions = {
  from: {
    name: "Calla",
    address: process.env.SENDER_EMAIL,
  },
  to: ["scalla2@instructors.2u.com"],
  subject: "Testing, testing, 123",
  text: "Hello World",
  html: `<h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  // cc: [],
  // bcc: [],
  amp: `<!doctype html>
  <html ⚡4email>
    <head>
      <meta charset="utf-8">
      <style amp4email-boilerplate>body{visibility:hidden}</style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    </head>
    <body>
      <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
      <p>GIF (requires "amp-anim" script in header):<br/>
        <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
    </body>
  </html>`,
  dsn: {
    id: "some random message specific id",
    return: "headers",
    notify: ["failure", "delay", "success"],
    recipient: process.env.SENDER_EMAIL,
  },
  debug: true, // show debug output
  logger: true // log information in console
};

// Define and send message inside transporter.sendEmail() and await info about send from
const sendMail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.messageId);
    console.log(info.envelope);
    console.log('successfully delivered', info.accepted);
    console.log('rejected delivery', info.rejected);
    console.log('pending delivery', info.pending);
    console.log('response', info.response);
    console.log("Successful send"); // Random ID generated after successful send (optional)
  } catch (error) {
    console.log("1)", error);
  }
};

sendMail(transporter, mailOptions).catch((error) => console.log("2)", error));
