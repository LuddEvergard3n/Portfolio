/**
 * CV DOWNLOAD MODULE
 *
 * Baixa o curriculo (PT ou EN) como PDF usando html2pdf.js (CDN).
 *
 * Estrategia:
 *   1. Lazy load do html2pdf.js apenas quando o usuario clica em baixar.
 *      Sem isso, ~150KB ficariam baixando mesmo para quem so quer ver
 *      o portfolio.
 *   2. O HTML do CV (cv/cv-pt.html, cv/cv-en.html) eh fetchado e o
 *      conteudo do <div class="page"> eh extraido e renderizado num
 *      iframe oculto, capturado pelo html2pdf, baixado.
 *   3. Configuracoes do html2pdf otimizadas para A4: margens zero (CSS
 *      ja cuida), formato A4, qualidade alta.
 *
 * Decisao: usar iframe para isolamento completo. html2pdf eh sensivel
 * a CSS herdado; injetar o CV no documento atual contaminaria com
 * estilos do portfolio. Iframe garante isolamento total.
 *
 * Nota sobre o CDN: html2pdf.js eh carregado via cdnjs. Se o projeto
 * for usar offline-only, baixe a lib e referencie localmente.
 */

const CvDownload = {
  // URL do CDN para html2pdf.js (versao estavel)
  HTML2PDF_CDN: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',

  // Estado de carregamento da lib
  _libPromise: null,

  /**
   * Carrega html2pdf.js via injecao de <script>. Cacheado: chamadas
   * subsequentes devolvem a mesma promise.
   *
   * @returns {Promise<void>}
   */
  loadLib() {
    if (this._libPromise) return this._libPromise;

    this._libPromise = new Promise((resolve, reject) => {
      // Ja carregado em outro contexto?
      if (window.html2pdf) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = this.HTML2PDF_CDN;
      script.async = true;
      script.onload = () => {
        if (window.html2pdf) resolve();
        else reject(new Error('html2pdf nao expos window.html2pdf apos carregamento'));
      };
      script.onerror = () => reject(new Error('Falha ao carregar html2pdf.js do CDN'));
      document.head.appendChild(script);
    });

    return this._libPromise;
  },

  /**
   * Faz o fetch do HTML do CV no idioma indicado e devolve um
   * elemento DOM contendo o <div class="page"> (corpo do CV).
   *
   * @param {string} lang - 'pt' ou 'en'
   * @returns {Promise<HTMLElement>}
   */
  async fetchCvDom(lang) {
    const url = lang === 'en' ? 'cv/cv-en.html' : 'cv/cv-pt.html';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Falha ao buscar ${url}: HTTP ${response.status}`);
    }
    const text = await response.text();

    // Parse para DOM em ambiente isolado
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // O html2pdf precisa do elemento raiz com TODO o styling — entao
    // pegamos o body inteiro. Os <style> dentro do <head> serao
    // copiados na funcao de download.
    const page = doc.querySelector('.page');
    const head = doc.querySelector('head');
    if (!page) throw new Error(`HTML do CV (${url}) nao contem .page`);
    if (!head) throw new Error(`HTML do CV (${url}) nao contem <head>`);

    return { page, head };
  },

  /**
   * Garante que styles e font-links do CV estao presentes no <head>
   * do documento principal, com escopo limitado ao wrapper de render.
   * Idempotente: marca cada style com data-cv-style="<lang>" para
   * nao duplicar em chamadas seguintes.
   *
   * Por que injetar no documento principal (e nao no wrapper)?
   *   html2canvas (que html2pdf usa) nao processa @font-face nem
   *   <link rel="stylesheet"> dentro de subarvores clonadas. Sem
   *   estilos no documento principal antes da captura, canvas sai
   *   em branco. Esse era o bug reportado: PDF baixado vazio.
   *
   * Por que escopar com #cv-render-wrapper?
   *   O CSS do CV tem reset agressivo (* { margin: 0 }) que quebraria
   *   o portfolio inteiro se injetado sem escopo. Reescrevemos cada
   *   seletor para prefixar com #cv-render-wrapper, isolando os
   *   efeitos ao container offscreen.
   *
   * @param {Object} dom - { head: HTMLHeadElement }
   * @param {string} lang - 'pt' | 'en'
   */
  injectStyles(dom, lang) {
    const marker = `data-cv-style-${lang}`;
    if (document.head.querySelector(`[${marker}]`)) return; // ja injetado

    // <link> de fontes (Google Fonts, preconnect): sem escopo necessario,
    // sao recursos remotos que afetam @font-face globalmente.
    dom.head.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]')
      .forEach((node) => {
        const clone = node.cloneNode(true);
        clone.setAttribute(marker, 'true');
        document.head.appendChild(clone);
      });

    // <style>: precisa escopar todos os seletores para nao vazar.
    dom.head.querySelectorAll('style').forEach((node) => {
      const scoped = this.scopeCssToWrapper(node.textContent, '#cv-render-wrapper');
      const styleTag = document.createElement('style');
      styleTag.setAttribute(marker, 'true');
      styleTag.textContent = scoped;
      document.head.appendChild(styleTag);
    });
  },

  /**
   * Escopa um bloco de CSS a um seletor pai, preservando @-rules.
   *
   * Estrategia simples (suficiente para o CSS do CV):
   *   - Para cada regra de seletor (selector { decls }), prefixa com
   *     `${parent} `. Selectors que comecam com :root viram apenas
   *     `${parent}` (sem espaco).
   *   - @media, @page, @keyframes: o conteudo interno tambem eh
   *     processado recursivamente.
   *   - @font-face, @import, @charset: passam intactos.
   *
   * NAO eh um parser CSS completo. Eh um transformador adequado para
   * o formato do CSS gerado pelo CV (sem CSS-in-CSS aninhado, sem
   * tricks raros). Suficiente.
   *
   * @param {string} css
   * @param {string} parent - seletor (ex: '#cv-render-wrapper')
   * @returns {string} CSS escopado
   */
  scopeCssToWrapper(css, parent) {
    // Remover comentarios para simplificar parsing
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');

    // Processar sequencialmente, respeitando blocos at-rule
    let result = '';
    let i = 0;
    const n = noComments.length;

    while (i < n) {
      // Pular whitespace
      while (i < n && /\s/.test(noComments[i])) {
        result += noComments[i];
        i++;
      }
      if (i >= n) break;

      if (noComments[i] === '@') {
        // At-rule: encontrar nome
        const atStart = i;
        while (i < n && !/[\s{;]/.test(noComments[i])) i++;
        const atName = noComments.substring(atStart, i);

        if (atName === '@font-face' || atName === '@import' || atName === '@charset') {
          // Passar intacto ate proximo `}` (ou `;` para @import/@charset)
          const endChar = (atName === '@font-face') ? '}' : ';';
          while (i < n && noComments[i] !== endChar) i++;
          if (i < n) i++; // incluir o caractere final
          result += noComments.substring(atStart, i);
        } else if (atName === '@media' || atName === '@supports') {
          // Capturar prelude ate '{'
          while (i < n && noComments[i] !== '{') i++;
          const prelude = noComments.substring(atStart, i);
          if (i >= n) { result += prelude; break; }
          // Capturar bloco com balanceamento
          const blockStart = i;
          let depth = 0;
          while (i < n) {
            const c = noComments[i];
            if (c === '{') depth++;
            else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
            i++;
          }
          const inner = noComments.substring(blockStart + 1, i - 1);
          // Recursivamente escopar o conteudo interno
          result += prelude + '{' + this.scopeCssToWrapper(inner, parent) + '}';
        } else if (atName === '@keyframes' || atName === '@-webkit-keyframes' || atName === '@page') {
          // Passar intacto (selectors como "from", "to" nao devem ser escopados)
          while (i < n && noComments[i] !== '{') i++;
          const blockStart = i;
          let depth = 0;
          while (i < n) {
            const c = noComments[i];
            if (c === '{') depth++;
            else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
            i++;
          }
          result += noComments.substring(atStart, i);
        } else {
          // Outras at-rules desconhecidas: passar intacto
          while (i < n && noComments[i] !== ';' && noComments[i] !== '{') i++;
          if (i < n && noComments[i] === '{') {
            let depth = 0;
            while (i < n) {
              const c = noComments[i];
              if (c === '{') depth++;
              else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
              i++;
            }
          } else if (i < n) {
            i++; // ;
          }
          result += noComments.substring(atStart, i);
        }
      } else {
        // Regra normal: capturar selector lista ate '{'
        const selStart = i;
        while (i < n && noComments[i] !== '{') i++;
        if (i >= n) break;
        const rawSelectors = noComments.substring(selStart, i).trim();
        // Capturar bloco de declaracoes
        const blockStart = i;
        let depth = 0;
        while (i < n) {
          const c = noComments[i];
          if (c === '{') depth++;
          else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
          i++;
        }
        const block = noComments.substring(blockStart, i);

        // Escopar selectors (separados por virgula)
        const scopedSelectors = rawSelectors.split(',').map(sel => {
          const s = sel.trim();
          if (!s) return s;
          // :root vira apenas o parent
          if (s === ':root' || s === 'html' || s === 'body') return parent;
          // Universal '*' vira '#parent *'
          return parent + ' ' + s;
        }).join(', ');

        result += scopedSelectors + ' ' + block;
      }
    }

    return result;
  },

  /**
   * Aguarda N ms via requestAnimationFrame + timeout. Garante que
   * o navegador processou layout/style antes da captura.
   *
   * @param {number} ms
   * @returns {Promise<void>}
   */
  waitForLayout(ms = 200) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        setTimeout(resolve, ms);
      });
    });
  },

  /**
   * Baixa o CV no idioma indicado.
   *
   * @param {string} lang - 'pt' ou 'en'
   */
  async download(lang) {
    const langSafe = (lang === 'en') ? 'en' : 'pt';
    const filename = langSafe === 'en'
      ? 'Herbert_Ludka_Resume_EN.pdf'
      : 'Herbert_Ludka_Curriculo_PT.pdf';

    // Feedback visual minimo: muda o cursor enquanto baixa
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = 'progress';

    let wrapper = null;

    try {
      // Carregar a lib em paralelo com o fetch do HTML
      const [_, dom] = await Promise.all([
        this.loadLib(),
        this.fetchCvDom(langSafe)
      ]);

      // PASSO 1: Injetar estilos do CV no <head> do documento principal.
      // Sem isso, fontes externas e regras CSS do CV ficam invisiveis
      // para html2canvas mesmo dentro do wrapper.
      this.injectStyles(dom, langSafe);

      // PASSO 2: Aguardar fontes carregarem no contexto principal.
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // PASSO 3: Montar wrapper "rendered but not seen". A combinacao
      //   visibility: hidden  → html2canvas pode pular esses elementos
      //   left: -99999px      → tem reportes de ficar zerado no canvas
      // funcionam mal com html2pdf. Usamos opacity:0 + position absolute
      // posicionado FORA da rolagem da pagina (top muito alto), mas
      // ainda no documento. O elemento renderiza completamente, layout
      // estavel, e o usuario nao ve nada.
      wrapper = document.createElement('div');
      wrapper.id = 'cv-render-wrapper';
      wrapper.style.cssText = [
        'position: absolute',
        'top: -10000px',
        'left: 0',
        'width: 210mm',
        'opacity: 0',
        'pointer-events: none',
        'z-index: -1',
        'background: #FAFAF8'
      ].join(';');

      // Clonar o conteudo do CV
      const pageClone = dom.page.cloneNode(true);
      wrapper.appendChild(pageClone);
      document.body.appendChild(wrapper);

      // PASSO 4: Aguardar 1 frame + 200ms para o layout estabilizar.
      // Imagens e fontes podem precisar de tempo mesmo apos fonts.ready.
      await this.waitForLayout(200);

      // PASSO 5: Configurar e executar html2pdf.
      const opts = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          // Capturar a partir do topo, sem cortar
          windowWidth: pageClone.offsetWidth || 794,
          windowHeight: pageClone.offsetHeight || 1123,
          // Backgrounds importam para o tema do CV
          backgroundColor: '#FAFAF8'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      await window.html2pdf().set(opts).from(pageClone).save();
    } catch (err) {
      console.error('[CvDownload] erro:', err);
      const msg = (window.Language && window.Language.getCurrent() === 'en')
        ? 'Could not generate PDF. Try again or check console.'
        : 'Nao foi possivel gerar o PDF. Tente novamente ou veja o console.';
      alert(msg);
    } finally {
      // Limpar wrapper sempre, mesmo em caso de erro
      if (wrapper && wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
      document.body.style.cursor = previousCursor;
    }
  }
};

window.CvDownload = CvDownload;

// Funcoes globais para compatibilidade com onclick inline
function downloadCvPt() {
  CvDownload.download('pt');
}

function downloadCvEn() {
  CvDownload.download('en');
}
