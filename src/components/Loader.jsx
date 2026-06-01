export default function Loader({ label = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-slate-400">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-500/30 border-t-brand-500" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
