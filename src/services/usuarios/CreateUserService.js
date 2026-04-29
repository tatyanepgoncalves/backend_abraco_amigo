import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class CreateUserService {
  async execute({ nome, email, senha, tipoUsuario }) {
    // Verifica se usuario já existe
    const userAlreadyExists = await db.query.usuarios.findFirst({
      where: eq(schema.usuarios.email, email),
    })

    if (userAlreadyExists) {
      throw new Error('Já existe uma conta com este email.')
    }

    const senhaHash = await hash(senha, 10)

    // Cria usuario no banco de dados
    const [novoUsuario] = await db
      .insert(schema.usuarios)
      .values({
        nome,
        email,
        senha: senhaHash,
        tipoUsuario,
      })
      .returning({
        id: schema.usuarios.id,
        nome: schema.usuarios.nome,
        email: schema.usuarios.email,
        tipoUsuario: schema.usuarios.tipoUsuario,
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

    return { usuario: novoUsuario, token }
  }
}
