// RF05 — filtragem por gênero (chips horizontais roláveis).
export default function GenreFilter({ genres, activeGenre, onSelect }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <Chip active={activeGenre === null} onClick={() => onSelect(null)}>
        Todos
      </Chip>
      {genres.map((g) => (
        <Chip key={g.id} active={activeGenre === g.id} onClick={() => onSelect(g.id)}>
          {g.name}
        </Chip>
      ))}
    </div>
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
