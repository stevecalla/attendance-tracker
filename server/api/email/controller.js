const { createProxyMiddleware } = require('http-proxy-middleware')
// const zoomApi = require('../../util/zoom-api')
// const zoomHelpers = require('../../util/zoom-helpers')
// const store = require('../../util/store')
const { transporter, sendMail } = require('../../utils/nodeMailer');

module.exports = {
  async passwordreset(req, res, next) {
    // return res.status(200).json(req.body);
    console.log("Request made to route = /api/email/passwordreset");
    console.log(req.body);
    let { source, token, toEmail, fromEmail, firstName, subject, textContent, htmlContent} = req.body;
    
    try {
      if (!req.body) {
        res
        .status(400)
        .json({ message: 'No email content' });
        return;
      }

      let mailOptions = {
        from: {
          name: "The Attendance Tracker",
          address: fromEmail,
        },
        to: [toEmail],
        subject: subject,
        text: textContent,
        html: htmlContent,
      };
      
      // sendMail(transporter, mailOptions);
      res.status(200).json(req.body);
      
    } catch (err) {
      res.status(400).json(err);
    }
  },
}
