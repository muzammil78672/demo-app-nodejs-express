require("dotenv").config();
const express = require("express");

const server = express();
const router = express.Router();
const cors = require("cors");
const morgan = require("morgan");

const db = require("./src/models");

const PORT = process.env.PORT || "3000";

server.use(cors());
server.use(morgan("combined"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

require("./src/routes")(router);

server.use("/api", router);

server.use((err, req, res, next) => {
  console.log(err);
  let status = err.status || 500;
  let message = err.message || "Something failed!";
  if (err.name === "MongoError" && err.code === 11000) {
    status = 400;
    message = "Value already exist";
  }
  res.status(status).json({
    status,
    message,
    data: {},
  });
});

router.get("/", (req, res) => {
  res.send("Express server started!!!");
});

server.listen(PORT, () => {
  db.connect();
  console.log("Server started on PORT:", PORT);
});
