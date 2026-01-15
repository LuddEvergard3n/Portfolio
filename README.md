#  Windows XP Portfolio

Portfólio pessoal com tema nostálgico do Windows XP, desenvolvido com HTML, CSS e JavaScript vanilla. Inclui funcionalidades interativas, suporte a múltiplos idiomas (PT/EN) e easter eggs.

![Version](https://img.shields.io/badge/version-2.5.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Arquitetura](#-arquitetura)
- [Configuração](#-configuração)
- [Easter Eggs](#-easter-eggs)
- [Desempenho](#-desempenho)
- [Responsividade](#-responsividade)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## Características

### Funcionalidades Principais
- **Tela de Boot**: Animação autêntica do Windows XP na inicialização
- **Janelas Arrastáveis**: Arraste janelas pela barra de título com performance otimizada
- **Redimensionamento**: Redimensione janelas pelos cantos e bordas
- **Maximizar/Minimizar**: Controles totalmente funcionais
- **Menu Iniciar**: Menu com design fiel ao Windows XP
- **Barra de Tarefas**: Com relógio em tempo real e múltiplas janelas
- **Múltiplos Idiomas**: Suporte para Português e Inglês com sistema i18n centralizado
- **Sistema de Paginação**: Navegação por páginas com 5 projetos por vez (botões + teclado)
- **Notepad "Sobre Mim"**: Bloco de Notas dedicado com biografia completa e filosofia de desenvolvimento
- **Separação de Projetos**: Organizado em "Sites" (2) e "Projetos" (9)
- **Acessibilidade**: Navegação por teclado completa (Tab, Setas, Enter, ESC, Alt+F4)

### Easter Eggs
- **Clippy**: Assistente nostálgico do Office
- **Campo Minado**: Jogo completamente funcional
- **Paint**: Versão simplificada do Paint do Windows XP com ferramentas básicas de desenho

### Otimizações
- CSS modularizado com variáveis
- JavaScript modular e reutilizável
- Animações suaves com transições CSS e requestAnimationFrame
- Sem dependências externas
- Configuração centralizada para fácil manutenção
- Sistema de internacionalização (i18n) sem duplicação
- SEO otimizado com meta tags completas e Schema.org structured data
- Navegação por teclado e ARIA labels para acessibilidade

## Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis CSS, Flexbox, Grid, Animações
- **JavaScript (ES6+)**: Módulos, Classes, Arrow Functions
- **Sem Frameworks**: Vanilla JS puro

##  Estrutura do Projeto

```
portfolio/
│
├── index.html              # HTML principal
├── sitemap.xml            # Sitemap para SEO
├── robots.txt             # Configuração para crawlers
│
├── css/                    # Estilos modulares
│   ├── variables.css      # Variáveis CSS (cores, tamanhos, etc) + acessibilidade
│   ├── boot.css           # Tela de inicialização
│   ├── desktop.css        # Desktop, ícones, taskbar, menu
│   ├── window.css         # Janelas e controles
│   ├── content.css        # Conteúdo (projetos, skills, contato)
│   ├── eastereggs.css     # Clippy e Minesweeper
│   ├── paint.css          # Paint do Windows XP
│   └── notepad.css        # Bloco de Notas "Sobre Mim"
│
├── js/                     # JavaScript modular
│   ├── config.js          # Configurações (usa i18n)
│   ├── main.js            # Inicializador principal
│   │
│   └── modules/           # Módulos organizados
│       ├── i18n.js        # Sistema de internacionalização
│       ├── boot.js        # Gerencia tela de boot
│       ├── clock.js       # Relógio da taskbar
│       ├── language.js    # Troca de idiomas
│       ├── startMenu.js   # Menu Iniciar
│       ├── pagination.js  # Sistema de paginação de projetos
│       ├── navigation.js  # Navegação entre seções
│       ├── window.js      # Gerenciamento de janelas (com requestAnimationFrame)
│       ├── accessibility.js # Navegação por teclado e ARIA
│       ├── notepad.js     # Bloco de Notas "Sobre Mim"
│       ├── paint.js       # Paint do Windows XP
│       ├── clippy.js      # Easter egg: Clippy
│       └── minesweeper.js # Easter egg: Campo Minado
│
└── img/                    # Imagens
    ├── bliss.jpg          # Wallpaper Windows XP
    ├── windows-logo.png   # Logo Windows
    ├── ie-icon.png        # Ícone IE
    ├── notepad-icon.webp  # Ícone Notepad
    ├── folder.png         # Ícone pasta
    ├── my-computer.png    # Ícone computador
    ├── recycle-bin.png    # Ícone lixeira
    └── Clippy.webp        # Clippy animado
```

##  Instalação

### Opção 1: Clone do Repositório

```bash
git clone https://github.com/LuddEvergard3n/portfolio-xp.git
cd portfolio-xp
```

### Opção 2: Download Direto

Baixe o arquivo ZIP do repositório e extraia.

### Executar Localmente

Não é necessário servidor web para desenvolvimento, mas é recomendado:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server -p 8000

# Com PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

## Uso

### Navegação Básica

1. Aguarde a tela de boot (3 segundos)
2. Use o menu Iniciar ou clique nos ícones do desktop
3. **Notepad "Sobre Mim"** abre automaticamente com a janela principal
4. Arraste janelas pela barra de título
5. Redimensione pelas bordas e cantos
6. Troque idiomas com os botões PT/EN
7. **Navegue pelos projetos** usando os botões "← Anterior" / "Próxima →" ou setas do teclado

### Atalhos de Teclado

- **Tab**: Navega entre os elementos focáveis
- **Setas (Desktop)**: Navega entre ícones do desktop
- **Setas ← → (Projetos)**: Navega entre páginas de projetos
- **Enter**: Ativa o elemento focado
- **ESC**: Fecha a janela ativa
- **Alt + F4**: Fecha a janela ativa

### Sistema de Paginação

O portfólio exibe **5 projetos por página**. Para navegar:

1. **Botões**: Clique em "← Anterior" ou "Próxima →"
2. **Teclado**: Use as setas ← e → quando estiver na aba Projetos
3. **URL**: Acesse diretamente via hash: `#projects-page-2`
4. **Indicador**: Mostra "Página 1 de 2" ou "Page 1 of 2"

### Notepad "Sobre Mim"

- **Abre automaticamente** com a janela principal
- **Não pode ser fechado** (botão X desabilitado)
- **Pode ser maximizado** e redimensionado
- **Multi-idioma**: Conteúdo muda automaticamente ao trocar PT/EN
- **Taskbar**: Aparece como "Sobre Mim" / "About Me"

### Adicionar Novos Projetos

Edite o arquivo `js/modules/i18n.js` na seção de traduções:

```javascript
translations: {
  pt: {
    'project.meuProjeto': 'Nome do Projeto',
    'project.meuProjeto.desc': 'Descrição do projeto',
  },
  en: {
    'project.meuProjeto': 'Project Name',
    'project.meuProjeto.desc': 'Project description',
  }
}
```

E adicione no método `getProjects()`:

```javascript
getProjects(lang = null) {
  const language = lang || this.currentLanguage;
  return [
    // ... projetos existentes
    {
      name: this.t('project.meuProjeto', language),
      description: this.t('project.meuProjeto.desc', language),
      url: 'https://exemplo.com',
      tags: ['HTML', 'CSS', 'JS']
    }
  ];
}
```

**Nota:** Se ultrapassar 5 projetos, a paginação criará automaticamente uma nova página.

### Personalizar Skills

Edite `js/modules/i18n.js`:

```javascript
translations: {
  pt: {
    'skills.novaCategoria': 'Nova Categoria',
    'skill.novaSkill': 'Nova Skill - Descrição detalhada',
  }
}
```

### Editar Texto do Notepad

O texto biográfico do Notepad está em `js/modules/i18n.js`:

```javascript
'notepad.content': `Seu texto aqui em português...`,  // PT
'notepad.content': `Your text here in English...`,    // EN
```

## Arquitetura

### Padrão de Design

O projeto segue uma arquitetura modular com separação de responsabilidades:

```
Camada de Apresentação (HTML/CSS)
    ↓
Camada de Lógica (JavaScript Modules)
    ↓
Camada de Dados (i18n.js)
```

### Módulos JavaScript

Cada módulo é independente e exporta suas funcionalidades:

```javascript
const ModuleName = {
  // Estado privado
  property: value,
  
  // Métodos públicos
  init() { /* ... */ },
  method() { /* ... */ }
};

window.ModuleName = ModuleName;
```

### Fluxo de Inicialização

1. `DOMContentLoaded` event
2. `main.js` carrega configuração
3. Módulos são inicializados em ordem:
   - **i18n** (sistema de traduções) 
   - **BootScreen** (tela de boot)
   - **Clock** (relógio)
   - **Language** (gerenciamento de idiomas)
   - **StartMenu** (menu iniciar)
   - **Navigation** (navegação entre seções)
   - **WindowManager** (gerenciamento de janelas)
   - **Notepad** (bloco de notas "Sobre Mim")
   - **Accessibility** (navegação por teclado)
   - **Easter Eggs** (Clippy, Minesweeper, Paint)
4. **Notepad abre automaticamente** (300ms após carregar)
5. Conteúdo dinâmico é renderizado
6. Event listeners são registrados
7. Navegação por teclado ativada

### Sistema de Paginação

A paginação é gerenciada pelo módulo `pagination.js`:

```javascript
const Pagination = {
  itemsPerPage: 5,  // Configurável
  currentProjectsPage: 1,
  currentSitesPage: 1,
  
  paginate(items, page) {
    // Retorna items da página específica
  },
  
  renderProjects(containerId) {
    // Renderiza projetos com controles
  }
};
```

**Funcionalidades:**
- Divide projetos em páginas de 5 itens
- Botões de navegação habilitados/desabilitados automaticamente
- Suporte a navegação por teclado (setas ← →)
- URLs com hash para deep linking (`#projects-page-2`)
- Animações suaves de fade-in ao trocar página
- Scroll automático ao topo ao mudar página

### Gerenciamento de Estado

Estado é mantido em cada módulo sem framework:

```javascript
const WindowManager = {
  windows: {},  // Estado das janelas
  
  register(id) {
    this.windows[id] = {
      element: el,
      isMaximized: false,
      prevState: {}
    };
  }
};
```

## Configuração

### Variáveis CSS

Todas as cores e tamanhos estão centralizados em `css/variables.css`:

```css
:root {
  --xp-blue-primary: #0058ee;
  --taskbar-height: 30px;
  --transition-normal: 0.3s ease;
  /* ... */
}
```

### Configuração de Paginação

Para alterar quantos projetos aparecem por página:

```javascript
// js/modules/pagination.js
const Pagination = {
  itemsPerPage: 5,  // Altere este valor
  // ...
};
```

### Personalização Rápida

**Mudar cores do tema:**
```css
/* css/variables.css */
--xp-blue-primary: #ff0000;  /* Azul → Vermelho */
```

**Ajustar tamanho da janela:**
```css
--window-min-width: 800px;
--window-min-height: 500px;
```

**Modificar animações:**
```css
--transition-normal: 0.5s ease;  /* Mais lento */
```

## Easter Eggs

### Clippy

- Assistente animado com frases nostálgicas
- Mensagens contextuais em PT/EN
- Clique no Clippy para trocar mensagens
- Fechar com botão X no canto

### Campo Minado

- Jogo completamente funcional
- Grade 9×9 com 10 minas
- Clique esquerdo para revelar
- Clique direito para colocar bandeira
- Clique no rosto para reiniciar

### Paint

- Ferramentas: Lápis, Pincel, Borracha, Balde
- Canvas de desenho funcional
- Botões limpar e salvar
- Paleta de cores

### Notepad "Sobre Mim"

Embora não seja um easter egg, o Notepad é uma feature destacada:
- **Visual autêntico** do Bloco de Notas XP
- **Scrollbar customizada** estilo Windows XP
- **Fonte monoespaçada** (Consolas/Courier New)
- **Não pode ser fechado** - Janela permanente
- **Multi-idioma** - Texto completo PT/EN

## Desempenho

### Otimizações Implementadas

- **CSS**: Uso de `transform` e `opacity` para animações (GPU-accelerated)
- **JavaScript**: 
  - Event delegation onde possível
  - `requestAnimationFrame` para drag e animações suaves
  - Módulos carregados de forma otimizada
  - Renderização paginada (apenas 5 projetos por vez)
- **Imagens**: WebP para Clippy e Notepad, PNG otimizado para ícones
- **Sem reflow**: Mudanças de estilo em batch
- **Lazy rendering**: Conteúdo renderizado sob demanda
- **i18n**: Sistema centralizado evita duplicação de código

### Métricas Estimadas

- **First Contentful Paint**: ~0.5s
- **Time to Interactive**: ~1.0s
- **Total Bundle Size**: ~175KB (sem compressão)
- **JavaScript**: ~12KB (modularizado)
- **CSS**: ~18KB (variáveis centralizadas)

## Responsividade

### Breakpoints

```css
/* Tablet */
@media (max-width: 900px) {
  .window { width: calc(100vw - 20px); }
  .pagination-btn { padding: 6px 12px; }
}

/* Mobile */
@media (max-width: 600px) {
  .window { 
    top: 10px;
    bottom: 40px;
    left: 5px;
    right: 5px;
  }
  .pagination-controls {
    flex-direction: column;
    gap: 8px;
  }
}
```

### Adaptações Mobile

- Taskbar responsiva (oculta textos)
- Menu Iniciar em largura total
- Touch events para drag/resize
- Grid de projetos adaptativo
- Controles de paginação empilhados verticalmente
- Notepad com tamanho ajustado

## Projetos Incluídos

### Projetos (9 total - 2 páginas)

**Página 1:**
1. **Computabilis** - Sistema de gestão financeira pessoal
2. **Studium** - Ferramenta de auxílio na concentração para estudar
3. **ATLAS** - Dashboard e laboratório técnico para gestão de investimentos
4. **Fastlog Analyzer** - Ferramenta de análise de logs em tempo real
5. **ARES** - Sistema básico de gestão de dados financeiros

**Página 2:**
6. **Cassandra** - Sistema de análise de cenários com GUI, cache e comparação
7. **Mini Deterministic Engine** - Engine de simulação determinística com fixed-timestep e replay bit-exact
8. **Mini Core Banking** - Sistema bancário core em COBOL com ledger imutável
9. **Real-Time Monitoring Dashboard** - Dashboard Angular para monitoramento real-time via WebSocket

### Sites (2 total - 1 página)

1. **Landing Advocacia Exemplo** - Landing page para escritório de advocacia
2. **Prime Coast** - Landing page moderna para imobiliária (demonstração)

## SEO

### Otimizações Implementadas

- **Meta Tags Completas**: Description, keywords, Open Graph, Twitter Card
- **URLs Canônicas**: Previne conteúdo duplicado
- **Alt Tags**: Todas as imagens com textos alternativos
- **Semantic HTML**: Tags semânticas (nav, header, main, article)
- **Schema.org**: Structured data com informações de pessoa/desenvolvedor

## Acessibilidade

### Recursos de Acessibilidade

- **Navegação por Teclado**: 
  - Tab, Setas, Enter, ESC, Alt+F4
  - Setas ← → para paginação
  - Foco visível em todos os elementos interativos
- **ARIA Labels**: 
  - role="button" em ícones
  - aria-label em elementos interativos
  - aria-live regions para anúncios dinâmicos
- **Screen Readers**:
  - Classe .sr-only para conteúdo exclusivo
  - Estrutura semântica correta
  - Anúncios de mudanças de estado
  - Indicadores de página acessíveis
- **Contraste**: Cores atendem WCAG 2.1 AA
- **Focus Management**: Foco gerenciado em janelas modais
- **Textarea Readonly**: Notepad com conteúdo não editável mas navegável

### Convenções de Código

- **CSS**: BEM methodology para classes
- **JavaScript**: camelCase para variáveis, PascalCase para módulos
- **Commits**: Conventional Commits (feat:, fix:, docs:, etc)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

**Ludd**
- Email: hbrslud@gmail.com
- GitHub: [@LuddEvergard3n](https://github.com/LuddEvergard3n)
- LinkedIn: [herbertbr-sorg-ludka](https://www.linkedin.com/in/herbertbr-sorg-ludka/)

---

<div align="center">
  <p>Feito com nostalgia dos anos 2000</p>
  <p>Windows XP © Microsoft Corporation</p>
</div>