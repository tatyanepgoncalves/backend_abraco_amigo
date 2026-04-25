import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class AuthUserService {
  async execute({ email, senha }) {
    // Localizar o usuário
    const user = await db.query.usuarios.findFirst({
      where: eq(schema.usuarios.email, email),
    })

    if (!user) {
      throw new Error('E-mail ou senha incorretos.')
    }

    // Comparar a senha
    const senhaCompare = await compare(senha, user.senha)

    if (!senhaCompare) {
      throw new Error('E-mail ou senha incorretos.')
    }

    // Gerar o Token JWT
    // Use uma string secreta segura no seu .env
    const token = jwt.sign(
      { nome: user.nome, email: user.email, tipo: user.tipo },
      env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: '3d',
      }
    )

    await redis.set(`auth:${user.id}`, token, 'EX', 86_400 * 3)

    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        userTipo: user.userTipo,
      },
      token,
    }
  }
}
