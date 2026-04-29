// biome-ignore lint/suspicious/useAwait: AWAIT is not necessary
export async function authorizeSelfOrGestor(req, res, next) {
  const { id } = req.params
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'Usuário não autenticado.' })
  }

  const isOwner = user.id === id
  const isGestor = user.tipoUsuario === 'GESTOR'

  // If you are not the data owner and are not an admin, block it.
  if (!(isOwner || isGestor)) {
    return res.status(403).json({
      message:
        'Acesso negado: você não tem permissão para modificar este recurso.',
    })
  }

  next()
}
