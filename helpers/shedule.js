const schedule = require("node-schedule");

function startJob() {
  const date = new Date(2012, 11, 21, 5, 30, 0);

  const job = schedule.scheduleJob(date, function () {
    console.log("The world is going to end today.");
  });
}

module.exports = startJob;
