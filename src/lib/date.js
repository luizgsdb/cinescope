import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

// Formata datas de lançamento de forma amigável (ex.: "15 de outubro de 2023").
export function formatReleaseDate(dateStr) {
  if (!dateStr) return 'Data não informada'
  const d = dayjs(dateStr)
  if (!d.isValid()) return 'Data não informada'
  return d.format('DD [de] MMMM [de] YYYY')
}

// Apenas o ano (ex.: "2023").
export function releaseYear(dateStr) {
  if (!dateStr) return '—'
  const d = dayjs(dateStr)
  return d.isValid() ? d.format('YYYY') : '—'
}
