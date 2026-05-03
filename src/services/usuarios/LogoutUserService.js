import { eq } from 'drizzle-orm'
import { redis } from '../../config/ioredis.js'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class LogoutUserService {
  async execute(userId) {
    // Verificar se o usuário existe
    const user = await db.query.usuarios.findFirst({
      where: eq(schema.usuarios.id, userId),
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    // Remover o token da lista de tokens válidos
    await redis.del(`auth:${userId}`)

    return { message: `Usuário ${user.nome} deslogado com sucesso.` }
  }
}
