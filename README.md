# Portfólio Windows XP

Portfólio pessoal com tema Windows XP. HTML + CSS + JavaScript baunilha, sem
frameworks, sem bundler, sem etapa de build. Internacionalização PT/EN
centralizada, janelas arrastáveis/redimensionáveis, três easter eggs
(Clippy, Campo Minado, Paint).

![Version](https://img.shields.io/badge/version-2.5.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## Índice

- [Visão geral](#visao-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Arquitetura](#arquitetura)
- [Sistema de conteúdo](#sistema-de-conteudo)
- [Paginação](#paginacao)
- [Configuração](#configuracao)
- [Atalhos de teclado](#atalhos-de-teclado)
- [Easter eggs](#easter-eggs)
- [Responsividade](#responsividade)
- [Acessibilidade](#acessibilidade)
- [SEO](#seo)
- [Licença](#licenca)
- [Contato](#contato)

---

## Visão geral

Simulação leve do desktop do Windows XP no navegador. Decisões de design:

- Zero dependências em runtime. Nenhum framework, nenhuma lib externa.
- Nenhuma etapa de build. O repositório pode ser servido como está.
- Um módulo por responsabilidade; estado mantido em objetos globais simples
  (sem classes, sem reatividade).
- Strings traduzíveis vivem **em um único lugar** (`js/modules/i18n.js`).
  `config.js` e os demais módulos consultam o i18n via getters — não há
  duplicação PT/EN entre data files.

### O que está implementado

- Boot screen (animação + som opcional).
- Taskbar com relógio em tempo real, botão Iniciar, tray de janelas abertas.
- Menu Iniciar com header de usuário, atalhos fixados e footer de logoff/desligar.
- Gerenciador de janelas: abrir, fechar, minimizar, maximizar/restaurar,
  arrastar pela title bar, redimensionar pelos 8 cantos/bordas, touch support.
- i18n PT/EN com troca em tempo de execução. Atualiza o atributo `lang` da
  raiz HTML para leitores de tela e SEO.
- Janela "Sobre Mim" (Bloco de Notas): abre automaticamente após o boot,
  botão fechar desabilitado por design, conteúdo PT/EN.
- Seção de projetos com três abas: **Sites**, **Projetos**, **Ecossistema
  Educacional**. Cada aba pagina independentemente (5 itens por página).
- Easter eggs: Clippy (assistente nostálgico), Campo Minado (jogo completo
  9×9 com 10 minas), Paint (pincel/lápis/borracha/balde, paleta XP, salvar
  como PNG, Ctrl+Z).
- Acessibilidade: foco visível, ARIA labels, navegação por Tab/setas,
  atalhos de teclado, região `sr-only` para leitores de tela.

---

## Tecnologias

| Camada     | Escolha                                             |
|------------|-----------------------------------------------------|
| Marcação   | HTML5 semântico                                     |
| Estilo     | CSS3 com variáveis (`:root`), Flexbox, Grid         |
| Lógica     | JavaScript ES2015+ (objetos globais, arrow fns)     |
| Empacote   | Nenhum — arquivos servidos diretamente              |
| Transporte | `<script src>` em ordem; sem `type="module"`        |

> **Nota:** o projeto usa o padrão "objeto global + `window.Foo = Foo`".
> Não usa ES Modules (`import`/`export`). A escolha foi intencional para
> manter o site funcional também via `file://` (sem CORS).

---

## Estrutura do projeto

```
portfolio-xp/
├── index.html                    # HTML principal (única página)
├── README.md
├── css/
│   ├── variables.css             # Tokens: cores, tamanhos, tipografia, z-index
│   ├── boot.css                  # Tela de boot + animações
│   ├── desktop.css               # Desktop, ícones, taskbar, menu Iniciar
│   ├── window.css                # Janelas, title bar, controles, resize handles
│   ├── content.css               # Conteúdo do portfólio (abas, cards, skills)
│   ├── eastereggs.css            # Clippy e Campo Minado
│   ├── paint.css                 # Paint
│   └── notepad.css               # Bloco de Notas "Sobre Mim"
├── js/
│   ├── main.js                   # Inicializador / orquestrador
│   ├── config.js                 # Dados pessoais + getters delegando ao i18n
│   └── modules/
│       ├── i18n.js               # Traduções + providers de dados por idioma
│       ├── boot.js               # Boot screen
│       ├── clock.js              # Relógio da taskbar
│       ├── language.js           # Troca de idioma (atualiza <html lang>)
│       ├── startMenu.js          # Menu Iniciar
│       ├── navigation.js         # Abas Sobre/Projetos/Contato + sub-abas
│       ├── pagination.js         # Paginação dentro das sub-abas de projetos
│       ├── window.js             # WindowManager (drag/resize/min/max/close)
│       ├── notepad.js            # Bloco de Notas "Sobre Mim"
│       ├── paint.js              # Paint + função open() e openPaint() global
│       ├── accessibility.js      # Navegação por teclado no desktop
│       ├── clippy.js             # Easter egg: Clippy
│       └── minesweeper.js        # Easter egg: Campo Minado
└── img/                          # Ícones .ico do XP, wallpaper, áudio de boot
```

> **Não presentes** (apesar de versões antigas deste README mencionarem):
> `sitemap.xml` e `robots.txt` não fazem parte do repositório.

---

## Como executar

O projeto roda em `file://`, mas um servidor local é recomendado para
evitar qualquer comportamento diferente de CORS com áudio/ícones.

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000 .

# PHP
php -S localhost:8000
```

Acesse `http://localhost:8000`.

---

## Arquitetura

### Fluxo de inicialização

`main.js` espera `DOMContentLoaded` e chama `init()` em cada módulo em
ordem fixa, isolando falhas (um módulo que lança erro não impede os demais).
A ordem é:

```
i18n → BootScreen → Clock → Language → StartMenu → Navigation
     → WindowManager → Notepad → Accessibility → Clippy → Minesweeper
```

Depois de 300 ms, `main.js` abre o Notepad "Sobre Mim" automaticamente —
tempo suficiente para a boot screen sair de cena.

### Padrão dos módulos

```javascript
const ModuleName = {
  // Estado do módulo
  someState: null,

  // API pública
  init() { /* registra listeners, lê DOM */ },
  doSomething() { /* ... */ }
};

window.ModuleName = ModuleName;
```

### WindowManager

`WindowManager.register(id)` é **idempotente**: chamar duas vezes para o
mesmo id é no-op. Isso protege contra o erro (corrigido nesta versão) em
que `main.js` registrava notepad/paint depois de `init()` já ter registrado,
resultando em handles de resize duplicados e listeners de `document`
anexados em dobro.

Os limites mínimos de redimensionamento (`--window-min-width` e
`--window-min-height` em `css/variables.css`) são lidos uma única vez
em `WindowManager.init()` via `getComputedStyle`. O JS respeita a mesma
fonte de verdade que o README. Fallbacks: 600×400.

### i18n + config

```
i18n.js            config.js                demais módulos
─────────          ─────────                ──────────────
translations ◄───── about.pt/en getter ──── window.PORTFOLIO_CONFIG
getProjects()      projects.pt/en getter
getSites()         sites.pt/en getter
getEcosystem()     ecosystem.pt/en getter
```

`config.js` não duplica strings. Todo texto traduzível passa por `i18n.t()`
ou por um provider nomeado (`getProjects`, `getSites`, `getEcosystem`,
`getAboutData`).

---

## Sistema de conteúdo

A seção "Projetos" possui três abas independentes:

| Aba                         | Fonte no i18n          | Provider               |
|-----------------------------|------------------------|------------------------|
| Sites                       | `site.*`               | `i18n.getSites(lang)`  |
| Projetos                    | `project.*`            | `i18n.getProjects(lang)` |
| Ecossistema Educacional     | `ecosystem.*`          | `i18n.getEcosystem(lang)` |

Para adicionar um novo projeto, edite duas coisas em `js/modules/i18n.js`:

1. Strings PT e EN na seção `translations`:
   ```js
   pt: {
     'project.meuProjeto': 'Nome do Projeto',
     'project.meuProjeto.desc': 'Descrição curta.',
   },
   en: {
     'project.meuProjeto': 'Project Name',
     'project.meuProjeto.desc': 'Short description.',
   }
   ```

2. Entrada no array retornado por `getProjects()`:
   ```js
   {
     name: this.t('project.meuProjeto', language),
     description: this.t('project.meuProjeto.desc', language),
     url: 'https://exemplo.com',
     tags: ['HTML', 'CSS', 'JS']
   }
   ```

Os mesmos passos valem para `getSites()` e `getEcosystem()` com os
prefixos `site.` e `ecosystem.`.

---

## Paginação

`pagination.js` pagina cada aba independentemente (5 itens por página,
configurável em `Pagination.itemsPerPage`).

- **Botões**: "Anterior" / "Próxima" renderizados abaixo da lista.
- **Teclado**: `←` e `→` paginam a aba ativa quando a seção "Projetos"
  está visível e o foco não está num input/textarea.
- **Hash na URL**: `#projects-page-2`, `#sites-page-2`,
  `#ecosystem-page-2` restauram a página na abertura.
- **Indicador**: "Página N de M" no idioma corrente.

---

## Configuração

### Variáveis CSS

Todas as cores e tamanhos vivem em `css/variables.css`:

```css
:root {
  --xp-blue-primary: #0058ee;
  --taskbar-height: 40px;
  --window-min-width: 600px;
  --window-min-height: 400px;
  --transition-normal: 0.3s ease;
  /* ... */
}
```

Alterar o mínimo da janela em CSS afeta também o JS (o módulo lê essas
variáveis em boot).

### Itens por página

```javascript
// js/modules/pagination.js
const Pagination = {
  itemsPerPage: 5,
  // ...
};
```

---

## Atalhos de teclado

| Atalho                   | Ação                                             |
|--------------------------|--------------------------------------------------|
| `Tab`                    | Navegar entre elementos focáveis                 |
| `Setas` (no desktop)     | Navegar entre ícones do desktop                  |
| `← / →` (em Projetos)    | Paginar a sub-aba ativa                          |
| `Enter`                  | Ativar elemento focado                           |
| `Esc`                    | Fechar janela ativa                              |
| `Alt + F4`               | Fechar janela ativa                              |
| `Ctrl + Z` (no Paint)    | Desfazer último traço                            |

---

## Easter eggs

**Clippy.** Assistente animado com mensagens nostálgicas em PT/EN.
Clicar no personagem troca a mensagem; clicar no X fecha.

**Campo Minado.** Grade 9×9 com 10 minas. Botão esquerdo revela, botão
direito alterna bandeira, clicar no rosto reinicia.

**Paint.** Lápis, pincel, borracha e balde; paleta de 28 cores do XP;
controle de tamanho de traço; Ctrl+Z; salvar como PNG. Inicialização
tardia — só monta o canvas quando o usuário abre pela primeira vez.

---

## Responsividade

Breakpoints principais em `css/content.css` e `css/desktop.css`:

- `max-width: 900px` — tablet: janela ocupa viewport com pequena margem.
- `max-width: 600px` — mobile: janela fullscreen entre taskbar e topo,
  controles de paginação empilhados verticalmente.

Touch events estão presentes em drag de janela e no Paint.

---

## Acessibilidade

- `role="button"` e `aria-label` em ícones do desktop e controles.
- Foco visível via `*:focus-visible` (em `variables.css`).
- Atributo `lang` da raiz HTML é atualizado dinamicamente em
  `Language.set()` (`pt-BR` ↔ `en`), refletindo no DOM para leitores de
  tela e SEO.
- Navegação por teclado cobre: ícones do desktop, controles de janela,
  abas de navegação, paginação de projetos.
- O Bloco de Notas é `readonly`, mas o texto é selecionável e navegável.
- Paleta atende contraste WCAG 2.1 AA para texto sobre fundos principais.

---

## SEO

- Meta tags Description / Keywords / Author.
- Open Graph completo e Twitter Card.
- `<link rel="canonical">` previne conteúdo duplicado.
- JSON-LD Schema.org (`@type: Person`) com campos `name`, `jobTitle`,
  `email`, `telephone`, `sameAs`, `knowsAbout`.
- Todas as imagens possuem `alt`.

---

## Licença

MIT. Veja `LICENSE`.

---

## Contato

- **Email:** hbrslud@gmail.com
- **Telefone:** +55 (47) 9 9783-3118
- **GitHub:** [@LuddEvergard3n](https://github.com/LuddEvergard3n)
- **LinkedIn:** [herbertbr-sorg-ludka](https://www.linkedin.com/in/herbertbr-sorg-ludka/)

---

Windows XP é marca registrada da Microsoft Corporation. Este projeto é um
tributo afetivo e não é afiliado à Microsoft.
