const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const compression = require("compression"); //added to address lighthouse text compression performance issue

// require("dotenv").config();

// //section cors start
const cors = require("cors");
const ALLOWED_DOMAIN = ["http://localhost:3000", "http://localhost:8080"];
// //section cors end

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

//fix start
const middleware = require("./middleware");

const zoomAppRouter = require("./api/zoomapp/router");
const zoomRouter = require("./api/zoom/router");
const thirdPartyOAuthRouter = require("./api/thirdpartyauth/router");
//fix end

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use("/test", (req, res, next) => {
  console.log("Request made to /test route");
  res.json({ message: "This is your API data" });
  // You can perform additional operations here if needed
  next(); // Continue to the next middleware or route handler
});

// //section cors start
var corsOptions = {
  // origin: FRONTEND_DOMAIN,
  origin: ALLOWED_DOMAIN,
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

// Zoom App routes
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

//http://localhost:3000/view-session
app.get("/view-session", (req, res) => {
  redisClient.lpush('viewSession', 'z', redisClient.print);
  // Check if a session exists
  if (!req.session) {
    return res.status(200).json({ message: "No session found" });
  } else {
    // req.session.user = 3;
  }

  // Access and send the session data
  console.log(req.session);
  res.status(200).json({ session: req.session });
});

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
