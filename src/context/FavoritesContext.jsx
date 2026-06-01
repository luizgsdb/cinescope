import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'cinescope:favorites'

const FavoritesContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  // RF04 — favoritos persistidos no localStorage
  const [favorites, setFavorites] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Falha silenciosa: armazenamento indisponível não deve quebrar a UI.
    }
  }, [favorites])

  const value = useMemo(() => {
    const isFavorite = (id) => favorites.some((m) => m.id === id)

    const addFavorite = (movie) => {
      setFavorites((prev) =>
        prev.some((m) => m.id === movie.id)
          ? prev
          : [
              ...prev,
              {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                overview: movie.overview,
                genre_ids: movie.genre_ids,
              },
            ],
      )
    }

    const removeFavorite = (id) => {
      setFavorites((prev) => prev.filter((m) => m.id !== id))
    }

    // Adiciona ou remove conforme o estado atual; retorna true se passou a favorito.
    const toggleFavorite = (movie) => {
      const exists = favorites.some((m) => m.id === movie.id)
      if (exists) {
        removeFavorite(movie.id)
        return false
      }
      addFavorite(movie)
      return true
    }

    return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }
  }, [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>')
  return ctx
}
