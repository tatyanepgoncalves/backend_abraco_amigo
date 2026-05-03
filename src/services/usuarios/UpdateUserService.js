import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'
import { formatDate, formatPhone } from '../../lib/utils.js'

export class UpdateUserService {
  async execute({ id, nome, email, senha, telefone, endereco, image }) {
    // Localizar gestor
    const userExists = await db.query.usuarios.findFirst({
      where: eq(schema.usuarios.id, id),
    })

    if (!userExists) {
      throw new Error('Usuário não encontrado.')
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

    if (image) {
      dataToUpdate.image = image
    }

    // Atualizar no banco
    const [userUpdated] = await db
      .update(schema.usuarios)
      .set(dataToUpdate)
      .where(eq(schema.usuarios.id, id))
      .returning({
        id: schema.usuarios.id,
        nome: schema.usuarios.nome,
        email: schema.usuarios.email,
        telefone: schema.usuarios.telefone,
        endereco: schema.usuarios.endereco,
        image: schema.usuarios.image,
        criadoEm: schema.usuarios.criadoEm,
        atualizadoEm: schema.usuarios.atualizadoEm,
      })

    return {
      ...userUpdated,
      endereco: userUpdated.endereco,
      telefone: formatPhone(userUpdated.telefone),
      criadoEm: formatDate(userUpdated.criadoEm, true),
      atualizadoEm: formatDate(userUpdated.atualizadoEm, true),
    }
  }
}
