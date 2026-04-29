import { eq, sql } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class DeleteCategoriaService {
  async execute(id) {
    // Verificar se a categoria existe e já não está deletada
    const categoria = await db.query.categorias.findFirst({
      where: eq(schema.categorias.id, id),
    })

    if (!categoria || categoria.deletadaEm) {
      throw new Error('Categoria não encontrada ou já excluída.')
    }

    // [OPCIONAL] Verificar se existem demandas ativas nesta categoria
    // Se houver demandas, você pode impedir a exclusão para manter a integridade
    const demandasVinculadas = await db
      .select({ count: sql`count(*)` })
      .from(schema.demandas)
      .where(eq(schema.demandas.categoria, id))

    if (Number(demandasVinculadas[0].count) > 0) {
      throw new Error(
        'Não é possível excluir uma categoria que possui demandas vinculadas.'
      )
    }

    // Executar o Soft Delete (Exclusão Lógica)
    await db
      .update(schema.categorias)
      .set({ deletadaEm: new Date() })
      .where(eq(schema.categorias.id, id))

    return { message: 'Categoria excluída com sucesso.' }
  }
}
