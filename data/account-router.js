const express = require('express')
const db = require("./dbConfig")  // database access using knex

const router = express.Router();

router.get("/", (req, res) => {
    db("accounts")
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "could not retrieve the accounts" });
      });
  });

  router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then(accounts => {
        accounts
          ? res.status(200).json(accounts)
          : res.status(404).json({ error: "Account is not found" });
      });
  });

  module.exports = router;