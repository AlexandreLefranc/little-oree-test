import jwt from "jsonwebtoken";

export function generateJwt() {
    return jwt.sign({}, process.env.JWT_SECRET, {expiresIn: "2 days"});
}