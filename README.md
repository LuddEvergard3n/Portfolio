# Windows XP Portfolio

Interactive personal portfolio that recreates a Windows XP desktop with draggable windows, bilingual content, keyboard navigation, and small nostalgic applications.

[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-Projects-654FF0?logo=webassembly&logoColor=white)](https://webassembly.org/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-005A9C?logo=w3c&logoColor=white)](#accessibility)
[![License](https://img.shields.io/badge/License-MIT-2EA44F)](LICENSE)

## Overview

The project uses semantic HTML, CSS, and vanilla JavaScript. It has no runtime dependencies, framework, bundler, or build step. Portuguese and English content is centralized in one internationalization module.

**Version:** 2.5.1

## Highlights

- Windows XP-inspired boot screen, desktop, taskbar, Start menu, and window chrome.
- Draggable and resizable windows with minimize, maximize, restore, close, and touch support.
- Runtime Portuguese and English switching, including the document `lang` attribute.
- Projects grouped into Sites, Projects, and Educational Ecosystem tabs with independent pagination.
- Dedicated Ratio and Norma section with technical product information.
- Documents window with SENAI, SCTEC, Cisco, Google, IBM, and ISC2 certificates.
- Project entries for NebulaKV, Kerana Gallery, ATHENA, and the educational ecosystem.
- Clippy, Minesweeper, and Paint easter eggs.
- Keyboard navigation, visible focus, ARIA labels, and screen-reader announcements.
- CV download and contact modules with a plain static-site architecture.

## Technology

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 custom properties, Flexbox, and Grid |
| Logic | Vanilla JavaScript ES2015+ |
| Content | Centralized PT/EN providers in `js/modules/i18n.js` |
| Delivery | Static files; no build step |
| Module model | Ordered classic scripts and explicit global objects |

The classic-script architecture is intentional: the portfolio also works through `file://` without ES module CORS restrictions.

## Run locally

The site can be opened directly through `index.html`. A local static server is recommended for consistent audio, icon, and browser behavior.

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000 .

# PHP
php -S localhost:8000
```

Open `http://localhost:8000`.

## Architecture

`js/main.js` waits for `DOMContentLoaded` and initializes each module independently. A failure in one module does not prevent unrelated modules from starting.

```text
i18n -> BootScreen -> Clock -> Language -> StartMenu -> Navigation
     -> WindowManager -> Notepad -> Accessibility -> Clippy -> Minesweeper
```

The interface uses one object per responsibility. Translatable strings live in `js/modules/i18n.js`; configuration and rendering modules consume named providers instead of duplicating PT/EN datasets.

`WindowManager.register(id)` is idempotent, preventing duplicate resize handles and document listeners. Minimum window dimensions come from CSS custom properties and are read once during initialization.

## Project structure

```text
portfolio-xp/
|-- index.html
|-- robots.txt
|-- sitemap.xml
|-- css/
|   |-- variables.css         Design tokens and window limits
|   |-- boot.css              Boot animation
|   |-- desktop.css           Desktop, taskbar, and Start menu
|   |-- window.css            Window controls and resizing
|   |-- content.css           Portfolio content and cards
|   |-- eastereggs.css        Clippy and Minesweeper
|   |-- paint.css             Paint interface
|   `-- notepad.css           About window
|-- js/
|   |-- main.js               Application initialization
|   |-- config.js             Personal configuration and i18n getters
|   `-- modules/
|       |-- i18n.js           PT/EN strings and content providers
|       |-- navigation.js     Main and project tabs
|       |-- pagination.js     Per-tab pagination
|       |-- window.js         Window manager
|       |-- docs.js           Certificate browser
|       |-- ratio.js          Ratio and Norma section
|       |-- contactForm.js    Contact form behavior
|       |-- cvDownload.js     CV download behavior
|       |-- accessibility.js  Keyboard navigation
|       |-- clippy.js         Clippy easter egg
|       |-- minesweeper.js    Minesweeper easter egg
|       `-- paint.js          Paint application
|-- cv/                       Downloadable CV files
`-- img/docs/                 Nine certificate PDFs
```

## Content model

The project area has three independent collections:

| Section | Provider |
|---|---|
| Sites | `i18n.getSites(lang)` |
| Projects | `i18n.getProjects(lang)` |
| Educational Ecosystem | `i18n.getEcosystem(lang)` |

Project cards may use `featured`, `wip`, `repo`, and `longDescription` fields. The Ratio/Norma and Documents sections use their own renderers and i18n providers.

### Add a project

1. Add Portuguese and English strings to `translations` in `js/modules/i18n.js`.
2. Add the entry to `getProjects()`, `getSites()`, or `getEcosystem()`.
3. Reuse existing card flags instead of introducing a new rendering path.

### Add a certificate

1. Place the PDF in `img/docs/` using a URL-safe filename.
2. Add `docs.<slug>` and `docs.<slug>.meta` strings in both languages.
3. Add the file entry to `getDocs()`.

## Pagination and URLs

Each project tab keeps independent pagination with five items per page. The following hashes restore a specific page:

- `#projects-page-2`
- `#sites-page-2`
- `#ecosystem-page-2`

Left and right arrow keys change the active page when focus is not inside a form control.

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Tab` | Move through focusable controls |
| Arrow keys | Move between desktop icons |
| `Left` / `Right` | Change the active project page |
| `Enter` | Activate the focused control |
| `Esc` or `Alt+F4` | Close the active closable window |
| `Ctrl+Z` | Undo the latest Paint action |

## Accessibility

- Visible `:focus-visible` treatment.
- ARIA labels and button roles for desktop icons and controls.
- Keyboard navigation across the desktop, windows, tabs, and pagination.
- Dynamic root-language updates for screen readers.
- Selectable and navigable read-only Notepad content.
- WCAG 2.1 AA contrast for primary text and surfaces.

## Responsive behavior

- Up to 900 px: windows fit the viewport with reduced margins.
- Up to 600 px: windows use the available screen between the desktop and taskbar; pagination controls stack vertically.
- Window dragging and Paint support touch input.

## SEO

The page includes canonical metadata, Open Graph and Twitter cards, descriptive alternative text, and Schema.org JSON-LD. `robots.txt` and `sitemap.xml` are included for crawlers.

## License

MIT. See [LICENSE](LICENSE).

Windows XP is a trademark of Microsoft Corporation. This project is an independent tribute and is not affiliated with Microsoft.

## Contact

- Email: `hbrslud@gmail.com`
- GitHub: [@LuddEvergard3n](https://github.com/LuddEvergard3n)
- LinkedIn: [herbertbr-sorg-ludka](https://www.linkedin.com/in/herbertbr-sorg-ludka/)
