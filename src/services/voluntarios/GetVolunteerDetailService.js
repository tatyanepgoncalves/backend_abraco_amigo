import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class GetVolunteerDetailService {
  async execute({ id }) {
    const result = await db.query.voluntarios.findFirst({
      where: eq(schema.voluntarios.id, id),
      with: {
        voluntariosDemandas: {
          with: {
            demanda: {
              with: {
                location: {
                  with: {
                    gestor: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!result || result.length === 0) {
      throw new Error('Voluntário não encontrado.')
    }

    const demandas = result.voluntariosDemandas.map((vd) => ({
      id: vd.demanda.id,
      titulo: vd.demanda.titulo,
      descricao: vd.demanda.descricao,
      status: vd.demanda.status,
      prioridade: vd.demanda.prioridade,
      voluntariosNecessarios: vd.demanda.voluntariosNecessarios,
      voluntariosConfirmados: vd.demanda.voluntariosConfirmados,
      criadoEm: formatDate(vd.demanda.criadoEm, true),
      atualizadoEm: formatDate(vd.demanda.atualizadoEm, true),
      location: {
        id: vd.demanda.locais.id,
        nome: vd.demanda.locais.nome,
        email: vd.demanda.locais.email,
        telefone: formatPhone(vd.demanda.locais.telefone),
        endereco: vd.demanda.locais.endereco,
        tipoLocal: vd.demanda.locais.tipoLocal,
        gestor: {
          id: vd.demanda.locais.gestor.id,
          nome: vd.demanda.locais.gestor.nome,
          telefone: formatPhone(vd.demanda.locais.gestor.telefone),
          email: vd.demanda.locais.gestor.email,
        },
      },
    }))

    return {
      id: result.id,
      nome: result.nome,
      email: result.email,
      telefone: formatPhone(result.telefone),
      endereco: result.endereco,
      criadoEm: formatDate(result.criadoEm, true),
      atualizadoEm: formatDate(result.atualizadoEm, true),
      demandas,
    }
  }
}
