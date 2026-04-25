/**
 * WEBCAM MODULE (Easter Egg)
 *
 * Abre a webcam do dispositivo via getUserMedia. Easter egg sem fingir
 * ser scanner — eh literalmente a camera ao vivo.
 *
 * Decisoes:
 *   - getUserMedia exige HTTPS ou localhost. GitHub Pages serve HTTPS,
 *     entao funciona. Em http:// puro, o navegador bloqueia. O modulo
 *     detecta e mostra mensagem clara.
 *   - O stream precisa ser parado explicitamente (track.stop()) ao
 *     fechar a janela; senao a luzinha da camera continua acesa. Hook
 *     no close-btn cuida disso.
 *   - Snapshot via Canvas eh feature minima de "scanner": clica no
 *     botao, baixa um PNG. Sem upload, sem servidor.
 */

const Webcam = {
  _stream: null,
  _videoEl: null,
  _statusEl: null,
  _rendered: false,

  /**
   * Renderiza estrutura interna da janela (uma vez so).
   * Idempotente.
   */
  render() {
    if (this._rendered) return;
    const container = document.getElementById('webcam-content');
    if (!container) return;

    const lang = window.Language ? window.Language.getCurrent() : 'pt';
    const t = (k) => window.i18n.t(k, lang);

    // innerHTML eh seguro aqui: nenhuma string vem de input do usuario;
    // tudo vem de i18n.js que escrevemos.
    container.innerHTML = `
      <div class="webcam-wrap">
        <p class="webcam-intro">${t('webcam.intro')}</p>
        <div class="webcam-stage">
          <video id="webcam-video" autoplay muted playsinline></video>
          <div id="webcam-overlay" class="webcam-overlay">${t('webcam.idle')}</div>
        </div>
        <div class="webcam-controls">
          <button id="webcam-start" class="webcam-btn">${t('webcam.start')}</button>
          <button id="webcam-snapshot" class="webcam-btn" disabled>${t('webcam.snapshot')}</button>
          <button id="webcam-stop" class="webcam-btn" disabled>${t('webcam.stop')}</button>
        </div>
        <div id="webcam-status" class="webcam-status">${t('webcam.idle')}</div>
      </div>
    `;

    this._videoEl = container.querySelector('#webcam-video');
    this._statusEl = container.querySelector('#webcam-status');
    const overlay = container.querySelector('#webcam-overlay');
    const btnStart = container.querySelector('#webcam-start');
    const btnSnap = container.querySelector('#webcam-snapshot');
    const btnStop = container.querySelector('#webcam-stop');

    btnStart.addEventListener('click', () => this.start(btnStart, btnSnap, btnStop, overlay));
    btnSnap.addEventListener('click', () => this.snapshot());
    btnStop.addEventListener('click', () => this.stop(btnStart, btnSnap, btnStop, overlay));

    this._rendered = true;
  },

  /**
   * Re-renderiza ao trocar idioma (idempotente: forca re-render).
   */
  rerender() {
    // Para o stream antes de re-renderizar (senao perdemos referencias)
    this.stop();
    this._rendered = false;
    this.render();
  },

  /**
   * Inicia o stream.
   * @private
   */
  async start(btnStart, btnSnap, btnStop, overlay) {
    const lang = window.Language ? window.Language.getCurrent() : 'pt';
    const t = (k) => window.i18n.t(k, lang);

    // Pre-checagem: getUserMedia so existe em contextos seguros.
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this._setStatus(t('webcam.error.insecure'), 'error');
      return;
    }

    this._setStatus(t('webcam.requesting'), 'pending');
    btnStart.disabled = true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      this._stream = stream;
      this._videoEl.srcObject = stream;
      overlay.style.display = 'none';
      this._setStatus(t('webcam.live'), 'live');
      btnSnap.disabled = false;
      btnStop.disabled = false;
    } catch (err) {
      btnStart.disabled = false;
      this._handleError(err, t);
    }
  },

  /**
   * Para o stream (libera a camera).
   * Idempotente: chamar sem stream ativo eh no-op.
   */
  stop(btnStart, btnSnap, btnStop, overlay) {
    if (this._stream) {
      this._stream.getTracks().forEach(track => track.stop());
      this._stream = null;
    }
    if (this._videoEl) {
      this._videoEl.srcObject = null;
    }
    if (overlay) overlay.style.display = '';

    if (btnStart) btnStart.disabled = false;
    if (btnSnap) btnSnap.disabled = true;
    if (btnStop) btnStop.disabled = true;

    const lang = window.Language ? window.Language.getCurrent() : 'pt';
    this._setStatus(window.i18n.t('webcam.idle', lang), 'idle');
  },

  /**
   * Captura snapshot do frame atual e dispara download de PNG.
   */
  snapshot() {
    if (!this._stream || !this._videoEl) return;
    const v = this._videoEl;
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth || 640;
    canvas.height = v.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = 'scan-' + Date.now() + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  },

  /**
   * @private
   */
  _handleError(err, t) {
    let msg;
    if (err && err.name === 'NotAllowedError') msg = t('webcam.error.denied');
    else if (err && (err.name === 'NotFoundError' || err.name === 'OverconstrainedError')) msg = t('webcam.error.notfound');
    else if (err && err.name === 'NotSupportedError') msg = t('webcam.error.insecure');
    else msg = t('webcam.error.generic');

    this._setStatus(msg, 'error');
    console.warn('[Webcam] erro:', err);
  },

  /**
   * @private
   */
  _setStatus(text, kind) {
    if (!this._statusEl) return;
    this._statusEl.textContent = text;
    this._statusEl.dataset.kind = kind || '';
  },

  /**
   * Abre a janela. Padrao identico a Paint/Notepad/Docs.
   */
  open() {
    const win = document.getElementById('webcam-window');
    if (!win) return;
    this.render();
    win.style.display = 'flex';
    if (window.WindowManager && typeof window.WindowManager.open === 'function') {
      window.WindowManager.open('webcam');
    }
  },

  /**
   * Boot. Renderiza e instala hook no botao de fechar para parar o
   * stream automaticamente (senao a luzinha da camera fica acesa).
   */
  init() {
    this.render();

    const win = document.getElementById('webcam-window');
    if (!win) return;
    const closeBtn = win.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.stop(
        win.querySelector('#webcam-start'),
        win.querySelector('#webcam-snapshot'),
        win.querySelector('#webcam-stop'),
        win.querySelector('#webcam-overlay')
      ));
    }
  }
};

window.Webcam = Webcam;

function openWebcam() {
  Webcam.open();
}
