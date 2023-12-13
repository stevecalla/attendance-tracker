const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env)
// console.log(process.env.DB_NAME)
// console.log(process.env.SENDER_EMAIL);
// console.log(process.env.OLDPWD)

// Connect to MongoDB (if not connected)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(
    process.env.MONGODB_URI || 
    "mongodb://localhost:27017/attendance-tracker",
    // `mongodb://localhost:27017/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
}

const { EmailSend } = require("../../models");
console.log(EmailSend);

// SECTION //GET ALL EMAIL SEND RECORDS
const findAllQuery = () => {
  return new Promise((resolve, reject) => {
    EmailSend.find({}, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
        return;
      }

      // Close the connection (if needed)
      mongoose.connection.close();

      resolve(results);
    });
  });
};

// Usage example:
// findAllQuery()
//   .then((result) => {
//     console.log("Query result:", result);
//     console.log("First name of the first record:", result[0]?.firstName);
//      convertDateToMST(result[0]?.createdAt);
//   })
//   .catch((err) => console.error(err));

// SECTION //GET THE MOST RECENTLY CREATED RECORD ( -1 most recent, 1 oldest)
const findOneQuery = () => {
  return new Promise((resolve, reject) => {
    EmailSend.findOne()
      .sort({ createdAt: -1 })
      .exec((err, result) => {
        if (err) {
          console.error("Error retrieving the last inserted record:", err);
          reject(err);
          return;
        }

        // Close the connection if needed
        mongoose.connection.close();

        resolve(result);
      });
  });
};

// Usage example:
findOneQuery()
  .then((result) => {
    console.log("Promise resolved with result:", result);
    // convertDateToMST(result.createdAt);
  })
  .catch((err) => {
    console.error("Promise rejected with error:", err);
  });

// SECTION //FIND AND UPDATE THE MOST RECENT RECORD (AND RETURN THE UPDATED RECORD)
const findOneAndUpdateMutation = (wasSentUpdate) => {
  return new Promise((resolve, reject) => {
    EmailSend.findOneAndUpdate(
      {},
      { $set: { wasSent: wasSentUpdate } }, // Set wasSent to false
      { sort: { createdAt: -1 }, new: true, useFindAndModify: false } // Sort by createdAt in descending order and return the updated document
    )
      .then((updatedRecord) => {
        console.log("Conditions:", {}); // No specific conditions in this case

        if (!updatedRecord) {
          console.log("No matching record found to update.");
          resolve(null);
          mongoose.connection.close();
          return;
        }

        // Close the connection if needed
        mongoose.connection.close();

        resolve(updatedRecord);
      })
      .catch((err) => {
        console.error("Error updating the record:", err);
        mongoose.connection.close();
        reject(err);
      });
  });
};

// Usage example:
// findOneAndUpdateMutation(true)
//   .then((result) => {
//     console.log("Record updated successfully:", result);
//     convertDateToMST(result?.createdAt);
//   })
//   .catch((err) => {
//     console.error("Promise rejected with error:", err);
//   });

// CONVERT GMT TO MST
// SECTION //DATE TIME ZONE CONVERSION
function convertDateToMST(date) {
  try {
    if (!date) {
      console.log("No date returned");
      return;
    }

    console.log("createdAt in GMT:", date);

    const createdAtMST = date.toLocaleString("en-US", {
      timeZone: "America/Denver", // Mountain Standard Time
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    console.log("createdAt in MST:", createdAtMST);

    return createdAtMST;
  } catch (error) {
    console.log("No date returned", error);
  }
}

module.exports = {
  findAllQuery,
  findOneQuery,
  findOneAndUpdateMutation,
};
