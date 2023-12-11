export const FROM_EMAIL = "callasteven@gmail.com";

export const TO_EMAIL = (props) => {
  // return props.toEmail;
  return "scalla2@instructors.2u.com";
};

export const RESET_SUBJECT = () => {
  let template = `The Attendance Tracker - Password Reset`;

  return template;
};

// TEXT VERSION AS A BACKUP IF HTML ISN'T ACCEPTED
// export const reset_text_template = (tokenURL, firstName) => {
export const RESET_TEXT_TEMPLATE = (props, tinyURI = "blank", { uri }) => {

  const template = `Hello ${props.firstName},
  
  Click on the link below to create a new password:
  
  "${tinyURI ? tinyURI : uri}"
  
  This link will expire 15 minutes from the receipt of this email.
  
  Thank you,
  The Attendance Tracker`;

  return template;
};

// DEFAULT HTML TEMPLATE WILL BE USED BY MOST BUT NOT ALL PLATFORMS
// export const reset_html_template = (tokenURL, firstName) => {
export const RESET_HTML_TEMPLATE = (props, tinyURI, { uri }) => {

  const template = `<p>Hello ${props.firstName},</p>
  
  <p>Click on the link below to create a new password:</p>

  <p>
    <a style="background-color: #1a73e8; padding: 10px 20px; color: white; text-decoration:none; font-size:14px; font-family:Roboto,sans-serif;border-radius:5px" href="${
      tinyURI ? tinyURI : uri
    }"
    >
      Click Here
    </a>
  </p>
  
  <p>This link will expire 15 minutes from the receipt of this email.</p>

  <p>Thank you,</p>
  <p>The Attendance Tracker</p>`;

  return template;
};
