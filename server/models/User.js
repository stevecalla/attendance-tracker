const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      // default: "",
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email arleady exits"],
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength:[5, "password minimum length is 5 characters"],
      maxlength: [150, "password maximum length is 150 characters"],
      default: "",
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
      match: [/^(?:[0-9]{3}-[0-9]{3}-[0-9]{4}|)$/, "Must use a valid phone number"],
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
    zoomUser: {
      type: Schema.Types.Array,
      ref: "ZoomUser",
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
