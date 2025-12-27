import assert from "assert";
import { Pool } from "pg";
import { env } from "../config/env.js";

// Establish the connection to the database server
export const pool = new Pool({ connectionString: env.database });
