const mongoose = require("mongoose");

const connectDB = mongoose.connect(
  "mongodb://localhost:27017/passportOauth",
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  () => console.log("Db connected ")
);

module.exports = connectDB;
