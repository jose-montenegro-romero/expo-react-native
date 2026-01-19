import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ENV } from './env.js';
// Schemas
import * as schema from '../db/schema.js';

const sql = postgres(ENV.DATABASE_URL);
export const db = drizzle(sql, { schema });