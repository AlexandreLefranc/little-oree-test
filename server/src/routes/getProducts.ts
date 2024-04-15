//Libraries import
import { Router, Response, Request } from "express";

// Services import
import { pool } from "../services/poolClient.js";

// Interfaces import
import { IProduct } from "../interfaces/interfaces.js";

const router = Router();

// Get all products saved in the database
export default router.get(
  "/products",
  async (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response<IProduct[] | { message?: string }>
  ) => {
    try {
      // #1 Get products from the DB
      const products = await pool.query<IProduct>(
        "SELECT * FROM products ORDER BY created_at DESC"
      );

      if (products.rowCount === 0)
        return res.status(201).send({ message: "No product saved." });

      // #3 Return the products
      return res.status(200).send(products.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "A server error occured" });
    }
  }
);
