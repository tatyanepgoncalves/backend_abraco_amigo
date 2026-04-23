import { eq } from 'drizzle-orm'
import { db } from '../db/connection.js'
import { schema } from '../db/schema/index.js'

export async function isGestor(req, res, next) {
  const userId = req.user_id

  // Busca o usuário no banco de dados
  const user = await db.query.usuarios.findFirst({
    where: eq(schema.usuarios.id, userId),
  })

  if (!user || user.userTipo.toUpperCase() !== 'GESTOR') {
    return res.status(403).json({ error: 'Apenas gestores possuem permissão.' })
  }

  // Injeta o tipo para os próximos middlewares/controllers usarem
  req.userTipo = user.userTipo

  next()
}
