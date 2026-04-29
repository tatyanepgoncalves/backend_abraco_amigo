import { ilike } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class CreateCategoriaService {
  async execute({ nome }) {
    // Verificar se já existe uma categoria com esse nome (case-insensitive)
    const categoriaExistente = await db.query.categorias.findFirst({
      where: ilike(schema.categorias.nome, nome),
    })

    if (categoriaExistente) {
      throw new Error('Já existe uma categoria cadastrada com este nome.')
    }

    // Inserir no banco de dados
    const [novaCategoria] = await db
      .insert(schema.categorias)
      .values({
        nome: nome.trim(), // Remove espaços extras
      })
      .returning()

    return novaCategoria
  }
}
