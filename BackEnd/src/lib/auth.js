import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

function signAccessToken(user) {
  const payload = {
    sub: user._id.toString(),
    roles: user.roles,
    jti: uuidv4(),
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP || "15m",
  });
}

function signRefreshToken(user, jti) {
  const payload = {
    sub: user._id.toString(),
    jti,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXP || "30d",
  });
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export { signAccessToken, signRefreshToken, hashToken };
