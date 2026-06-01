import { useCallback, useEffect, useState } from 'react'
import {
  getPopular,
  searchMovies,
  getGenres,
  discoverByGenre,
  hasApiKey,
} from './api/tmdb.js'
import Navbar from './components/Navbar.jsx'
import SearchBar from './components/SearchBar.jsx'
import GenreFilter from './components/GenreFilter.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import MovieModal from './components/MovieModal.jsx'
import FavoritesView from './components/FavoritesView.jsx'
import Loader from './components/Loader.jsx'
import EmptyState from './components/EmptyState.jsx'
import ApiKeyNotice from './components/ApiKeyNotice.jsx'
import Pagination from './components/Pagination.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'favorites'
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState(null)

  // Carrega a lista de gêneros uma única vez (RF05).
  useEffect(() => {
    if (!hasApiKey) return
    getGenres().then(setGenres).catch(() => setGenres([]))
  }, [])

  // Resolve qual conjunto de filmes carregar conforme busca / gênero / catálogo.
  const loadMovies = useCallback(async () => {
    if (!hasApiKey) return
    setLoading(true)
    setError(false)
    try {
      let data
      if (query) {
        data = await searchMovies(query, page) // RF01
      } else if (activeGenre) {
        data = await discoverByGenre(activeGenre, page) // RF05
      } else {
        data = await getPopular(page) // RF02 — "Todos": catálogo geral de populares
      }
      setMovies(data.results)
      setTotalPages(data.totalPages)
    } catch {
      setError(true)
      setMovies([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }, [query, activeGenre, page])

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  // Sempre que mudar a busca ou o gênero, volta para a primeira página.
  useEffect(() => {
    setPage(1)
  }, [query, activeGenre])

  // Ao pesquisar, limpa o filtro de gênero para evitar combinações confusas.
  const handleSearch = useCallback((value) => {
    setQuery(value)
    if (value) setActiveGenre(null)
  }, [])

  const handleSelectGenre = (genreId) => {
    setActiveGenre(genreId)
    setQuery('')
  }

  // Troca de página e rola a tela para o topo do catálogo.
  const handleChangePage = (next) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goExplore = () => setView('home')

  const sectionTitle = query
    ? `Resultados para "${query}"`
    : activeGenre
      ? genres.find((g) => g.id === activeGenre)?.name || 'Catálogo'
      : 'Catálogo de filmes populares'

  return (
    <div className="min-h-screen">
      <Navbar view={view} onChangeView={setView} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {!hasApiKey ? (
          <div className="py-12">
            <ApiKeyNotice />
          </div>
        ) : view === 'favorites' ? (
          <FavoritesView onOpen={setSelected} onExplore={goExplore} />
        ) : (
          <>
            {/* Cabeçalho de boas-vindas */}
            <section className="mb-6 rounded-2xl border border-white/5 bg-gradient-to-br from-night-700 to-night-800 p-6 sm:p-8">
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                Descubra o que assistir a seguir
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Pesquise títulos, explore tendências e monte sua lista de favoritos — tudo em um só lugar.
              </p>
              <div className="mt-5 max-w-xl">
                <SearchBar value={query} onSearch={handleSearch} />
              </div>
            </section>

            {/* Filtro por gênero */}
            {genres.length > 0 && (
              <div className="mb-6">
                <GenreFilter
                  genres={genres}
                  activeGenre={activeGenre}
                  onSelect={handleSelectGenre}
                />
              </div>
            )}

            {/* Título da seção atual */}
            <h2 className="mb-4 text-lg font-bold text-white">{sectionTitle}</h2>

            {/* Conteúdo */}
            {loading ? (
              <Loader label="Buscando filmes..." />
            ) : error ? (
              <EmptyState
                icon="⚠️"
                title="Não foi possível carregar os filmes"
                subtitle="Verifique sua conexão e se a chave da API do TMDB é válida."
              />
            ) : movies.length === 0 ? (
              <EmptyState
                title="Nenhum filme encontrado"
                subtitle="Tente outro termo de busca ou selecione um gênero diferente."
              />
            ) : (
              <>
                <MovieGrid movies={movies} onOpen={setSelected} />
                {/* Navegação entre as páginas do catálogo */}
                <Pagination page={page} totalPages={totalPages} onChange={handleChangePage} />
              </>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* RF03 — modal de detalhes */}
      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
