import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class CreateManagerService {
  async execute({ nome, email, senha }) {
    // Verifica se gestor já existe
    const managerAlreadyExists = await db.query.gestor.findFirst({
      where: eq(schema.gestor.email, email),
    })

    if (managerAlreadyExists) {
      throw new Error('Já existe um gestor com este email.')
    }

    const senhaHash = await hash(senha, 10)

    // Cria gestor no banco de dados
    const [novoGestor] = await db
      .insert(schema.gestor)
      .values({
        nome,
        email,
        senha: senhaHash,
      })
      .returning({
        id: schema.gestor.id,
        nome: schema.gestor.nome,
        email: schema.gestor.email,
        criadoEm: schema.gestor.criadoEm,
      })

    const token = jwt.sign(
      {
        tipo: novoGestor.tipo,
      },
      env.JWT_SECRET,
      {
        subject: novoGestor.id,
        expiresIn: '1d',
      }
    )

    await redis.set(`auth:${novoGestor.id}`, token, 'EX', 24 * 60 * 60)

    return { gestor: novoGestor, token }
  }
}
