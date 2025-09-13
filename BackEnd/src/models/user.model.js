// models/User.js
import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  jti: String,
  tokenHash: String,
  deviceInfo: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  passwordHash: String, // null if OAuth-only user
  name: String,
  picture: String,
  roles: { type: [String], default: ["user"] }, // ['user','admin','team_admin']
  isVerified: { type: Boolean, default: false },
  oauthProviders: [{ provider: String, providerId: String }],
  credits: { type: Number, default: 0 },
  refreshTokens: [RefreshTokenSchema],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
