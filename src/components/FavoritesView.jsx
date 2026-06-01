import MovieGrid from './MovieGrid.jsx'
import EmptyState from './EmptyState.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

// RF04 — visualização e gerenciamento da lista de favoritos.
export default function FavoritesView({ onOpen, onExplore }) {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <EmptyState
          icon="❤️"
          title="Sua lista de favoritos está vazia"
          subtitle="Explore o catálogo e toque no coração dos filmes que você quer assistir depois."
        />
        <button
          onClick={onExplore}
          className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Explorar catálogo
        </button>
      </div>
    )
  }

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Meus Favoritos</h2>
          <p className="text-sm text-slate-400">
            {favorites.length} {favorites.length === 1 ? 'título salvo' : 'títulos salvos'}
          </p>
        </div>
      </div>
      <MovieGrid movies={favorites} onOpen={onOpen} />
    </section>
  )
}
