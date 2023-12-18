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


{/* <p>Test Email Tracker Anchor Tag</p>
  
<img src="https://koala-huge-goldfish.ngrok-free.app/optout-image" alt="" style="border: 1px solid black; width: 300px; height 20px">

<a href="https://koala-huge-goldfish.ngrok-free.app/api/email-tracker/2/opened"><img src="https://koala-huge-goldfish.ngrok-free.app/api/email-tracker/2/opened" style="background-color: #1a73e8; padding: 10px 20px; color: white; text-decoration:none; font-size:14px; font-family:Roboto,sans-serif;border-radius:5px"></a> */}


  // /Users/stevecalla/zoom/attendance-tracker/client/src/assets/images/optout-blk-nologo.png
  // attendance-tracker/client/src/assets/images/optout-blk-nologo.png


// https://cataas.com/cat
// https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500

// <p>Test Email Tracker</p><img src="https://koala-huge-goldfish.ngrok-free.app/api/email-tracker/2/opened" style="background-color: #1a73e8; padding: 10px 20px; color: white; text-decoration:none; font-size:14px; font-family:Roboto,sans-serif;border-radius:5px"></img>
//<img src = "https://koala-huge-goldfish.ngrok-free.app/api/email-tracker/2/opened" style="display:none">

// https://mailstat.us/tr/opt-out?guid=jtvlnhxlq9fcrn0&attempts=3
// <img src="https://mailstat.us/tr/optout-blk-nologo.png?guid=jtvlnhxlq9fcrn0"></img>

// <a href="https://mailstat.us/tr/opt-out?guid=jtvlnhxlq9fcrn0" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mailstat.us/tr/opt-out?guid%3Djtvlnhxlq9fcrn0&amp;source=gmail&amp;ust=1702900936143000&amp;usg=AOvVaw1Wdb75Yx8vdphFNhhzxCu4"><img src="https://ci3.googleusercontent.com/meips/ADKq_NYjlzBd4_kuijeLmTKAc3LGqJoB3zR-nFFsy3MssrRecxBhcaj_AbTAt6zJpONv9HzgEXR6j6pDvG2mZCFPxQTsMp01Q-updsNKYnvpEs4PiDkwvrey2Q=s0-d-e1-ft#https://mailstat.us/tr/optout-blk-nologo.png?guid=jtvlnhxlq9fcrn0" class="CToWUd" data-bit="iit"></a>

// <a href="https://mailstat.us/tr/opt-out?guid=hs328qgdlq9g813x" class="b4g-open-track b4g-track-wont"><img src="https://mailstat.us/tr/optout-blk-nologo.png?guid=hs328qgdlq9g813x"></a>

// https://ci3.googleusercontent.com/meips/ADKq_NYjlzBd4_kuijeLmTKAc3LGqJoB3zR-nFFsy3MssrRecxBhcaj_AbTAt6zJpONv9HzgEXR6j6pDvG2mZCFPxQTsMp01Q-updsNKYnvpEs4PiDkwvrey2Q=s0-d-e1-ft#https://mailstat.us/tr/optout-blk-nologo.png?guid=jtvlnhxlq9fcrn
