import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate } from '../../lib/utils.js'

export class GetUserDetailService {
  async execute({ id }) {
    const result = await db
      .select({
        id: schema.usuarios.id,
        nome: schema.usuarios.nome,
        email: schema.usuarios.email,
        telefone: schema.usuarios.telefone,
        endereco: schema.usuarios.endereco,
        userTipo: schema.usuarios.userTipo,
        criadoEm: schema.usuarios.criadoEm,
        atualizadoEm: schema.usuarios.atualizadoEm,
        locais: {
          nome: schema.locais.nome,
          email: schema.locais.email,
          telefone: schema.locais.telefone,
          endereco: schema.locais.endereco,
          tipoLocal: schema.locais.tipoLocal,
          gestor: {
            id: schema.usuarios.id,
            nome: schema.usuarios.nome,
            telefone: schema.usuarios.telefone,
            email: schema.usuarios.email,
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
      .from(schema.usuarios)
      .leftJoin(schema.locais, eq(schema.locais.gestorId, schema.usuarios.id))
      .leftJoin(
        schema.demandas,
        eq(schema.demandas.usuarioId, schema.usuarios.id)
      )
      .where(eq(schema.usuarios.id, id))

    if (!result || result.length === 0) {
      throw new Error('Usuário não encontrado.')
    }

    const formattedResult = result.map((row) => ({
      ...row,
      criadoEm: formatDate(row.criadoEm, true),
      atualizadoEm: formatDate(row.atualizadoEm, true),

      // Verificação segura usando optional chaining ou checando o objeto
      locais: row.locais?.id
        ? {
            ...row.locais,
            criadoEm: formatDate(row.locais.criadoEm, true),
            atualizadoEm: formatDate(row.locais.atualizadoEm, true),
          }
        : null,

      demandas: row.demandas?.id
        ? {
            ...row.demandas,
            criadoEm: formatDate(row.demandas.criadoEm, true),
          }
        : null,
    }))

    return formattedResult[0]
  }
}
