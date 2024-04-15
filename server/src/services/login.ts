import { IBody } from "../routes/login.js";

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
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