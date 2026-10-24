# 2026-10-24 - Cícero ecosystem entry

- Added Cícero to the educational ecosystem in Portuguese and English, with its public site and repository links.

# 2026-10-24 - Icon transparency fix

- Rebuilt the optimized desktop icons through the native Windows ICO decoder so their transparency masks are preserved.
- Versioned the icon URLs to prevent browsers from reusing the broken cached images.

# 2026-10-24 - Mobile, first visit, and portfolio evidence

- Improved mobile readability, touch targets, project-tab navigation, and taskbar spacing while preserving the Windows XP design.
- Moved the PT/EN switch to the taskbar.
- Shortened the first-session boot and stopped opening Notepad automatically.
- Reduced repeated AI-focused wording and kept one plain-language disclosure in the professional profile.
- Added short Context, Contribution, Result, and Status summaries to ATHENA, Kerana Gallery, Computabilis, and Norma.
- Added native HTML fallback and Formspree processing disclosure to both contact forms.
- Replaced nine oversized ICO references with optimized WebP copies while retaining the originals.
- Added a dependency-free smoke test for the updated behavior.

# 2026-10-23 - Ratio institutional URL

- Replaced the former Ratio site address with `https://ratiosistemas.com/` in the public link and structured data.

# 2026-10-23 - Direct contact form delivery

- Connected the Portuguese and English contact forms to Formspree.
- Added in-page sending, success, and error states without introducing a new dependency.
- Updated the public copy and README to reflect direct delivery.

# 2026-10-23 - Simpler portfolio title

- Replaced the profile role line and sharing titles with `Portfólio` / `Portfolio`.

# 2026-10-23 - Faster first visit and clearer project selection

- Added a short bilingual profile with direct links to highlighted projects, static resumes, and contact details.
- Added a Highlights project tab while preserving every existing project in its original collection.
- Expanded Computabilis with its real use case, mobile focus, bilingual interface, charts, and accounting context.
- Replaced browser-generated resume downloads with pre-generated PT/EN PDF files.
- Made the boot screen run once per session, added Escape and button shortcuts, and respected reduced-motion preferences.
- Clarified that the contact form opens the visitor's email application and does not send data automatically.
- Updated sharing metadata and added a dedicated Windows XP-style preview image.

# 2026-10-19 — Professional profile and credentials

- Repositioned the public profile around digital products, technical and customer support, operations, education, and C2 English.
- Replaced executive and developer-first titles with the neutral `Digital Product Specialist` positioning used in the Europass content.
- Added transparent references to AI-assisted workflows, testing, documentation, and responsibility for published results.
- Updated PT/EN CV content with Ratio Sistemas Educacionais, Kerana Studio, Your Future Europa, Wizard by Pearson, Voo Idiomas, independent teaching, technical support, and Opus Log.
- Added the two ongoing FACULESTE postgraduate programmes and the four priority professional cybersecurity certificates.
- Added the second SCTEC Software Development certificate to the certificates window.

# Changelog — 2.8.0 → 2.8.1 (hotfix + ajustes)

Hotfix crítico do PDF vazio + 4 ajustes pontuais conforme feedback.

## 1. PDF vazio (hotfix)

### O bug

Conforme print: ao baixar o CV (PT ou EN), o PDF era gerado com nome
correto (`Herbert_Ludka_Curriculo_PT.pdf`) mas a página saía completamente
em branco. Download funcionou; a captura do html2canvas falhou.

### Diagnóstico

Três problemas independentes na implementação anterior:

1. **Estilos no wrapper, não no documento principal.**
   Em `cvDownload.js`, os `<style>` e `<link rel="stylesheet">` do CV
   eram clonados para dentro do wrapper offscreen. html2canvas (lib que
   html2pdf usa internamente) não processa `@font-face` nem
   `<link rel="stylesheet">` dentro de subárvores clonadas. O canvas
   saía em branco.

2. **`position: fixed; left: -99999px`.**
   Padrão clássico de "offscreen", mas tem reportes documentados de
   produzir captura zerada com html2canvas em browsers modernos.

3. **Reset CSS agressivo do CV.**
   O CV tem `* { margin: 0; padding: 0 }`. Se eu resolvesse (1) injetando
   os estilos no `<head>` do documento principal, esse reset apagaria
   a estilização do portfolio inteiro. Esse era o trade-off: ou capturar
   nada, ou quebrar o portfolio.

### A correção

`cvDownload.js` reescrito com três mudanças encadeadas:

#### a) `injectStyles()` no documento principal, COM ESCOPO

Os `<style>` do CV são injetados no `<head>` do documento principal,
mas antes passam por `scopeCssToWrapper()`, que prefixa cada seletor
com `#cv-render-wrapper`. O reset agressivo `* { margin: 0 }` vira
`#cv-render-wrapper * { margin: 0 }` e só atinge o wrapper offscreen.

`<link>` de fontes (Google Fonts) e `<link rel="preconnect">` são
injetados intactos — afetam `@font-face` globalmente, o que é o
comportamento desejado (mas não muda visualmente nada do portfolio).

`scopeCssToWrapper()` é um transformador CSS simples (~80 linhas) que
preserva `@media`, `@page`, `@keyframes`, `@font-face`, `@import`. Não
é um parser CSS completo, mas cobre o formato real do CSS do CV.
Idempotente via marker `data-cv-style-{lang}` no `<head>`.

#### b) Wrapper visível-mas-renderizado

Trocado de `position: fixed; left: -99999px` para
`position: absolute; top: -10000px; opacity: 0; pointer-events: none`.
O elemento **renderiza completamente** (layout estável, tamanhos
calculados, fontes aplicadas), mas o usuário não vê. Comportamento
testado e confiável em html2canvas.

#### c) `waitForLayout()` antes de capturar

Adicionado `await this.waitForLayout(200)` (1 frame + 200ms) entre o
`appendChild(wrapper)` e o `html2pdf().save()`. Isso garante que o
browser processou layout, fontes carregaram e backgrounds renderizaram
antes da captura.

#### d) Configuração extra do html2canvas

- `windowWidth` e `windowHeight` calculados a partir do clone real
  (em vez de defaults da viewport).
- `backgroundColor: '#FAFAF8'` explícito (mesma cor do CV, evita
  fundo branco padrão "vazando" em ratios A4).

### Limpeza garantida

Wrapper agora é sempre removido no `finally`, mesmo em caso de erro.
Antes, exception no meio do download deixava o wrapper no DOM.

## 2. Filosofia: frases removidas

Conforme pedido:

- **p2**: "Mediu, está lento, é problema." → removida.
- **p4**: "Comentários explicam decisões, não sintaxe. Se a função
  precisa de comentário para descrever o que faz, o nome está errado."
  → removido.

## 3. Filosofia: travessões trocados

Conforme pedido, todos os `—` substituídos por vírgula ou parênteses:

- **p3 (PT)**: "Não por hostilidade (pelo contrário, conheço o
  trade-off): ..." e "Em projetos que pretendem durar, como Norma,
  ecossistema educacional e este portfólio, pago..."
- **p3 (EN)**: análogo.
- **p4 (PT)**: "...uma carta para o próximo desenvolvedor que vai
  abrir o repositório, que provavelmente sou eu mesmo, ..."
- **p4 (EN)**: análogo.

## 4. Formspree: instruções e fallback no email correto

`js/modules/contactForm.js`:

- Cabeçalho do arquivo agora tem **passo a passo numerado** (4 passos)
  para configurar Formspree. Tempo estimado: ~3 minutos.
- `FALLBACK_EMAIL` confirmado como `hbrslud@gmail.com`. Enquanto
  Formspree não estiver configurado, o submit do form abre o cliente
  de email do visitante apontando para esse endereço.
- `FORMSPREE_ENDPOINT` mantém o placeholder `PLACEHOLDER_REPLACE_ME`
  visível para impossibilitar publicar sem configurar e ainda ter a
  detecção `_isConfigured()` funcionando.

Quando você criar a conta Formspree e substituir o endpoint, o form
passa a enviar via Formspree automaticamente — sem mais nada para
mexer.

## Validação

- `node --check` em todos os 21 JS: OK.
- 144 chaves PT × 144 chaves EN, zero desbalanceadas.
- Smoke test do scoping CSS: input 5573 bytes, output 6100 bytes,
  todas as regras corretamente prefixadas com `#cv-render-wrapper`,
  `@media print` recursivamente escopado, `@page` preservado intacto.
- Smoke test dos parágrafos novos: 0 ocorrências de travessão `—`,
  frases pedidas removidas, p2 e p4 com tamanho menor conforme.

## Para testar

1. Push do zip.
2. Hard reload (Ctrl+Shift+R) no navegador para invalidar cache do JS
   antigo.
3. Aba Contato → "Baixar CV (PT)" ou "Download Resume (EN)".
4. PDF deve abrir com layout completo agora — texto, cores azuis,
   fontes Cormorant Garamond + Karla.

Se ainda sair vazio, abrir DevTools console e procurar por mensagens
`[CvDownload]` para diagnóstico.

## Para configurar Formspree

Seguir as 4 etapas no cabeçalho de `js/modules/contactForm.js`. Resumo:
criar conta com `hbrslud@gmail.com`, criar form, copiar endpoint,
substituir `FORMSPREE_ENDPOINT`. Total: 3 minutos.
