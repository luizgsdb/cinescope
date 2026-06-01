import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Navbar({ view, onChangeView }) {
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-night-900/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => onChangeView('home')}
          className="flex items-center gap-2 text-left"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/15 text-brand-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Cine<span className="text-brand-400">Scope</span>
          </span>
        </button>

        <nav className="flex items-center gap-1">
          <NavButton active={view === 'home'} onClick={() => onChangeView('home')}>
            Início
          </NavButton>
          <NavButton active={view === 'favorites'} onClick={() => onChangeView('favorites')}>
            <span className="flex items-center gap-1.5">
              Favoritos
              {favorites.length > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1.5 text-xs font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </span>
          </NavButton>
        </nav>
      </div>
    </header>
  )
}

function NavButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}
