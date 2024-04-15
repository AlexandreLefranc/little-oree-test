import crypto from "crypto-js";

import { IUserIdenfications } from "../routes/login.js";

export function checkPassword(password: string, userIdenfication: IUserIdenfications): boolean {
    const saltedPassword = password + userIdenfication.salt;

    const hash = crypto.SHA256(saltedPassword).toString(crypto.enc.Base64);
    
    return hash === userIdenfication.hash;
}