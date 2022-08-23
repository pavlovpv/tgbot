const schedule = require("node-schedule");
const axios = require("axios");
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;

function startJob(message, chatId) {
  time = message[1].split(":");
  let date = new Date();
  date.setHours(+time[0] - 3 , +time[1], 0, 0);
  const textMessage = message.slice(1).join(' ')
  const job = schedule.scheduleJob(date, async function () {
    try {
        await axios.post(TELEGRAM_URI, {
          chat_id: chatId,
          text: textMessage,
        });
      } catch (e) {
        console.log('task dont add',e);
        await axios.post(TELEGRAM_URI, {
          chat_id: chatId,
          text: 'task dont add',
        });
      }
  });
}

module.exports = startJob;
