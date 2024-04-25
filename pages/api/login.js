// pages/api/login.js

import { pool } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const secretKey = process.env.SECRET_KEY; // Replace with the same secret key used for registration

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 1) {
      const { id, name, email, password: hashedPassword } = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign({ userId: id, name, email }, secretKey);

        res.status(200).json({ id, name, email, token }); // Return user's id, name, email, and token
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

    client.release();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
}
