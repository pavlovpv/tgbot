const express = require("express");
const axios = require("axios");
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;
const startJob = require("../helpers/shedule");
const defaultMessage = require('../defaultMessage.json')

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

  let responseText;

  switch (command) {
    case "/start":
      responseText = defaultMessage["/start"]
      break
    case '@help':
      responseText =  defaultMessage["@help"]
      break
    case "hi":
    case "hello":
    case "привет":
      responseText = "Привет)";
      break;
    case "@task":
      startJob(messageText, chatId);
      responseText = 'Обязательно напомню'
      break;
    default:
      responseText = defaultMessage.any;
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
