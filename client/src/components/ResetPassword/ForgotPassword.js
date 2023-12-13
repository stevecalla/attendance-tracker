import React, { useEffect, useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BYEMAIL } from "../../utils/queries";
import { UPDATE_PASSWORD } from "../../utils/mutations";
import { FORGOT_PASSWORD } from "../../utils/mutations";
import { ADD_EMAIL_SEND } from "../../utils/mutations";
// import { emailNodeMailer } from "../../utils/emailNodeMailer";

import {
  RESET_TEXT_TEMPLATE,
  RESET_HTML_TEMPLATE,
  RESET_SUBJECT,
  FROM_EMAIL,
  TO_EMAIL,
} from "../../components/EmailSend/templates/resetTemplate";
import { getTinyURL, createURL } from "../../utils/tinyURL";

import MaskedInput from "react-text-mask";
import emailMask from "text-mask-addons/dist/emailMask";
// import useEmailSend from "../../components/EmailSend";

import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/button-home.css";

function ForgotPassword() {
  const [tempPassword] = useState("20000");
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({});
  const [saveEmail] = useMutation(ADD_EMAIL_SEND);
  const [toEmail, setToEmail] = useState(""); //fix uncomment below to set real email
  const [emailContent, setEmailContent] = useState({}); //fix uncomment below to send email
  const [payLoadToken, setPayLoadToken] = useState({});
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tinyURL, setTinyURL] = useState("");
  const [backUpUrl, setBackUpUrl] = useState({});
  const [skipUseQuery, setSkipUseQuery] = useState(true); // ensures useQuery only runs on button submit, not if characters are entered in the input element

  // SECTION GET USER Query
  const { refetch } = useQuery(QUERY_USER_BYEMAIL, {
    variables: { email: userFormData?.email },
    // if skip is true, this query will not be executed; in this instance, ensures useQuery only runs on button submit, not if characters are entered in the input element
    skip: skipUseQuery,
    onCompleted: (data) => {
      // console.log(data);
      setUser(data?.userByEmail);
    },
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const setPassword = async () => {
    // console.log('setPassword');
    try {
      await updatePassword({
        variables: {
          id: user?._id,
          password: tempPassword,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // set temp password when user state is updated (query retrieves user info)
  useEffect(() => {
    setPassword();
    // eslint-disable-next-line
  }, [user]);

  // for email mask input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // for form submit button
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // check if form has everything per react-bootstrap docs
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    setSkipUseQuery(false); //allows useQuery to run
    await refetch(); //get user information
    setSkipUseQuery(true);

    // set destination email address
    setToEmail(user?.email);

    //create token payload
    let payload = { email: userFormData.email, password: tempPassword };

    // create new token using the forgotPassword mutation
    try {
      const { data } = await forgotPassword({
        variables: { ...payload },
      });

      setPayLoadToken({ token: data.forgotPassword.token });
      setShowAlert(true);
      setShowSuccess(true);
      setUserFormData({ email: "", password: "" });
    } catch (e) {
      console.log("error2", user);
      setShowAlert(true);
      setShowSuccess(false);
      setUserFormData({ email: "", password: "" });
    }
  };

  useEffect(() => {
    const dataFetch = async () => {
      if (Object.entries(payLoadToken).length > 0) {
        // waiting for allthethings in parallel
        // if payLoadToken does exits then fetch TinyURL
        const results = (
          await Promise.allSettled([
            getTinyURL(payLoadToken),
            createURL(payLoadToken),
          ])
        ).map((data) => data);

        // call the promise all method
        const [tinyResponse, urlResponse] = await Promise.allSettled(results);
        let { tiny_url } = tinyResponse.value.value.data;
        let backUpUrl = urlResponse.value.value;
        console.log(tiny_url, backUpUrl);

        // when the data is ready, save it to state
        setTinyURL(tiny_url);
        setBackUpUrl(createURL(backUpUrl));
      }
    };

    dataFetch();
  }, [payLoadToken]);

  // after payLoadToken state is updated, setEmailContent, will trigger useEmailSend

  useEffect(() => {
    if (tinyURL) {
      let firstName = { firstName: user?.firstName };

      setEmailContent({
        // toEmail: user?.email,
        toEmail: TO_EMAIL(),
        fromEmail: FROM_EMAIL,
        subject: RESET_SUBJECT(),
        firstName: user.firstName,
        source: "resetPassword",
        token: payLoadToken.token,
        textContent: RESET_TEXT_TEMPLATE(firstName, tinyURL, backUpUrl),
        htmlContent: RESET_HTML_TEMPLATE(firstName, tinyURL, backUpUrl),
        user: user?._id,
      });

      saveEmailToDB();
    }

    // return () => {
    //   setEmailTrigger(true);
    // };
    // eslint-disable-next-line
  }, [tinyURL]);

  // eslint-disable-next-line
  // const submitEmailContent = useEmailSend(emailContent, []);

  // SEND EMAIL USING NODEMAILER VIA POST ROUTE TO SERVER
  // ADJUSTED TO THIS METHOD BECAUSE THE GRAPHQL VERSION SENT 2 EMAILS EACH TIME
  // useEffect(() => {
  //   if (emailTrigger && user?.email) {
  //     fetch("http://localhost:3001/api/email/passwordreset", {
  //       method: "POST",
  //       body: JSON.stringify(emailContent),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   }

  //   return () => {
  //     setEmailTrigger(false);
  //   };
  //   // eslint-disable-next-line
  // }, [emailTrigger]);

  const saveEmailToDB = async (firstName) => {
    try {
      // execute saveEmail mutation by passing in emailConent
      // await saveEmail({variables: emailContent}); //fix uncomment to execute email
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="d-flex flex-column align-items-center mt-3"
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          margin: "0px 10px",
          maxWidth: "600px",
        }}
      >
        <h2 className="mt-3">Forgot Password</h2>
        <p
          style={{
            margin: "0px 10px",
            padding: "0px 7px",
            textWrap: "pretty",
            textAlign: "center",
          }}
        >
          If an account exists, an email will be sent with instructions to reset
          the password.
        </p>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
          className="mx-2 mb-1"
          style={{ width: "80%" }}
        >
          <Form.Group style={{ marginTop: "25px" }}>
            {/* <Form.Label htmlFor="email">Enter your email</Form.Label> */}

            <MaskedInput
              className="form-control"
              mask={emailMask}
              placeholder="Enter your email"
              guide={true}
              name="email"
              value={userFormData.email.toLowerCase()}
              onChange={handleInputChange}
              required
            />

            <Form.Control.Feedback type="invalid">
              Email is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            disabled={!userFormData.email}
            className="mb-3 mt-3 submit-button-style"
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </Form>

        {showAlert && (
          <Alert
            dismissible
            onClose={() => {
              setShowAlert(false);
            }}
            variant="success"
            // show={showAlert}
            className={
              showSuccess
                ? "mb-4 py-1 pl-3 bg-success text-white"
                : "mb-4 py-1 pl-1 bg-danger text-white"
            }
            style={{ textAlign: "left" }}
          >
            {showSuccess ? (
              <p className="" style={{ marginTop: "5px" }}>
                Email has been sent to <br></br>
                {user?.email}.
              </p>
            ) : (
              <p className="" style={{ marginTop: "5px" }}>
                Email failed to send.<br></br>Please enter a valid email.
              </p>
            )}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
