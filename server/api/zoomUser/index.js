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

//SECTION //FIND ONE BY ZOOMID
// SECTION //GET THE USERZOOM BY ZOOMID
const findOneZoomUserQueryByZoomId = async (zoom_id) => {
  console.log(zoom_id, "test");
  // return new Promise((resolve, reject) => {
  try {
    const result = await ZoomUser.findOne({ zoom_id })
      .sort({ createdAt: -1 })
      .exec();
    if (!result) {
      console.log("No record found for zoomId:", zoom_id);
    }
    return result;
  } catch (err) {
    console.error("Error retrieving the last inserted record:", err);
    throw err; // Re-throw the error to propagate it to the next catch block
  }
  // });
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

//SECTION //FIND ONE BY ZOOMID
const findOneZoomUserAndUpdateByZoomId = (zoomUser, zoomMeetingId) => {
  console.log("find and update zoom meeting array");
  console.log(zoomUser, zoomMeetingId);
  let _id = zoomUser;
  return new Promise((resolve, reject) => {
    ZoomUser.findOne({ _id })
      .then((data) => {
        console.log(data);
        console.log(data.zoom_meetings);
        console.log(data.zoom_meetings.includes(zoomMeetingId));

        if (!data.zoom_meetings.includes(zoomMeetingId)) {
          return ZoomUser.findOneAndUpdate(
            { _id }, // Search for a document with the specified zoomId
            {
              $inc: { zoom_meetings_count: 1 }, //increment meeting count
            }, // Set all fields
            {
              upsert: false, // Create a new document if no matching document is found
              new: true, // Return the updated document
              rawResult: true, // Set the rawResult option to true to show if updatedExisting = true or updatedExisting = false, upserted id
            }
          );
        }
      })
      .then((data) => {
        return ZoomUser.findOneAndUpdate(
          { _id }, // Search for a document with the specified zoomId
          {
            $addToSet: { zoom_meetings: zoomMeetingId },
            // $inc: { zoom_meetings_count: 1 }, //increment meeting count
          }, // Set all fields
          {
            upsert: true, // Create a new document if no matching document is found
            new: true, // Return the updated document
            // useFindAndModify: false, // Don"t use depreciated findAndModify method
            rawResult: true, // Set the rawResult option to true to show if updatedExisting = true or updatedExisting = false, upserted id
          }
        );
      })
      .then((updatedRecord) => {
        if (!updatedRecord) {
          console.log(
            "No matching record found to update, a new one was created."
          );
        }
        resolve(updatedRecord);
        console.log("=======================");
        console.log(updatedRecord);
        console.log("=======================");
        return updatedRecord;
      })
      .catch((err) => {
        console.error("Error updating or creating the record:", err);
        reject(err);
      });
  });
};

// SECTION //ON INSTALL = FIND &/OR UPSERT NEW ZOOM USER AND RETURN THE UPDATED RECORD
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
        // $addToSet: {
        //   //use the $addToSet operator instead of $push to add the newUserZoom only if it doesn't already exist in the zoomUser array.
        //   zoomUser: zoomUser,
        // },
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

//SECTION //ON HOMEPAGE HIT (api/zoomapp/home) = CREATE MEETING RECORD
const findOneAndUpsertMeetingRecordMutation = async (meetingInfo) => {
  let uid = meetingInfo.uid;
  let mid = meetingInfo.mid;
  let typ = meetingInfo.typ;
  console.log("CREATE MEETING RECORD");
  console.log(uid, mid, typ, meetingInfo);

  let getUserId = await findOneZoomUserQueryByZoomId(uid); //get user_id to add to zoomMeeting record
  console.log(getUserId);
  console.log(getUserId?._id);

  return new Promise((resolve, reject) => {
    if (typ === "meeting") {
      const updateData = {
        ...meetingInfo, // Set all fields
        zoomUser: getUserId._id,
        typ: typ === "panel" && "meeting",
        // updateData: typ === "meeting" && (updateData.$inc = { load_app_count: 1 }),
        $push: {
          raw_data: meetingInfo, // Push raw meeting object into array
        },
      };

      // If typ is 'meeting', increment updateCount by 1
      if (typ === "meeting") {
        updateData.$inc = { load_app_count: 1 };
      }

      ZoomMeeting.findOneAndUpdate(
        // { uid, typ, mid }, // Search for a document by uid, type, mid
        { uid, mid }, // Search for a document by uid, mid; removed typ to consolidate meeting and panel duplicates
        updateData,
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
          return updatedRecord;
        })
        //add zoom meeting id to the zoomuser array
        .then((updatedRecord) => {
          console.log("add zoom meeting id to zoomuser record", updatedRecord);
          let zoomUser = updatedRecord.zoomUser;
          let zoomMeetingId = updatedRecord._id;
          console.log(zoomUser, zoomMeetingId);
          findOneZoomUserAndUpdateByZoomId(zoomUser, zoomMeetingId);
        })
        .catch((err) => {
          console.error("Error updating or creating the record:", err);
          reject(err);
        });
    }
  });
};

//usage example
// const meetingInfo = {
//   typ: "meeting",
//   uid: "9U4fVlbMRsKuQgOf1kpYBg",
//   aud: "gs1tX1AqQkCDXu7qzgFhA",
//   iss: "marketplace.zoom.us",
//   ts: 1704084296567,
//   exp: 1704084416567,
//   entitlements: [],
//   mid: "YYH1D5AUSIqyTFRvraYVxw==",
//   attendrole: "host",
// };
// findOneAndUpsertMeetingRecordMutation(meetingInfo);

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
