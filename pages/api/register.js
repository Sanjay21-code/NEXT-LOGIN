// pages/api/register.js
// pages/api/register.js

import { pool } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const secretKey = process.env.SECRET_KEY; // Replace with a secure secret key

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const client = await pool.connect();
    const emailCheck = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      // If the email already exists, return a 409 Conflict status code
      client.release();
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with hashed password to the database
    const result = await client.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword]
    );
    client.release();

    const userId = result.rows[0].id;

    // Generate JWT token
    const token = jwt.sign({ userId, name, email }, secretKey);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred while registering" });
  }
}
