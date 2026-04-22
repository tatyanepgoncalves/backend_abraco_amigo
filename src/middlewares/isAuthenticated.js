import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { redis } from '../config/ioredis.js'

export async function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization

  // Verifica se o header exist
  if (!authToken) {
    return res.status(401).json({ error: 'Token não fornecido.' })
  }
  // Valida o formato "Bearer <token>" antes do try/catch
  const parts = authToken.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Formato de token inválido.' })
  }

  const [scheme, token] = parts
  // biome-ignore lint/performance/useTopLevelRegex: it's necessary
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Formato de token inválido.' })
  }

  try {
    // Valida estrutura do JWT e expira o JWT
    const { sub } = jwt.verify(token, env.JWT_SECRET)

    // Verificar se o token existe no Redis (Controle de sessão ativa)
    const tokenNoRedis = await redis.get(`auth:${sub}`)

    if (!tokenNoRedis || tokenNoRedis !== token) {
      return res.status(401).json({ error: 'Sessão expirada ou inválida.' })
    }

    // Injetar o ID do usuário na requisição
    req.user_id = sub

    return next()
  } catch (error) {
    const message = error.message || 'Token inválido.'

    // Tratamento especifico para token expirado
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado.' })
    }

    return res.status(401).json({ error: message })
  }
}
