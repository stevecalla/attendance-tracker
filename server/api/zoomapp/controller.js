const { createProxyMiddleware } = require("http-proxy-middleware");
const zoomApi = require("../../util/zoom-api");
const zoomHelpers = require("../../util/zoom-helpers");
const store = require("../../util/store");
require("dotenv").config({ path: "../../../server/.env" });

module.exports = {
  // In-client OAuth 1/2
  async inClientAuthorize(req, res, next) {
    console.log(
      "IN-CLIENT AUTHORIZE HANDLER ==========================================================",
      "\n"
    );

    try {
      console.log("1. Generate code verifier, code challenge and state");
      const codeVerifier = zoomHelpers.generateCodeVerifier();
      const codeChallenge = codeVerifier;
      const zoomInClientState = zoomHelpers.generateState();

      console.log("2. Save code verifier and state to session");
      req.session.codeVerifier = codeVerifier;
      req.session.state = zoomInClientState;

      console.log("3. Return code challenge and state to frontend");
      return res.json({
        codeChallenge,
        state: zoomInClientState,
      });
    } catch (error) {
      return next(error);
    }
  },

  // In-Client OAuth 2/2
  async inClientOnAuthorized(req, res, next) {
    console.log(
      "IN-CLIENT ON AUTHORIZED TOKEN HANDLER ==========================================================",
      "\n"
    );

    const zoomAuthorizationCode = req.body.code;
    const href = req.body.href;
    const state = decodeURIComponent(req.body.state);
    const zoomInClientState = req.session.state;
    const codeVerifier = req.session.codeVerifier;

    console.log(
      "1. Verify code (from onAuthorized event in client) exists and state matches"
    );

    try {
      if (!zoomAuthorizationCode || state !== zoomInClientState) {
        throw new Error("State mismatch");
      }

      console.log("2. Getting Zoom access token and user", "\n");
      const tokenResponse = await zoomApi.getZoomAccessToken(
        zoomAuthorizationCode,
        href,
        codeVerifier
      );

      const zoomAccessToken = tokenResponse.data.access_token;
      console.log(
        "2a. Use code to get Zoom access token - response data: ",
        tokenResponse.data,
        "\n",
        tokenResponse.data.access_token,
        "\n"
      );

      console.log("2b. Get Zoom user from Zoom API with access token");
      const userResponse = await zoomApi.getZoomUser(zoomAccessToken);
      const zoomUserId = userResponse.data.id;
      req.session.user = zoomUserId;

      console.log(
        "2c. Use access token to get Zoom user - response data: ",
        userResponse.data,
        "\n"
      );

      console.log(
        "2d. Save the tokens in the store so we can look them up when the Zoom App is opened"
      );

      // 2c. Save the tokens in the store so we can look them up when the Zoom App is opened:
      // When the home url for the app is requested on app open in the Zoom client,
      // the user id (uid field) is in the decrypted x-zoom-app-context header of the GET request
      await store.upsertUser(
        zoomUserId,
        tokenResponse.data.access_token,
        tokenResponse.data.refresh_token,
        Date.now() + tokenResponse.data.expires_in * 1000
      );

      return res.json({ result: "Success" });
    } catch (error) {
      return next(error);
    }
  },

  // INSTALL HANDLER ==========================================================
  // Main entry point for the web-based app install and Zoom user authorize flow
  // Kicks off the OAuth 2.0 based exchange with zoom.us
  install(req, res) {
    console.log(
      "INSTALL HANDLER ==========================================================",
      "\n"
    );
    // 1. Generate and save a random state value for this browser session
    req.session.state = zoomHelpers.generateState();
    console.log(
      "1. Begin add app - generated state for zoom auth and saved:",
      req.session.state,
      "\n"
    );

    // 2. Create a redirect url, eg: https://zoom.us/oauth/authorize?client_id=XYZ&response_type=code&redirect_uri=https%3A%2F%2Fmydomain.com%2Fapi%2Fzoomapp%2Fauth&state=abc...
    // 2a. Set domain (with protocol prefix)
    const domain = process.env.ZOOM_HOST; // https://zoom.us

    // 2b. Set path
    const path = "oauth/authorize";

    // 2c. Create the request params
    const params = {
      redirect_uri: process.env.ZOOM_APP_REDIRECT_URI,
      response_type: "code",
      client_id: process.env.ZOOM_APP_CLIENT_ID,
      state: req.session.state, // save state on this cookie-based session, to verify on return
    };

    const authRequestParams = zoomHelpers.createRequestParamString(params);

    // 2d. Concatenate
    const redirectUrl = domain + "/" + path + "?" + authRequestParams;
    console.log("2. Redirect url to authenticate to Zoom:", redirectUrl, "\n");

    // 3. Redirect to url - the user can authenticate and authorize the app scopes securely on zoom.us
    console.log("3. Redirecting to redirect url", "\n", redirectUrl);
    res.redirect(redirectUrl);
  },

  // ZOOM OAUTH REDIRECT HANDLER ==============================================
  // This route is called after the user has authorized the Zoom App on the
  async auth(req, res, next) {
    console.log(
      "ZOOM OAUTH REDIRECT HANDLER  ==============================================",
      "\n"
    );
    console.log(
      "1. Handling redirect from zoom.us with code and state following authentication to Zoom",
      "\n"
    );
    // 1. Validate code and state
    const zoomAuthorizationCode = req.query.code;
    const zoomAuthorizationState = req.query.state;
    const zoomState = req.session.state;

    // For security purposes, delete the browser session
    req.session.destroy();

    // 1a. Check for auth code as parameter on response from zoom.us
    if (!zoomAuthorizationCode) {
      const error = new Error("No authorization code was provided");
      error.status = 400;
      return next(error);
    }

    console.log("1a. code param exists:", req?.query?.code, "\n");
    console.log("1a2. state param exists:", req?.query?.state, "\n");
    console.log("1a3. session state exists:", req?.session?.state, "\n");
    console.log("1a4. session state exists:", zoomAuthorizationState, "\n");
    console.log("1a5. session state exists:", zoomState, "\n");

    // 1b. Validate the state parameter is the same as the one we sent
    if (!zoomAuthorizationState || zoomAuthorizationState !== zoomState) {
      const error = new Error("Invalid state parameter");
      error.status = 400;
      return next(error);
    }

    console.log(
      "1b. state param is correct/matches ours:",
      req.query.state,
      "\n"
    );

    try {
      console.log("2. Getting Zoom access token and user", "\n");
      // 2. Get and remember Zoom access token and Zoom user
      // 2a. Exchange Zoom authorization code for tokens
      const tokenResponse = await zoomApi.getZoomAccessToken(
        zoomAuthorizationCode
      );
      const zoomAccessToken = tokenResponse.data.access_token;
      console.log(
        "2a. Use code to get Zoom access token - response data: ",
        tokenResponse.data,
        "\n"
      );
      // other fields on token response:
      // tokenResponse.data.refresh_token
      // tokenResponse.data.expires_in

      // 2b. Get Zoom user info from Zoom API
      const userResponse = await zoomApi.getZoomUser(zoomAccessToken);
      const zoomUserId = userResponse.data.id;

      console.log(
        "2b. Use access token to get Zoom user - response data: ",
        userResponse.data,
        "\n"
      );

      //fix start
      // create the zoomUser record in the database
      const { findOneAndUpsertNewZoomUserMutation } = require("../zoomUser/");
      let createUserZoomAccount = await findOneAndUpsertNewZoomUserMutation(
        userResponse.data
      );
      console.log(
        "2b-1. Use install response data to create zoomUser account: ",
        createUserZoomAccount,
        "\n"
      );
      //fix end

      console.log(
        "2c. Save the tokens in the store so we can look them up when the Zoom App is opened"
      );

      // 2c. Save the tokens in the store so we can look them up when the Zoom App is opened:
      // When the home url for the app is requested on app open in the Zoom client,
      // the user id (uid field) is in the decrypted x-zoom-app-context header of the GET request
      await store.upsertUser(
        zoomUserId,
        tokenResponse.data.access_token,
        tokenResponse.data.refresh_token,
        Date.now() + tokenResponse.data.expires_in * 1000
      );

      // 3. Get deeplink from Zoom API
      const deepLinkResponse = await zoomApi.getDeeplink(zoomAccessToken);
      const deeplink = deepLinkResponse.data.deeplink;

      console.log(
        "3. Generated deeplink from Zoom API using access token: ",
        deeplink,
        "\n"
      );
      console.log("4. Redirecting to Zoom client via deeplink . . .", "\n");

      // 4. Redirect to deep link to return user to the Zoom client
      res.redirect(deeplink);
    } catch (error) {
      return next(error);
    }
  },

  //FIX //ADD UNINSTALL
  // https://developers.zoom.us/docs/platform/auth/deauthorization/
  // secret token: qp1k_pY0SV6tOmxHngC4gg
  async uninstall(request, res, next) {
    console.log("===============");
    console.log("Request made to /uninstall route");
    console.log(request.body);
    console.log(request.headers);
    console.log(request.headers["x-zm-signature"]);

    const crypto = require("crypto");

    const message = `v0:${
      request.headers["x-zm-request-timestamp"]
    }:${JSON.stringify(request.body)}`;

    const hashForVerify = crypto
      .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET_TOKEN)
      .update(message)
      .digest("hex");

    const signature = `v0=${hashForVerify}`;

    if (request.headers["x-zm-signature"] === signature) {
      // Webhook request came from Zoom
      console.log("Webhook request came from Zoom");
      //SECTION //change is_installed to false using the zoom_id
      // create the zoomUser record in the database
      const { findOneAndUpdateIsInstalledFalse } = require("../zoomUser/");
      let modifyUninstallFalse = await findOneAndUpdateIsInstalledFalse(
        request.body
      );
      console.log(
        "2b-1. Uninstall response to change is_installed to false: ",
        modifyUninstallFalse,
        "\n"
      );

      //SECTION = didn't worry about saving deauthorized object
      //fix //add the deauthorized object to the zoomUser
      //fix //ensure deauthorized object is soft deleted isDeleted = false / true blank when install occurs
    } else {
      // Webhook request did not come from Zoom
      console.log("Webhook request did not come from Zoom");
    }

    res.json({ hello: "uninstall route" });
    next();
  },

  // ZOOM APP HOME URL HANDLER ==================================================
  // This route is called when the app opens
  async home(req, res, next) {
    console.log("------5-------");
    // console.log('-------6------');

    console.log("a)", req.body);
    console.log("b)", req.sessionID);
    // console.log(req.sessionStore);
    console.log("c)", req.session);
    console.log("d)", req.session.user);
    console.log("e)", req.session.meetingUUID);
    // console.log(req.headers);

    // console.log('-------7------');
    // console.log('-------8------');

    // console.log(req.session);

    // console.log('-------9------');
    // console.log('-------10------');

    console.log(
      "ZOOM APP HOME URL HANDLER ==================================================",
      "\n"
    );
    try {
      // 1. Decrypt the Zoom App context header
      if (!req.headers["x-zoom-app-context"]) {
        throw new Error("x-zoom-app-context header is required");
      }

      const decryptedAppContext = await zoomHelpers.decryptZoomAppContext(
        req.headers["x-zoom-app-context"],
        process.env.ZOOM_APP_CLIENT_SECRET
      );

      console.log("1. Decrypted Zoom App Context:", decryptedAppContext, "\n");
      console.log("2. Persisting user id and meetingUUIDa", "\n");

      // 2. Persist user id and meetingUUID
      console.log("-------------decryptedAppContext.uid----");
      console.log({ decryptedAppContext });
      // console.log(decryptedAppContext.uid);

      console.log("10)", req.session.user);
      console.log("11)", decryptedAppContext.uid);
      console.log("12)", req.session.meetingUUID);
      console.log("13)", decryptedAppContext?.mid);

      if (
        !req.session.meetingUUID ||
        (decryptedAppContext.mid &&
          req.session.meetingUUID !== decryptedAppContext?.mid)
      ) {
        console.log("reset meetingUUID?");
        req.session.user = decryptedAppContext.uid;
        req.session.meetingUUID = decryptedAppContext?.mid;
      }

      //fix //test if i can get user from store
      // console.log('==============');
      // const userTest = await store.getUser(req.session.user);
      // console.log(userTest);
      // // const userResponse = await zoomApi.getZoomUser(userTest.accessToken);
      // const userResponse = await zoomApi.getZoomUser(userTest.refreshToken);
      // console.log(userResponse);
      // console.log('==============');
      //fix //end

      //fix //start = save meeting information to mongodb
      //create findOne&Update/Upsert to add meeting record
      //add zoomUser id to the zoomMeeting record to populate zoomUser with meeting info... $addToSet... then query zoomUser to see meetings

      // Meeting user loaded app
      console.log("Meeting user loaded app");

      // Add mid to the "panel" object to ensure "panel" object is appended to meeting object in the zoomMeetings DB rather than creating two entries
      if (decryptedAppContext?.typ !== "meeting") {
        decryptedAppContext.mid = req?.session?.meetingUUID;
        console.log('if statement to update decrpytedAppContext mid')
        console.log(decryptedAppContext);
      }

      const { findOneAndUpsertMeetingRecordMutation } = require("../zoomUser/");
      let storeMeetingRecord = await findOneAndUpsertMeetingRecordMutation(
        decryptedAppContext
      );
      console.log(storeMeetingRecord);
      
      //DONE link user_id to zoommeeting (DONE)
      //DONE link meeting information to zoomUser (DONE)
      //DONE setup query for zoomuser to populate with zoom meeting info DONE
      //DONE setup query for zoomMeeting to populate with zoomUser
      //DONE setup query for user to populate zoom user then zoom meeting?
      //DONE count number of meetings app has been used in based on the length of the zoomMeeting meeting id array?

      //fix //end
    } catch (error) {
      return next(error);
    }

    // 3. Redirect to frontend
    console.log("3. Redirect to frontend", "\n");
    console.log(req.session);
    res.redirect("/api/zoomapp/proxy");
  },

  // FRONTEND PROXY ===========================================================
  proxy: createProxyMiddleware({
    target: process.env.ZOOM_APP_CLIENT_URL,
    // target: 'http://localhost:3001/api/zoomapp/home',
    // target: "https://www.google.com",
    // target: "https://secure-stream-83815-9a6b29ac017d.herokuapp.com/",
    // secure: false,
    changeOrigin: true,
    // headers: {
    //   "Connection": "keep-alive"
    // },
    ws: true,
  }),
};
