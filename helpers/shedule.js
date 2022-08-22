const schedule = require("node-schedule");
const axios = require("axios");
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`;

function startJob(message) {
    console.log('m==>', message)
  time = message[1].split(":");
  console.log('t==>', time)
  let date = new Date();
  console.log('d==>', date)
  date.setHours(+time[0] - 3 , +time[1], 0, 0);
  console.log('d==>', date)
  const job = schedule.scheduleJob(date, async function () {
    try {
        console.log('<><><>')
        await axios.post(TELEGRAM_URI, {
          chat_id: chatId,
          text: message[1] + " " + message[2],
        });
        res.send("Done");
      } catch (e) {
        console.log(e);
        res.send(e);
      }
  });
}

module.exports = startJob;
