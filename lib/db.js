// lib/db.js

import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "NEXT1",
  password: "admin",
  port: 5432,
});
