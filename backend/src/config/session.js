const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const sessionConfig = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),

  secret: process.env.SESSION_SECRET,

  resave: false,

  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});

module.exports = sessionConfig;