const { Schema, model } = require("mongoose");

const emailSendSchema = new Schema(
  {
    fromEmail: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    toEmail: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    subject: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      default: "there",
    },
    source: {
      type: String,
      trim: true,
    },
    token: {
      type: String,
      trim: true,
    },
    textContent: {
      type: String,
      trim: true,
    },
    htmlContent: {
      type: String,
      trim: true,
    },
    wasSent: {
      type: Boolean,
      default: false,
    },
    isDisplayable: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.String,
      ref: "User",
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

const EmailSend = model("EmailSend", emailSendSchema);

module.exports = EmailSend;
