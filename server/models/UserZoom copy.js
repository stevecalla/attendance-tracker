const { Schema, model } = require("mongoose");

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

const userZoomSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const UserZoom = model("UserZoom", userZoomSchema);

module.exports = UserZoom;
