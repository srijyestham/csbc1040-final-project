

const jsonWebToken = require("jsonwebtoken");

require("dotenv").config();

const generateToken = (user) => {
  
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jsonWebToken.sign(payload, process.env.TOKEN_SECRET);
  return token;
};

const idFromTokenPayload = (token) => {
  
  const decoded = jsonWebToken.decode(token, { complete: true });
 
  const payload = decoded.payload;
  return payload.id;
};

const findTokenInCookie = async (req) => {
  
  const token = await req.cookies["auth-token"];
  
  if (!token) {
    throw new Error("Access Denied - Token Unavailable/Empty in Header");
  } else {
    return token;
  }
};

module.exports = { generateToken, idFromTokenPayload, findTokenInCookie };
