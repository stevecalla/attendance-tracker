const mongoose = require("mongoose");
require("dotenv").config();

// console.log('1)', process.env.DB_Name);

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`,
  {
    // useNewUrlParser: true, //warning deprecated
    // useUnifiedTopology: true, //warnin deprecated
    // useCreateIndex: true, //not supported after mongoosev5
    // useFindAndModify: false, //not supported after mongoosev5
  }
);

module.exports = mongoose.connection;
