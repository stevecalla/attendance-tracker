const mongoose = require("mongoose");

// Connect to MongoDB (if not connected)
if (mongoose.connection.readyState === 0) {
  mongoose.connect("mongodb://localhost:27017/attendance-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

const { EmailSend } = require("../../models");

// console.log(EmailSend);

// GET ALL EMAIL SEND RECORDS
const findAllTest = () => {
  EmailSend.find({}, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }

    console.log("Query result:", results);
    console.log("Query result:", results[0].firstName);

    // Close the connection (if needed)
    mongoose.connection.close();
  });
};

// GET THE MOST RECENTLY CREATED RECORD ( -1 most recent, 1 oldest)
const findOneTest = () => {
  EmailSend.findOne()
    .sort({ createdAt: -1 })
    .exec((err, result) => {
      if (err) {
        console.error("Error retrieving the last inserted record:", err);
        return;
      }

      console.log("Last inserted record:", result);

      // Log createdAt in Mountain Standard Time (MST)
      const createdAtMST = convertDateToMST(result.createdAt);

      // Close the connection if needed
      mongoose.connection.close();
    });
};

// FIND AND UPDATE THE MOST RECENT RECORD (AND RETURN THE UPDATED RECORD)
const findOneAndUpdateTest = () => {
  EmailSend.findOneAndUpdate(
    {},
    { $set: { wasSent: false } }, // Set wasSent to false
    { sort: { createdAt: -1 }, new: true, useFindAndModify: false } // Sort by createdAt in descending order and return the updated document
  )
    .then((updatedRecord) => {
      console.log("Conditions:", {}); // No specific conditions in this case

      if (!updatedRecord) {
        console.log("No matching record found to update.");
        return;
      }

      console.log("Record updated successfully:", updatedRecord);

      // Log createdAt in Mountain Standard Time (MST)
      const createdAtMST = convertDateToMST(updatedRecord.createdAt);

      // Close the connection if needed
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error updating the record:", err);
      mongoose.connection.close();
    });
};

// CONVERT GMT TO MST
function convertDateToMST(date) {
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
}

findAllTest();

module.exports = {
  findAllTest,
  findOneTest,
  findOneAndUpdateTest,
};
