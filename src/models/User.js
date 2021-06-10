const mongoose = require("mongoose");
const argon2 = require("argon2");
const clientErrors = require("../utils/clientErrors");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: [6, "password must be at least 6 characters long"],
  },

  // ideally we should store authentication data away from user data
  // because a JWT server should handle auth exclusively and share access
  // to other resource servers
  userInteger: {
    type: Number,
    default: 0,
    min: 0,
  },
});

// disable unnamed functions (ignore eslint error)
/* eslint-disable func-names */

// hash plaintext passwords before saving into the database
UserSchema.pre("save", async function (next) {
  this.password = await argon2.hash(this.password);
  return next();
});

// login handler (user login verifier)
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isUser = await argon2.verify(user.password, password);
    if (isUser) return user;
  }
  throw clientErrors.Unauthorized("incorrect email or password");
};

// prettier JSON
UserSchema.options.toJSON = {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
};

module.exports = mongoose.model("User", UserSchema);
