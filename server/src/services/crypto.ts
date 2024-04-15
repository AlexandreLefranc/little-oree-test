import crypto from "crypto-js";

import { IUserIdenfications } from "../routes/login.js";

export function checkPassword(password: string, userIdenfication: IUserIdenfications): boolean {
    const saltedPassword = userIdenfication.salt + password;

    const hash = crypto.SHA256(saltedPassword);

    console.log(crypto.MD5(saltedPassword));
    console.log(crypto.SHA1(saltedPassword));
    console.log(crypto.SHA256(saltedPassword));
    console.log(crypto.SHA224(saltedPassword));
    console.log(crypto.SHA512(saltedPassword));
    console.log(crypto.SHA384(saltedPassword));
    console.log(crypto.SHA3(saltedPassword));
    console.log(crypto.RIPEMD160(saltedPassword));
    console.log(crypto.PBKDF2(password, userIdenfication.salt));

    return false
}