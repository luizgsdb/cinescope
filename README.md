# 🎬 CineScope

Plataforma web interativa para **explorar, pesquisar e gerenciar** informações sobre filmes — um catálogo digital atualizado em tempo real, com dados reais da [TMDB](https://www.themoviedb.org/).

## ✨ Funcionalidades

| Código | Funcionalidade |
| ------ | -------------- |
| **RF01** | Pesquisa de títulos por nome (barra de busca com debounce) |
| **RF02** | Exibição de tendências/populares na página inicial |
| **RF03** | Detalhamento da obra em modal: pôster, sinopse, lançamento, nota, gêneros e elenco |
| **RF04** | Gerenciamento de favoritos (adicionar/remover, persistido no navegador) |
| **RF05** | Filtragem do catálogo por gênero |

## 🛠️ Tecnologias

- **React 18** + **Vite** — interface e componentização
- **Tailwind CSS** — layout responsivo e moderno
- **Axios** — requisições HTTP à API do TMDB
- **Day.js** — formatação amigável de datas
- **SweetAlert2** — notificações ao favoritar/desfavoritar

---

## 🚀 Como rodar localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure a chave da API do TMDB

> ⚠️ A API do TMDB **não exige** o domínio do Vercel. Ela é liberada por uma **chave gratuita**.

1. Crie uma conta em https://www.themoviedb.org/signup
2. Acesse https://www.themoviedb.org/settings/api e solicite uma **API Key (v3 auth)**
3. Copie o arquivo de exemplo e cole sua chave:

```bash
copy .env.example .env   # Windows
# cp .env.example .env    # Linux/macOS
```

4. Edite o `.env`:

```
VITE_TMDB_API_KEY=sua_chave_aqui
```

### 3. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Abra o endereço exibido no terminal (normalmente http://localhost:5173).

---

## ☁️ Deploy no Vercel

1. Suba este projeto para um repositório **GitHub** (ou GitLab/Bitbucket).
2. Em https://vercel.com → **Add New → Project** → importe o repositório.
3. O Vercel detecta **Vite** automaticamente:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Em **Environment Variables**, adicione:
   - **Name:** `VITE_TMDB_API_KEY`
   - **Value:** sua chave do TMDB
5. Clique em **Deploy**. Ao final, o Vercel gera seu domínio (ex.: `cinescope.vercel.app`).

> Sempre que alterar variáveis de ambiente no Vercel, faça um **novo deploy** para que entrem em vigor.

### Alternativa via CLI

```bash
npm i -g vercel
vercel               # primeiro deploy (preview)
vercel --prod        # deploy de produção
```

---

## 📁 Estrutura

```
src/
├── api/tmdb.js              # Cliente Axios + endpoints do TMDB
├── context/                 # Estado global de favoritos (localStorage)
├── lib/                     # Helpers (datas com Day.js, toasts com SweetAlert2)
├── components/              # Navbar, SearchBar, GenreFilter, MovieCard,
│                            # MovieGrid, MovieModal, FavoritesView, etc.
├── App.jsx                  # Orquestração das telas e dos requisitos
└── main.jsx                 # Ponto de entrada
```

---

Dados fornecidos pela API do TMDB. Este produto utiliza a API do TMDB, mas não é endossado nem certificado pelo TMDB.
