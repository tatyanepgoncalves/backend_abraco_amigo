/**
 * Formata strings para (99) 99999-9999 ou (99) 9999-9999
 * @param {string} value - O número bruto (ex: "11988887777")
 */
export const formatPhone = (value) => {
  if (!value) {
    return ''
  }

  // Remove tudo o que não for número
  const digits = value.replace(/\D/g, '')

  // Limita a 11 dígitos
  const truncated = digits.slice(0, 11)

  if (truncated.length <= 10) {
    // Formato Fixo: (11) 4444-4444
    // biome-ignore lint/performance/useTopLevelRegex: it's necessary
    return truncated.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  // Formato Celular: (11) 9 9999-9999
  // biome-ignore lint/performance/useTopLevelRegex: it's necessary
  return truncated.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
}

/**
 * Formata objetos Date ou strings ISO para DD/MM/AAAA
 * @param {Date|string} date - A data a ser formatada
 * @param {boolean} includeTime - Se deve incluir HH:mm
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) {
    return ''
  }

  const d = typeof date === 'string' ? new Date(date) : date

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'

    options.hour12 = false
  }

  return new Intl.DateTimeFormat('pt-BR', options).format(d)
}
