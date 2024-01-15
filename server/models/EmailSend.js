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
      default: null,
    },
    isDisplayable: {
      type: Boolean,
      default: true,
    },
    messageId: {
      type: String,
      trim: true,
    },
    response: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.String,
      ref: "User",
    },
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

const EmailSend = model("EmailSend", emailSendSchema);

module.exports = EmailSend;
