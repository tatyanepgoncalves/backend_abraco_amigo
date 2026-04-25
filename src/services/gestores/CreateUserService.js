import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class CreateUserService {
  async execute({ nome, email, senha, userTipo }) {
    // Verifica se usuario já existe
    const usuarioJaExiste = await db.query.usuarios.findFirst({
      where: eq(schema.usuarios.email, email),
    })

    if (usuarioJaExiste) {
      throw new Error('Já existe um usuário com este email.')
    }

    const senhaHash = await hash(senha, 10)

    // Cria usuario no banco de dados
    const [novoUsuario] = await db
      .insert(schema.usuarios)
      .values({
        nome,
        email,
        senha: senhaHash,
        userTipo,
      })
      .returning({
        id: schema.usuarios.id,
        nome: schema.usuarios.nome,
        email: schema.usuarios.email,
        userTipo: schema.usuarios.userTipo,
        criadoEm: schema.usuarios.criadoEm,
      })

    const token = jwt.sign(
      {
        tipo: novoUsuario.tipo,
      },
      env.JWT_SECRET,
      {
        subject: novoUsuario.id,
        expiresIn: '1d',
      }
    )

    await redis.set(`auth:${novoUsuario.id}`, token, 'EX', 24 * 60 * 60)

    return { user: novoUsuario, token }
  }
}
