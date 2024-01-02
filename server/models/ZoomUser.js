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

const zoomUserSchema = new Schema(
  {
    zoom_id: {
      type: String,
    },
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    display_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    role_name: {
      type: String,
    },
    timezone: {
      type: String,
      trim: true,
    },
    last_client_version: {
      type: String,
    },
    pic_url: {
      type: String,
    },
    language: {
      type: String,
    },
    zoom_status: {
      type: String,
    },
    job_title: {
      type: String,
    },
    location: {
      type: String,
    },
    login_types: {
      type: [Number],
    },
    phone_numbers: {
      type: [phoneNumberSchema],
    },
    user_created_at: {
      type: Date,
    },
    is_installed: {
      type: Boolean,
      default: true, //should auto populate true (not included in upsert)
    },
    user: {
      type: Schema.Types.String,
      ref: "User",
    },
    zoom_meetings: {
      type: [Schema.Types.ObjectId]
    }
  },
  {
    timestamps: true,
    // useCreateIndex: true,//not supported after mongoosev5
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const ZoomUser = model("ZoomUser", zoomUserSchema);

module.exports = ZoomUser;

