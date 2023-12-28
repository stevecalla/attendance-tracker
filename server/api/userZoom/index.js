// SECTION //to test queries below using node. uncomment line 2/3 then either section #1 or #2 below to establish a connection.
const mongoose = require("mongoose");
require("dotenv").config({ path: "../../../server/.env" }); // needed to add the path above to access .env variables

// SECTION#1//create a connection using the config/connection file
const dbConnection = require("../../config/connection");

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

const { UserZoom } = require("../../models");

const createEmailRecord = async (
  {
    toEmail,
    fromEmail,
    subject,
    firstName,
    source,
    token,
    textContent,
    htmlContent,
    user,
  },
  sendResponse
) => {
  let wasSent;
  let messageId = sendResponse.messageId;
  let response = sendResponse.response;

  try {
    // console.log('create record 123', sendResponse);

    if (sendResponse.accepted.length === 1) {
      // set wasSent to true
      // console.log('wasSent=', true);
      wasSent = true;
    } else if (sendResponse.rejected.length === 1) {
      // set wasSent to false
      // console.log('wasSent=', false);
      wasSent = false;
    } else {
      // console.log('response from emal send was neither accepted or rejected')
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
    UserZoom.find({}, (err, results) => {
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
const findOneQueryMostRecent = () => {
  return new Promise((resolve, reject) => {
    UserZoom.findOne()
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
// findOneQueryMostRecent()
//   .then((result) => {
//     console.log("Promise resolved with result:", result);
//     // convertDateToMST(result.createdAt);
//   })
//   .catch((err) => {
//     console.error("Promise rejected with error:", err);
//   });

//SECTION //FIND ONE BY ZOOMID
// SECTION //GET THE USERZOOM BY ZOOMID
const findOneQueryByZoomId = (zoomId) => {
  return new Promise((resolve, reject) => {
    UserZoom.findOne({ zoomId })
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
const targetZoomId = "9U4fVlbMRsKuQgOf1kpYBg";
// findOneQueryByZoomId(targetZoomId)
//   .then((result) => {
//     if (result) {
//       console.log("Record found:", result);
//       // convertDateToMST(result.createdAt);
//     } else {
//       console.log("No record found for zoomId:", targetZoomId);
//     }
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

// SECTION //FIND AND UPDATE THE MOST RECENT RECORD (AND RETURN THE UPDATED RECORD)
const findOneAndUpsertNewUserMutation = (incomingData) => {
  let zoomId = incomingData.id;
  let updateData = {
    zoomId: incomingData.id,
    firstName: incomingData.first_name,
    lastName: incomingData.last_name,
    displayName: incomingData.display_name,
    email: incomingData.email,
    roleName: incomingData.role_name,
    timeZone: incomingData.timezone,
    lastClientVersion: incomingData.last_client_version,
    picUrl: incomingData.pic_url,
    language: incomingData.language,
    zoomStatus: incomingData.status,
    jobTitle: incomingData.job_title,
    location: incomingData.location,
    loginTypes: incomingData.login_types,
    phoneNumbers: incomingData.phone_numbers,
    zoomCreatedAt: new Date(incomingData.created_at),
    user: "6498fb54494aa98f85992da5",
  };
  return new Promise((resolve, reject) => {
    UserZoom.findOneAndUpdate(
      { zoomId }, // Search for a document with the specified zoomId
      { $set: { ...updateData } }, // Set all fields
      {
        upsert: true, // Create a new document if no matching document is found
        new: true, // Return the updated document
        useFindAndModify: false, // Don't use depreciated findAndModify method
        rawResult: true, // Set the rawResult option to true to show if updatedExisting = true or updatedExisting = false, upserted id
      }
    )
      .then((updatedRecord) => {
        if (!updatedRecord) {
          console.log(
            "No matching record found to update, a new one was created."
          );
        }
        resolve(updatedRecord);
      })
      .catch((err) => {
        console.error("Error updating or creating the record:", err);
        reject(err);
      });
  });
};

// Usage example:
// const targetZoomId = "9U4fVlbMRsKuQgOf1kpY"; //use zoomId from incoming data
// const incomingData = {
//   id: "5",
//   first_name: "6",
//   last_name: "C8",
//   display_name: "Steve Calla",
//   email: "callasteven@gmail.com",
//   type: 1,
//   role_name: "Owner",
//   pmi: 2514017048,
//   use_pmi: false,
//   personal_meeting_url:
//     "https://us04web.zoom.us/j/2514017048?pwd=TTUwa0E2eTBnUlQvY0pOZHBaSTE3Zz09",
//   timezone: "America/Denver",
//   verified: 0,
//   dept: "",
//   created_at: "2020-10-02T14:26:57Z",
//   last_login_time: "2023-12-26T02:09:03Z",
//   last_client_version: "5.16.10.25689(mac)",
//   pic_url:
//     "https://us04web.zoom.us/p/9U4fVlbMRsKuQgOf1kpYBg/f15b3e8c-9374-4f1e-9185-0b39a2e2c234-7189",
//   cms_user_id: "",
//   jid: "9u4fvlbmrskuqgof1kpybg@xmpp.zoom.us",
//   group_ids: [],
//   im_group_ids: [],
//   account_id: "Yspgm0J0TOWlbEj3Qk3brA",
//   language: "en-US",
//   phone_country: "US",
//   phone_number: "+1 2019347068",
//   status: "active",
//   job_title: "",
//   location: "Boulder, CO",
//   login_types: [1, 100],
//   role_id: "0",
//   cluster: "us04",
//   phone_numbers: [
//     {
//       country: "US",
//       code: "+1",
//       number: "2019347068",
//       verified: true,
//       label: "",
//     },
//     {
//       country: "US",
//       code: "+1",
//       number: "2019347068",
//       verified: true,
//       label: "",
//     },
//   ],
//   user_created_at: "2020-10-02T14:26:57Z",
// };
// findOneAndUpsertNewUserMutation(incomingData)
//   .then((updatedRecord) => {
//     if (updatedRecord) {
//       console.log("Record updated/created:", updatedRecord);
//     } else {
//       console.log("Failed to update or create a record.");
//     }
//   })
//   // fix //.then update user account
//   // fix //.then update record with user _id
//   .catch((err) => {
//     console.error("Error:", err);
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

console.log('NO FUNCTION CALLED');

module.exports = {
  // createEmailRecord,
  // findAllQuery,
  // findOneQuery,
  // findOneAndUpdateMutation,
  findOneAndUpsertNewUserMutation,
};
