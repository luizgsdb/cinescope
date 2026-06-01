# 📘 Documentação do Projeto CineScope

> Documento didático para apresentação acadêmica. Explica **o que foi feito**, **por que**, e **como cada parte do código funciona** — do conceito ao detalhe.

---

## Sumário

1. [Visão geral do projeto](#1-visão-geral-do-projeto)
2. [Conceitos fundamentais (entenda antes de tudo)](#2-conceitos-fundamentais)
3. [As tecnologias e o porquê de cada uma](#3-as-tecnologias-e-o-porquê-de-cada-uma)
4. [Estrutura de pastas](#4-estrutura-de-pastas)
5. [Como a aplicação funciona (o fluxo geral)](#5-como-a-aplicação-funciona-o-fluxo-geral)
6. [Explicação detalhada do código (camada por camada)](#6-explicação-detalhada-do-código)
7. [Mapeamento dos Requisitos Funcionais (RF01–RF05)](#7-mapeamento-dos-requisitos-funcionais)
8. [Etapas de criação do projeto (cronologia)](#8-etapas-de-criação-do-projeto)
9. [O deploy no Vercel](#9-o-deploy-no-vercel)
10. [Perguntas que podem cair na apresentação](#10-perguntas-que-podem-cair-na-apresentação)
11. [Glossário rápido](#11-glossário-rápido)

---

## 1. Visão geral do projeto

O **CineScope** é uma aplicação **web** (roda no navegador) que funciona como um **catálogo digital de filmes**. O usuário pode:

- Ver filmes **em alta** assim que abre a página;
- **Pesquisar** filmes por nome;
- **Filtrar** o catálogo por gênero (Ação, Comédia, Terror...);
- Clicar num filme e ver os **detalhes** (sinopse, nota, elenco, data);
- Salvar filmes numa lista de **Favoritos**.

**Problema que resolve:** as informações sobre filmes (sinopse, nota, elenco) ficam espalhadas em vários sites. O CineScope **centraliza tudo numa única tela**, economizando o tempo de quem está decidindo o que assistir.

**De onde vêm os dados?** A aplicação **não tem um banco de dados próprio de filmes**. Ela consulta, em tempo real, a **API do TMDB** (The Movie Database) — um serviço gratuito que fornece dados reais de milhares de filmes. Pense no TMDB como uma "biblioteca pública de dados de cinema" que a gente consulta pela internet.

---

## 2. Conceitos fundamentais

> Leia esta seção primeiro — ela destrava o entendimento de todo o resto.

### O que é uma API?
**API** significa "Interface de Programação de Aplicações". Na prática, é uma forma de um programa **pedir dados a outro programa pela internet**.

> Analogia: a API é como o **garçom** de um restaurante. Você (a aplicação) faz um pedido ("me traga os filmes populares"), o garçom leva o pedido para a cozinha (os servidores do TMDB) e volta com o prato pronto (os dados dos filmes em formato de texto). Você não precisa saber cozinhar — só fazer o pedido certo.

O formato de texto que a API devolve se chama **JSON** — uma maneira organizada de representar dados (listas, nomes, números).

### O que é React?
**React** é uma **biblioteca JavaScript** para construir interfaces (a parte visual da aplicação). A grande ideia do React são os **componentes**.

### O que é um componente?
Um **componente** é um pedaço reutilizável e independente da interface — tipo uma **peça de LEGO**. Cada peça tem sua aparência e seu comportamento. Você monta a tela inteira **encaixando vários componentes**.

No CineScope, por exemplo:
- `MovieCard` = a "peça" que mostra **um** filme (pôster + título + nota);
- `MovieGrid` = a "peça" que organiza **vários** `MovieCard` numa grade;
- `Navbar` = a barra de navegação no topo.

### O que é "estado" (state)?
**Estado** é a **memória** de um componente — informações que podem mudar com o tempo e que, quando mudam, fazem a tela se atualizar automaticamente.

> Exemplo: a lista de filmes na tela é um "estado". Quando o usuário pesquisa "Batman", o estado muda para a lista de filmes do Batman, e o React **redesenha a tela sozinho** com os novos filmes.

No React, criamos estado com a função `useState`.

### O que são "props"?
**Props** são **informações que um componente recebe de fora**, do componente "pai". É como passar argumentos para uma função.

> Exemplo: o `MovieGrid` recebe a lista de filmes via props e a repassa para cada `MovieCard`.

### O que é Vite?
**Vite** é a "ferramenta de obra" do projeto. Ele:
- Roda a aplicação no seu computador durante o desenvolvimento (`npm run dev`);
- **Empacota** todo o código numa versão otimizada para a internet (`npm run build`).

---

## 3. As tecnologias e o porquê de cada uma

| Tecnologia | Para que serve | Por que foi escolhida |
| ---------- | -------------- | --------------------- |
| **React** | Construir a interface com componentes | Pedido no escopo; facilita reaproveitar peças e gerenciar estado |
| **Vite** | Rodar e empacotar o projeto | Rápido e o padrão atual para projetos React |
| **Tailwind CSS** | Estilizar (cores, espaçamento, responsividade) | Estiliza escrevendo "classes" direto no HTML, sem arquivos CSS gigantes |
| **Axios** | Fazer as requisições HTTP à API do TMDB | Mais simples e legível que o `fetch` nativo; centraliza configurações |
| **Day.js** | Formatar datas | Transforma `2023-10-15` em `15 de outubro de 2023` |
| **SweetAlert2** | Mostrar notificações bonitas | Avisa de forma elegante quando um filme é favoritado/removido |

---

## 4. Estrutura de pastas

```
CineScope/
├── index.html              # Página HTML base — o React é "injetado" aqui dentro
├── package.json            # Lista de dependências e comandos do projeto
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do Tailwind (cores personalizadas etc.)
├── postcss.config.js       # Conecta o Tailwind ao processo de build
├── .env.example            # Modelo de onde vai a chave da API (sem a chave real)
├── .gitignore              # Diz ao Git o que NÃO enviar (node_modules, .env...)
├── vercel.json             # Configuração de deploy no Vercel
│
└── src/                    # TODO o código-fonte da aplicação fica aqui
    ├── main.jsx            # Ponto de partida: liga o React à página HTML
    ├── App.jsx             # Componente "cérebro": organiza tudo e controla as telas
    ├── index.css           # Estilos globais + diretivas do Tailwind
    │
    ├── api/
    │   └── tmdb.js         # Toda a comunicação com a API do TMDB
    │
    ├── context/
    │   └── FavoritesContext.jsx  # Memória global dos favoritos (compartilhada)
    │
    ├── lib/
    │   ├── date.js         # Formatação de datas com Day.js
    │   └── toast.js        # Notificações com SweetAlert2
    │
    └── components/         # As "peças de LEGO" da interface
        ├── Navbar.jsx          # Barra de topo (Início / Favoritos)
        ├── SearchBar.jsx       # Barra de pesquisa
        ├── GenreFilter.jsx     # Botões de filtro por gênero
        ├── MovieCard.jsx       # Card de um filme
        ├── MovieGrid.jsx       # Grade de cards
        ├── MovieModal.jsx      # Janela de detalhes do filme
        ├── FavoritesView.jsx   # Tela da lista de favoritos
        ├── ApiKeyNotice.jsx    # Aviso quando falta a chave da API
        ├── EmptyState.jsx      # Mensagem de "nada encontrado"
        ├── Loader.jsx          # Animação de carregamento
        └── Footer.jsx          # Rodapé (créditos ao TMDB)
```

**Princípio de organização:** cada arquivo tem **uma responsabilidade**. Isso se chama **separação de responsabilidades** e deixa o projeto fácil de entender e manter.

---

## 5. Como a aplicação funciona (o fluxo geral)

Veja o caminho completo, do momento em que a página abre até um filme aparecer na tela:

```
1. O navegador abre o index.html
2. O index.html chama o main.jsx
3. O main.jsx "liga" o componente App na tela
4. O App pede ao tmdb.js: "me traga os filmes em alta"
5. O tmdb.js usa o Axios para fazer a requisição à API do TMDB pela internet
6. O TMDB responde com uma lista de filmes (em JSON)
7. O App guarda essa lista no seu "estado"
8. O React desenha um MovieGrid, que cria um MovieCard para cada filme
9. Os pôsteres aparecem na tela 🎬
```

E quando o usuário **interage** (pesquisa, filtra, favorita), o estado muda e o React **redesenha automaticamente** só o que precisa mudar.

---

## 6. Explicação detalhada do código

### 6.1. O ponto de partida — `main.jsx`

É o **primeiro código JavaScript** que roda. Ele faz duas coisas:
1. Encontra a `<div id="root">` dentro do `index.html`;
2. "Desenha" (renderiza) o componente `App` dentro dela.

Repare que ele envolve o `App` com o `FavoritesProvider`. Isso é o que torna a lista de favoritos **acessível em qualquer componente** da aplicação (explicado no item 6.4).

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <FavoritesProvider>
    <App />
  </FavoritesProvider>
)
```

---

### 6.2. A camada de comunicação com o TMDB — `src/api/tmdb.js`

Este é um dos arquivos mais importantes. Ele **isola toda a comunicação com a API** num só lugar. Se amanhã a API mudar, você só mexe aqui.

**Primeiro, ele cria um "cliente" Axios pré-configurado:**

```js
const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,        // a chave que autoriza o acesso
    language: 'pt-BR',       // pede os dados em português
  },
})
```

> Por que isso é inteligente? Em vez de repetir o endereço da API e a chave em **toda** requisição, configuramos uma vez só. Todas as funções abaixo herdam isso automaticamente.

**Depois, cada Requisito Funcional vira uma função:**

```js
// RF02 — filmes em alta da semana
export async function getTrending() {
  const { data } = await tmdb.get('/trending/movie/week')
  return data.results
}

// RF01 — pesquisa por nome
export async function searchMovies(query) {
  const { data } = await tmdb.get('/search/movie', { params: { query } })
  return data.results
}

// RF05 — filtrar por gênero
export async function discoverByGenre(genreId) {
  const { data } = await tmdb.get('/discover/movie', {
    params: { with_genres: genreId, sort_by: 'popularity.desc' },
  })
  return data.results
}

// RF03 — detalhes completos de um filme (com elenco)
export async function getMovieDetails(movieId) {
  const { data } = await tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: 'credits' },
  })
  return data
}
```

**Conceitos-chave aqui:**
- **`async/await`**: requisições pela internet **demoram** (milésimos de segundo, mas demoram). O `await` significa "**espere** a resposta chegar antes de continuar". O `async` marca a função como assíncrona.
- **A chave da API** vem de `import.meta.env.VITE_TMDB_API_KEY` — uma **variável de ambiente**. Ela **não fica escrita no código**, por segurança. Localmente vem do arquivo `.env`; no Vercel, vem das configurações do projeto.

Também há funções auxiliares que montam o **endereço das imagens** dos pôsteres:

```js
export function posterUrl(path) {
  return `https://image.tmdb.org/t/p/w500${path}`
}
```

---

### 6.3. Formatação de datas — `src/lib/date.js`

A API devolve datas no formato técnico `2023-10-15`. O **Day.js** transforma isso em algo amigável:

```js
export function formatReleaseDate(dateStr) {
  return dayjs(dateStr).format('DD [de] MMMM [de] YYYY')
  // resultado: "15 de outubro de 2023"
}
```

---

### 6.4. A memória dos favoritos — `src/context/FavoritesContext.jsx`

Este arquivo resolve um problema clássico: **vários componentes diferentes precisam saber e mexer na lista de favoritos** (o card, o modal, a barra de navegação, a tela de favoritos).

Passar essa informação de componente em componente, manualmente, seria trabalhoso. A solução do React é o **Context** — uma espécie de "memória global" que qualquer componente pode acessar diretamente.

**O que esse arquivo faz:**

1. **Guarda a lista** de favoritos num estado.
2. **Persiste no `localStorage`** — o "porão" do navegador. Por isso, **se você fechar e reabrir a página, seus favoritos continuam lá.**

```js
// Sempre que a lista mudar, salva no navegador
useEffect(() => {
  localStorage.setItem('cinescope:favorites', JSON.stringify(favorites))
}, [favorites])
```

3. **Oferece funções** que os componentes usam: `addFavorite`, `removeFavorite`, `toggleFavorite` e `isFavorite`.

A função `toggleFavorite` é a mais usada: se o filme **já está** nos favoritos, ela remove; se **não está**, ela adiciona. Um único botão faz as duas coisas.

> Qualquer componente acessa isso chamando `useFavorites()`. Por exemplo, a Navbar usa para mostrar o **contador** de favoritos.

---

### 6.5. As notificações — `src/lib/toast.js`

Usa o **SweetAlert2** para mostrar um aviso elegante no canto da tela quando um filme é favoritado ou removido:

```js
export function notifyAdded(title) {
  Toast.fire({ icon: 'success', title: `"${title}" adicionado aos favoritos` })
}
```

---

### 6.6. Os componentes de interface — `src/components/`

#### `MovieCard.jsx` — o card de um filme
Mostra o pôster, a nota, o título e o ano. Tem **duas interações**:
- **Clicar no card** → abre o modal de detalhes;
- **Clicar no coração** → favorita/desfavorita (e dispara a notificação).

Repare no detalhe do `e.stopPropagation()` no botão de favoritar: ele **impede que o clique no coração também abra o modal**. Sem isso, clicar no coração abriria a janela de detalhes sem querer.

#### `SearchBar.jsx` — a busca com "debounce"
A barra de pesquisa tem uma técnica importante chamada **debounce**: ela **espera o usuário parar de digitar** (450 milissegundos) antes de buscar.

> Por quê? Se buscássemos a cada tecla, digitar "Batman" faria **6 requisições** (B, Ba, Bat...). Com debounce, fazemos **só 1**, quando o usuário para. Isso economiza requisições e deixa o app mais rápido.

```js
useEffect(() => {
  const id = setTimeout(() => onSearch(term.trim()), 450)
  return () => clearTimeout(id)  // cancela a busca anterior se o usuário continuar digitando
}, [term])
```

#### `MovieModal.jsx` — a janela de detalhes (RF03)
Quando você clica num filme, este componente:
1. Faz uma **nova requisição** (`getMovieDetails`) para buscar dados completos — incluindo **sinopse, gêneros, duração e elenco**, que não vêm na listagem simples;
2. Mostra tudo numa janela sobreposta (modal);
3. Pode ser fechado clicando fora, no "X" ou apertando **ESC**.

#### `GenreFilter.jsx` — filtro por gênero (RF05)
Mostra botões (chips) com os gêneros. Clicar em "Ação" filtra o catálogo para mostrar só filmes de ação.

#### Componentes de apoio
- `Loader.jsx`: a animação de "carregando" enquanto a requisição não volta;
- `EmptyState.jsx`: a mensagem de "nenhum filme encontrado";
- `ApiKeyNotice.jsx`: o aviso que aparece se a chave da API não estiver configurada;
- `Footer.jsx`: o rodapé com os créditos obrigatórios ao TMDB.

---

### 6.7. O cérebro — `src/App.jsx`

O `App` é o **maestro da orquestra**. Ele:

1. **Guarda os estados principais:**

```js
const [view, setView] = useState('home')        // tela atual: início ou favoritos
const [query, setQuery] = useState('')          // o que foi pesquisado
const [activeGenre, setActiveGenre] = useState(null)  // gênero selecionado
const [movies, setMovies] = useState([])        // a lista de filmes na tela
const [loading, setLoading] = useState(true)    // está carregando?
const [selected, setSelected] = useState(null)  // filme aberto no modal
```

2. **Decide quais filmes carregar**, com uma lógica simples de prioridade:

```js
if (query) {
  results = await searchMovies(query)       // se há busca → pesquisa (RF01)
} else if (activeGenre) {
  results = await discoverByGenre(activeGenre)  // se há gênero → filtra (RF05)
} else {
  results = await getTrending()             // senão → tendências (RF02)
}
```

3. **Monta a tela** encaixando os componentes: a `Navbar`, a `SearchBar`, o `GenreFilter`, o `MovieGrid` (ou o `Loader`/`EmptyState`), e o `MovieModal` quando há um filme selecionado.

> É aqui que tudo se conecta: o App busca os dados (via `tmdb.js`), guarda no estado, e passa para os componentes via props. Quando o usuário interage, o estado muda e o React redesenha.

---

## 7. Mapeamento dos Requisitos Funcionais

| Requisito | Onde está implementado | Como funciona |
| --------- | ---------------------- | ------------- |
| **RF01** — Pesquisa | `SearchBar.jsx` + `searchMovies()` em `tmdb.js` + lógica no `App.jsx` | O usuário digita; após o debounce, busca na API e mostra os resultados |
| **RF02** — Tendências | `getTrending()` em `tmdb.js`, chamado pelo `App.jsx` ao abrir | Carrega os filmes em alta da semana na página inicial |
| **RF03** — Detalhes | `MovieModal.jsx` + `getMovieDetails()` | Ao clicar num filme, abre um modal com pôster, sinopse, data, nota, gêneros e elenco |
| **RF04** — Favoritos | `FavoritesContext.jsx` + botão em `MovieCard`/`MovieModal` + `FavoritesView.jsx` | Adiciona/remove favoritos, com persistência no `localStorage` |
| **RF05** — Filtro por gênero | `GenreFilter.jsx` + `discoverByGenre()` | Botões de gênero filtram o catálogo exibido |

---

## 8. Etapas de criação do projeto

Esta foi a ordem lógica de construção (útil para narrar na apresentação):

1. **Estrutura base e configuração**
   Criamos os arquivos de configuração (`package.json`, `vite.config.js`, `tailwind.config.js`) e definimos as dependências (React, Axios, Day.js, SweetAlert2).

2. **Camada de dados (a "ponte" com o TMDB)**
   Escrevemos o `tmdb.js`, com o cliente Axios e uma função para cada necessidade (tendências, busca, gêneros, detalhes). Isolar isso primeiro garante uma base sólida.

3. **Gerenciamento de estado dos favoritos**
   Criamos o `FavoritesContext` com persistência no `localStorage`.

4. **Utilitários**
   Funções de data (Day.js) e notificações (SweetAlert2).

5. **Componentes de interface**
   Construímos as "peças": card, grade, barra de busca, filtro, modal, navbar, etc.

6. **Montagem final (`App.jsx`)**
   Conectamos tudo: estados, lógica de carregamento e a composição visual.

7. **Validação**
   Rodamos `npm run build` para confirmar que o projeto compila sem erros.

8. **Versionamento e deploy**
   Inicializamos o Git, enviamos ao GitHub e publicamos no Vercel.

---

## 9. O deploy no Vercel

**Deploy** = publicar a aplicação na internet para qualquer pessoa acessar.

O caminho usado foi:
1. O código foi enviado ao **GitHub** (repositório de código na nuvem);
2. O **Vercel** foi conectado ao repositório do GitHub;
3. No Vercel, cadastramos a variável de ambiente **`VITE_TMDB_API_KEY`** com a chave do TMDB;
4. O Vercel rodou `npm run build` automaticamente e publicou o resultado num **domínio** (ex.: `cinescope.vercel.app`).

**Detalhe importante para a apresentação:** a **chave da API não está no código** (está no `.gitignore`). Ela é fornecida como variável de ambiente. Isso é uma **boa prática de segurança** — evita que a chave vaze publicamente no GitHub.

**Bônus:** como o Vercel está ligado ao GitHub, **todo `git push` gera um novo deploy automático**. Isso se chama **CI/CD** (Integração e Entrega Contínuas).

---

## 10. Perguntas que podem cair na apresentação

**P: De onde vêm os dados dos filmes?**
R: Da API do TMDB (The Movie Database), consultada em tempo real pela internet. A aplicação não tem banco de dados próprio de filmes.

**P: Onde ficam salvos os favoritos? Tem banco de dados?**
R: Ficam no `localStorage` do navegador do próprio usuário. Não há servidor nem banco de dados — por isso os favoritos são individuais de cada navegador e persistem mesmo fechando a página.

**P: Por que usar componentes?**
R: Para reutilizar código e organizar a interface em peças independentes, mais fáceis de entender e manter.

**P: O que é "estado" no React?**
R: A memória de um componente. Quando o estado muda, o React atualiza a tela automaticamente.

**P: Como a aplicação fica responsiva (funciona no celular)?**
R: Pelo Tailwind CSS, com classes que adaptam o layout ao tamanho da tela (ex.: a grade mostra 2 colunas no celular e 6 no computador).

**P: Por que a busca não dispara a cada letra digitada?**
R: Por causa do "debounce" — esperamos o usuário parar de digitar para evitar requisições desnecessárias.

**P: A chave da API não está exposta?**
R: Ela não está no código-fonte (está no `.gitignore`). É injetada como variável de ambiente no Vercel. *(Observação honesta: em apps puramente front-end, a chave acaba visível no navegador do usuário final; a forma 100% segura seria ter um servidor intermediário. Para o escopo deste projeto acadêmico, a variável de ambiente já é a prática adequada.)*

**P: O que acontece se a API do TMDB sair do ar?**
R: A aplicação trata o erro e mostra uma mensagem amigável ("Não foi possível carregar os filmes"), em vez de quebrar.

---

## 11. Glossário rápido

| Termo | Significado simples |
| ----- | ------------------- |
| **API** | Forma de pedir dados a outro sistema pela internet |
| **JSON** | Formato de texto organizado em que os dados chegam |
| **Componente** | Peça reutilizável da interface |
| **Estado (state)** | Memória de um componente que, ao mudar, atualiza a tela |
| **Props** | Dados que um componente recebe de outro |
| **Requisição HTTP** | Um "pedido" feito pela internet a um servidor |
| **async/await** | Forma de esperar uma resposta que demora (ex.: da internet) |
| **localStorage** | Armazenamento permanente dentro do navegador |
| **Variável de ambiente** | Configuração (como a chave da API) guardada fora do código |
| **Deploy** | Publicar a aplicação na internet |
| **Responsivo** | Que se adapta a qualquer tamanho de tela |
| **Debounce** | Esperar a ação parar antes de reagir (evita repetição) |

---

*Documento gerado para o projeto CineScope — catálogo de filmes em React + Vite, consumindo a API do TMDB.*
