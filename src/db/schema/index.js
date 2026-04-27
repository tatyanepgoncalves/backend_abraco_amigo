import { demandas } from './demandas.js'
import { gestor } from './gestores.js'
import { locais } from './locais.js'
import {
  demandasRelations,
  gestoresRelations,
  locaisRelations,
  voluntariosDemandasRelations,
  voluntariosRelations,
} from './relations.js'
import { voluntarios } from './voluntarios.js'
import { voluntariosDemandas } from './voluntariosDemandas.js'

export const schema = {
  locais,
  demandas,
  voluntariosDemandas,
  demandasRelations,
  locaisRelations,
  voluntariosDemandasRelations,
  voluntariosRelations,
  gestoresRelations,
  voluntarios,
  gestor,
}
