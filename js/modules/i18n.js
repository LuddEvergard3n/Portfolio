/**
 * MÓDULO DE INTERNACIONALIZAÇÃO (i18n)
 * 
 * Sistema centralizado de traduções para evitar duplicação de conteúdo.
 * Todas as strings traduzíveis são definidas aqui uma única vez.
 */

const i18n = {
  currentLanguage: 'pt',
  
  // Definição de todas as traduções
  translations: {
    pt: {
      // Sobre
      'about.title': 'Sobre Mim',
      'about.description': 'Desenvolvedor focado em sistemas, web e engenharia de software. Trabalho do baixo nível em C++ ao front-end em HTML/CSS/JS, com ênfase em performance, determinismo e código que dura.',

      // Categorias de skills
      'skills.programming': 'Linguagens',
      'skills.web': 'Web',
      'skills.systems': 'Sistemas e Engenharia',
      'skills.ai': 'Inteligência Artificial',

      // Skills individuais — Linguagens
      'skill.cpp': 'C++ — Programação de sistemas, gerenciamento manual de memória, estruturas de baixo nível. Linguagem principal em projetos como ATHENA (motor de wargaming determinístico) e Mini Deterministic Engine.',
      'skill.c': 'C — Núcleo de sistemas, integração com WebAssembly. Usado nos motores físicos do Archimedes e Lavoisier.',
      'skill.python': 'Python — Automação, análise de dados, integração com LLMs e pipelines de geração de documentos (PDF Builder).',
      'skill.objc': 'Objective-C — Por interesse e proximidade com C/C++; familiaridade com runtime e mensageria.',
      'skill.java': 'Java — Programação orientada a objetos, aplicações de longa duração e GUIs Swing (ARES, Cassandra).',
      'skill.javascript': 'JavaScript — Front-end full-stack sem framework, ES Modules nativos, Web Workers, Canvas, IndexedDB. Usado em todos os projetos web do portfólio.',

      // Skills individuais — Web
      'skill.html5': 'HTML5 — Marcação semântica, acessibilidade, SEO técnico (meta tags, JSON-LD, OpenGraph).',
      'skill.css3': 'CSS3 — Layouts responsivos com Flexbox e Grid, design systems via CSS variables, animações sem dependência.',
      'skill.webdev': 'Desenvolvimento Web — Sites estáticos, landings, SPAs sem framework, PWAs. Filosofia browser-first: zero build, ES Modules nativos, funcionamento offline.',
      'skill.typescript': 'TypeScript — Tipagem estrita em projetos Angular e ferramentas internas.',

      // Skills individuais — Sistemas
      'skill.wasm': 'WebAssembly — Compilação de C/C++ para web; usado para mover lógica pesada do JS para WASM com fallback.',
      'skill.determinism': 'Determinismo numérico — IEEE-754 strict, fixed-timestep, replay bit-exact, Velocity Verlet em integradores conservativos.',
      'skill.build': 'Build systems — CMake, Makefile multiplataforma (Linux/macOS/MinGW), empacotamento Windows (Launch4j, NSIS).',
      'skill.docs': 'Geração de documentos — DOCX OOXML manual via Web Worker, PDF via ReportLab e via janela de impressão. Conformidade ABNT (Norma).',

      // Skills individuais — IA
      'skill.prompt': 'Engenharia de Prompts para LLMs - Claude, GPT, modelos open-source',
      'skill.llm-integration': 'Integração de LLMs em aplicações web',
      'skill.llm-optimization': 'Otimização de contexto e fine-tuning de respostas',
      
      // Projetos
      'project.athena': 'ATHENA',
      'project.athena.desc': 'Motor de wargaming determinístico em C++17. 1238 plataformas militares, simulação Monte Carlo com Sobol indices, 6 sistemas de simulação (movimento, combate, logística, detecção, C2, IA tática). Zero dependências externas, bit-exact reproducibility, sem machine learning — regras explícitas e auditáveis.',
      'project.athena.long': 'Advanced Tactical & Heuristic Engagement & Network Analyzer. Determinismo em precisão IEEE-754 (sem fast-math). ImGui embutido, geração de relatórios PDF sem lib externa. Dados auditáveis (Jane\'s, IISS, SIPRI). Builds Linux, Windows (MinGW) e macOS. Versão atual: 1.1.2 "Database".',
      'project.computabilis': 'Computabilis',
      'project.computabilis.desc': 'Sistema de gestão financeira pessoal fácil.',
      'project.studium': 'Studium',
      'project.studium.desc': 'Ferramenta de auxílio na concentração para estudar.',
      'project.atlas': 'ATLAS',
      'project.atlas.desc': 'Dashboard e laboratório técnico para gestão de investimentos e patrimônio.',
      'project.fastlog': 'Fastlog Analyzer',
      'project.fastlog.desc': 'Ferramenta de análise de logs em tempo real com processamento eficiente.',
      'project.ares': 'ARES',
      'project.ares.desc': 'Sistema básico de gestão de dados financeiros.',
      'project.cassandra': 'Cassandra',
      'project.cassandra.desc': 'Sistema de análise de cenários com GUI, cache e comparação (Python/Tkinter).',
      'project.deterministic': 'Mini Deterministic Engine',
      'project.deterministic.desc': 'Game engine determinística em C++ com fixed-timestep, replay bit-exact e RNG controlado.',
      'project.banking': 'Mini Core Banking',
      'project.banking.desc': 'Sistema bancário core em COBOL (terminal-based) com ledger imutável e separação de camadas.',
      'project.dashboard': 'Real-Time Monitoring Dashboard',
      'project.dashboard.desc': 'Dashboard Angular otimizado para eventos real-time (WebSocket, Signals, virtual scrolling).',

      // Sites
      'site.law': 'Landing Advocacia Exemplo',
      'site.law.desc': 'Landing page para escritório de advocacia.',
      'site.primecoast': 'Prime Coast',
      'site.primecoast.desc': 'Landing page moderna para imobiliária (demonstração).',
      'site.linda': 'Linda Estética',
      'site.linda.desc': 'Landing page moderna demonstrativa para salão de estética.',

      // Ecossistema Educacional
      'ecosystem.title': 'Ecossistema Educacional',
      'ecosystem.description': 'Projeto pessoal onde criei um site para cada matéria essencial, mirando na dor de cada disciplina e a dificuldade que professores enfrentam ao ensinar o conteúdo.',
      'ecosystem.euclides': 'Euclides',
      'ecosystem.euclides.desc': 'Sistema de Matemática browser-only com 84 tópicos (EFI → ES), WebAssembly + fallback JS, PWA offline.',
      'ecosystem.quintiliano': 'Quintiliano',
      'ecosystem.quintiliano.desc': 'Sistema de Português e Literatura com 9 módulos: leitura estrutural, interpretação, sintaxe, etimologia.',
      'ecosystem.johnson': 'Johnson English',
      'ecosystem.johnson.desc': 'Plataforma de Inglês A1→C2 (177 lições, 47 módulos), método Trivium, C1-C2 full English.',
      'ecosystem.lavoisier': 'Lavoisier',
      'ecosystem.lavoisier.desc': 'Laboratório visual de Química com 14 módulos (Canvas 2D), do Ensino Médio ao Superior.',
      'ecosystem.humboldt': 'Humboldt',
      'ecosystem.humboldt.desc': 'Atlas interativo de Geografia com 8 módulos, mapas SVG, escalas local→global.',
      'ecosystem.herodoto': 'Heródoto',
      'ecosystem.herodoto.desc': 'Linha do tempo de História — cronologia interativa e contexto histórico.',
      'ecosystem.archimedes': 'Archimedes',
      'ecosystem.archimedes.desc': 'Laboratório interativo de Física para EF II e EM. 7 módulos, 23 experimentos, 22 simulações a 60 fps. Motor WebAssembly (C) com fallback JS; integrador Velocity Verlet para sistemas conservativos. Alinhado à BNCC.',
      'ecosystem.aristoteles': 'Aristóteles',
      'ecosystem.aristoteles.desc': 'Sistema de Filosofia para EM e início do ES. 9 módulos, 42 lições, 37 textos primários anotados. Foco em prática filosófica: reconstruir argumentos, classificar posições, identificar objeções. 70-90h de conteúdo.',
      'ecosystem.darwin': 'Darwin',
      'ecosystem.darwin.desc': 'Atlas dos Processos da Vida — sistema de Biologia por escalas (molecular → ecológica) e relações. 6 módulos v1: célula, DNA/hereditariedade, respiração/fotossíntese, sistemas do corpo, ecologia, evolução.',
      'ecosystem.wip': 'Em desenvolvimento',

      // Ratio (empresa + Norma)
      'ratio.title': 'Ratio Sistemas Educacionais',
      'ratio.description': 'Empresa própria (CNPJ 65.560.944/0001-69, Blumenau/SC). Infraestrutura digital do conhecimento: ferramentas browser-first para educação e pesquisa acadêmica.',
      'ratio.site': 'Site institucional',
      'ratio.site.desc': 'Site da empresa Ratio Sistemas Educacionais. HTML/CSS/JS puros, cinco camadas CSS, três módulos JS. Identidade: ivory #F3EBDD, navy #1A2230, bronze #8A6A3B; tipografia Cormorant Garamond + Source Sans 3.',
      'norma.title': 'Norma — Plataforma ABNT',
      'norma.subtitle': 'Estruturação documental acadêmica 100% no navegador',
      'norma.what.title': 'O que é',
      'norma.what.text': 'Norma é uma aplicação web estática (HTML + ES Modules) que gera documentos .docx conformes NBR 14724:2011 inteiramente no navegador. O servidor nunca toca o conteúdo do documento — ele só autentica o usuário e registra downloads.',
      'norma.who.title': 'Para quem',
      'norma.who.text': 'Estudantes de graduação, pós-graduação e pesquisadores que precisam entregar TCCs, dissertações, teses, artigos e relatórios em conformidade ABNT sem gastar horas com formatação manual no Word.',
      'norma.features.title': 'O que faz',
      'norma.features.1': 'Geração de .docx conforme NBR 14724:2011 via Web Worker',
      'norma.features.2': 'Exportação PDF via janela de impressão dedicada',
      'norma.features.3': 'Preview paginado fiel a A4 (Times 12pt, margens ABNT)',
      'norma.features.4': 'Validação ABNT por grupo (6 grupos, ~15 regras cada)',
      'norma.features.5': 'Wizard guiado com 14 tipos de trabalho em 6 grupos',
      'norma.features.6': 'Busca de referências via DOI (CrossRef API)',
      'norma.features.7': 'Gerador de referências NBR 6023 (livro, artigo, site, lei)',
      'norma.features.8': 'Verificador de citações NBR 10520 com cruzamento automático',
      'norma.features.9': 'Gerador automático de sumário (NBR 6027)',
      'norma.features.10': 'APA 7 Student Paper (title page, headings, author-date)',
      'norma.features.11': 'Hierarquia de 5 níveis de subseções (NBR 6024)',
      'norma.features.12': 'Exportação TeX/LaTeX (classes abntex2 e apa7)',
      'norma.features.13': 'Persistência local via IndexedDB (autosave a cada 1s)',
      'norma.features.14': 'Modo Leve automático para hardware limitado',
      'norma.arch.title': 'Decisões técnicas',
      'norma.arch.text': 'Princípio central: o servidor nunca toca o conteúdo do documento. Client-side puro para geração; backend (Vercel Functions + Neon Postgres) apenas para entitlement JWT (Clerk) e webhook Stripe. Fallback STORE para browsers sem CompressionStream. Fingerprint reforçado com canvas hash + WebGL renderer.',
      'norma.norms.title': 'Normas ABNT cobertas',
      'norma.norms.list': 'NBR 14724:2011 (trabalhos acadêmicos), NBR 6023:2018 (referências), NBR 6027:2012 (sumário), NBR 6028:2021 (resumo/abstract), NBR 6022:2018 (artigos), NBR 10520:2002 (citações).',
      'norma.visit': 'Acessar norma-app.com.br',

      // Documentos (certificações)
      'docs.title': 'Meus Documentos',
      'docs.intro': 'Certificações e declarações de participação em cursos técnicos.',
      'docs.sctec.dev': 'Trilha Rápida — Desenvolvimento de Software',
      'docs.sctec.dev.meta': 'SCTEC / ASCTI · 16h · 9, 10, 11, 19 e 20 de fevereiro de 2026 · HTML, CSS, JavaScript',
      'docs.sctec.dados': 'Trilha Rápida — Análise de Dados',
      'docs.sctec.dados.meta': 'SCTEC / ASCTI · 16h · 23 a 27 de fevereiro de 2026 · Dados, Python, Dashboards',
      'docs.sctec.ia': 'Trilha Rápida — Inteligência Artificial',
      'docs.sctec.ia.meta': 'SCTEC / ASCTI · 16h · 2 a 6 de março de 2026 · Criação de modelos, Bibliotecas para IA, Ética',
      'docs.hb.niv': 'Nivelamento — Hackers do Bem',
      'docs.hb.niv.meta': 'SENAI SP / Softex / RNP / MCTI · 80h · 22 de janeiro de 2024 a 12 de março de 2026 · redes, SO Windows/Linux, lógica, scripts',
      'docs.hb.bas': 'Curso Básico — Hackers do Bem',
      'docs.hb.bas.meta': 'SENAI SP / Softex / RNP / MCTI · 64h · 25 de março de 2024 a 25 de março de 2026 · nuvem, ameaças, vulnerabilidades, criptografia, GRC',
      'docs.open': 'Abrir PDF',

      // Paginação
      'pagination.previous': 'Anterior',
      'pagination.next': 'Próxima',
      'pagination.page': 'Página',
      'pagination.of': 'de',
      
      // UI Elements
      'desktop.myComputer': 'Meu Computador',
      'desktop.myDocuments': 'Meus Documentos',
      'desktop.recycleBin': 'Lixeira',
      'desktop.officeHelp': 'Ajuda Office',
      'desktop.minesweeper': 'Campo Minado',
      'desktop.paint': 'Paint',
      'desktop.portfolio': 'Portfólio',
      'desktop.notepad': 'Sobre Mim',
      
      // Notepad
      'notepad.title': 'Sobre Mim - Bloco de Notas',
      'notepad.content': `Prazer, eu sou o Herbert (LuddEvergard3n)

Meu desenvolvimento é focado em sistemas, análise de dados e engenharia de software com ênfase em performance, determinismo e manutenção de longo prazo. Todos os meus projetos seguem uma filosofia imutável:

• Deve ser otimizado;
• Deve ser modular;
• Deve ser bem documentado e comentado;

Mexo principalmente com desenvolvimento web, desde sites estáticos até landings mais complexas e bonitas, mas gosto de mexer bastante em C, C++ e Java.

A interface desse portfólio foi propositalmente inspirada em sistemas clássicos e UIs de software corporativo, priorizando clareza, estabilidade visual e familiaridade com ambientes legados.

Todos os meus projetos respondem três questões:

• "Por que esse projeto existe";
• "Qual problema técnico resolve";
• "O que eu quis demonstrar aqui";

É isso. Se quiser entrar em contato, clique na aba "Contato" na janela ao lado. Vai encontrar todos os meus projetos ali também.`
    },
    
    en: {
      // About
      'about.title': 'About Me',
      'about.description': 'Developer focused on systems, web, and software engineering. I work from low-level C++ to front-end HTML/CSS/JS, with emphasis on performance, determinism, and code that lasts.',

      // Skill categories
      'skills.programming': 'Languages',
      'skills.web': 'Web',
      'skills.systems': 'Systems and Engineering',
      'skills.ai': 'Artificial Intelligence',

      // Individual skills — Languages
      'skill.cpp': 'C++ — Systems programming, manual memory management, low-level structures. Primary language in projects like ATHENA (deterministic wargaming engine) and Mini Deterministic Engine.',
      'skill.c': 'C — Core systems, WebAssembly integration. Used in the physics engines of Archimedes and Lavoisier.',
      'skill.python': 'Python — Automation, data analysis, LLM integration, and document generation pipelines (PDF Builder).',
      'skill.objc': 'Objective-C — Out of interest and proximity to C/C++. Familiar with the runtime and messaging.',
      'skill.java': 'Java — Object-oriented programming, long-running applications, Swing GUIs (ARES, Cassandra).',
      'skill.javascript': 'JavaScript — Framework-free full-stack front-end, native ES Modules, Web Workers, Canvas, IndexedDB. Used across every web project in this portfolio.',

      // Individual skills — Web
      'skill.html5': 'HTML5 — Semantic markup, accessibility, technical SEO (meta tags, JSON-LD, OpenGraph).',
      'skill.css3': 'CSS3 — Responsive layouts with Flexbox and Grid, design systems via CSS variables, dependency-free animations.',
      'skill.webdev': 'Web Development — Static sites, landings, framework-free SPAs, PWAs. Browser-first philosophy: no build, native ES Modules, offline operation.',
      'skill.typescript': 'TypeScript — Strict typing in Angular projects and internal tooling.',

      // Individual skills — Systems
      'skill.wasm': 'WebAssembly — C/C++ compiled for the web; used to move heavy logic out of JS into WASM with a fallback.',
      'skill.determinism': 'Numerical determinism — IEEE-754 strict, fixed-timestep, bit-exact replay, Velocity Verlet for conservative integrators.',
      'skill.build': 'Build systems — CMake, multi-platform Makefiles (Linux/macOS/MinGW), Windows packaging (Launch4j, NSIS).',
      'skill.docs': 'Document generation — Manual DOCX OOXML in a Web Worker, PDF via ReportLab and via the print window. ABNT compliance (Norma).',

      // Individual skills — AI
      'skill.prompt': 'Prompt Engineering for LLMs - Claude, GPT, open-source models',
      'skill.llm-integration': 'LLM integration in web applications',
      'skill.llm-optimization': 'Context optimization and response fine-tuning',
      
      // Projects
      'project.athena': 'ATHENA',
      'project.athena.desc': 'Deterministic wargaming engine in C++17. 1,238 military platforms, Monte Carlo simulation with Sobol indices, 6 simulation systems (movement, combat, logistics, detection, C2, tactical AI). Zero external dependencies, bit-exact reproducibility, no machine learning — explicit and auditable rules.',
      'project.athena.long': 'Advanced Tactical & Heuristic Engagement & Network Analyzer. Determinism at IEEE-754 strict precision (no fast-math). ImGui embedded, PDF report generation without external libs. Auditable data (Jane\'s, IISS, SIPRI). Builds on Linux, Windows (MinGW), and macOS. Current version: 1.1.2 "Database".',
      'project.computabilis': 'Computabilis',
      'project.computabilis.desc': 'Easy personal financial management system.',
      'project.studium': 'Studium',
      'project.studium.desc': 'Tool to help concentration while studying.',
      'project.atlas': 'ATLAS',
      'project.atlas.desc': 'Dashboard and technical laboratory for investment and asset management.',
      'project.fastlog': 'Fastlog Analyzer',
      'project.fastlog.desc': 'Real-time log analysis tool with efficient processing.',
      'project.ares': 'ARES',
      'project.ares.desc': 'Basic financial data management system.',
      'project.cassandra': 'Cassandra',
      'project.cassandra.desc': 'Scenario analysis system with GUI, cache and comparison (Python/Tkinter).',
      'project.deterministic': 'Mini Deterministic Engine',
      'project.deterministic.desc': 'Deterministic game engine in C++ with fixed-timestep, bit-exact replay and controlled RNG.',
      'project.banking': 'Mini Core Banking',
      'project.banking.desc': 'Terminal-based core banking system in COBOL with immutable ledger and layered architecture.',
      'project.dashboard': 'Real-Time Monitoring Dashboard',
      'project.dashboard.desc': 'Optimized Angular dashboard for real-time events (WebSocket, Signals, virtual scrolling).',

      // Sites
      'site.law': 'Law Firm Landing Example',
      'site.law.desc': 'Landing page for law firm.',
      'site.primecoast': 'Prime Coast',
      'site.primecoast.desc': 'Modern landing page for real estate agency (demo).',
      'site.linda': 'Linda Estética',
      'site.linda.desc': 'Modern demo landing page for a beauty salon.',

      // Educational Ecosystem
      'ecosystem.title': 'Educational Ecosystem',
      'ecosystem.description': 'Personal project where I created a website for each essential subject, targeting each discipline\'s pain points and the difficulties teachers face when teaching the content.',
      'ecosystem.euclides': 'Euclides',
      'ecosystem.euclides.desc': 'Browser-only Math system with 84 topics (Elementary → Higher Ed), WebAssembly + JS fallback, offline PWA.',
      'ecosystem.quintiliano': 'Quintiliano',
      'ecosystem.quintiliano.desc': 'Portuguese Language and Literature system with 9 modules: structural reading, interpretation, syntax, etymology.',
      'ecosystem.johnson': 'Johnson English',
      'ecosystem.johnson.desc': 'English platform A1→C2 (177 lessons, 47 modules), Trivium method, C1-C2 full English immersion.',
      'ecosystem.lavoisier': 'Lavoisier',
      'ecosystem.lavoisier.desc': 'Visual Chemistry lab with 14 modules (Canvas 2D), High School to Higher Education.',
      'ecosystem.humboldt': 'Humboldt',
      'ecosystem.humboldt.desc': 'Interactive Geography atlas with 8 modules, SVG maps, local→global scales.',
      'ecosystem.herodoto': 'Heródoto',
      'ecosystem.herodoto.desc': 'History timeline — interactive chronology and historical context.',
      'ecosystem.archimedes': 'Archimedes',
      'ecosystem.archimedes.desc': 'Interactive Physics lab for middle and high school. 7 modules, 23 experiments, 22 simulations at 60 fps. WebAssembly engine (C) with JS fallback; Velocity Verlet integrator for conservative systems. BNCC-aligned.',
      'ecosystem.aristoteles': 'Aristóteles',
      'ecosystem.aristoteles.desc': 'Philosophy system for high school and early college. 9 modules, 42 lessons, 37 annotated primary texts. Focus on philosophical practice: reconstruct arguments, classify positions, identify objections. 70-90h of content.',
      'ecosystem.darwin': 'Darwin',
      'ecosystem.darwin.desc': 'Atlas of Life Processes — Biology system by scales (molecular → ecological) and relations. 6 v1 modules: cell, DNA/heredity, respiration/photosynthesis, body systems, ecology, evolution.',
      'ecosystem.wip': 'Work in progress',

      // Ratio (company + Norma)
      'ratio.title': 'Ratio Sistemas Educacionais',
      'ratio.description': 'My company (CNPJ 65.560.944/0001-69, Blumenau/SC, Brazil). Digital infrastructure for knowledge: browser-first tools for education and academic research.',
      'ratio.site': 'Institutional site',
      'ratio.site.desc': 'Ratio Sistemas Educacionais company site. Pure HTML/CSS/JS, five CSS layers, three JS modules. Identity: ivory #F3EBDD, navy #1A2230, bronze #8A6A3B; typography Cormorant Garamond + Source Sans 3.',
      'norma.title': 'Norma — ABNT Platform',
      'norma.subtitle': 'Academic document structuring, 100% in the browser',
      'norma.what.title': 'What it is',
      'norma.what.text': 'Norma is a static web application (HTML + ES Modules) that generates .docx documents compliant with NBR 14724:2011 entirely in the browser. The server never touches document content — it only authenticates users and records downloads.',
      'norma.who.title': 'Who it\'s for',
      'norma.who.text': 'Undergrad and grad students and researchers who must deliver capstone projects, dissertations, theses, articles and reports in ABNT compliance without spending hours on manual Word formatting.',
      'norma.features.title': 'What it does',
      'norma.features.1': '.docx generation per NBR 14724:2011 via Web Worker',
      'norma.features.2': 'PDF export via dedicated print window',
      'norma.features.3': 'A4-faithful paginated preview (Times 12pt, ABNT margins)',
      'norma.features.4': 'ABNT validation by group (6 groups, ~15 rules each)',
      'norma.features.5': 'Guided wizard with 14 work types across 6 groups',
      'norma.features.6': 'Reference search via DOI (CrossRef API)',
      'norma.features.7': 'NBR 6023 reference generator (book, article, site, law)',
      'norma.features.8': 'NBR 10520 citation checker with automatic cross-reference',
      'norma.features.9': 'Automatic table of contents (NBR 6027)',
      'norma.features.10': 'APA 7 Student Paper (title page, headings, author-date)',
      'norma.features.11': '5-level subsection hierarchy (NBR 6024)',
      'norma.features.12': 'TeX/LaTeX export (abntex2 and apa7 classes)',
      'norma.features.13': 'Local persistence via IndexedDB (1s autosave)',
      'norma.features.14': 'Automatic Lite Mode for low-end hardware',
      'norma.arch.title': 'Technical decisions',
      'norma.arch.text': 'Central principle: the server never touches document content. Pure client-side generation; backend (Vercel Functions + Neon Postgres) only for JWT entitlement (Clerk) and Stripe webhook. STORE fallback for browsers without CompressionStream. Reinforced fingerprint with canvas hash + WebGL renderer.',
      'norma.norms.title': 'ABNT norms covered',
      'norma.norms.list': 'NBR 14724:2011 (academic papers), NBR 6023:2018 (references), NBR 6027:2012 (table of contents), NBR 6028:2021 (abstract/resumo), NBR 6022:2018 (journal articles), NBR 10520:2002 (citations).',
      'norma.visit': 'Visit norma-app.com.br',

      // Documents (certifications)
      'docs.title': 'My Documents',
      'docs.intro': 'Certifications and participation declarations for technical courses.',
      'docs.sctec.dev': 'Fast Track — Software Development',
      'docs.sctec.dev.meta': 'SCTEC / ASCTI · 16h · Feb 9, 10, 11, 19, 20, 2026 · HTML, CSS, JavaScript',
      'docs.sctec.dados': 'Fast Track — Data Analysis',
      'docs.sctec.dados.meta': 'SCTEC / ASCTI · 16h · Feb 23-27, 2026 · Data, Python, Dashboards',
      'docs.sctec.ia': 'Fast Track — Artificial Intelligence',
      'docs.sctec.ia.meta': 'SCTEC / ASCTI · 16h · Mar 2-6, 2026 · Model creation, AI libraries, Ethics',
      'docs.hb.niv': 'Leveling — Hackers do Bem',
      'docs.hb.niv.meta': 'SENAI SP / Softex / RNP / MCTI · 80h · Jan 22, 2024 to Mar 12, 2026 · networking, Windows/Linux, logic, scripting',
      'docs.hb.bas': 'Basic Course — Hackers do Bem',
      'docs.hb.bas.meta': 'SENAI SP / Softex / RNP / MCTI · 64h · Mar 25, 2024 to Mar 25, 2026 · cloud, threats, vulnerabilities, cryptography, GRC',
      'docs.open': 'Open PDF',

      // Pagination
      'pagination.previous': 'Previous',
      'pagination.next': 'Next',
      'pagination.page': 'Page',
      'pagination.of': 'of',
      
      // UI Elements
      'desktop.myComputer': 'My Computer',
      'desktop.myDocuments': 'My Documents',
      'desktop.recycleBin': 'Recycle Bin',
      'desktop.officeHelp': 'Office Help',
      'desktop.minesweeper': 'Minesweeper',
      'desktop.paint': 'Paint',
      'desktop.portfolio': 'Portfolio',
      'desktop.notepad': 'About Me',
      
      // Notepad
      'notepad.title': 'About Me - Notepad',
      'notepad.content': `Nice to meet you, I'm Herbert (LuddEvergard3n)

My development focuses on systems, data analysis, and software engineering with emphasis on performance, determinism, and long-term maintenance. All my projects follow an immutable philosophy:

• Must be optimized;
• Must be modular;
• Must be well documented and commented;

I mainly work with web development, from static sites to more complex and beautiful landing pages, but I really enjoy working with C, C++, and Java.

This portfolio's interface was purposefully inspired by classic systems and corporate software UIs, prioritizing clarity, visual stability, and familiarity with legacy environments.

All my projects answer three questions:

• "Why does this project exist";
• "What technical problem does it solve";
• "What did I want to demonstrate here";

That's it. If you want to get in touch, click on the "Contact" tab in the window next to it. You'll find all my projects there too.`
    }
  },
  
  /**
   * Traduz uma chave para o idioma atual
   * @param {string} key - Chave de tradução (ex: 'about.title')
   * @param {string} lang - Idioma (opcional, usa o atual se não especificado)
   * @returns {string} Texto traduzido
   */
  t(key, lang = null) {
    const language = lang || this.currentLanguage;
    return this.translations[language][key] || key;
  },
  
  /**
   * Define o idioma atual
   * @param {string} lang - Código do idioma ('pt' ou 'en')
   */
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
    }
  },
  
  /**
   * Retorna o idioma atual
   * @returns {string} Código do idioma
   */
  getLanguage() {
    return this.currentLanguage;
  },
  
  /**
   * Constrói a estrutura de skills usando traduções.
   * Quatro categorias: Linguagens, Web, Sistemas e IA. A ordem de
   * declaração é a ordem de renderização.
   *
   * @param {string} lang - Idioma
   * @returns {Array} Array de skills estruturadas
   */
  getSkills(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        category: this.t('skills.programming', language),
        items: [
          this.t('skill.cpp', language),
          this.t('skill.c', language),
          this.t('skill.python', language),
          this.t('skill.objc', language),
          this.t('skill.java', language),
          this.t('skill.javascript', language)
        ]
      },
      {
        category: this.t('skills.web', language),
        items: [
          this.t('skill.webdev', language),
          this.t('skill.html5', language),
          this.t('skill.css3', language),
          this.t('skill.typescript', language)
        ]
      },
      {
        category: this.t('skills.systems', language),
        items: [
          this.t('skill.wasm', language),
          this.t('skill.determinism', language),
          this.t('skill.build', language),
          this.t('skill.docs', language)
        ]
      },
      {
        category: this.t('skills.ai', language),
        items: [
          this.t('skill.prompt', language),
          this.t('skill.llm-integration', language),
          this.t('skill.llm-optimization', language)
        ]
      }
    ];
  },
  
  /**
   * Retorna dados sobre a página "Sobre Mim"
   * @param {string} lang - Idioma
   * @returns {Object} Objeto com título, descrição e skills
   */
  getAboutData(lang = null) {
    const language = lang || this.currentLanguage;
    return {
      title: this.t('about.title', language),
      description: this.t('about.description', language),
      skills: this.getSkills(language)
    };
  },
  
  /**
   * Retorna lista de projetos. O primeiro item pode ter `featured: true`
   * para receber destaque visual (usado pelo pagination.js ao renderizar).
   * @param {string} lang - Idioma
   * @returns {Array} Array de projetos
   */
  getProjects(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        name: this.t('project.athena', language),
        description: this.t('project.athena.desc', language),
        longDescription: this.t('project.athena.long', language),
        url: 'https://github.com/LuddEvergard3n/ATHENA',
        tags: ['C++17', 'CMake', 'ImGui', 'Monte Carlo', 'Determinism', 'Wargaming'],
        featured: true
      },
      {
        name: this.t('project.computabilis', language),
        description: this.t('project.computabilis.desc', language),
        url: 'https://luddevergard3n.github.io/Computabilis/',
        tags: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: this.t('project.studium', language),
        description: this.t('project.studium.desc', language),
        url: 'https://luddevergard3n.github.io/Studium/',
        tags: ['JavaScript', 'CSS', 'HTML']
      },
      {
        name: this.t('project.atlas', language),
        description: this.t('project.atlas.desc', language),
        url: 'https://luddevergard3n.github.io/atlas-lite/',
        tags: ['JavaScript', 'CSS', 'C', 'HTML']
      },
      {
        name: this.t('project.fastlog', language),
        description: this.t('project.fastlog.desc', language),
        url: 'https://github.com/LuddEvergard3n/fastlog-analyzer',
        tags: ['Python', 'Java', 'C']
      },
      {
        name: this.t('project.ares', language),
        description: this.t('project.ares.desc', language),
        url: 'https://github.com/LuddEvergard3n/Ares',
        tags: ['Java', 'C', 'COBOL']
      },
      {
        name: this.t('project.cassandra', language),
        description: this.t('project.cassandra.desc', language),
        url: 'https://github.com/LuddEvergard3n/Cassandra',
        tags: ['Python', 'Tkinter', 'Analysis']
      },
      {
        name: this.t('project.deterministic', language),
        description: this.t('project.deterministic.desc', language),
        url: 'https://github.com/LuddEvergard3n/mini-deterministic-engine',
        tags: ['C++', 'SDL2', 'Game Engine', 'Determinism']
      },
      {
        name: this.t('project.banking', language),
        description: this.t('project.banking.desc', language),
        url: 'https://github.com/LuddEvergard3n/mini-core-banking',
        tags: ['COBOL', 'Banking', 'Terminal', 'File I/O']
      },
      {
        name: this.t('project.dashboard', language),
        description: this.t('project.dashboard.desc', language),
        url: 'https://github.com/LuddEvergard3n/realtime-monitoring-dashboard',
        tags: ['Angular', 'TypeScript', 'WebSocket', 'Signals']
      }
    ];
  },
  
  /**
   * Retorna lista de sites
   * @param {string} lang - Idioma
   * @returns {Array} Array de sites
   */
  getSites(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        name: this.t('site.law', language),
        description: this.t('site.law.desc', language),
        url: 'https://luddevergard3n.github.io/Landing-Advocacia/',
        tags: ['HTML', 'CSS', 'JavaScript']
      },
      {
        name: this.t('site.primecoast', language),
        description: this.t('site.primecoast.desc', language),
        url: 'https://luddevergard3n.github.io/Prime-Coast/',
        tags: ['HTML5', 'Tailwind', 'JavaScript']
      },
      {
        name: this.t('site.linda', language),
        description: this.t('site.linda.desc', language),
        url: 'https://luddevergard3n.github.io/Linda-Estetica/',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Landing']
      }
    ];
  },
  
  /**
   * Retorna lista do ecossistema educacional.
   * Projetos com `wip: true` são renderizados com badge "Em desenvolvimento"
   * e sem link de Pages (apenas repo), se necessário.
   *
   * @param {string} lang - Idioma
   * @returns {Array} Array de sites educacionais
   */
  getEcosystem(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        name: this.t('ecosystem.euclides', language),
        description: this.t('ecosystem.euclides.desc', language),
        url: 'https://luddevergard3n.github.io/euclides/',
        repo: 'https://github.com/LuddEvergard3n/euclides',
        tags: ['Math', 'WebAssembly', 'PWA', 'Canvas']
      },
      {
        name: this.t('ecosystem.quintiliano', language),
        description: this.t('ecosystem.quintiliano.desc', language),
        url: 'https://luddevergard3n.github.io/quintiliano/',
        repo: 'https://github.com/LuddEvergard3n/quintiliano',
        tags: ['Portuguese', 'Literature', 'ES Modules']
      },
      {
        name: this.t('ecosystem.johnson', language),
        description: this.t('ecosystem.johnson.desc', language),
        url: 'https://luddevergard3n.github.io/johnson-english/',
        repo: 'https://github.com/LuddEvergard3n/johnson-english',
        tags: ['English', 'A1-C2', 'Trivium', 'TTS']
      },
      {
        name: this.t('ecosystem.lavoisier', language),
        description: this.t('ecosystem.lavoisier.desc', language),
        url: 'https://luddevergard3n.github.io/lavoisier/',
        repo: 'https://github.com/LuddEvergard3n/lavoisier',
        tags: ['Chemistry', 'Canvas 2D', 'Simulation']
      },
      {
        name: this.t('ecosystem.humboldt', language),
        description: this.t('ecosystem.humboldt.desc', language),
        url: 'https://luddevergard3n.github.io/humboldt/',
        repo: 'https://github.com/LuddEvergard3n/humboldt',
        tags: ['Geography', 'SVG Maps', 'Interactive']
      },
      {
        name: this.t('ecosystem.herodoto', language),
        description: this.t('ecosystem.herodoto.desc', language),
        url: 'https://luddevergard3n.github.io/Herodoto/',
        repo: 'https://github.com/LuddEvergard3n/Herodoto',
        tags: ['History', 'Timeline', 'Chronology']
      },
      {
        name: this.t('ecosystem.archimedes', language),
        description: this.t('ecosystem.archimedes.desc', language),
        url: 'https://luddevergard3n.github.io/archimedes/',
        repo: 'https://github.com/LuddEvergard3n/archimedes',
        tags: ['Physics', 'WebAssembly', 'Canvas', 'PWA', 'BNCC']
      },
      {
        name: this.t('ecosystem.aristoteles', language),
        description: this.t('ecosystem.aristoteles.desc', language),
        url: 'https://luddevergard3n.github.io/aristoteles/',
        repo: 'https://github.com/LuddEvergard3n/aristoteles',
        tags: ['Philosophy', 'Primary Texts', 'Argument Analysis']
      },
      {
        name: this.t('ecosystem.darwin', language),
        description: this.t('ecosystem.darwin.desc', language),
        url: 'https://luddevergard3n.github.io/darwin/',
        repo: 'https://github.com/LuddEvergard3n/darwin',
        tags: ['Biology', 'Scales', 'Processes'],
        wip: true
      }
    ];
  },

  /**
   * Retorna lista de documentos/certificações do recrutador.
   *
   * @param {string} lang - Idioma
   * @returns {Array} Array com título, metadados e caminho do PDF
   */
  getDocs(lang = null) {
    const language = lang || this.currentLanguage;
    return [
      {
        title: this.t('docs.hb.niv', language),
        meta: this.t('docs.hb.niv.meta', language),
        file: 'img/docs/cert-hackers-bem-nivelamento.pdf'
      },
      {
        title: this.t('docs.hb.bas', language),
        meta: this.t('docs.hb.bas.meta', language),
        file: 'img/docs/cert-hackers-bem-basico.pdf'
      },
      {
        title: this.t('docs.sctec.dev', language),
        meta: this.t('docs.sctec.dev.meta', language),
        file: 'img/docs/sctec-dev-software.pdf'
      },
      {
        title: this.t('docs.sctec.dados', language),
        meta: this.t('docs.sctec.dados.meta', language),
        file: 'img/docs/sctec-analise-dados.pdf'
      },
      {
        title: this.t('docs.sctec.ia', language),
        meta: this.t('docs.sctec.ia.meta', language),
        file: 'img/docs/sctec-ia.pdf'
      }
    ];
  }
};

// Exportar para uso global
window.i18n = i18n;