import { and, asc, desc, eq, isNull } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class GetDemandsService {
  async execute(filters = {}) {
    const { status, prioridade, orderBy = 'prioridade' } = filters

    // Monta o array de condições dinâmicas
    const conditions = [isNull(schema.demandas.deletadoEm)]

    if (status) {
      conditions.push(eq(schema.demandas.status, status))
    }
    if (prioridade) {
      conditions.push(eq(schema.demandas.prioridade, prioridade))
    }

    // 2. Busca as demandas com Join e filtros diretos
    let query = db
      .select({
        id: schema.demandas.id,
        titulo: schema.demandas.titulo,
        local: {
          id: schema.locais.id,
          nome: schema.locais.nome,
          endereco: schema.locais.endereco,
          telefone: schema.locais.telefone,
          email: schema.locais.email,
        },
        prioridade: schema.demandas.prioridade,
        status: schema.demandas.status,
        voluntariosNecessarios: schema.demandas.voluntariosNecessarios,
        voluntariosConfirmados: schema.demandas.voluntariosConfirmados,
        criadoEm: schema.demandas.criadoEm,
        atualizadoEm: schema.demandas.atualizadoEm,
      })
      .from(schema.demandas)
      .leftJoin(schema.locais, eq(schema.demandas.locationId, schema.locais.id))
      .where(and(...conditions)) // O SEGREDO ESTÁ AQUI: and(...conditions)

    // 3. Ordenação
    if (orderBy === 'data') {
      query = query.orderBy(desc(schema.demandas.criadoEm))
    } else {
      query = query.orderBy(asc(schema.demandas.prioridade))
    }

    const allDemands = await query

    // 4. Formata o retorno
    return allDemands.map((demand) => ({
      ...demand,
      local: demand.local?.id
        ? {
            ...demand.local,
            telefone: formatPhone(demand.local.telefone),
          }
        : null,
      criadoEm: formatDate(demand.criadoEm, true),
      atualizadoEm: formatDate(demand.atualizadoEm, true),
    }))
  }
}
