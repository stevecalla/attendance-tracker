const { Schema, model } = require("mongoose");

const zoomMeetingSchema = new Schema(
  {
    typ: {
      type: String,
    },
    uid: {
      type: String,
    },
    aud: {
      type: String,
    },
    iss: {
      type: String,
      trim: true,
    },
    ts: {
      type: String,
    },
    exp: {
      type: String,
    },
    entitlements: {
      type: [String],
    },
    mid: {
      type: String,
    },
    attendrole: {
      type: String,
    },
    raw_data: {
      type: [Object],
    },
    load_app_count: {
      type: Number,
      default: 0,
    },
    zoomUser: {
      type: Schema.Types.String,
      ref: "ZoomUser",
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const ZoomMeeting = model("ZoomMeeting", zoomMeetingSchema);

module.exports = ZoomMeeting;

