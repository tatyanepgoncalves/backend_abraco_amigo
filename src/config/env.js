import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
})

try {
  export const env = envSchema.parse(process.env)
} catch (err) {
  console.error('❌ Environment validation failed:')
  console.error(err.errors)
  process.exit(1)
}