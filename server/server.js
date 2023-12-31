const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const compression = require("compression"); //added to address lighthouse text compression performance issue
const cors = require("cors");
const axios = require('axios');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

//fix start
const middleware = require("./middleware");
const zoomAppRouter = require("./api/zoomapp/router");
const zoomRouter = require("./api/zoom/router");
const thirdPartyOAuthRouter = require("./api/thirdpartyauth/router");
const emailRouter = require("./api/email/router");
//fix end

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.get("/test", (req, res, next) => {
  console.log("Request made to /test route");
  res.json({ message: "This is your API data" });
  // You can perform additional operations here if needed
  next(); // Continue to the next middleware or route handler
});

//http://localhost:3001/view-session
app.get("/view-session", (req, res) => {
  console.log("Request made to /view-session route");
  // console.log(req.session);

  // let test = middleware.getSession();

  res.json("whatever");

  // redisClient.lpush("viewSession", "z", redisClient.print);
  // // Check if a session exists
  // if (!req.session) {
  //   return res.status(200).json({ message: "No session found" });
  // } else {
  //   // req.session.user = 3;
  // }

  // // Access and send the session data
  // console.log(req.session);
  // res.status(200).json({ session: req.session });
});

// //section cors start
// const ALLOWED_DOMAIN = "*";
const ALLOWED_DOMAIN = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:8080",
  "https://studio.apollographql.com",
];
// //section cors end
var corsOptions = {
  // origin: FRONTEND_DOMAIN,
  origin: ALLOWED_DOMAIN,
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
// //section cors end
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression()); //added to address lighthouse text compression performance issue

app.use(middleware.session);
app.use(middleware.setResponseHeaders);

//TEST MIDDLEWARE TO WATCH THE REQ.BODY FROM GRAPHQL
// app.use(function(req, res, next) {
//   console.log('----------------')
//   console.log('----------------')
//   console.log('----------------')
//   console.log('hello middleware');
//   console.log(req.body);
//   next();
// });

// SECTION EMAIL SERVER
// route = ./api/email/router");
// app.use("/api/email", emailRouter);

// original test api email server
// app.post("/api/email-server", (req, res) => {
//   console.log("Request made to /email-server route");
//   console.log(req.body);

//   try {
//     if (!req.body) {
//       res
//       .status(400)
//       .json({ message: 'No email content' });
//       return;
//     }

//     res.status(200).json(req.body);

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// SECTION ZOOM SERVER / APP ROUTES
// const zoomAppRouter = require("./api/zoomapp/router");
// SECTION EMAIL SERVER END

// SECTION EMAIL TRACKING
// original test api email server
app.get("/api/email-tracker/:recipient/:metric", async (req, res) => {
  console.log("===============");
  console.log("Request made to /email-server route");

  let recipient = req.params["recipient"];
  let metric = req.params["metric"];

  let trackingInfo = {
    message: "Request made to /email-tracker route",
    receipient: recipient,
    opened: metric === "opened" ? 1 : null,
    clicked: metric === "clicked" ? 1 : null,
  };

  console.log(trackingInfo);

  try {
    const response = await axios.get("https://mailstat.us/tr/optout-blk-nologo.png", {
      responseType: 'stream', // Set the response type to 'stream' for binary data
    });

    // Set the appropriate content type
    res.set({ 'Content-Type': 'image/json' });

    // Pipe the stream directly to the response object
    response.data.pipe(res);
  } catch (error) {
    console.error('Error making request:', error.message);
    res.status(500).send('Internal Server Error');
  }

  // return res.json(trackingInfo);
});

// SECTION EMAIL TRACKING END

app.use("/api/zoomapp", zoomAppRouter);
if (
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET &&
  process.env.AUTH0_ISSUER_BASE_URL
) {
  app.use("/api/auth0", thirdPartyOAuthRouter);
} else {
  console.log("Please add Auth0 env variables to enable the /auth0 route");
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

if (process.env.NODE_ENV === "production") {
  app.get("/*", function (req, res) {
    //adjusted from "/" to "/*" to allow server to handle routes outside of client routing
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
  // store.on
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
