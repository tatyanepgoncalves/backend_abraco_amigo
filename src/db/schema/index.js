import { categorias } from './categorias.js'
import { demandas } from './demandas.js'
import { locais } from './locais.js'
import {
  categoriasRelations,
  demandasRelations,
  locaisRelations,
  usuariosRelations,
  voluntariosDemandasRelations,
} from './relations.js'
import { usuarios } from './usuarios.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'

export const schema = {
  usuarios,
  demandas,
  locais,
  categorias,
  voluntariosDemandas,
  usuariosRelations,
  demandasRelations,
  locaisRelations,
  categoriasRelations,
  voluntariosDemandasRelations,
}
