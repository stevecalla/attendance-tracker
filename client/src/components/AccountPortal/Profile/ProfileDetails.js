import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../../utils/queries";
import { UPDATE_USER_FORM } from "../../../utils/mutations";

import { getUserId } from "../../../utils/getUserId";
import { validatePhoneOrBlank } from "../../../utils/phoneValidation";
import { validateEmail } from "../../../utils/emailValidation";

import MaskedInput from "react-text-mask";
import emailMask from "text-mask-addons/dist/emailMask";

import { Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css"; //FIX?
import "../../../styles/button-style.css"; //FIX?

function ProfileDetails() {
  //SECTION FORM FIELDS = SET STATE TO PREVENT CONTROLLED FIELD ERROR
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isInstalled, setIsInstalled] = useState("");

  //SECTION ENABLE/DISABLE FORM
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  //SECTION VALIDATION
  const [showValidationFirstName, setShowValidationFirstName] = useState(false);
  const [showValidationLastName, setShowValidationLastName] = useState(false);
  const [showValidationPhone, setShowValidationPhone] = useState(false);
  const [showValidationEmail, setShowValidationEmail] = useState(false);
  const [dontUpdateDb, setDontUpdateDb] = useState(false);

  //SECTION GET CURRENT LOGIN IN USER
  const userId = getUserId();

  //SECTION QUERY USER DB FOR USER
  const {
    // eslint-disable-next-line
    loading,
    // eslint-disable-next-line
    data: user,
    // eslint-disable-next-line
    error: userError,
    refetch,
  } = useQuery(QUERY_ME, {
    variables: {
      id: userId,
    },
    notifyOnNetworkStatusChange: true, //seems to be required for refecth to function properly
    onCompleted: (data) => {
      console.log("user", data);
      const { me: currentUser } = data; //destructure user object
      renderUser(currentUser); //set initial values & render user information
    },
  });

  //SECTION SET INITIAL CURRENT USER VALUES & POPULATE FORM WITH USER INFO
  const renderUser = (currentUser) => {
    console.log("currentUser", currentUser);
    setFirstName(currentUser?.firstName);
    setLastName(currentUser?.lastName);
    setPhone(currentUser?.phone);
    setEmail(currentUser?.email);
    setIsInstalled(currentUser?.zoomUser[0]?.is_installed);
  };

  //SECTION HANDLE INPUT = CAPTURE EDITS TO USER INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    if (name === "firstName") {
      setFirstName(value); //capture input on the form
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "email") {
      setEmail(value);
    }

    return name;
  };

  //SECTION UPDATE USER IN DATABASE BASED ON INPUT
  const [updateUser] = useMutation(UPDATE_USER_FORM);

  // SECTION HANDLE UPDATE USER ON CLICK
  const handleUserUpdate = async (event) => {
    event.preventDefault();

    //Don't update database if input is invalid
    const isNotValid = dontUpdateDb;
    // console.log('isNotValid', isNotValid);
    if (isNotValid) {
      return;
    }

    try {
      await updateUser({
        variables: {
          id: userId,
          firstName,
          lastName,
          phone,
          email,
        },
      });
    } catch (err) {
      console.log(err);
    }

    // REPLACE SUBMIT UPDATE BUTTON TEXT WITH UPDATING...
    // DISABLE SUBMIT UPDATE BUTTON WHILE UPDATING...
    // DISABLE FORM SO USER CAN'T MAKE CHANGES WHILE UPDATING...
    setIsUpdatingUser(true);
    setIsFormDisabled(true);
    setIsSubmitDisabled(true);

    // REPLACE UPDATING... BUTTON TEXT WITH SUBMIT UPDATE
    setTimeout(() => {
      setIsUpdatingUser(false);
    }, 2000);
  };

  // SECTION ENABLE ABILITY TO EDIT USER INFORMATION
  const handleEditButton = async (event) => {
    event.preventDefault();

    setIsFormDisabled(!isFormDisabled); //set form disabled = true

    !isFormDisabled && refetch(); //only execute refetch if isFormDisabled === false
  };

  //SECTION UTILITY VALIDATION
  //VALIDATION = IF FORM INPUT FIELDS ARE BLANK, PHONE FORMAT INVALID OR EMAIL FORMAT INVALIDE, RENDER "IS REQUIRED OR VALID FORMAT"
  useEffect(() => {
    if (!loading) {
      let formInput = {
        firstName,
        lastName,
        email,
      };
  
      const isInValidInput = {
        isInvalid: false,
        firstName: function() {setShowValidationFirstName(this.isInvalid)}, //true = show validation
        lastName: function() {setShowValidationLastName(this.isInvalid)}, //true = show validation
        email: function() {setShowValidationEmail(this.isInvalid)}, //true = show validation
        phone: (x) => "validation not required", //necessary to prevent error & clarify not required
      }
  
      //RENDER VALIDATION "IS REQUIRED" OR VALID PHONE FORMAT
      for (const key in formInput) {
        if (formInput[key].trim() === "") {
          isInValidInput.isInvalid = true;
          isInValidInput[key]();
        } else {
          isInValidInput.isInvalid = false;
          isInValidInput[key]();
        }
        console.log(emailMask);
      };
  
      //DISABLE SUBMIT BUTTON && DON'T UPDATE DB
      for (const key in formInput) {
        if (formInput[key].trim() === "") { //if empty
          setIsSubmitDisabled(true);
          setDontUpdateDb(true);
          return;
        } else if (!validateEmail(email) || !validatePhoneOrBlank(phone)) {
          !validateEmail(email) && setShowValidationEmail(true);
          !validatePhoneOrBlank(phone) && setShowValidationPhone(true);
          setIsSubmitDisabled(true);
          setDontUpdateDb(true);
          return;
        } 
  
        console.log('isformdisabled', isFormDisabled);
        
        validatePhoneOrBlank(phone) && setShowValidationPhone(false);
        validateEmail(email) && setShowValidationPhone(false);
        isFormDisabled === false && setIsSubmitDisabled(false);
        setDontUpdateDb(false);
      }
    }
  
  }, [loading, firstName, lastName, email, phone, isFormDisabled])

  return (
    <Container>
      <Form
        data-editemployeeid={userId + Date.now()}
        className="py-3 overflow-auto custom-about"
      >
        {/* SECTION FIRST NAME */}
        <Form.Group className="mb-3 form-length">
          <div className="mb-0 form-label">
            <Form.Label style={{ fontWeight: "bolder" }}>First Name</Form.Label>
            <Form.Label
              className={`validation-color ${
                showValidationFirstName ? "show" : "hide"
              }`}
            >
              * field is required
            </Form.Label>
          </div>
          <Form.Control
            className="custom-border"
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            // value={selectFirstName ? prevEmployeeData?.firstName : firstName}
            value={firstName}
            onChange={handleInputChange}
            disabled={isFormDisabled}
          />
        </Form.Group>

        {/* SECTION LAST NAME */}
        <Form.Group className="mb-3 form-length">
          <div className="mb-0 form-label">
            <Form.Label style={{ fontWeight: "bolder" }}>Last Name</Form.Label>
            <Form.Label
              className={`validation-color ${
                showValidationLastName ? "show" : "hide"
              }`}
            >
              * field is required
            </Form.Label>
          </div>
          <Form.Control
            className="custom-border"
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            // value={selectLastName ? prevEmployeeData?.lastName : lastName}
            value={lastName}
            onChange={handleInputChange}
            disabled={isFormDisabled}
          />
        </Form.Group>

        {/* SECTION PHONE NUMBER */}
        <Form.Group className="mb-3 form-length">
          <div className="mb-0 form-label">
            <Form.Label style={{ fontWeight: "bolder" }}>
              Phone Number
            </Form.Label>
            <Form.Label
              className={`validation-color ${
                showValidationPhone ? "show" : "hide"
              }`}
            >
              * valid phone is required
            </Form.Label>
          </div>

          <MaskedInput
            mask={[
              /[1-9]/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            className="form-control custom-border"
            placeholder="Enter a phone number"
            guide={true}
            // value={phone}
            // value={selectPhone ? prevEmployeeData?.phone : phone}
            value={phone}
            name="phone"
            onChange={handleInputChange}
            disabled={isFormDisabled}
            required
          />
        </Form.Group>

        {/* SECTION EMAIL */}
        <Form.Group className="mb-3 form-length">
          <div className="mb-0 form-label">
            <Form.Label htmlFor="email" style={{ fontWeight: "bolder" }}>
              Email
            </Form.Label>
            <Form.Label
              className={`validation-color ${
                showValidationEmail ? "show" : "hide"
              }`}
            >
              * valid email is required
            </Form.Label>
          </div>
          <MaskedInput
            className="form-control custom-border"
            mask={emailMask}
            placeholder="Enter email address"
            guide={true}
            name="email"
            // value={selectEmail ? prevEmployeeData?.email : email.toLowerCase()}
            value={email.toLowerCase()}
            onChange={handleInputChange}
            disabled={isFormDisabled}
            required
          />
        </Form.Group>

        {/* SECTION ZOOM IS INSTALLED TRUE OR FALSE */}
        <Form.Group className="mb-3 form-length">
          <div className="mb-0 form-label">
            <Form.Label
              htmlFor="isZoomInstalled"
              style={{ fontWeight: "bolder" }}
            >
              Zoom Account
            </Form.Label>
          </div>
          <Form.Control
            className="custom-border"
            type="text"
            placeholder="True or False"
            name="isZoomInstalled"
            value={isInstalled ? "True" : "False"}
            onChange={handleInputChange}
            disabled={true}
          ></Form.Control>
        </Form.Group>

        {/* SECTION FORM BUTTONS */}
        <section className="d-flex justify-content-center">
          <Button
            title="Enable input fields to change user information"
            className="submit-button-style"
            style={{ width: "145px", marginRight: "2px" }}
            variant="primary"
            disabled={isUpdatingUser}
            onClick={handleEditButton}
          >
            {isFormDisabled ? "Edit Profile" : "Reset Form"}
          </Button>

          <Button
            title="Update user information"
            className="submit-button-style"
            style={{ width: "145px" }}
            variant="primary"
            disabled={isSubmitDisabled}
            onClick={!isUpdatingUser ? handleUserUpdate : null}
          >
            {isUpdatingUser ? "Updating…" : "Submit Update"}
          </Button>
        </section>
      </Form>
    </Container>
  );
}

export default ProfileDetails;
