const db = require("../config/connection");
const { UserZoom } = require("../models");
const userZoomSeeds = require("./userZoomSeeds.json");
const { Schedule } = require("../models");
const scheduleSeeds = require("./scheduleSeeds.json");
const { Client } = require("../models");
const clientSeeds = require("./clientSeeds.json");
const { Employee } = require("../models");
const employeeSeeds = require("./employeeSeeds.json");
const { Hour } = require("../models");
const hourSeeds = require("./hourSeeds.json");
const { User } = require("../models");
const userSeeds = require("./userSeeds.json");
const { EmailSend } = require("../models");
const emailSendSeeds = require("./emailSendSeeds.json");

db.once("open", async () => {
  try {
    await UserZoom.deleteMany({});
    await User.deleteMany({});
    await EmailSend.deleteMany({});
    await Schedule.deleteMany({});
    await Client.deleteMany({});
    await Employee.deleteMany({});
    await Hour.deleteMany({});

    await UserZoom.create(userZoomSeeds);
    await User.create(userSeeds);
    await EmailSend.create(emailSendSeeds);
    await Schedule.create(scheduleSeeds);
    await Client.create(clientSeeds);
    await Employee.create(employeeSeeds);
    await Hour.create(hourSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
