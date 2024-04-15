import { IBody } from "../routes/login.js";


function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validateLoginBody(body: IBody): boolean {
    if (!body.email || !body.password) {
        return false;
    }

    const validEmail = validateEmail(body.email);
    if (!validEmail) {
        return false;
    }

    return true;
}