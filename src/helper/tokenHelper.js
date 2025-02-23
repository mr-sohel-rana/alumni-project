const jwt = require("jsonwebtoken");

// Hardcoded JWT secret
const jwtSecret = "default-secret-key"; // Replace this with a secure key in production

/**
 * Encode a JWT token
 * @param {string} userId - User ID
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} phone - User's phone number (optional)
 * @param {string} address - User's address (optional)
 * @param {number} role - User's role (default: 0 for regular user)
 * @returns {string} - Signed JWT token
 */
const EncodeToken = (userId, name) => {
  try {
    const payload = {
      user_id: userId,
      name,
};

    // Generate a token with a 1-hour expiration
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error encoding token:", error);
    throw new Error("Failed to generate token");
  }
};

/**
 * Decode and verify a JWT token
 * @param {string} token - JWT token
 * @returns {Object} - Decoded payload
 * @throws {Error} - If the token is invalid or expired
 */
const DecodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid or expired token");
  }
};

module.exports = { EncodeToken, DecodeToken };
