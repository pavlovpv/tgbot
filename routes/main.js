const express = require("express");
const axios = require("axios");
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;

let main = express.Router();

main.post("/new-message", async (req, res) => {
  const { message } = req.body;
  console.log("new-message: ", message);

  const messageText = message?.text?.toLowerCase()?.trim();
  const chatId = message?.chat?.id;
  if (!messageText || !chatId) {
    return res.sendStatus(400);
  }

  let responseText = "I have nothing to say.";

  switch (messageText) {
    case "hi":
    case "hello":
      responseText = "Hello leather bastard";
      break;
    default:
      responseText = ":)";
  }

  try {
    await axios.post(TELEGRAM_URI, {
      chat_id: chatId,
      text: responseText,
    });
    res.send("Done");
    console.log("new-message-complete");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = main;
