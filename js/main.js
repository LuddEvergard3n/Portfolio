/**
 * MAIN.JS
 *
 * Inicializador principal. Orquestra a ordem de boot dos módulos.
 *
 * Contrato com os módulos:
 *   - Cada módulo expõe um objeto global (ex.: window.BootScreen) com init().
 *   - Em caso de ausência de um módulo, o boot continua mas registra warning
 *     (o try/catch global anterior escondia qual módulo falhou).
 *
 * Decisão: NÃO chamar WindowManager.register() aqui para notepad/paint. O
 * próprio WindowManager.init() já registra todas as janelas conhecidas;
 * registrar duas vezes anexava handles/listeners em duplicata.
 */

(function () {
  'use strict';

  /**
   * Inicializa um módulo global pelo nome, se existir.
   * Isola falhas: um módulo que lança erro não impede os demais.
   *
   * @param {string} name - Nome do módulo em window (ex.: 'BootScreen')
   * @returns {boolean} true se o módulo foi encontrado e init() executou sem erro
   */
  function initModule(name) {
    const mod = window[name];
    if (!mod) {
      console.warn('[main] modulo ausente:', name);
      return false;
    }
    // i18n é um objeto de dados: não possui init() e isso é OK.
    if (typeof mod.init !== 'function') {
      return true;
    }
    try {
      mod.init();
      return true;
    } catch (err) {
      console.error('[main] falha ao inicializar', name, err);
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Ordem importa: i18n antes de qualquer coisa que consulte traduções;
    // Language depois de i18n; Navigation depois de Language; WindowManager
    // antes de Notepad (que chama WindowManager.open).
    const bootOrder = [
      'i18n',
      'BootScreen',
      'Clock',
      'Language',
      'StartMenu',
      'Navigation',
      'WindowManager',
      'Notepad',
      'Docs',
      'Webcam',
      'Ratio',
      'Accessibility',
      'Clippy',
      'Minesweeper',
      'DesktopGrid'
    ];

    bootOrder.forEach(initModule);

    // Abrir Notepad automaticamente após o boot.
    // 300ms é um delay para a animacao da boot screen nao sobrepor.
    if (window.Notepad && typeof window.Notepad.open === 'function') {
      setTimeout(() => window.Notepad.open(), 300);
    }
  });

  // Menu de contexto nativo: bloqueamos apenas dentro das células do
  // Minesweeper (clique direito lá marca bandeira). Fora disso, preservar.
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.minesweeper-cell')) {
      e.preventDefault();
    }
  });
})();
