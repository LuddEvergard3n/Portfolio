# Changelog — 2.5.1 → 2.6.0

Incrementos nesta iteração: conteúdo novo + refinamentos arquiteturais.

## Conteúdo adicionado

### Ecossistema Educacional (+3 itens)

- **Archimedes** — Laboratório interativo de Física. 7 módulos, 23
  experimentos, 22 simulações a 60 fps. Motor WebAssembly (C) com fallback
  JS; integrador Velocity Verlet. Alinhado à BNCC.
- **Aristóteles** — Sistema de Filosofia para EM/ES. 9 módulos, 42 lições,
  37 textos primários anotados. Foco em prática filosófica (reconstrução
  de argumentos, classificação de posições).
- **Darwin** — Atlas dos Processos da Vida (Biologia por escalas).
  Marcado com `wip: true` → card exibe badge "Em desenvolvimento".

### Projetos (+1 em destaque)

- **ATHENA** — Motor de wargaming determinístico em C++17. 1.238
  plataformas militares, Monte Carlo com Sobol indices, 6 sistemas de
  simulação. Zero dependências externas, bit-exact reproducibility.
  Marcado com `featured: true` → card aparece no topo da aba Projetos
  com borda azul, badge "Destaque" e descrição estendida.

### Sites (+1)

- **Linda Estética** — Landing page moderna para salão de estética.

### Nova aba de topo: Ratio

Irmã de Sobre / Projetos / Contato. Contém:

- **Norma** (produto principal, em destaque) — descrição completa em 5
  seções: o que é, para quem, features (14 itens em grid), decisões de
  arquitetura, normas ABNT cobertas, contato comercial dedicado
  `+55 (47) 9 9783-3118`.
- **Site institucional** Ratio Sistemas Educacionais — card simples.

### Nova janela: Meus Documentos

Ícone do desktop "Meus Documentos" agora funcional. Clicar abre janela
draggable/resizable (mesmo padrão de Paint/Notepad) listando 5
certificações em cards:

1. Nivelamento Hackers do Bem (80h, SENAI SP/MCTI)
2. Curso Básico Hackers do Bem (64h, SENAI SP/MCTI)
3. Trilha Rápida Dev de Software (16h, SCTEC/ASCTI)
4. Trilha Rápida Análise de Dados (16h, SCTEC/ASCTI)
5. Trilha Rápida Inteligência Artificial (16h, SCTEC/ASCTI)

PDFs em `img/docs/` com nomes normalizados (sem acentos/espaços).

## Arquitetura

### Eliminação de duplicação de `createProjectCard`

Havia duas implementações divergentes (navigation.js e pagination.js).
`Navigation.createProjectCard` agora **delega** para
`Pagination.createProjectCard`, que é a fonte única de verdade. Com
fallback minimal caso Pagination não esteja carregado.

Motivação direta: princípio declarado "se uma função já existe, apenas
referencie — não reimplemente".

### Flags de card

`Pagination.createProjectCard` agora aceita flags opcionais:

| Flag              | Efeito                                             |
|-------------------|----------------------------------------------------|
| `featured: true`  | Classe `.project--featured` + badge "Destaque". Renderiza `longDescription` em bloco secundário. |
| `wip: true`       | Badge "Em desenvolvimento" + opacidade reduzida.  |
| `repo: <url>`     | Link secundário "Código-fonte" além do principal. |

Zero breaking changes: cards existentes sem essas flags continuam iguais.

### Fonte única de telefone

Dois números cadastrados: `9963-3905` (contato geral) e `9783-3118`
(Norma). Cada um vive em um lugar só:

- `9963-3905` → `CONFIG.personal.phone`, HTML contact blocks (PT/EN),
  JSON-LD Schema.org.
- `9783-3118` → `CONFIG.ratio.norma.phone` (consumido apenas por
  `ratio.js` ao renderizar o bloco Norma).

Isso elimina a inconsistência anterior onde README e JSON-LD divergiam.

### Correção do re-render de idioma

`Language.set()` tinha dois bugs:

1. `activeTab.id.includes('sites')` / `.includes('projects')` — 
   `includes('projects')` dispara **também** quando o id contém apenas
   o token "projects" no contexto `projects-list-*`, mas não dispara
   para ecosystem. Trocado por `startsWith('tab-sites' | 'tab-projects'
   | 'tab-ecosystem')`, que é mais preciso.
2. Aba Ecossistema não tinha re-render configurado ao trocar idioma →
   corrigido.

Adicionado re-render de `Docs.render()` e `Ratio.render()` dentro de
`Language.set()`, mantendo idempotência.

### Address bar

URL placeholder `http://ludd.portfolio/ratio` adicionada para a nova aba.

## Novos módulos

- `js/modules/docs.js` (~115 linhas) — renderização da janela Meus
  Documentos, com escape HTML defensivo.
- `js/modules/ratio.js` (~110 linhas) — renderização da seção Ratio com
  destaque para Norma.

Ambos idempotentes, ambos com padrão `window.Modulo = Modulo`, ambos
registrados em `main.js` na ordem de boot.

## CSS

Adicionado ~250 linhas no final de `css/content.css` para:

- `.project-header`, `.project-badge--featured`, `.project-badge--wip`,
  `.project--featured`, `.project--wip`, `.project-long`, `.project-links`,
  `.project-link--secondary`.
- `.ratio-description`, `.ratio-card`, `.ratio-card--featured`,
  `.ratio-card-header`, `.ratio-card-subtitle`, `.ratio-card-section`,
  `.ratio-features` (grid responsivo), `.ratio-card-contact`.
- `.docs-title`, `.docs-intro`, `.docs-list`, `.doc-item`,
  `.doc-item-title`, `.doc-item-meta`, `.doc-item-link`.
- Breakpoint mobile (`max-width: 600px`) para grid de features e layout
  vertical dos cards de docs.

Paleta consistente com variables existentes. Sem emojis.

## Documentação

`README.md` atualizado: árvore de diretórios (docs.js, ratio.js,
img/docs/), seção "Sistema de conteúdo" expandida com flags de card e
instruções para adicionar certificações, bullets de "O que está
implementado" incluem aba Ratio e janela Meus Documentos.

## Validação executada

- `node --check` nos 17 `.js`: todos OK.
- `html.parser` em `index.html`: sem erros.
- JSON-LD: válido; telefone correto.
- 119 chaves em PT × 119 em EN, zero desbalanceadas.
- Todas as chaves usadas por `ratio.js` e `docs.js` existem nas
  translations.
- Cross-check de `onclick="..."`: todas as funções chamadas têm
  definição.
- Referências locais em `index.html` (`src`/`href`): 45/45 resolvem no
  disco.
- 0 emojis nos ranges Unicode 1F300–1F9FF e 1F600–1F64F.
- 5 PDFs em `img/docs/` × 5 referências no i18n: casam.

## Suposição declarada

- Telefone de contato geral confirmado como `9963-3905`; `9783-3118`
  restrito ao bloco comercial Norma (conforme sua confirmação explícita).
- ATHENA foi marcado como `featured` porque você pediu "bastante
  destaque". Se quiser outro critério (ex: tamanho da descrição),
  edite `project.athena.long` em `i18n.js`.