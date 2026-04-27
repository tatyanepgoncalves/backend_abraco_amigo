import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class AuthVolunteerService {
  async execute({ email, senha }) {
    // Localizar o voluntário
    const volunteer = await db.query.voluntarios.findFirst({
      where: eq(schema.voluntarios.email, email),
    })

    if (!volunteer) {
      throw new Error('E-mail ou senha incorretos.')
    }

    // Comparar a senha
    const senhaCompare = await compare(senha, volunteer.senha)

    if (!senhaCompare) {
      throw new Error('E-mail ou senha incorretos.')
    }

    // Gerar o Token JWT
    // Use uma string secreta segura no seu .env
    const token = jwt.sign(
      { nome: volunteer.nome, email: volunteer.email, tipo: volunteer.tipo },
      env.JWT_SECRET,
      {
        subject: volunteer.id.toString(),
        expiresIn: '3d',
      }
    )

    await redis.set(`auth:${volunteer.id}`, token, 'EX', 86_400 * 3)

    return {
      user: {
        id: volunteer.id,
        nome: volunteer.nome,
        email: volunteer.email,
        userTipo: volunteer.userTipo,
      },
      token,
    }
  }
}
