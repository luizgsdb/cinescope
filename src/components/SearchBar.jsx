import { useEffect, useState } from 'react'

// RF01 — barra de busca com "debounce" para não disparar a cada tecla.
export default function SearchBar({ value, onSearch }) {
  const [term, setTerm] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => onSearch(term.trim()), 450)
    return () => clearTimeout(id)
  }, [term, onSearch])

  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Pesquisar filmes por nome..."
        className="w-full rounded-xl border border-white/10 bg-night-700 py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
      />
      {term && (
        <button
          onClick={() => setTerm('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-white"
          aria-label="Limpar busca"
        >
          Limpar
        </button>
      )}
    </div>
  )
}
