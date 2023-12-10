import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BYEMAIL } from "../../utils/queries";
import { UPDATE_PASSWORD } from "../../utils/mutations";
import { FORGOT_PASSWORD } from "../../utils/mutations";

import MaskedInput from "react-text-mask";
import emailMask from "text-mask-addons/dist/emailMask";
import useEmailSend from "../../components/EmailSend";

import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/button-home.css";

function ForgotPassword() {
  const [tempPassword] = useState("20000");
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({});
  const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);
  const [payLoadToken, setPayLoadToken] = useState({});
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [tinyURI, setTinyURI] = useState(""); // set state for tiny_url
  const [toEmail, setToEmail] = useState("");
  const [emailContent, setEmailContent] = useState({});

  const [skipUseQuery, setSkipUseQuery] = useState(true);

  // SECTION GET USER Query
  const {
    refetch,
  } = useQuery(QUERY_USER_BYEMAIL, {
    variables: { email: userFormData?.email },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    // skip: !Auth.loggedIn(),
    skip: skipUseQuery,
    onCompleted: (data) => {
      console.log(data)
      setUser(data?.userByEmail);
    },
  });

  const [updatePassword, { error: passwordError }] =
    useMutation(UPDATE_PASSWORD);

  const setPassword = async () => {
    // console.log('setPassword');
    try {
      const { data } = await updatePassword({
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

    setSkipUseQuery(false); //allows use query to run
    await refetch(); //get user information
    setSkipUseQuery(true);

    // set destination email address
    setToEmail(userFormData.email);

    //create token payload
    let payload = { email: userFormData.email, password: tempPassword };

    // create new token using the forgotPassword mutation
    try {
      const { data } = await forgotPassword({
        variables: { ...payload },
      });
      
      setPayLoadToken({ token: data.forgotPassword.token });

      if (user.email) {
        // console.log("success", user);
        setShowSuccess(true);
        setShowAlert(false);
      } else {
        // console.log("error", user);
        setShowAlert(true);
        setShowSuccess(false);
      }
    } catch (e) {
      // console.log("error2", user);
      // setUserFormData({ ...userFormData, email: '' }); //resets form
      setShowAlert(true);
      setShowSuccess(false);
    }
  };

  // after payLoadToken state is updated, setEmailContent, will trigger useEmailSend
  useEffect(() => {
    setEmailContent({
      source: "resetPassword",
      token: payLoadToken,
      toEmail: toEmail,
      firstName: user.firstName,
    });
    // eslint-disable-next-line
  }, [payLoadToken]);

  // eslint-disable-next-line
  // const submitEmailContent = useEmailSend(emailContent);

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

        <Alert
          dismissible
          onClose={() => setShowSuccess(false)}
          variant="success"
          show={showSuccess}
          className="mb-4 py-1 pl-3 bg-success text-white"
          style={{ textAlign: "left" }}
        >
          <p className="" style={{ marginTop: "5px" }}>
            Email has been sent to <br></br>
            {userFormData.email}.
          </p>
        </Alert>

        {/* show alert if server response is bad */}
        {error && (
          <div className="d-flex justify-content-center">
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
              className="mb-4 py-1 pl-1 bg-danger text-white"
              style={{ textAlign: "left" }}
            >
              <p className="" style={{ marginTop: "5px" }}>
                {/* Email failed to send.<br></br>Enter a valid email address. */}
                Email failed to send.<br></br>Please enter a valid email.
              </p>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
