# Changelog — 2.6.4 → 2.7.0

Quatro features pequenas mas independentes.

## 1. "Meus Documentos" → "Certificados"

Renomeado em todos os pontos visíveis ao usuário:

- Ícone do desktop (label PT/EN, alt, aria-label).
- Item do Menu Iniciar.
- Título da janela.
- Strings i18n: `docs.title`, `desktop.myDocuments` (chave mantida por
  compatibilidade interna; valor agora é "Certificados" / "Certificates").

IDs internos preservados: `docs-window`, `data-window-id="docs"`,
função `openDocs()`. Renomear esses só por estética seria mexer em
contrato sem ganho.

Comentários de código também atualizados para consistência.

## 2. Câmera e Scanner abre webcam de verdade

Easter egg novo. Ícone "Câmera e Scanner" antes era decorativo
(onclick prevenia default). Agora abre uma janela funcional com a
webcam do visitante via `getUserMedia`.

**Implementação** (`js/modules/webcam.js`, ~180 linhas):

- Botões: ligar / capturar / parar.
- Snapshot via `<canvas>` baixa um PNG (sem upload, sem servidor).
- Trata os erros relevantes do `getUserMedia`:
  - `NotAllowedError` → "permissão negada".
  - `NotFoundError` / `OverconstrainedError` → "nenhuma câmera detectada".
  - `NotSupportedError` ou ausência da API → "só funciona em HTTPS ou
    localhost". GitHub Pages é HTTPS, então ok lá.
  - genérico → "não foi possível acessar".
- O stream é parado **explicitamente** (`track.stop()`) ao fechar a
  janela. Sem isso a luz da câmera ficaria acesa mesmo com a janela
  fechada.
- Re-renderiza ao trocar de idioma (`Webcam.rerender()` chamado de
  `Language.set()`).

**12 strings i18n** (PT e EN) sob prefixo `webcam.*`.

**CSS dedicado** em `content.css`: webcam-stage com aspect-ratio 4:3,
status com cores semânticas (verde live, vermelho erro, amarelo
pending), botões coerentes com estética do resto.

## 3. Easter-egg star em Câmera + Certificados

Os dois ícones receberam a classe `.easter-egg`, que já existia no
CSS para Clippy e Campo Minado:

- Estrela animada no canto superior direito (`::after`).
- Pulso suave no ícone (`@keyframes easterEggPulse`).
- Bold no nome.

Zero código novo — só duas trocas de classe no HTML.

## 4. Clippy movível

Antes Clippy era estático no canto. Agora arrastável com mouse e
touch.

**Decisões**:

- Drag aplicado ao container inteiro, com `cursor: move`.
- **Threshold de 4px** distingue clique de drag. Sem isso, o clique no
  personagem (que mostra a próxima mensagem) seria disparado ao final
  de qualquer arrasto.
- Após um drag real, o próximo evento `click` é interceptado e
  bloqueado via `addEventListener('click', handler, true)` (capture
  phase) — caso contrário o handler do `.clippy-character` rodaria
  imediatamente após soltar o mouse.
- Botões interativos (`.clippy-balloon-actions button`, `.clippy-close`)
  ignoram o início do drag — preserva a UX deles.
- Conversão lazy de `right/bottom` para `left/top` no primeiro drag
  (o CSS posiciona Clippy via right/bottom; só convertemos quando
  necessário).
- Clamp na viewport: Clippy não pode ser arrastado para fora.
- Suporte mouse + touch (4 listeners cada).

Tudo dentro de `Clippy.initDrag()` em `clippy.js`. Sem dependência do
WindowManager — Clippy não tem `.title-bar`, então `WindowManager.initDrag()`
não se aplicaria sem hacks.

## Validação

- `node --check` em todos os 19 JS: OK.
- 139 chaves PT × 139 chaves EN, zero desbalanceadas.
- 47/47 referências locais em `index.html` resolvem.
- Cross-check de `onclick` handlers: `openDocs`, `openWebcam`,
  `openNotepad`, `openWindow`, `openPaint`, `setLang`, `showSection`,
  `showProjectTab`, `toggleStartMenu`, `toggleWindow` — todos têm
  definição.
- Zero referências visíveis ao usuário a "Meus Documentos" / "My Documents".

## Limitação honesta declarada

`getUserMedia` exige contexto seguro:
- HTTPS (GitHub Pages: ok)
- ou `http://localhost` (dev local: ok)
- ou `file://` (alguns navegadores ainda permitem; o módulo trata o
  bloqueio com mensagem clara se acontecer)

Se o portfólio for servido em `http://` puro (sem HTTPS), o navegador
recusa a câmera e o módulo mostra a mensagem `webcam.error.insecure`.
Esse é comportamento correto da web platform — não é bug.
