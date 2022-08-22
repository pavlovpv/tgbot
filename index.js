const express = require("express");

let appServer = require("./server");

const port = 3030;

appServer.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
