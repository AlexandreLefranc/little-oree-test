// Libraries import
import { Router, Response, Request } from "express";
import { validateLoginBody } from "../services/login.js";
import { pool } from "../services/poolClient.js";
import { checkPassword } from "../services/crypto.js";
import { generateJwt } from "../services/jwt.js";
const router = Router();

// Local interfaces declaration
export interface IBody {
  email?: string;
  password?: string;
}
export interface IResponse {
  token?: string;
  userId?: string;
  message?: string;
}

export interface IUserIdenfications {
  id: string,
  created_at: Date,
  email: string,
  firstname: string,
  lastname: string,
  user_id: string,
  modified_at: Date,
  hash: string,
  salt: string
}

// Route login : chek user's password and return a jwt token if successfull
export default router.post(
  "/user/login",
  async (
    req: Request<unknown, unknown, IBody, unknown>,
    res: Response<IResponse>
  ) => {
    try {
      // validate body
      const validBody = validateLoginBody(req.body);
      if (!validBody) {
        return res.status(400).send({ message: "Invalid fields" });
      }

      // retreive user data
      const users = await pool.query<IUserIdenfications>(
        `SELECT *
        FROM users u
        LEFT JOIN identifications i ON u.id = i.user_id
        WHERE email = $1::text`,
        [req.body.email]
      );

      if (users.rowCount === 0) {
        return res.status(404).send({ message: "Unknown email address" });
      }

      const user = users.rows[0];

      // check password
      const validPassword = checkPassword(req.body.password, user);
      if (!validPassword) {
        return res.status(401).send({ message: "Invalid password" });
      }

      const token = generateJwt();

      return res.status(200).send({ token, userId: user.user_id });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "A server error occured" });
    }
  }
);
