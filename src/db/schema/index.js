import { demandas } from './demandas.js'
import { locais } from './locais.js'
import {
  demandasRelations,
  locaisRelations,
  usuariosRelations,
  voluntariosDemandasRelations,
} from './relations.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'
import { usuarios } from './usuarios.js'
import { categorias } from './categorias.js'

export const schema = {
  categorias,
  demandas,
  locais,
  usuarios,
  voluntariosDemandas,
  usuariosRelations,
  demandasRelations,
  locaisRelations,
  voluntariosDemandasRelations,
}
