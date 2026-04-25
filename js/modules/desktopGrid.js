/**
 * DESKTOP GRID
 *
 * Calcula a quantidade ideal de colunas para os icones do desktop dada
 * a viewport atual. Setta --desktop-cols no :root, que e consumida pelo
 * .desktop-icons em css/desktop.css.
 *
 * Por que nao usar grid-template-columns: repeat(auto-fill, ...)?
 *   auto-fill resolveria largura, mas o desktop precisa de fluxo COLUNA-A-COLUNA
 *   (estilo XP), e auto-fill so se comporta bem em fluxo padrao (linha-a-linha).
 *   Calcular o numero exato de colunas e travar com repeat(N, ...) garante
 *   distribuicao limpa para a contagem real de icones, sem "buracos".
 *
 * Estrategia:
 *   1. Medir largura disponivel da viewport (descontando margem lateral).
 *   2. Medir altura disponivel (descontando taskbar e margem).
 *   3. Medir tamanho real de um icone + gap (lendo do DOM, nao hardcoded —
 *      respeita media queries responsivas).
 *   4. Calcular maxCols = floor(largura / largura-icone-com-gap).
 *   5. Calcular maxRows = floor(altura / altura-icone-com-gap).
 *   6. Escolher cols tal que ceil(N / cols) <= maxRows e cols <= maxCols,
 *      preferindo o menor cols que satisfaz (deixa o grid mais alto e estreito,
 *      como o XP original).
 *
 * Quando recalcular:
 *   - No DOMContentLoaded inicial.
 *   - Em cada resize, com debounce de 150ms.
 */

(function () {
  'use strict';

  const DesktopGrid = {
    /** Container dos icones (cacheado no init). */
    container: null,

    /** Timer do debounce de resize. */
    _resizeTimer: null,

    /**
     * Mede tamanho real de um icone + gap a partir do DOM.
     *
     * Defensivo: ignora valores absurdos de getBoundingClientRect (ex.:
     * 0 quando elemento esta hidden, ou valores enormes por bugs de
     * layout). Usa fallbacks razoaveis.
     *
     * @returns {{w: number, h: number}|null} dimensoes em pixels CSS
     */
    measureIcon() {
      if (!this.container) return null;
      const icon = this.container.querySelector('.desktop-icon');
      if (!icon) return null;

      const iconRect = icon.getBoundingClientRect();
      const styles = getComputedStyle(this.container);

      const gapRaw = (styles.getPropertyValue('gap') ||
                     styles.getPropertyValue('column-gap') || '').trim();
      const gapParts = gapRaw.split(/\s+/).map(s => parseFloat(s) || 0);
      const rowGap = gapParts[0] || 16;
      const colGap = gapParts[1] != null ? gapParts[1] : rowGap;

      // Sanidade: se medicao retornou algo fora do esperado (0 ou >300),
      // usar valores nominais do CSS. Sem isso, qualquer glitch de
      // medicao vira layout esquisito.
      let w = iconRect.width;
      let h = iconRect.height;
      if (!Number.isFinite(w) || w < 40 || w > 300) w = 82;
      if (!Number.isFinite(h) || h < 40 || h > 300) h = 75;

      return { w: w + colGap, h: h + rowGap };
    },

    /**
     * Calcula e aplica o numero ideal de colunas.
     *
     * Heuristica "area de trabalho real":
     *   1. Calcular maxRows = quantos icones cabem verticalmente em uma
     *      unica coluna na viewport atual.
     *   2. cols = ceil(total / maxRows). Garante encher coluna a coluna
     *      sem buracos verticais.
     *   3. Limitar pelo maxCols horizontal.
     *
     * Salvaguarda: cols nunca pode passar de ceil(total/2). Em outras
     * palavras, sempre haver pelo menos 2 icones por coluna em qualquer
     * tela com pelo menos 2 linhas verticais. Sem isso, um glitch de
     * medicao podia levar a "14 colunas × 1 linha" (linha horizontal),
     * que e o contrario do efeito desejado.
     */
    apply() {
      if (!this.container) return;

      const icons = this.container.querySelectorAll('.desktop-icon');
      const total = icons.length;
      if (total === 0) return;

      const dims = this.measureIcon();
      if (!dims || dims.w <= 0 || dims.h <= 0) return;

      const containerRect = this.container.getBoundingClientRect();
      const availableW = window.innerWidth - containerRect.left - 12;
      const availableH = window.innerHeight - containerRect.top - this._taskbarHeight() - 8;

      // Sanidade nas areas: viewports muito pequenas ou medicoes ruins
      // nao podem produzir maxRows=1, que degeneraria o layout para uma
      // linha horizontal.
      const safeAvailableH = Math.max(availableH, dims.h * 4);

      const maxCols = Math.max(1, Math.floor(availableW / dims.w));
      const maxRows = Math.max(2, Math.floor(safeAvailableH / dims.h));

      let cols = Math.ceil(total / maxRows);
      cols = Math.max(1, Math.min(cols, maxCols));

      // Salvaguarda final: nunca passar de ceil(total/2). Mantem aspecto
      // de "coluna alta", nao "linha horizontal".
      const maxAllowedCols = Math.max(1, Math.ceil(total / 2));
      cols = Math.min(cols, maxAllowedCols);

      // rows = quantos icones a coluna mais cheia tera. As colunas
      // anteriores recebem maxRows (todas iguais); a ultima tem o resto.
      // Para grid-template-rows, basta usar maxRows - assim o template
      // tem altura suficiente para as colunas cheias.
      const rows = Math.min(maxRows, Math.ceil(total / cols));

      const root = document.documentElement.style;
      root.setProperty('--desktop-cols', String(cols));
      root.setProperty('--desktop-rows', String(rows));
    },

    /**
     * @private Le altura da taskbar de variables.css; fallback 40px.
     */
    _taskbarHeight() {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--taskbar-height')
        .trim();
      const n = parseInt(raw, 10);
      return Number.isFinite(n) ? n : 40;
    },

    /**
     * Listener de resize com debounce.
     * @private
     */
    _onResize() {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => this.apply(), 150);
    },

    init() {
      this.container = document.querySelector('.desktop-icons');
      if (!this.container) {
        console.warn('[DesktopGrid] .desktop-icons nao encontrado');
        return;
      }
      this.apply();
      window.addEventListener('resize', () => this._onResize(), { passive: true });
    }
  };

  window.DesktopGrid = DesktopGrid;
})();
