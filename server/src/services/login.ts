import { IBody } from "../routes/login.js";

export function validateLoginBody(body: IBody): boolean {
    if (!body.email || !body.password) {
        return false;
    }

    // could check for proper email format
    // could check for password minimum requirement

    return true;
}