import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg;
import process from 'process';

dotenv.config();

const PG_URI: string = process.env.DATABASE_URI;

export const pool = new Pool({
  connectionString: PG_URI,
});

export const query = (text: string, params?: any, callback?: any) => {
  // console.log('executed query', text);
  return pool.query(text, params, callback);
};
