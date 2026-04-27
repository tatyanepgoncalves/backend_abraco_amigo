import { and, eq, isNull, or } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { schema } from '../../db/schema/index.js'

export class CreateLocationService {
  async execute({ nome, endereco, telefone, email, gestorId, tipoLocal }) {
    // Verifica se o gestor existe
    const managerAlreadyExists = await db.query.gestor.findFirst({
      where: eq(schema.gestor.id, gestorId),
    })

    if (!managerAlreadyExists) {
      throw new Error('Gestor não encontrado.')
    }

    // Verifica se gestor já administra algum local
    const managerAlreadyHasLocation = await db.query.locais.findFirst({
      where: and(
        eq(schema.locais.gestorId, gestorId),
        isNull(schema.locais.deletadoEm)
      ),
    })

    if (managerAlreadyHasLocation) {
      throw new Error(
        `O gestor ${managerAlreadyExists.nome} já está vinculado ao local "${managerAlreadyHasLocation.nome}".`
      )
    }

    const filters = [
      eq(schema.locais.nome, nome),
      eq(schema.locais.endereco, endereco),
      eq(schema.locais.telefone, telefone),
    ]

    if (email) {
      filters.push(eq(schema.locais.email, email))
    }

    // Verifique se já existe local com o nome, endereço, telefone e email
    const locationAlreadyExists = await db
      .select()
      .from(schema.locais)
      .where(or(...filters))
      .limit(1)

    if (locationAlreadyExists.length > 0) {
      throw new Error(
        'Já existe local com alguma dessas informações informadas.'
      )
    }

    // Cria local e add no banco de dados
    const [inserted] = await db
      .insert(schema.locais)
      .values({ nome, endereco, telefone, email, gestorId, tipoLocal })
      .returning({ id: schema.locais.id })

    const localCompleto = await db
      .select({
        id: schema.locais.id,
        nome: schema.locais.nome,
        telefone: schema.locais.telefone,
        email: schema.locais.email,
        tipoLocal: schema.locais.tipoLocal,
        gestor: {
          id: schema.gestor.id,
          nome: schema.gestor.nome,
          email: schema.gestor.email,
        },
        criadoEm: schema.locais.criadoEm,
        atualizadoEm: schema.locais.atualizadoEm,
        deletadoEm: schema.locais.deletadoEm,
      })
      .from(schema.locais)
      .leftJoin(schema.gestor, eq(schema.gestor.id, schema.locais.gestorId))
      .where(eq(schema.locais.id, inserted.id))

    return localCompleto[0]
  }
}
