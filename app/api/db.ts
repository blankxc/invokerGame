import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRE_URL
});

export const query = (text: string, params?: (string | number)[]) => {
    return pool.query(text, params)
}