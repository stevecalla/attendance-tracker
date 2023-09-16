const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const compression = require("compression"); //added to address lighthouse text compression performance issue

require("dotenv").config();

const redis = require("redis");
const session = require("express-session");
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session)

// //section cors start
const cors = require("cors");
const FRONTEND_DOMAIN = "http://localhost:3000";
// //section cors end

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

//fix start
const middleware = require("./middleware");

const zoomAppRouter = require("./api/zoomapp/router");
const zoomRouter = require("./api/zoom/router");
const thirdPartyOAuthRouter = require("./api/thirdpartyauth/router");
//fix end

const redisPort = process.env.REDIS_PORT;
const redisHost = process.env.REDIS_HOST;
// const redisAuth = process.env.REDIS_AUTH;

//Configure redis client
const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
})

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
  origin: FRONTEND_DOMAIN,
  credentials: true,
};
app.use(cors(corsOptions));
// //section cors end
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression()); //added to address lighthouse text compression performance issue


redisClient.on("connect", () => {
  console.log('Successfully connected to Redis ' + redisHost + ':' + redisPort);
});

process.on("SIGINT", () => {
  redisClient.quit();
});

// app.use(middleware.session);
// app.use(middleware.createSession);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    store: new RedisStore({client: redisClient}),
  })
);
app.use(middleware.setResponseHeaders);
app.use("/api/zoomapp", zoomAppRouter);
//fix start

// Zoom App routes
// app.use("/api/zoomapp", zoomAppRouter);
if (
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET &&
  process.env.AUTH0_ISSUER_BASE_URL
) {
  app.use("/api/auth0", thirdPartyOAuthRouter);
} else {
  console.log("Please add Auth0 env variables to enable the /auth0 route");
}

//fix
console.log("-------hello-------");
app.get("/hello", (req, res) => {
  console.log(req);
  console.log("----------hello route-------------");
  res.send("Hello Zoom Apps!");
});
//fix end

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
