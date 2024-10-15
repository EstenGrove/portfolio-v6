import dotenv from "dotenv";
dotenv.config();
import { PoolConfig } from "pg";

const DB_CONFIG: Partial<PoolConfig> = {
	user: process.env.DB_USER as string,
	password: process.env.DB_USER_PWD as string,
	host: process.env.DB_HOST as string,
	database: process.env.DB_NAME as string,
	port: Number(process.env.DB_PORT) as number,
};

export { DB_CONFIG as dbConfig };
