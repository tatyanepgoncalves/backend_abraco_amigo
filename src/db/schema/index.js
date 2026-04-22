import { demandas } from './demandas.js'
import { locais } from './locais.js'
import {
  demandasRelations,
  locaisRelations,
  usuariosRelations,
  voluntariosDemandasRelations,
} from './relations.js'
import { usuarios } from './usuarios.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'

export const schema = {
  locais,
  usuarios,
  demandas,
  voluntariosDemandas,
  usuariosRelations,
  demandasRelations,
  locaisRelations,
  voluntariosDemandasRelations,
}
