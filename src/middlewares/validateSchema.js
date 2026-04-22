import { ZodError } from 'zod'

export const validateSchema = (schema) => async (req, res, next) => {
  // console.log('Dados recebidos:', req.body)

  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    return next()
  } catch (error) {
    // Verificamos se é um erro do Zod E se tem a propriedade issues
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.issues
          ? error.issues?.map((issue) => ({
              message: issue.message,
              path: issue.path,
            }))
          : [],
      })
    }

    // Se o erro não for do Zod, mandamos para o próximo middleware de erro
    // ou retornamos um erro genérico
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message, // Adicione isso para ver o erro real no Postman
    })
  }
}
