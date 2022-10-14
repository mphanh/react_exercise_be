const http = require("http");
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require('cors');

app.use(cors());

app.use("/", (req, res, next) => {
  const name = req.query.name;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  fs.readFile("./products.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    if (name === undefined || name === "") {
      res.json(JSON.parse(data));
    } else {
      const products = JSON.parse(data);
      const result = products.filter((item) =>
        item.title.includes(name.trim())
      );
      res.json(result);
    }
  });
  //   next(); //allow the req to continue to the next middleware in line
}); //middleware

const server = http.createServer(app);

server.listen(3000);
