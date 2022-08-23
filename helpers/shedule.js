const schedule = require("node-schedule");
const axios = require("axios");
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;

function startJob(message, chatId) {
  let newDate = new Date();

  messageDate = message[1].split('/')
  if (messageDate.length !== 1) {
    const date = messageDate[0].split('.')
    newDate.setFullYear(date[2], date[1] - 1, date[0]);
  }

  let time = messageDate.split(":");
  newDate.setHours(+time[0] - 3 , +time[1], 0, 0);
  console.log('==> ',newDate)
  const textMessage = message.slice(1).join(' ')
  const job = schedule.scheduleJob(newDate, async function () {
    try {
        await axios.post(TELEGRAM_URI, {
          chat_id: chatId,
          text: textMessage,
        });
      } catch (e) {
        console.log('task dont add',e);
        await axios.post(TELEGRAM_URI, {
          chat_id: chatId,
          text: 'произошла ошибка',
        });
      }
  });
}

module.exports = startJob;
