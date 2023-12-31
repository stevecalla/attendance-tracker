const mongoose = require("mongoose");
require("dotenv").config();

// console.log('1)', process.env.DB_Name);

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
