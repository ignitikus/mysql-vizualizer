const express = require("express");
const router = express.Router();
const dbConn = require("../lib/db");

router.get("/", function (req, res, next) {
  dbConn.query(`SHOW DATABASES`, function (err, rows) {
    res.json(rows);
  });
});

router.post("/select-database", async (req, res, next) => {
  try {
    console.log(req.body);
    dbConn.changeUser({ database: req.body.db }, (err) => {
      if (err) throw Error(err.message);
    });

    await dbConn.query(`SHOW TABLES`, async (err, data) => {
      try {
        res.json(data);
      } catch (error) {
        throw Error(error.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/select-table", async (req, res, next) => {
  try {
    console.log(req.body);
    await dbConn.query(`SELECT * FROM ${req.body.table}`, async (err, data) => {
      try {
        res.json(data);
      } catch (error) {
        throw Error(error.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
