/**
 * DOCS MODULE
 *
 * Janela "Meus Documentos" (certificacoes e declaracoes).
 *
 * Responsabilidades:
 *   - Renderizar a lista de documentos em ambos os idiomas (vindos de
 *     i18n.getDocs()) dentro de #docs-content-pt e #docs-content-en.
 *   - Expor open() para abrir a janela (padrao dos demais modulos:
 *     delega ao WindowManager quando disponivel).
 *
 * Nota sobre abrir PDFs em iframe:
 *   A primeira versao abria em iframe inline; isso pode falhar em navegadores
 *   com sandboxing agressivo ou quando o arquivo eh servido via file://.
 *   Optamos por abrir em nova aba (target="_blank"), que eh o comportamento
 *   esperado do "Meus Documentos" no contexto desse portfolio.
 */

const Docs = {
  _rendered: false,

  /**
   * Renderiza (ou re-renderiza) a lista de documentos em ambos os idiomas.
   * Idempotente: seguro chamar varias vezes.
   */
  render() {
    const i18n = window.i18n;
    if (!i18n) {
      console.warn('[Docs] i18n ausente; render abortado');
      return;
    }

    this._renderForLang('docs-content-pt', 'pt');
    this._renderForLang('docs-content-en', 'en');
    this._rendered = true;
  },

  /**
   * @private
   */
  _renderForLang(containerId, lang) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const i18n = window.i18n;
    const docs = i18n.getDocs(lang);
    const openLabel = i18n.t('docs.open', lang);

    const itemsHtml = docs.map((doc) => `
      <article class="doc-item">
        <div class="doc-item-info">
          <h4 class="doc-item-title">${this._escape(doc.title)}</h4>
          <p class="doc-item-meta">${this._escape(doc.meta)}</p>
        </div>
        <a class="doc-item-link" href="${this._escape(doc.file)}" target="_blank" rel="noopener noreferrer">${openLabel}</a>
      </article>
    `).join('');

    container.innerHTML = `
      <h2 class="docs-title">${i18n.t('docs.title', lang)}</h2>
      <p class="docs-intro">${i18n.t('docs.intro', lang)}</p>
      <div class="docs-list">${itemsHtml}</div>
    `;
  },

  /**
   * Escape minimo de HTML para evitar injecao acidental via strings de i18n.
   * i18n eh de fonte confiavel, mas o custo desse escape eh trivial e
   * robustece contra futuros acidentes.
   *
   * @private
   */
  _escape(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /**
   * Abre a janela "Meus Documentos".
   * Padrao identico ao Paint.open() / Notepad.open(): delega ao WindowManager.
   */
  open() {
    const windowElement = document.getElementById('docs-window');
    if (!windowElement) return;

    // Renderizar sob demanda na primeira abertura
    if (!this._rendered) {
      this.render();
    }

    windowElement.style.display = 'flex';

    if (window.WindowManager && typeof window.WindowManager.open === 'function') {
      window.WindowManager.open('docs');
    }
  },

  /**
   * Inicializacao: apenas renderiza conteudo.
   * Registro da janela eh feito pelo WindowManager (ver window.js:init).
   */
  init() {
    this.render();
  }
};

window.Docs = Docs;

// Funcao global para compatibilidade com onclick inline no HTML.
function openDocs() {
  Docs.open();
}
