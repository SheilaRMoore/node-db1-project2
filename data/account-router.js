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

  router.post('/', (req, res) => {
    const accountData = req.body
    db('accounts')
    .insert(accountData, 'id')
    .then(newId => {
        const id = newId[0];
        db('accounts')
        .where({id})
        .first()
        .then(newAccount => {
            res.status(200).json(newAccount)
        })
        .catch(error => {
            res.status(500).json({error: 'Sorry Your account did not post'})
        })
    }) 

    router.put("/:id", (req, res) => {
        const update = req.body;
        const { id } = req.params;
        db("accounts")
          .where({ id })
          .update(update)
          .then((count) => {
            if (count > 0) {
              res.status(200).json({ message: "updated successfully" });
            } else {
              res.status(404).json({ message: "Unsuccessful" });
            };
          });
        });
    });


    router.delete("/:id", (req, res) => {
        db("accounts")
          .where("id", "=", req.params.id)
          .del()
          .then(count => {
            if (count > 0) {
              res.status(200).json(count);
            } else {
              res.status(404).json({ message: "not found" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "error deleting the account" });
          });
      });
      
  module.exports = router;