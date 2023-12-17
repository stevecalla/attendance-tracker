// SECTION //to test queries below using node. uncomment line 2/3 then either section #1 or #2 below to establish a connection. 
// const mongoose = require("mongoose");
// require("dotenv").config({ path: "../../../server/.env" }); // needed to add the path above to access .env variables

// SECTION#1//create a connection using the config/connection file
// const dbConnection = require("../../config/connection");

// SECTION#2 //create a connection using mongoose
// Connect to MongoDB (if not connected)
// if (mongoose.connection.readyState === 0) {
//   mongoose.connect(
//     process.env.MONGODB_URI ||
//     `mongodb://localhost:27017/${process.env.DB_NAME}`,
//     // "mongodb://localhost:27017/attendance-tracker",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   );
// }

const { EmailSend } = require("../../models");

const createEmailRecord = async ({
  toEmail,
  fromEmail,
  subject,
  firstName,
  source,
  token,
  textContent,
  htmlContent,
  user,
}, sendResponse) => {

  let wasSent;
  let messageId = sendResponse.messageId;
  let response = sendResponse.response;

  try {
    console.log('create record 123', sendResponse);

    if (sendResponse.accepted.length === 1) {
      // set wasSent to true
      console.log('wasSent=', true);
      wasSent = true;
    } else if (sendResponse.rejected.length === 1) {
      // set wasSent to false
      console.log('wasSent=', false);
      wasSent = false;
    } else {
      console.log('response from emal send was neither accepted or rejected')
    }

    EmailSend.create({
      toEmail,
      fromEmail,
      subject,
      firstName,
      source,
      token,
      textContent,
      htmlContent,
      wasSent,
      messageId,
      response,
      user,
    });

    return {
      toEmail,
      fromEmail,
      subject,
      firstName,
      source,
      token,
      textContent,
      htmlContent,
      wasSent,
      messageId,
      response,
      user,
    };
  } catch (error) {}
};

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
// findOneQuery()
//   .then((result) => {
//     console.log("Promise resolved with result:", result);
//     // convertDateToMST(result.createdAt);
//   })
//   .catch((err) => {
//     console.error("Promise rejected with error:", err);
//   });

// SECTION //FIND AND UPDATE THE MOST RECENT RECORD (AND RETURN THE UPDATED RECORD)
const findOneAndUpdateMutation = (wasSentUpdate) => {
  console.log("kicked off");
  console.log(wasSentUpdate);

  return new Promise((resolve, reject) => {
    EmailSend.findOneAndUpdate(
      {},
      { $set: { wasSent: wasSentUpdate } }, // Set wasSent to false
      {
        sort: { createdAt: -1 },
        returnOriginal: false,
        useFindAndModify: false,
      } // Sort by createdAt in descending order and return the updated document
    )
      .then((updatedRecord) => {
        console.log("Conditions:", {}); // No specific conditions in this case

        if (!updatedRecord) {
          console.log("No matching record found to update.");
          resolve(null);
          return;
        }
        console.log("1) updated record", updatedRecord);
        resolve(updatedRecord);
      })
      .catch((err) => {
        console.error("Error updating the record:", err);
        reject(err);
      });
  });
};

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

findOneAndUpdateMutation(false);

module.exports = {
  createEmailRecord,
  // findAllQuery,
  // findOneQuery,
  // findOneAndUpdateMutation,
};