import { useEffect, useState } from 'react'
import { getMovieDetails, backdropUrl, posterUrl } from '../api/tmdb.js'
import { formatReleaseDate } from '../lib/date.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { notifyAdded, notifyRemoved } from '../lib/toast.js'

// RF03 — detalhamento da obra (pôster, sinopse, lançamento, nota, gêneros, elenco).
export default function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    let active = true
    setLoading(true)
    getMovieDetails(movie.id)
      .then((data) => active && setDetails(data))
      .catch(() => active && setDetails(null))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [movie.id])

  // Fecha com a tecla ESC e trava o scroll do fundo enquanto aberto.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const data = details || movie
  const fav = isFavorite(movie.id)
  const rating = data.vote_average ? data.vote_average.toFixed(1) : '—'
  const backdrop = backdropUrl(data.backdrop_path) || posterUrl(data.poster_path)
  const cast = details?.credits?.cast?.slice(0, 6) || []

  const handleToggle = () => {
    const added = toggleFavorite(movie)
    if (added) notifyAdded(movie.title)
    else notifyRemoved(movie.title)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-night-800 shadow-2xl"
      >
        {/* Cabeçalho com backdrop */}
        <div className="relative h-48 w-full sm:h-64">
          {backdrop ? (
            <img src={backdrop} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-night-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-night-800 via-night-800/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-night-900/70 text-slate-200 backdrop-blur transition hover:bg-night-900 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="-mt-16 px-5 pb-6 sm:px-7">
          <div className="flex flex-col gap-5 sm:flex-row">
            {/* Pôster */}
            <img
              src={posterUrl(data.poster_path, 'w342') || '/favicon.svg'}
              alt={`Pôster de ${data.title}`}
              className="z-10 h-48 w-32 flex-shrink-0 rounded-xl border border-white/10 object-cover shadow-lg"
            />

            <div className="flex-1 pt-2 sm:pt-16">
              <h2 className="text-2xl font-extrabold leading-tight text-white">{data.title}</h2>
              {data.tagline && (
                <p className="mt-1 text-sm italic text-slate-400">{data.tagline}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {rating}
                </span>
                <span className="text-slate-400">{formatReleaseDate(data.release_date)}</span>
                {data.runtime ? (
                  <span className="text-slate-400">{data.runtime} min</span>
                ) : null}
              </div>

              {/* Gêneros */}
              {data.genres?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {data.genres.map((g) => (
                    <span
                      key={g.id}
                      className="rounded-full border border-white/10 bg-night-700 px-2.5 py-0.5 text-xs text-slate-300"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              {/* RF04 — favoritar a partir do modal */}
              <button
                onClick={handleToggle}
                className={`mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  fav
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-brand-500 text-white hover:bg-brand-600'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
                {fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              </button>
            </div>
          </div>

          {/* Sinopse */}
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-400">Sinopse</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {loading
                ? 'Carregando detalhes...'
                : data.overview || 'Sinopse não disponível em português para este título.'}
            </p>
          </div>

          {/* Elenco principal */}
          {cast.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
                Elenco principal
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {cast.map((person) => (
                  <div key={person.id} className="text-center">
                    <img
                      src={posterUrl(person.profile_path, 'w185') || '/favicon.svg'}
                      alt={person.name}
                      className="mx-auto h-20 w-20 rounded-full border border-white/10 object-cover"
                    />
                    <p className="mt-1.5 line-clamp-1 text-xs font-semibold text-slate-200">
                      {person.name}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-slate-500">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
