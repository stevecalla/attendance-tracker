const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const UserZoom = require("./UserZoom");
// const { UserZoom } = require("../models");

const phoneNumberSchema = new Schema({
  country: {
    type: String,
  },
  code: {
    type: String,
  },
  number: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  label: {
    type: String,
  },
});

const zoomInfoSchema = new Schema({
  zoomId: {
    type: String,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  roleName: {
    type: String,
  },
  timeZone: {
    type: String,
    trim: true,
  },
  lastClientVersion: {
    type: String,
  },
  picUrl: {
    type: String,
  },
  language: {
    type: String,
  },
  zoomStatus: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  location: {
    type: String,
  },
  loginTypes: {
    type: [Number],
  },
  phoneNumbers: {
    type: [phoneNumberSchema],
  },
  zoomCreatedAt: {
    type: Date,
  },
  user: {
    type: Schema.Types.String,
    ref: "User",
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 150,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
    },
    isDisplayable: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    emailSend: {
      type: Schema.Types.Array,
      ref: "EmailSend",
    },
    userZoom: [
      {
        type: String,
        ref: "UserZoom",
      },
    ],
    test: {
      type: [zoomInfoSchema],
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

userSchema.virtual("zoomUserList", {
  ref: "UserZoom", // The model to use
  localField: "userZoom", // The field in userSchema
  foreignField: "zoomId", // The field on userZoomSchema.
});

// custom method to compare and validate password for logging in
userSchema.methods.setTest = async function (zoomObject) {
  console.log("1", zoomObject);
  console.log(this.test);
  this.test = zoomObject;
  console.log(this.test);
  return this.test;

  //findOne to get the zoomlist by zoomId
  //set the test variable to the zoom object
};

userSchema.pre("save", async function (next) {
  // console.log('get zoom info');
  // console.log(this);
  // console.log(this.userZoom[0]);
  
  let zoomId = this.userZoom[0];

  this.test = await UserZoom.findOne({ 'zoomId': zoomId });

  next();
});

// Hash User password before saving
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Hashing User before updating into database
// https://stackoverflow.com/questions/62066921/hashed-password-update-with-mongoose-express#
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this._update.password) {
      const hashed = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashed;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
