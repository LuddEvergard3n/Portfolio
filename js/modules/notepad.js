/**
 * NOTEPAD MODULE
 * 
 * Gerencia o Bloco de Notas (Sobre Mim) no estilo Windows XP
 */

const Notepad = {
  /**
   * Inicializa o módulo do Notepad
   */
  init() {
    console.log('Notepad module initialized');
    this.updateContent();
    
    // Escutar mudanças de idioma
    document.addEventListener('languageChanged', () => {
      this.updateContent();
    });
  },
  
  /**
   * Abre o Notepad
   */
  open() {
    const notepadWindow = document.getElementById('notepad-window');
    if (notepadWindow) {
      notepadWindow.style.display = 'flex';
      WindowManager.open('notepad');
      this.updateContent();
    }
  },
  
  /**
   * Atualiza o conteúdo do Notepad com base no idioma atual
   */
  updateContent() {
    if (!window.i18n) return;
    
    const lang = window.Language ? window.Language.getCurrent() : 'pt';
    
    // Atualizar título da janela
    const titleBar = document.querySelector('#notepad-window .window-title');
    if (titleBar) {
      titleBar.textContent = window.i18n.t('notepad.title', lang);
    }
    
    // Atualizar conteúdo do textarea
    const textarea = document.getElementById('notepad-textarea');
    if (textarea) {
      textarea.value = window.i18n.t('notepad.content', lang);
    }
  }
};

// Exportar para uso global
window.Notepad = Notepad;

// Função global para compatibilidade com onclick
function openNotepad() {
  Notepad.open();
}