/**
 * BOOT SCREEN MODULE
 * 
 * Gerencia a animação de inicialização do Windows XP
 */

const BootScreen = {
  timers: [],
  bootScreen: null,

  /**
   * Inicializa a tela de boot
   */
  init() {
    const bootScreen = document.getElementById('boot-screen');
    if (!bootScreen) return;
    this.bootScreen = bootScreen;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem('portfolio-boot-seen') === '1';
      sessionStorage.setItem('portfolio-boot-seen', '1');
    } catch (_) {
      // sessionStorage pode estar bloqueado; o boot continua normalmente.
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (alreadySeen || reducedMotion) {
      bootScreen.classList.add('hidden');
      return;
    }

    const skipButton = document.getElementById('skip-boot');
    if (skipButton) skipButton.addEventListener('click', () => this.skip());
    document.addEventListener('keydown', this.handleKeydown);

    // Tentar tocar som de boot imediatamente
    this.playStartupSound();

    // Fallback: tocar ao primeiro clique se falhar
    const tryPlayOnClick = (event) => {
      if (event.target.closest('#skip-boot')) return;
      this.playStartupSound();
    };
    this.timers.push(setTimeout(() => {
      document.addEventListener('click', tryPlayOnClick, { once: true });
    }, 100));

    this.timers.push(setTimeout(() => {
      bootScreen.classList.add('fade-out');
    }, 1100));

    this.timers.push(setTimeout(() => {
      bootScreen.classList.add('hidden');
      document.removeEventListener('keydown', this.handleKeydown);
    }, 1500));
  },

  /**
   * Fecha o boot imediatamente.
   */
  skip() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    if (this.bootScreen) this.bootScreen.classList.add('hidden');
    document.removeEventListener('keydown', this.handleKeydown);
  },

  /**
   * Permite pular o boot pelo teclado.
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    if (event.key === 'Escape') BootScreen.skip();
  },
  
  /**
   * Toca o som de inicialização do Windows XP
   */
  playStartupSound() {
    try {
      const audio = new Audio('img/windows-xp-startup.mp3');
      audio.volume = 0.12; // 12% do volume
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('[BootScreen] som de boot tocando');
          })
          .catch(err => {
            console.log('[BootScreen] som bloqueado pelo navegador; aguardando interacao do usuario');
            // Mostrar dica visual
            this.showAudioHint();
          });
      }
    } catch (error) {
      console.error('Erro ao carregar som:', error);
    }
  },
  
  /**
   * Mostra dica visual de que o som está bloqueado
   */
  showAudioHint() {
    if (!this.bootScreen || this.bootScreen.classList.contains('hidden')) return;
    const hint = document.createElement('div');
    hint.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #003399;
      color: white;
      padding: 12px 20px;
      border-radius: 5px;
      font-family: 'Tahoma', sans-serif;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
      cursor: pointer;
      animation: fadeIn 0.3s;
    `;
    hint.textContent = 'Clique para ouvir o som de boot';
    hint.onclick = () => {
      this.playStartupSound();
      hint.remove();
    };
    
    document.body.appendChild(hint);
    
    // Remover após 5 segundos
    setTimeout(() => {
      if (hint.parentNode) {
        hint.style.animation = 'fadeOut 0.3s';
        setTimeout(() => hint.remove(), 300);
      }
    }, 5000);
  }
};

// Exportar para uso global
window.BootScreen = BootScreen;
