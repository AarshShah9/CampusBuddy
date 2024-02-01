import jwt from "jsonwebtoken";

// use to mint a JWT
export const generateJWT = (payload: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET ?? "testSecret");
};

// use to format the payload from array to string
// needed as jwt library would coerce to strings
// this lets us ensure that the delimitter is |
// allowing us to parse properly
export const formatPayload = (...payloadArray: string[]) => {
  return payloadArray.join("|");
};

// use to parse the payload to an array of strings
// will allow us to parse payload to be able to make database calls
export const parsePayload = (payloadString: string) => {
  return payloadString.split("|");
};
