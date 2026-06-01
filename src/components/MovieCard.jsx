import { posterUrl } from '../api/tmdb.js'
import { releaseYear } from '../lib/date.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { notifyAdded, notifyRemoved } from '../lib/toast.js'

export default function MovieCard({ movie, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(movie.id)
  const poster = posterUrl(movie.poster_path)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—'

  const handleToggle = (e) => {
    e.stopPropagation()
    const added = toggleFavorite(movie)
    if (added) notifyAdded(movie.title)
    else notifyRemoved(movie.title)
  }

  return (
    <article
      onClick={() => onOpen(movie)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-night-700 transition hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-900/30"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-night-600">
        {poster ? (
          <img
            src={poster}
            alt={`Pôster de ${movie.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-slate-600">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Nota de avaliação */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-night-900/85 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {rating}
        </div>

        {/* RF04 — botão de favoritar */}
        <button
          onClick={handleToggle}
          aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${
            fav
              ? 'bg-rose-500/90 text-white'
              : 'bg-night-900/70 text-slate-200 opacity-0 group-hover:opacity-100 hover:bg-rose-500/90 hover:text-white'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-100" title={movie.title}>
          {movie.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">{releaseYear(movie.release_date)}</p>
      </div>
    </article>
  )
}
