// Exibido quando a variável VITE_TMDB_API_KEY não está configurada.
export default function ApiKeyNotice() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
      <span className="text-4xl">🔑</span>
      <h2 className="mt-3 text-xl font-bold text-white">Chave da API do TMDB não configurada</h2>
      <p className="mt-2 text-sm text-slate-300">
        Para o catálogo funcionar, defina a variável de ambiente{' '}
        <code className="rounded bg-night-900 px-1.5 py-0.5 text-brand-300">VITE_TMDB_API_KEY</code>.
      </p>
      <ol className="mx-auto mt-4 max-w-md space-y-1 text-left text-sm text-slate-400">
        <li>1. Crie a chave gratuita em themoviedb.org → Settings → API.</li>
        <li>
          2. Local: crie um arquivo <code className="text-brand-300">.env</code> com{' '}
          <code className="text-brand-300">VITE_TMDB_API_KEY=sua_chave</code>.
        </li>
        <li>3. Vercel: Settings → Environment Variables → adicione a mesma variável e refaça o deploy.</li>
      </ol>
    </div>
  )
}
