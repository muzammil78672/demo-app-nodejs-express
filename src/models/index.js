const path = require("path");
const mongoose = require("mongoose");
const glob = require("glob");

const basename = path.basename(__filename);

const { Schema } = mongoose;

const db = {
  generateObjectId: () => new mongoose.Types.ObjectId(),
};

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongo DB connected successfully!!!!");
    })
    .catch((err) => {
      console.log("Error connecting mongo DB", err);
    });
};

glob
  .sync(`${__dirname}/**/*.js`)
  .filter((file) => {
    const fileName = file.split("/");
    return (
      fileName[fileName.length - 1].indexOf(".") !== 0 &&
      fileName[fileName.length - 1] !== basename &&
      fileName[fileName.length - 1].slice(-3) === ".js"
    );
  })
  .forEach(async (file) => {
    const fileName = file.split("/");
    db[fileName[fileName.length - 1].slice(0, -3)] = require(file)(
      Schema,
      mongoose
    );
  });

db.connect = connect;
db.schema = Schema;

module.exports = db;
