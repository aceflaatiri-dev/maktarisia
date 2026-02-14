import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Create the token with a 30-day expiration
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
    secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token;
};

export default generateToken;