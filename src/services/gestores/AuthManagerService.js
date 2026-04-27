import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class AuthManagerService {
  async execute({ email, senha }) {
    // Localizar o gestor
    const manager = await db.query.gestor.findFirst({
      where: eq(schema.gestor.email, email),
    })

    if (!manager) {
      throw new Error('E-mail ou senha incorretos.')
    }

    // Comparar a senha
    const senhaCompare = await compare(senha, manager.senha)

    if (!senhaCompare) {
      throw new Error('E-mail ou senha incorretos.')
    }

    // Gerar o Token JWT
    // Use uma string secreta segura no seu .env
    const token = jwt.sign(
      { nome: manager.nome, email: manager.email, tipo: manager.tipo },
      env.JWT_SECRET,
      {
        subject: manager.id.toString(),
        expiresIn: '3d',
      }
    )

    await redis.set(`auth:${manager.id}`, token, 'EX', 86_400 * 3)

    return {
      user: {
        id: manager.id,
        nome: manager.nome,
        email: manager.email,
      },
      token,
    }
  }
}
