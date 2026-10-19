/**
 * CONTACT FORM MODULE
 *
 * Envia formulario de contato via Formspree (servico estatico-friendly,
 * compativel com GitHub Pages — nao requer backend proprio).
 *
 * ============================================================
 * COMO ATIVAR (passo manual unico, ~3 min):
 *
 *   1. Acesse https://formspree.io e crie uma conta gratuita
 *      (use o email hbrslud@gmail.com para receber as mensagens).
 *
 *   2. Em "+ New form", crie um formulario. O endpoint sera algo
 *      como  https://formspree.io/f/xpzgkqab  (o codigo apos /f/
 *      e diferente para cada conta).
 *
 *   3. Substitua FORMSPREE_ENDPOINT abaixo pelo endpoint real.
 *      Confirme o email (Formspree manda link de verificacao).
 *
 *   4. Pronto. As mensagens chegam em hbrslud@gmail.com.
 *
 * Enquanto FORMSPREE_ENDPOINT contiver "PLACEHOLDER", o submit cai
 * em fallback automatico para mailto:hbrslud@gmail.com (abre o
 * cliente de email do visitante com texto pre-preenchido). Funciona,
 * mas eh inferior a Formspree.
 *
 * Limites do plano gratuito Formspree (na epoca desta implementacao):
 *   - 50 envios/mes
 *   - Captcha automatico anti-spam
 *   - Email automatico de notificacao no destino
 * ============================================================
 *
 * Anti-spam adicional implementado:
 *   - Honeypot (_gotcha): campo invisivel; bots preenchem, humanos nao.
 *     Formspree tambem trata esse padrao automaticamente.
 *   - Rate limit local: 60s entre envios do mesmo navegador.
 */

const ContactForm = {
  // SUBSTITUIR pelo endpoint real do Formspree apos criar a conta.
  // Mantenha "PLACEHOLDER" no string ate la — o modulo detecta e cai
  // em mailto: como fallback gracioso.
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/PLACEHOLDER_REPLACE_ME',

  // Email de fallback (usado quando Formspree ainda nao esta configurado)
  FALLBACK_EMAIL: 'hbrslud@gmail.com',

  // Janela de rate limit em ms
  RATE_LIMIT_MS: 60 * 1000,

  _lastSubmitTs: 0,

  /**
   * Verifica se o endpoint esta configurado de verdade ou se
   * e o placeholder.
   */
  _isConfigured() {
    return !this.FORMSPREE_ENDPOINT.includes('PLACEHOLDER');
  },

  /**
   * Inicializa: registra submit handler nos dois forms (PT/EN).
   */
  init() {
    const forms = document.querySelectorAll('form.contact-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => this._handleSubmit(e, form));
    });
  },

  /**
   * @private
   */
  async _handleSubmit(event, form) {
    event.preventDefault();

    const lang = form.dataset.lang || 'pt';
    const t = (key) => this._tr(key, lang);

    // Honeypot: se o campo invisivel foi preenchido, eh bot. Silenciar
    // sem dar feedback (bots aprendem com erros).
    const honey = form.querySelector('input[name="_gotcha"]');
    if (honey && honey.value) {
      return;
    }

    // Rate limit
    const now = Date.now();
    if (now - this._lastSubmitTs < this.RATE_LIMIT_MS) {
      this._setStatus(form, t('rate'), 'error');
      return;
    }

    // Validacao basica (HTML5 ja faz, mas garantimos UX consistente)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('.contact-form-submit');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t('sending');
    this._setStatus(form, t('sending'), 'pending');

    // Caminho 1: Formspree configurado
    if (this._isConfigured()) {
      try {
        const formData = new FormData(form);
        const response = await fetch(this.FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          this._lastSubmitTs = now;
          this._setStatus(form, t('success'), 'success');
          form.reset();
        } else {
          // Formspree devolve JSON com errors[]
          let detail = '';
          try {
            const json = await response.json();
            if (json && json.errors) {
              detail = json.errors.map(e => e.message).join('; ');
            }
          } catch (_) { /* ignora parse error */ }
          this._setStatus(form, t('error') + (detail ? ' (' + detail + ')' : ''), 'error');
        }
      } catch (err) {
        console.error('[ContactForm] erro de rede:', err);
        this._setStatus(form, t('network'), 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
      return;
    }

    // Caminho 2: fallback mailto. Abre o cliente de email com os
    // dados pre-preenchidos. Nao eh ideal mas evita perder a mensagem
    // enquanto o Formspree nao esta configurado.
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    const subject = encodeURIComponent(
      lang === 'en'
        ? `Portfolio contact from ${name}`
        : `Contato pelo portfolio de ${name}`
    );
    const body = encodeURIComponent(
      `${message}\n\n---\n${name} <${email}>`
    );
    window.location.href = `mailto:${this.FALLBACK_EMAIL}?subject=${subject}&body=${body}`;

    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
    this._setStatus(form, t('mailto'), 'pending');
  },

  /**
   * @private
   */
  _setStatus(form, text, kind) {
    const status = form.querySelector('.contact-form-status');
    if (!status) return;
    status.textContent = text;
    status.dataset.kind = kind || '';
  },

  /**
   * @private Traducoes locais simples (evita poluir i18n principal com
   * 6 chaves de form que so existem aqui).
   */
  _tr(key, lang) {
    const map = {
      pt: {
        sending: 'Enviando...',
        success: 'Mensagem enviada. Obrigado!',
        error: 'Falha ao enviar.',
        network: 'Erro de rede. Tente novamente em instantes.',
        rate: 'Aguarde um momento antes de enviar outra mensagem.',
        mailto: 'Abrindo seu cliente de email...'
      },
      en: {
        sending: 'Sending...',
        success: 'Message sent. Thank you!',
        error: 'Failed to send.',
        network: 'Network error. Try again in a moment.',
        rate: 'Please wait before sending another message.',
        mailto: 'Opening your email client...'
      }
    };
    return (map[lang] && map[lang][key]) || (map.pt[key] || key);
  }
};

window.ContactForm = ContactForm;
