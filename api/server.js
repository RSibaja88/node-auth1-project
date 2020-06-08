const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require("../users/usersRouter");
const authRouter = require("../auth/authRouter");

const server = express();

const sessionConfig = {
    name: 'sessionId',
    secret: 'secret',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,   
      httpOnly: true, 
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require('../data/dbConfig.js'), 
      tablename: 'sessions', 
      sidfieldname: 'sid', 
      createtable: true, 
      clearInterval: 1000 * 60 * 60, 
    }),
}
server.use(session(sessionConfig));
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter );

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;
