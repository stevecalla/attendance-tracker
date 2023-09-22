const redis = require("redis");
const session = require("express-session");
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
require("dotenv").config();

// const redisPort = process.env.REDIS_PORT;
// const redisHost = process.env.REDIS_HOST;
// const redisAuth = process.env.REDIS_AUTH;

//Configure redis client
const redisClient = redis.createClient({
  // host: process.env.REDIS_HOST,
  // port: process.env.REDIS_PORT,
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log('Successfully connected to Redis ' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT + " or : " + process.env.REDIS_URL);
});

process.on("SIGINT", () => {
  redisClient.quit();
});

module.exports = {
  // Set up required OWASP HTTP response headers
  setResponseHeaders(req, res, next) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
    res.setHeader("X-Content-Type-Options", "nosniff");
    // This CSP is an example, it might not work for your webpage(s)
    // You can generate correct CSP for your webpage here https://www.cspisawesome.com/
    const publicUrl = process.env.PUBLIC_URL;
    const { host } = new URL(publicUrl);
    res.setHeader(
      "Content-Security-Policy",
      `default-src *; style-src 'self' 'unsafe-inline'; script-src * 'self' https://appssdk.zoom.us 'unsafe-inline'; connect-src * 'self' wss://${host}/sockjs-node; img-src 'self' data: https://images.unsplash.com; base-uri 'self'; form-action 'self';`
    );
    res.setHeader("Referrer-Policy", "same-origin");
    res.setHeader("X-Frame-Option", "same-origin");

    // console.log("------1-------");
    // console.log("-------2------");

    // console.log(res);

    // console.log("-------3------");
    // console.log("-------4------");

    next();
  },

  // Zoom app session middleware
  session: session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
    store: new RedisStore({client: redisClient}),
  }),

  // Zoom app session middleware
  // session: session({
  //   secret: process.env.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: {
  //     path: '/',
  //     httpOnly: true,
  //     maxAge: 365 * 24 * 60 * 60 * 1000,
  //   },
  //   store: new SessionStore({
  //     client: redis.createClient({
  //       url: process.env.REDIS_URL,
  //     }),
  //   }),
  // }),

  // async createSession(req, res, next) {
  //   store.on;

  //   console.log('session');

  //   try {
  //     session({
  //       secret: process.env.SESSION_SECRET,
  //       resave: false,
  //       saveUninitialized: true,
  //       cookie: {
  //         path: "/",
  //         httpOnly: true,
  //         maxAge: 365 * 24 * 60 * 60 * 1000,
  //       },
  //       store: new SessionStore({
  //         client: redis.createClient({
  //           url: process.env.REDIS_URL,
  //         }),
  //       }),
  //     });
  //   } catch(err) {
  //     console.log(err)
  //   }

  //   console.log({session});
  //   console.log(req.session);
  //   next();
  // },

  // Protected route middleware
  // Routes behind this will only show if the user has a Zoom App session and an Auth0 id token
  async requiresThirdPartyAuth(req, res, next) {
    if (req.session.user) {
      try {
        const user = await store.getUser(req.session.user);
        req.thirdPartyAccessToken = user.thirdPartyAccessToken;
        return next();
      } catch (error) {
        return next(
          new Error(
            "Error getting app user from session.  The user may have added from In-Client OAuth"
          )
        );
      }
    } else {
      next(new Error("Unkown or missing session"));
    }
  },
};
