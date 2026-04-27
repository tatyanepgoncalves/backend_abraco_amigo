import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class GetManagerDetailService {
  async execute({ id }) {
    const result = await db
      .select({
        id: schema.gestor.id,
        nome: schema.gestor.nome,
        email: schema.gestor.email,
        telefone: schema.gestor.telefone,
        endereco: schema.gestor.endereco,
        criadoEm: schema.gestor.criadoEm,
        image: schema.gestor.image,
        atualizadoEm: schema.gestor.atualizadoEm,
        locais: {
          nome: schema.locais.nome,
          email: schema.locais.email,
          telefone: schema.locais.telefone,
          endereco: schema.locais.endereco,
          tipoLocal: schema.locais.tipoLocal,
          gestor: {
            id: schema.gestor.id,
            nome: schema.gestor.nome,
            telefone: schema.gestor.telefone,
            email: schema.gestor.email,
          },
          criadoEm: schema.locais.criadoEm,
          atualizadoEm: schema.locais.atualizadoEm,
        },
        demandas: {
          id: schema.demandas.id,
          titulo: schema.demandas.titulo,
          descricao: schema.demandas.descricao,
          status: schema.demandas.status,
          prioridade: schema.demandas.prioridade,
          voluntariosNecessarios: schema.demandas.voluntariosNecessarios,
          voluntariosConfirmados: schema.demandas.voluntariosConfirmados,
          criadoEm: schema.demandas.criadoEm,
          atualizadoEm: schema.demandas.atualizadoEm,
        },
      })
      .from(schema.gestor)
      .leftJoin(schema.locais, eq(schema.locais.gestorId, schema.gestor.id))
      .leftJoin(schema.demandas, eq(schema.demandas.gestorId, schema.gestor.id))
      .where(eq(schema.gestor.id, id))

    if (!result || result.length === 0) {
      throw new Error('Gestor não encontrado.')
    }

    const formattedResult = result.map((row) => ({
      ...row,
      telefone: formatPhone(row.telefone),
      criadoEm: formatDate(row.criadoEm, true),
      atualizadoEm: formatDate(row.atualizadoEm, true),

      locais: row.locais?.id
        ? {
            ...row.locais,
            telefone: formatPhone(row.locais.telefone),
            criadoEm: formatDate(row.locais.criadoEm, true),
            atualizadoEm: formatDate(row.locais.atualizadoEm, true),
          }
        : null,

      demandas: row.demandas?.id
        ? {
            ...row.demandas,
            criadoEm: formatDate(row.demandas.criadoEm, true),
            atualizadoEm: formatDate(row.demandas.atualizadoEm, true),
          }
        : null,
    }))

    return formattedResult[0]
  }
}
