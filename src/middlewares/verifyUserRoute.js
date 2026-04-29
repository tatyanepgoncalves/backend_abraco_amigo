/**
 * Factory para verificar se o usuário possui um tipo específico.
 * @param {'GESTOR' | 'VOLUNTARIO'} roleToVerify
 */
export const verifyUserRole = (roleToVerify) => {
  return (req, res, next) => {
    const user = req.user

    // Verifica se o middleware de auth já rodou e injetou o user
    if (!user) {
      return res.status(401).json({
        message: 'Não autorizado: nenhum usuário autenticado.',
      })
    }

    // Extrai o tipoUsuario (conforme schema do Drizzle)
    const { tipoUsuario } = user

    // Valida a permissão
    if (tipoUsuario !== roleToVerify) {
      return res.status(403).json({
        message: `Acesso negado: A função necessária é ${roleToVerify}, mas você é ${tipoUsuario}.`,
      })
    }

    // Se estiver tudo OK, segue para o controller
    next()
  }
}
