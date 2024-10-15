import pg from "pg";
import type { Pool as PGPool, QueryResultRow } from "pg";
import { dbConfig } from "../../configs/dbConfig";

const { Pool } = pg;

export type TQueryRow<T extends QueryResultRow> = T;

const pool: PGPool = new Pool(dbConfig);

// Database export singleton
export default pool;
