export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-slate-500">
      <p>
        CineScope — dados fornecidos por{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="text-brand-400 hover:underline"
        >
          The Movie Database (TMDB)
        </a>
        .
      </p>
      <p className="mt-1">Este produto utiliza a API do TMDB, mas não é endossado nem certificado pelo TMDB.</p>
    </footer>
  )
}
