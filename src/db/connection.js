import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../config/env.js'
import { schema } from './schema/index.js'

export const pg = postgres(env.DATABASE_URL, {
  connect_timeout: 10,
  idle_in_transaction_session_timeout: 30000,
  statement_timeout: 30000,
})
export const db = drizzle(pg, {
  schema,
  casing: 'camelCase',
})
