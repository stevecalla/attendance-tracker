// // Watch for changes in a collection by using a change stream
// // import { MongoClient } from "mongodb";
// //section if you delete this also remove mongodb from the package json
// const { MongoClient } = require("mongodb");

// // const db = require("./connection");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`;

// const client = new MongoClient(uri);
// console.log(client);

// // Declare a variable to hold the change stream
// let changeStream;

// async function run() {
//   // db.once("open", () => {
//   console.log(`Connected to MongoDB at ${client.host}:${client.port}`);

//   // async function run() {
//   try {
//     const database = client.db("attendance-tracker");
//     const emailsends = database.collection("emailsends");

//     // Open a Change Stream on the "haikus" collection
//     changeStream = emailsends.watch();

//     // Print change events as they occur
//     for await (const change of changeStream) {
//       console.log("Received change:\n", change);
//     }

//     // Close the change stream when done
//     await changeStream.close();

//   } catch (error) {
//     // Close the MongoDB client connection
//     // db.close();
//     console.log("Close the MongoDB client connection");
//     console.log(error);
//   }
// }

// // run().catch(console.dir);

// module.exports = { run };
