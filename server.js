const express = require("express");
const cors = require("cors");

let hello = require("./routes/hello");
let main = require("./routes/main");

const apiServer = express();

apiServer.use(cors());

apiServer.use(hello);
apiServer.use(main);

module.exports = apiServer;
