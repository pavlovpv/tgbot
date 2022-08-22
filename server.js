const express = require("express");
const cors = require("cors");

let hello = require("./routes/hello");

const apiServer = express();

apiServer.use(cors());

apiServer.use(hello)

module.exports = apiServer;
