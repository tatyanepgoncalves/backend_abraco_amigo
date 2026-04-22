import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class GetUserDetailService {
  async execute({ id }) {
    const result = await db
      .select({
        id: schema.usuarios.id,
        nome: schema.usuarios.nome,
        email: schema.usuarios.email,
        telefone: schema.usuarios.telefone,
        endereco: schema.usuarios.endereco,

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
        },
      })
      .from(schema.usuarios)
      .leftJoin(schema.locais, eq(schema.locais.gestorId, schema.usuarios.id))
      .leftJoin(
        schema.demandas,
        eq(schema.demandas.usuarioId, schema.usuarios.id)
      )
      .where(eq(schema.usuarios.id, id))

    if (!result) {
      throw new Error('Usuário não encontrado.')
    }

    return result[0]
  }
}
