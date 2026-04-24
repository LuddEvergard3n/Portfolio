# Changelog — 2.6.1 → 2.6.2

Quatro reversões/ajustes pontuais conforme feedback.

## Skills — Linguagens

- **C# substituído por Python** na lista de linguagens.
  - `skill.csharp` removida (PT e EN).
  - `skill.python` adicionada com descrição contextualizada nos
    seus projetos reais: "Automação, análise de dados, integração
    com LLMs e pipelines de geração de documentos (PDF Builder)".
  - `getSkills()` atualizado para referenciar `skill.python` no lugar
    de `skill.csharp`.
- Ordem final: C++, C, Python, Objective-C, Java, JavaScript.

## Skills — IA (revertido)

Voltou aos três itens originais, sem reescrita:

- `skill.prompt` — "Engenharia de Prompts para LLMs - Claude, GPT,
  modelos open-source"
- `skill.llm-integration` — "Integração de LLMs em aplicações web"
- `skill.llm-optimization` — "Otimização de contexto e fine-tuning de
  respostas"

`getSkills()` atualizado para usar essas chaves novamente.
As três chaves intermediárias (`skill.llm-prompt`, `skill.llm-coding`,
e o `skill.llm-integration` reescrito) foram removidas.

## "Sobre Mim" (notepad) — revertido

Voltou ao texto original em ambos os idiomas:

- PT: "Prazer, eu sou o Herbert (LuddEvergard3n)" + filosofia imutável
  + três questões + "É isso. Se quiser entrar em contato...".
- EN: "Nice to meet you, I'm Herbert (LuddEvergard3n)" + correspondente.

## ATHENA — destaque sem badge textual

Antes: card com classe `.project--featured` (borda azul, fundo
diferenciado, posição no topo) **e** badge "Destaque" / "Featured"
no header.

Depois: card mantém apenas o destaque visual:

- Borda azul lateral (`border-left: 4px solid var(--xp-blue-primary)`).
- Fundo gradient sutil.
- Posição preservada (primeiro item da aba Projetos).
- `longDescription` renderizada em bloco secundário se fornecida.

Mudança em `js/modules/pagination.js:createProjectCard()`: o bloco
`if (item.featured)` que criava o `<span class="project-badge--featured">`
foi removido. O bloco `if (item.wip)` permanece — não foi pedida
mudança ali, e Darwin continua marcado como WIP.

JSDoc do método atualizado para descrever o comportamento novo.

CSS de `.project-badge--featured` foi mantido em `content.css` porque
ainda é usado pela Norma (aba Ratio, badge "Produto principal" — caso
distinto, não afetado por esta mudança).

## Validação

- `node --check` em todos os JS: OK.
- 128 chaves PT × 128 chaves EN, zero desbalanceadas.
- Zero chaves `skill.*` órfãs (definidas mas não usadas).
- Smoke test: ATHENA continua marcado `featured: true` no array de
  projetos e aparece em primeiro lugar; renderização do card já não
  produz a string "Destaque" nem "Featured".
- Grep global por "Destaque" / "Featured" fora de comentários: zero
  ocorrências em arquivos servidos ao usuário.
