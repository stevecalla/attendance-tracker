import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SEND_EMAIL } from "../../utils/queries";
import { getTinyURL, createURL } from "../../utils/tinyURL";

import {
  FROM_EMAIL,
  TO_EMAIL,
  RESET_SUBJECT,
  RESET_TEXT_TEMPLATE,
  RESET_HTML_TEMPLATE,
} from "./templates/resetTemplate";

import {
  CONTACT_US_SUBJECT,
  contactus_text_template,
  contactus_html_template,
} from "./templates/contactUsTemplate";
import "../../styles/Contact.css";

// function useEmailSend(props) {
function useEmailSend(props) {
  //props = source, token, toEmail, firstName, triggerEmail
  // console.log(props);
  const [tinyURI, setTinyURI] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [textContent, setTextContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [handleSendEmail, SetHandleSendEmail] = useState(false);
  const [reset, setReset] = useState(false);

  // SECTION FUNCTION TO GET TINY URL
  const tiny_url = async () => {
    let shortURI = await getTinyURL(props.token);
    setTinyURI(shortURI.data.tiny_url);
  };

  // SECTION FUNCTION TO EXECUTE SEND EMAIL
  const [
    sendEmail,
    // eslint-disable-next-line
    { loading: emailLoad, error: emailError, data: emailData },
  ] = useLazyQuery(SEND_EMAIL, {
    variables: {
      toEmail: toEmail,
      fromEmail: fromEmail,
      subject: subject,
      textContent: textContent,
      htmlContent: htmlContent,
    },
    fetchPolicy: "cache-and-network", // ensure the query executes after each click
  });

  // const sendPasswordResetEmail = () => {
  //     fetch("http://localhost:3001/api/email/passwordreset", {
  //       method: "POST",
  //       body: JSON.stringify({ toEmail, fromEmail, subject, textContent, htmlContent }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  // }

  // SECTION GET TINY URL //executes on load
  useEffect(() => {
    // console.log('1=', handleSendEmail);
    if (props?.token?.token) {
      tiny_url();
    }
    // eslint-disable-next-line
  }, [props]);

  // SECTION SET EMAIL CONTENT //executes 2nd after tiny url fetch
  useEffect(() => {
    // console.log('2=', handleSendEmail);
    if (props?.token?.token) {
      let getBackupUrl = createURL(props.token);
      // console.log("x=", getBackupUrl);
      console.log(tinyURI);

      setFromEmail(FROM_EMAIL);

      setToEmail(
        props?.source === "resetPassword"
          ? TO_EMAIL(props)
          : "callasteven@gmail.com"
      ); //used for contact form // change to env var

      setSubject(
        props?.source === "resetPassword"
          ? RESET_SUBJECT()
          : CONTACT_US_SUBJECT(props)
      );

      setTextContent(
        props?.source === "resetPassword"
          ? RESET_TEXT_TEMPLATE(props, tinyURI, getBackupUrl)
          : contactus_text_template(props, tinyURI, getBackupUrl)
      );

      setHtmlContent(
        props?.source === "resetPassword"
          ? RESET_HTML_TEMPLATE(props, tinyURI, getBackupUrl)
          : contactus_html_template(props, tinyURI, getBackupUrl)
      );

      SetHandleSendEmail(true);
    }
    //eslint-disable-next-line
  }, [tinyURI]);

  //SECTION SEND EMAIL //executes 3rd after email content set
  useEffect(() => {
    // console.log('3=', handleSendEmail);
    if (handleSendEmail) {
      // send email
      console.log("send email");
      // sendEmail();
      // sendPasswordResetEmail();
    }
    setReset(!reset);
    // eslint-disable-next-line
  }, [handleSendEmail]);

  //SECTION RESET HANDLESENDEMAIL
  useEffect(() => {
    SetHandleSendEmail(false);
  }, [reset])
  
  // console.log(emailData);
  return emailData;
}

export default useEmailSend;
