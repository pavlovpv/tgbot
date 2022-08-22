const express = require("express");

let main = express.Router();

main.post("/new-message", async (req, res) => {
  console.log("new-message");
  const { message } = req.body;

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
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = main;
