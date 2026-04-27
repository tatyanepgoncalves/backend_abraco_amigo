import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class UpdateVolunteerService {
  async execute({ id, nome, email, senha, telefone, endereco }) {
    // Localizar voluntário
    const volunteerExists = await db.query.voluntarios.findFirst({
      where: eq(schema.voluntarios.id, id),
    })

    if (!volunteerExists) {
      throw new Error('Voluntário não encontrado.')
    }

    const dataToUpdate = {
      atualizadoEm: new Date(),
    }

    if (nome) {
      dataToUpdate.nome = nome
    }

    if (email) {
      dataToUpdate.email = email
    }

    if (senha) {
      dataToUpdate.senha = await hash(senha, 10)
    }

    if (telefone) {
      dataToUpdate.telefone = telefone
    }

    if (endereco) {
      dataToUpdate.endereco = endereco
    }

    // Atualizar no banco
    const [volunteerUpdated] = await db
      .update(schema.voluntarios)
      .set(dataToUpdate)
      .where(eq(schema.voluntarios.id, id))
      .returning({
        id: schema.voluntarios.id,
        nome: schema.voluntarios.nome,
        email: schema.voluntarios.email,
        telefone: schema.voluntarios.telefone,
        endereco: schema.voluntarios.endereco,
        criadoEm: schema.voluntarios.criadoEm,
        atualizadoEm: schema.voluntarios.atualizadoEm,
      })

    return {
      id: volunteerUpdated.id,
      nome: volunteerUpdated.nome,
      email: volunteerUpdated.email,
      endereco: volunteerUpdated.endereco,
      telefone: formatPhone(volunteerUpdated.telefone),
      criadoEm: formatDate(volunteerUpdated.criadoEm, true),
      atualizadoEm: formatDate(volunteerUpdated.atualizadoEm, true),
    }
  }
}
