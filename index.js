const express = require("express");
import { config } from "dotenv";
config();

let appServer = require("./server");

const PORT = process.env.PORT || 3030;

appServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
