import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ENV } from './env.js';
// Schemas
import * as schema from '../db/schema.js';

if (!ENV.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
}

const sql = postgres(ENV.DATABASE_URL, {
    max: 20,
    idle_timeout: 30,
    connect_timeout: 10,
    ssl: ENV.NODE_ENV === 'production' ? 'require' : false,
});

export const db = drizzle(sql, { schema });

export const closeDB = async () => {
    await sql.end();
};