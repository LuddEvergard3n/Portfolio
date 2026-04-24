# Changelog — 2.5.0 → 2.5.1

Correções aplicadas nesta iteração, em ordem de impacto.

## Removido

- `js/modules/script.js` (267 linhas). Reimplementava boot, start menu,
  navegação, language, window e clock — todos já refatorados em módulos
  próprios. Não era carregado pelo `index.html`; era código morto.

## Corrigido

### 1. Registro duplicado de janelas (bug de runtime)

`main.js` chamava `WindowManager.register('notepad')` e `register('paint')`
**depois** de `WindowManager.init()` já ter registrado as mesmas janelas.
Consequências eliminadas:

- 8 handles de resize duplicados no DOM por janela.
- Listeners de `mousemove`/`mouseup`/`touchmove` em `document` anexados
  duas vezes.
- Jitter em drag/resize perceptível especialmente em mobile.

**Fix:** `WindowManager.register(id)` agora é idempotente (guard-clause em
`this.windows[id]`). As chamadas redundantes em `main.js` foram removidas.

### 2. Paginação por teclado silenciosamente quebrada

`pagination.js:54-55` filtrava aba ativa por `id === 'projects-content'` /
`'sites-content'` — IDs que **nunca existiram** no HTML. As setas ← →
retornavam cedo 100% das vezes.

**Fix:** passou a localizar a aba ativa via
`#projects .lang.${lang} .project-tab-content.active`, extrair o nome da
aba do próprio id (`tab-<nome>-<lang>`) e paginar a aba correta. Agora
funciona para as 3 sub-abas: sites, projects, ecosystem. Também ignora
quando o foco está em `<input>`/`<textarea>`/`contenteditable`.

### 3. Atributo `<html lang>` fixo em `pt-BR`

Não era atualizado ao trocar idioma. Impacto em leitores de tela e SEO.

**Fix:** `Language.set()` agora faz `document.documentElement.lang = ...`.

### 4. Limites mínimos de janela hardcoded vs documentados em CSS

`window.js` tinha `minWidth = 600`/`minHeight = 400` hardcoded em
`initResize`, enquanto o README documentava `--window-min-width` /
`--window-min-height` em `css/variables.css` como fonte de verdade.

**Fix:** `WindowManager.init()` lê as CSS vars uma única vez (via
`getComputedStyle`) e cacheia em `WindowManager.minWidth`/`.minHeight`.
Fallbacks 600/400 se as variáveis não existirem. `readCssPxVar()` é o
helper dedicado.

### 5. `openPaint()` inline no `index.html`

Violava a separação de responsabilidades que o resto do projeto segue
(tudo em módulos; zero lógica no HTML).

**Fix:**

- Criado `Paint.open()` e `Paint.renderPalette()` em `paint.js`.
- `<script>` inline removido do HTML.
- Ordem dentro de `open()` invertida: `renderPalette()` antes de `init()`
  (o `init()` procura `.paint-color` no DOM, então a paleta precisa
  existir antes).
- `renderPalette()` é idempotente (checa `palette.children.length`).

### 6. Telefone inconsistente entre documentação e UI

Cinco ocorrências no repo, com dois números diferentes. Padronizado para
`+55 (47) 9 9783-3118` em:

- `index.html` — JSON-LD Schema.org (`telephone`)
- `index.html` — contato PT (`tel:` + label)
- `index.html` — contato EN (`tel:` + label)
- `js/config.js` — `personal.phone`
- `README.md` — bloco de contato

**Suposição declarada:** assumi que `9783-3118` é o correto, baseado em
convenção anterior. Se for o outro, ajuste nesses 5 lugares.

### 7. Emojis no código e UI

Removidos ou substituídos por equivalentes tipográficos:

- `main.js` — 18 emojis em `console.log` decorativos, todos removidos
  junto com reescrita do bootstrap.
- `boot.js` — 🔊 e ⚠️ removidos de logs e da dica visual (HTML → text).
- `paint.js` — 🎨 removido de log; ❓ trocado por `?`.
- `index.html` — 🗑️ 💾 ✏️ 🖌️ 🧹 🪣 da toolbar/ferramentas do Paint
  substituídos por rótulos textuais bilíngues (`Limpar/Clear`,
  `Salvar/Save`, `L`, `P`, `B`, `T`).
- `desktop.css` — ✨ do marker de easter egg → `★` (U+2605) estilizado
  com cor amarela e text-shadow.
- `window.css` — ✕ do close button → `×` (U+00D7 via escape `\00D7`).
- `minesweeper.js` — ✕ do close button → `×` (U+00D7 via `\u00D7`).
  Emojis de estado do jogo (🙂😵😎💣🚩) centralizados numa tabela
  `Minesweeper.glyphs` e substituídos por `:)`, `X(`, `B)`, `●`
  (U+25CF), `⚑` (U+2691). Centralização permite trocar por sprites
  depois sem hunt-and-peck pelo arquivo.

### 8. Tratamento de falha no bootstrap

`main.js` tinha um `try/catch` envolvendo o boot inteiro — uma falha num
módulo escondia qual e pulava os seguintes com pouca informação.

**Fix:** cada módulo é inicializado via `initModule(name)`, que isola sua
falha e loga o nome e o erro. Módulo ausente vira warning, módulo
quebrado vira `console.error` com contexto.

## Documentação

- `README.md` reescrito. Reflete a arquitetura real (3 abas, não
  paginação linear). Remove menções a `sitemap.xml`/`robots.txt` que não
  existem. Inclui aba "Ecossistema Educacional". Documenta o i18n como
  fonte única de strings traduzíveis. Detalha o padrão de módulos
  (objeto global + `window.Foo = Foo`, sem ES Modules — por escolha,
  para rodar via `file://`).

## Não incluído (escopo para próxima passagem)

- Refatoração dos 21 `onclick="..."` inline para event delegation via
  `data-action`. É mudança arquitetural maior, merece commit isolado.
- `console.log` informativos em `paint.js` e `pagination.js` permanecem
  (úteis em dev; em produção podem ser removidos por um stripper de
  build se quiser — mas isso contraria o princípio de zero-build).
- Substituir glyphs do Minesweeper por sprites PNG. A tabela
  `Minesweeper.glyphs` deixa o caminho pronto; só não foi feito porque
  não tinha sprites disponíveis.

## Validação feita

- `node --check` em todos os 15 arquivos `.js`: OK.
- `html.parser` em `index.html`: sem erros.
- `json.loads()` no JSON-LD Schema.org: válido.
- Checagem de referências: todas as funções/objetos chamados via
  `onclick` têm definição correspondente nos módulos.
- Grep de emojis (ranges Unicode 1F300-1F9FF e 1F600-1F64F): 0
  ocorrências em `.js`/`.html`/`.css`/`.md`.
- Grep do telefone antigo (`9963-3905`): 0 ocorrências.
- Grep de IDs fantasmas (`projects-content`, `sites-content`): só em
  comentário explicativo em `pagination.js`.
