/* globals zoomSdk */
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory, useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //v6
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import { apis } from "./apis";
// import axios from "axios";
import Auth from "./utils/auth";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import HomeCopy from "./pages/HomeCopy";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AccountPortal from "./pages/AccountPortal";
// import SignupForm from "./components/Login/SignupForm";
// import Message from "./components/Login/Message";
import { ZoomMainPortal } from "./pages/ZoomMainPortal";
import WrongPage from "./pages/WrongPage";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import TermsPrivacy from "./components/Terms/TermsPrivacy";
// import OptOutImage from "./components/ResetPassword/OptOutImage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactUs from "./components/Contact/Contact";

let once = 0; // to prevent increasing number of event listeners being added

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // const history = useHistory();
  const navigate = useNavigate();

  const location = useLocation();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [runningContext, setRunningContext] = useState(null);
  const [connected, setConnected] = useState(false);
  const [counter, setCounter] = useState(0);
  const [preMeeting, setPreMeeting] = useState(true); // start with pre-meeting code
  const [userContextStatus, setUserContextStatus] = useState("");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, [])

  useEffect(() => {
    async function configureSdk() {
      // to account for the 2 hour timeout for config
      const configTimer = setTimeout(() => {
        setCounter(counter + 1);
      }, 120 * 60 * 1000);

      try {
        // Configure the JS SDK, required to call JS APIs in the Zoom App
        // These items must be selected in the Features -> Zoom App SDK -> Add APIs tool in Marketplace
        const configResponse = await zoomSdk.config({
          capabilities: [
            // apis demoed in the buttons
            ...apis.map((api) => api.name), // IMPORTANT

            // demo events
            "onSendAppInvitation",
            "onShareApp",
            "onActiveSpeakerChange",
            "onMeeting",

            // connect api and event
            "connect",
            "onConnect",
            "postMessage",
            "onMessage",

            // in-client api and event
            "authorize",
            "onAuthorized",
            "promptAuthorize",
            "getUserContext",
            "onMyUserContextChange",
            "sendAppInvitationToAllParticipants",
            "sendAppInvitation",
          ],
          version: "0.16.0",
        });
        console.log("App configured", configResponse);
        // The config method returns the running context of the Zoom App
        setRunningContext(configResponse.runningContext);
        setUserContextStatus(configResponse.auth.status);
        zoomSdk.onSendAppInvitation((data) => {
          console.log(data);
        });
        zoomSdk.onShareApp((data) => {
          console.log(data);
        });
      } catch (error) {
        console.log(error);
        setError("There was an error configuring the JS SDK");
      }
      return () => {
        clearTimeout(configTimer);
      };
    }
    configureSdk();
  }, [counter]);

  // PRE-MEETING
  let on_message_handler_client = useCallback(
    (message) => {
      let content = message.payload.payload;
      if (content === "connected" && preMeeting === true) {
        console.log("Meeting instance exists.");
        zoomSdk.removeEventListener("onMessage", on_message_handler_client);
        console.log("Letting meeting instance know client's current state.");
        sendMessage(window.location.hash, "client");
        setPreMeeting(false); // client instance is finished with pre-meeting
      }
    },
    [preMeeting]
  );

  // PRE-MEETING
  useEffect(() => {
    if (runningContext === "inMainClient" && preMeeting === true) {
      zoomSdk.addEventListener("onMessage", on_message_handler_client);
    }
  }, [on_message_handler_client, preMeeting, runningContext]);

  async function sendMessage(msg, sender) {
    console.log(
      "Message sent from " + sender + " with data: " + JSON.stringify(msg)
    );
    console.log("Calling postmessage...", msg);
    await zoomSdk.postMessage({
      payload: msg,
    });
  }

  const receiveMessage = useCallback(
    (receiver, reason = "") => {
      let on_message_handler = (message) => {
        let content = message.payload.payload;
        console.log(
          "Message received " + receiver + " " + reason + ": " + content
        );
        // history.push({ pathname: content });
        navigate({ pathname: content });
      };
      if (once === 0) {
        zoomSdk.addEventListener("onMessage", on_message_handler);
        once = 1;
      }
    },
    // [history]
    [navigate]
    // []
  );

  useEffect(() => {
    async function connectInstances() {
      // only can call connect when in-meeting
      if (runningContext === "inMeeting") {
        zoomSdk.addEventListener("onConnect", (event) => {
          console.log("Connected");
          setConnected(true);

          // PRE-MEETING
          // first message to send after connecting instances is for the meeting
          // instance to catch up with the client instance
          if (preMeeting === true) {
            console.log("Letting client know meeting instance exists.");
            sendMessage("connected", "meeting");
            console.log("Adding message listener for client's current state.");
            let on_message_handler_mtg = (message) => {
              console.log(
                "Message from client received. Meeting instance updating its state:",
                message.payload.payload
              );
              window.location.replace(message.payload.payload);
              zoomSdk.removeEventListener("onMessage", on_message_handler_mtg);
              setPreMeeting(false); // meeting instance is finished with pre-meeting
            };
            zoomSdk.addEventListener("onMessage", on_message_handler_mtg);
          }
        });

        await zoomSdk.connect();
        console.log("Connecting...");
      }
    }

    if (connected === false) {
      console.log(runningContext, location.pathname);
      connectInstances();
    }
  }, [connected, location.pathname, preMeeting, runningContext]);

  // POST-MEETING
  useEffect(() => {
    async function communicateTabChange() {
      // only proceed with post-meeting after pre-meeting is done
      // just one-way communication from in-meeting to client
      if (runningContext === "inMeeting" && connected && preMeeting === false) {
        sendMessage(location.pathname, runningContext);
      } else if (runningContext === "inMainClient" && preMeeting === false) {
        receiveMessage(runningContext, "for tab change");
      }
    }
    communicateTabChange();
  }, [connected, location, preMeeting, receiveMessage, runningContext]);

  // if (error) {
  //   console.log(error);
  //   return (
  //     <div className
  //       <h1>{error.message}</h1>
  //     </div>
  //   );
  // }

  // Function to make the API request and handle the response
  // const fetchData = async () => {
  //   console.log("--------------fetch data--------------");
  //   try {
  //     // const response = await axios.get('http://localhost:3001/api/zoomapp/proxy');
  //     const response = await axios.get("http://localhost:3001/test");

  //     // Access custom headers from the response
  //     // const customHeader = response.headers['custom-header'];
  //     // const customHeader = response;
  //     // You can access more headers here if needed

  //     // Use the custom header in your component state or perform actions
  //     // console.log(`Custom Header Value: ${customHeader}`;
  //     console.log(`Custom Header Value: ${JSON.stringify(response)}`);
  //     // Update state or perform actions based on the header value
  //   } catch (error) {
  //     // Handle errors
  //   }
  // };

  // const fetchData2 = async() => {
  //     fetch('/api/data', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Example custom header
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         setData(data);
  //       })
  //       .catch(error => {
  //         console.error('Error:', error);
  //       });
  // }

  // Use the useEffect hook to execute the setup code when the component mounts
  useEffect(() => {
    // Call the fetchData function when the component mounts
    // fetchData();
  }, []);

  // fix //======== apollo client start
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/graphql"
        : "/graphql",
  });

  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // fix// ======== apollo client end

  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center" style={{ width: "300px", height: "200px", color: "red" }}>
  //       <div>...isLoading</div>
  //     </div>
  //   );
  // } else {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <Router> */}
        {/* <Switch> */}

        <Navbar />
        <Routes>
          <Route path="/api/zoomapp/proxy" element={<ZoomMainPortal />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-copy" element={<HomeCopy />} />
          <Route path="/terms-privacy" element={<TermsPrivacy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/optout-image" element={<OptOutImage />} /> */}
          <Route
            exact
            path="/login"
            element={
              <Login
                renderPanel={"login"}
                messageButtonIsActive={false}
                loginButtonIsActive={true}
                signupButtonIsActive={false}
              />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <Login
                renderPanel={"signup"}
                messageButtonIsActive={false}
                loginButtonIsActive={false}
                signupButtonIsActive={true}
              />
            }
          />
          <Route
            exact
            path="/messages"
            element={
              <Login
                renderPanel={"messages"}
                messageButtonIsActive={true}
                loginButtonIsActive={false}
                signupButtonIsActive={false}
              />
            }
          />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/resetpassword/:token"
            element={<ResetPassword />}
          />
          {/* {Auth.isAdmin() && !Auth.isLocked() && ( */}
          <Route
            exact
            path="/jobs-panel"
            element={
              <AccountPortal
                renderPanel={"workorder"}
                profileButtonIsActive={true}
                employeeListButtonIsActive={false}
                appButtonIsActive={false}
              />
            }
          />
          {/* )} */}
          {/* {Auth.isAdmin() && !Auth.isLocked() && ( */}
          <Route
            exact
            path="/profile-panel"
            element={
              <AccountPortal
                renderPanel={"profile"}
                profileButtonIsActive={true}
                employeeListButtonIsActive={false}
                appButtonIsActive={false}
              />
            }
          />
          {/* )} */}
          {/* {Auth.isAdmin() && !Auth.isLocked() && ( */}
          <Route
            exact
            path="/zoom-panel"
            element={
              <AccountPortal
                renderPanel={"zoom"}
                profileButtonIsActive={false}
                employeeListButtonIsActive={true}
                appButtonIsActive={false}
              />
            }
          />
          {/* )} */}
          {/* {Auth.isAdmin() && !Auth.isLocked() && ( */}
          <Route
            exact
            path="/app-panel"
            element={
              <AccountPortal
                renderPanel={"app"}
                profileButtonIsActive={false}
                employeeListButtonIsActive={false}
                appButtonIsActive={true}
              />
            }
          />
          {/* )} */}
          {/* {Auth.isAdmin() && !Auth.isLocked() && ( */}
          <Route
            exact
            path="/employees-panel"
            element={
              <AccountPortal
                renderPanel={"employees"}
                profileButtonIsActive={false}
                employeeListButtonIsActive={true}
                appButtonIsActive={false}
              />
            }
          />
          {/* )} */}
          {/* {Auth.isAdmin() && !Auth.isLocked() && ( */}
          <Route
            exact
            path="/client-panel"
            element={
              <AccountPortal
                renderPanel={"clientlist"}
                profileButtonIsActive={false}
                employeeListButtonIsActive={false}
                appButtonIsActive={true}
              />
            }
          />
          {/* )} */}
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}
// }

export default App;
