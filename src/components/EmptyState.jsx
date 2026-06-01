export default function EmptyState({ title, subtitle, icon = '🎬' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      {subtitle && <p className="max-w-md text-sm text-slate-400">{subtitle}</p>}
    </div>
  )
}
