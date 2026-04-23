import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class GetUserTasksService {
  async execute(email) {
    // Buscamos na tabela de junção, trazendo os dados da demanda e do local
    const tasks = await db
      .select({
        id: schema.demandas.id,
        titulo: schema.demandas.titulo,
        descricao: schema.demandas.descricao,
        status: schema.demandas.status,
        prioridade: schema.demandas.prioridade,
        criadoEm: schema.demandas.criadoEm,
        local: {
          nome: schema.locais.nome,
          endereco: schema.locais.endereco,
        },
        inscritoEm: schema.voluntariosDemandas.criadoEm,
      })
      .from(schema.voluntariosDemandas)
      .innerJoin(
        schema.demandas,
        eq(schema.voluntariosDemandas.demandaId, schema.demandas.id)
      )
      .innerJoin(
        schema.locais,
        eq(schema.demandas.locationId, schema.locais.id)
      )
      .where(eq(schema.voluntariosDemandas.email, email))
      .orderBy(schema.demandas.prioridade)

    return tasks
  }
}
