const express = require("express");

let hello = express.Router();

hello.get("/hello", async (req, res) => {
  console.log("hello");
  res.json("HELLO");
});

module.exports = hello;
