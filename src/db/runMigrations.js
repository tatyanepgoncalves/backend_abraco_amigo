import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is not set.')
  process.exit(1)
}

const client = postgres(DATABASE_URL, { max: 1 })
const db = drizzle(client)

console.log('Running database migrations...')

try {
  await migrate(db, { migrationsFolder: './src/db/migrations' })
  console.log('Migrations completed successfully.')
} catch (error) {
  console.error('Migration failed:', error)
  process.exit(1)
} finally {
  await client.end()
}
