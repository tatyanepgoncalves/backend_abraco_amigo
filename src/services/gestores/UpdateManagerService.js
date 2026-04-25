import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class UpdateManagerService {
  async execute({ id, nome, email, senha, telefone, endereco }) {
    // Localizar gestor
    const managerExists = await db.query.gestor.findFirst({
      where: eq(schema.gestor.id, id),
    })

    if (!managerExists) {
      throw new Error('Gestor não encontrado.')
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
    const [managerUpdated] = await db
      .update(schema.gestor)
      .set(dataToUpdate)
      .where(eq(schema.gestor.id, id))
      .returning({
        id: schema.gestor.id,
        nome: schema.gestor.nome,
        email: schema.gestor.email,
        telefone: schema.gestor.telefone,
        endereco: schema.gestor.endereco,
        criadoEm: schema.gestor.criadoEm,
        atualizadoEm: schema.gestor.atualizadoEm,
      })

    return {
      ...managerUpdated,
      endereco: managerUpdated.endereco,
      telefone: formatPhone(managerUpdated.telefone),
      criadoEm: formatDate(managerUpdated.criadoEm, true),
      atualizadoEm: formatDate(managerUpdated.atualizadoEm, true),
    }
  }
}
