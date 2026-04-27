import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class CreateVolunteerService {
  async execute({ nome, email, senha }) {
    // Verifica se voluntário já existe
    const volunteerAlreadyExists = await db.query.voluntarios.findFirst({
      where: eq(schema.voluntarios.email, email),
    })
    
    // Verifica se existe 
    const managerEverExists = await db.query.gestor.findFirst({
      where: eq(schema.gestor.email, email),
    })

    if (volunteerAlreadyExists || managerEverExists) {
      throw new Error('Já existe uma conta com este email.')
    }

    const senhaHash = await hash(senha, 10)

    // Cria voluntário no banco de dados
    const [novoVolunteer] = await db
      .insert(schema.voluntarios)
      .values({
        nome,
        email,
        senha: senhaHash,
      })
      .returning({
        id: schema.voluntarios.id,
        nome: schema.voluntarios.nome,
        email: schema.voluntarios.email,
        criadoEm: schema.voluntarios.criadoEm,
      })

    const token = jwt.sign(
      {
        tipo: novoVolunteer.tipo,
      },
      env.JWT_SECRET,
      {
        subject: novoVolunteer.id,
        expiresIn: '1d',
      }
    )

    await redis.set(`auth:${novoVolunteer.id}`, token, 'EX', 24 * 60 * 60)

    return { user: novoVolunteer, token }
  }
}
