import { and, eq, ilike, ne } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class UpdateCategoriaService {
  async execute({ id, nome }) {
    // Verificar se a categoria existe
    const categoria = await db.query.categorias.findFirst({
      where: eq(schema.categorias.id, id),
    })

    if (!categoria) {
      throw new Error('Categoria não encontrada.')
    }

    // Verificar se o novo nome já existe em OUTRA categoria
    // Usamos 'ne' (not equal) para ignorar a própria categoria que estamos editando
    const nomeJaExiste = await db.query.categorias.findFirst({
      where: and(
        ilike(schema.categorias.nome, nome.trim()),
        ne(schema.categorias.id, id)
      ),
    })

    if (nomeJaExiste) {
      throw new Error('Já existe outra categoria com este nome.')
    }

    // Atualizar
    const [categoriaAtualizada] = await db
      .update(schema.categorias)
      .set({
        nome: nome.trim(),
        atualizadoEm: new Date(),
      })
      .where(eq(schema.categorias.id, id))
      .returning()

    return categoriaAtualizada
  }
}
