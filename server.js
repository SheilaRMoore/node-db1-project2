const express = require('express');


const AccountsRouter = require('./data/account-router');

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({ message: "IT'S WORKING!" });
  });
  
  server.use("/api/accounts", AccountsRouter);
module.exports = server;