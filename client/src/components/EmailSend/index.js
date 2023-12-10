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
  //props = source, token, toEmail, firstName
  const [tinyURI, setTinyURI] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [textContent, setTextContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  // useEffect(() => {
  //   // const tiny_url = async () => {
  //   if (props?.token?.token) {
  //     getTinyURL(props.token).then((data) => {
  //       setTinyURI(data.data.tiny_url);
  //     });
  //   }
  //   // };
  // }, [props])

  const tiny_url = async () => {
    getTinyURL(props.token).then((data) => {
      setTinyURI(data.data.tiny_url);
    });
  };
  

  // SECTION SET EMAIL CONTENT
  useEffect(() => {
    if (props?.token?.token) {
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
          ? RESET_TEXT_TEMPLATE(props, tinyURI, createURL(props.token))
          : contactus_text_template(props, tinyURI, createURL(props.token))
      );

      setHtmlContent(
        props?.source === "resetPassword"
          ? RESET_HTML_TEMPLATE(props, tinyURI, createURL(props.token))
          : contactus_html_template(props, tinyURI, createURL(props.token))
      );
    }
    // eslint-disable-next-line
  }, [props]);

  // SECTION SEND EMAIL VIA LAZY QUERY
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

  // SECTION USE EFFECT TO RUN SENDEMAIL IF TOKEN IS POPULATED (since this hook will run on every render for this component)
  useEffect(() => {
    if (props?.token?.token) {
      // get tiny url
      tiny_url();

      // send email
      sendEmail();

      if (emailError) {
        console.log(`Error! ${emailError}`);
        alert`Error! ${emailError}`;
      }
    }
    // eslint-disable-next-line
  }, [props]);

  return emailData;
}

export default useEmailSend;
