const express = require("express");
const axios = require("axios");
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;
const startJob = require("../helpers/shedule");

let main = express.Router();

main.post("/new-message", async (req, res) => {
  const { message } = req.body;

  const messageText = message?.text?.toLowerCase()?.trim().split(" ");
  const command = messageText[0];
  console.log("command => ", command);
  console.log("message text => ", messageText)
  const chatId = message?.chat?.id;
  if (!command || !chatId) {
    return res.sendStatus(400);
  }

  let responseText = "I have nothing to say.";

  switch (command) {
    case "hi":
    case "hello":
      responseText = "Hello leather bastard";
      break;
    case "task":
      responseText = startJob(messageText);
    default:
      responseText = ":)";
  }

  try {
    await axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: responseText,
    });
    res.send("Done");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = main;
