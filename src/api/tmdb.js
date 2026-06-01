import axios from 'axios'

// Chave lida da variável de ambiente (Vite expõe apenas variáveis VITE_*)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const hasApiKey = Boolean(API_KEY)

// Bases de URL do TMDB
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

// Instância Axios pré-configurada para todas as requisições ao TMDB
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
})

// ---------- Helpers de imagem ----------
export function posterUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

export function backdropUrl(path, size = 'original') {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

// ---------- RF02 — Tendências (filmes em alta) ----------
export async function getTrending(page = 1) {
  const { data } = await tmdb.get('/trending/movie/week', { params: { page } })
  return data.results
}

// ---------- RF02 — Populares ----------
export async function getPopular(page = 1) {
  const { data } = await tmdb.get('/movie/popular', { params: { page } })
  return data.results
}

// ---------- RF01 — Pesquisa por nome ----------
export async function searchMovies(query, page = 1) {
  if (!query?.trim()) return []
  const { data } = await tmdb.get('/search/movie', {
    params: { query, page, include_adult: false },
  })
  return data.results
}

// ---------- RF05 — Lista de gêneros ----------
export async function getGenres() {
  const { data } = await tmdb.get('/genre/movie/list')
  return data.genres // [{ id, name }]
}

// ---------- RF05 — Filtragem do catálogo por gênero ----------
export async function discoverByGenre(genreId, page = 1) {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      include_adult: false,
      page,
    },
  })
  return data.results
}

// ---------- RF03 — Detalhes de uma obra ----------
export async function getMovieDetails(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'credits,videos' },
  })
  return data
}

export default tmdb
