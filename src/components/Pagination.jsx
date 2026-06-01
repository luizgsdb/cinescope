// Navegação entre as páginas do catálogo (Anterior / Próxima).
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Paginação">
      <button
        onClick={() => canPrev && onChange(page - 1)}
        disabled={!canPrev}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-night-700 px-4 py-2 text-sm font-semibold text-slate-200 transition enabled:hover:border-brand-500 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Anterior
      </button>

      <span className="select-none rounded-lg bg-night-700 px-4 py-2 text-sm font-medium text-slate-300">
        Página <span className="font-bold text-white">{page}</span> de {totalPages}
      </span>

      <button
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-night-700 px-4 py-2 text-sm font-semibold text-slate-200 transition enabled:hover:border-brand-500 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Próxima
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  )
}
