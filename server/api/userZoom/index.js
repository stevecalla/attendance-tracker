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
//       useCreateIndex: true,//not supported after mongoosev5
//       useFindAndModify: false,//not supported after mongoosev5
//     }
//   );
// }

const { ZoomUser, User, ZoomMeeting } = require("../../models");

// SECTION //GET ALL EMAIL SEND RECORDS
const findAllQuery = () => {
  return new Promise((resolve, reject) => {
    ZoomUser.find({}, (err, results) => {
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
    ZoomUser.findOne()
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
const findOneQueryByZoomId = (zoom_id) => {
  return new Promise((resolve, reject) => {
    ZoomUser.findOne({ zoom_id })
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
// const zoom_id = "9U4fVlbMRsKuQgOf1kpYBg";
// findOneQueryByZoomId(zoom_id)
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

// SECTION //FIND &/OR UPSERT NEW ZOOM USER (AND RETURN THE UPDATED RECORD)
const findOneAndUpsertNewZoomUserMutation = ({
  id: zoom_id,
  user_created_at,
  ...incomingData
}) => {
  console.log("hello");
  let updateData = {
    zoom_id: zoom_id,
    user_created_at: new Date(user_created_at),
    user: "",
    is_installed: true,
    ...incomingData,
  };
  return new Promise((resolve, reject) => {
    ZoomUser.findOneAndUpdate(
      { zoom_id }, // Search for a document with the specified zoomId
      { $set: { ...updateData } }, // Set all fields
      {
        upsert: true, // Create a new document if no matching document is found
        new: true, // Return the updated document
        // useFindAndModify: false, // Don"t use depreciated findAndModify method
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
        return updatedRecord;
      })
      //add or update user account with related _id for zoom account
      .then((data) => {
        console.log("zoom data = ", data);
        return findOneAndUpsertNewUserMutation(data);
      })
      //add or update zoom user account with related user id
      .then((data) => {
        findOneAndUpsertUserIdMutation(data);
      })
      .catch((err) => {
        console.error("Error updating or creating the record:", err);
        reject(err);
      });
  });
};

// Usage example:
// const incomingData = {
//   id: "5",
//   // id: "9U4fVlbMRsKuQgOf1kpYBg",
//   first_name: "6",
//   last_name: "C8",
//   display_name: "Steve Calla",
//   // email: "callasteven@gmail.com",
//   email: "test@gmail.com",
//   // email: "test2@gmail.com",
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
// findOneAndUpsertNewZoomUserMutation(incomingData)
//   .then((updatedRecord) => {
//     if (updatedRecord) {
//       console.log("Record updated/created:", updatedRecord);
//     } else {
//       console.log("Failed to update or create a record.");
//     }
//     return updatedRecord;
//   })
//   //add or update user account with related _id for zoom account
//   .then((data) => {
//     console.log("zoom data = ", data);
//     return findOneAndUpsertNewUserMutation(data);
//   })
//   //add or update zoom user account with related user id
//   .then((data) => {
//     findOneAndUpsertUserIdMutation(data);
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

// SECTION //FIND &/OR UPSERT NEW USER (AND RETURN THE UPDATED RECORD)
const findOneAndUpsertNewUserMutation = ({
  _id: zoomUser,
  email,
  phone_numbers,
  first_name,
  last_name,
}) => {
  let updateData = {
    email,
    firstName: first_name,
    lastName: last_name,
    phone: phone_numbers[0].number,
  };
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { email }, // Search for a document with the specified zoomId
      // { $set: { ...updateData } },
      {
        $set: {
          ...updateData, // Set all fields
        },
        // $push: {
        $addToSet: {
          //use the $addToSet operator instead of $push to add the newUserZoom only if it doesn't already exist in the zoomUser array.
          zoomUser: zoomUser,
        },
      },
      {
        upsert: true, // Create a new document if no matching document is found
        new: true, // Return the updated document
        // useFindAndModify: false, // Don't use depreciated findAndModify method
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

// SECTION //FIND ZOOM ACCOUNT / UPDATE USER ID (AND RETURN THE UPDATED RECORD)
const findOneAndUpsertUserIdMutation = ({ _id: id, email }) => {
  console.log(id, email);
  let user = id;
  return new Promise((resolve, reject) => {
    ZoomUser.findOneAndUpdate(
      { email }, // Search for a document with the specified zoomId
      { $set: { user } }, // Set all fields
      {
        upsert: true, // Create a new document if no matching document is found
        new: true, // Return the updated document
        // useFindAndModify: false, // Don't use depreciated findAndModify method
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

//SECTION //UNINSTALL EVENT, SET IS_INSTALLED TO FALSE
const findOneAndUpdateIsInstalledFalse = ({ payload }) => {
  // console.log(payload.user_id);
  let zoom_id = payload.user_id;
  let is_installed = false;
  // let is_installed = true;
  return new Promise((resolve, reject) => {
    ZoomUser.findOneAndUpdate(
      { zoom_id }, // Search for a document with the specified zoom_id
      { $set: { is_installed } },
      {
        new: true, // Return the updated document
        // useFindAndModify: false, // Don't use depreciated findAndModify method
        rawResult: true, // Set the rawResult option to true to show if updatedExisting = true or updatedExisting = false, upserted id
      }
    )
      .then((updatedRecord) => {
        if (!updatedRecord) {
          console.log(
            "No matching record found to update, a new one was created."
          );
        }
        console.log(updatedRecord);
        resolve(updatedRecord);
      })
      .catch((err) => {
        console.error("Error updating or creating the record:", err);
        reject(err);
      });
  });
};

//usage example
// let uninstallBody = {
//   event: "app_deauthorized",
//   event_ts: 1703826963091,
//   payload: {
//     account_id: "Yspgm0J0TOWlbEj3Qk3brA",
//     user_id: "9U4fVlbMRsKuQgOf1kpYBg",
//     signature:
//       "986d0c40e823e820d7c5772dbf61b8b163540ac6187fb266b5ce4eec04ebcc95",
//     deauthorization_time: "2023-12-29T05:16:03.091Z",
//     client_id: "dwfUWKNzTAy6WKNlymqEig",
//   },
// };
// findOneAndUpdateIsInstalledFalse(uninstallBody);

//SECTION //CREATE MEETING RECORD
const findOneAndUpsertMeetingRecordMutation = (meetingInfo) => {
  let uid = meetingInfo.uid;
  let mid = meetingInfo.mid;
  let typ = meetingInfo.typ;
  console.log(uid, mid, typ, meetingInfo);
  // console.log({meetingInfo});

  return new Promise((resolve, reject) => {
    const updateData = {
      ...meetingInfo, // Set all fields
      $push: {
        raw_data: meetingInfo, // Push raw meeting object into array
      },
    };

    // If typ is 'meeting', increment updateCount by 1
    if (typ === 'meeting') {
      updateData.$inc = { loadAppCount: 1 };
    }

    ZoomMeeting.findOneAndUpdate(
      // { uid, typ, mid }, // Search for a document by uid, type, mid
      { uid, mid }, // Search for a document by uid, mid; removed typ to consolidate meeting and panel duplicates
      updateData,
      // {
      //   $set: {
      //     ...meetingInfo, // Set all fields
      //   },
      //   $push: {
      //     raw_data: meetingInfo, // Push raw meeting object into array
      //   },
      //   $inc: {
      //     loadAppCount: 1, // Increment the loadAppCount field by 1
      //   },
      // },
      {
        upsert: true, // Create a new document if no matching document is found
        new: true, // Return the updated document
        // useFindAndModify: false, // Don't use depreciated findAndModify method
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

//usage example
const meetingInfo = {
  typ: "meeting",
  uid: "9U4fVlbMRsKuQgOf1kpYBg",
  aud: "gs1tX1AqQkCDXu7qzgFhA",
  iss: "marketplace.zoom.us",
  ts: 1704084296567,
  exp: 1704084416567,
  entitlements: [],
  mid: "YYH1D5AUSIqyTFRvraYVxw==",
  attendrole: "host",
};
findOneAndUpsertMeetingRecordMutation(meetingInfo);

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

// console.log("NO FUNCTION CALLED");

module.exports = {
  // createEmailRecord,
  // findAllQuery,
  // findOneQuery,
  // findOneAndUpdateMutation,
  findOneAndUpsertNewZoomUserMutation,
  findOneAndUpdateIsInstalledFalse,
  findOneAndUpsertMeetingRecordMutation,
};
