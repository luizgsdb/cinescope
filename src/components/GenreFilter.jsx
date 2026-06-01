import { useRef } from 'react'

// RF05 — filtragem por gênero (chips roláveis com setas de navegação).
export default function GenreFilter({ genres, activeGenre, onSelect }) {
  const trackRef = useRef(null)

  // Rola a lista de gêneros horizontalmente ao clicar nas setas.
  const scrollBy = (direction) => {
    trackRef.current?.scrollBy({ left: direction * 260, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowButton direction="left" onClick={() => scrollBy(-1)} />

      <div
        ref={trackRef}
        className="no-scrollbar flex flex-1 gap-2 overflow-x-auto scroll-smooth"
      >
        <Chip active={activeGenre === null} onClick={() => onSelect(null)}>
          Todos
        </Chip>
        {genres.map((g) => (
          <Chip key={g.id} active={activeGenre === g.id} onClick={() => onSelect(g.id)}>
            {g.name}
          </Chip>
        ))}
      </div>

      <ArrowButton direction="right" onClick={() => scrollBy(1)} />
    </div>
  )
}

function ArrowButton({ direction, onClick }) {
  const isLeft = direction === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Ver gêneros anteriores' : 'Ver mais gêneros'}
      className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-white/10 bg-night-700 text-slate-300 transition hover:border-brand-500 hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={isLeft ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
      </svg>
    </button>
  )
}

function Chip({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-brand-500 bg-brand-500 text-white'
          : 'border-white/10 bg-night-700 text-slate-300 hover:border-white/25 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}
