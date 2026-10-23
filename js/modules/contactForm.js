/**
 * CONTACT FORM MODULE
 *
 * Monta um link mailto com os dados preenchidos e abre o aplicativo
 * de email do visitante. Nenhum dado e transmitido automaticamente.
 */

const ContactForm = {
  FALLBACK_EMAIL: 'hbrslud@gmail.com',

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
  _handleSubmit(event, form) {
    event.preventDefault();

    const lang = form.dataset.lang || 'pt';

    // Honeypot: se o campo invisivel foi preenchido, eh bot. Silenciar
    // sem dar feedback (bots aprendem com erros).
    const honey = form.querySelector('input[name="_gotcha"]');
    if (honey && honey.value) {
      return;
    }

    // Validacao basica (HTML5 ja faz, mas garantimos UX consistente)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

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
      `${message}\n\n${name} <${email}>`
    );
    window.location.href = `mailto:${this.FALLBACK_EMAIL}?subject=${subject}&body=${body}`;

    const status = lang === 'en'
      ? 'Opening your email app...'
      : 'Abrindo seu aplicativo de email...';
    this._setStatus(form, status, 'pending');
  },

  /**
   * @private
   */
  _setStatus(form, text, kind) {
    const status = form.querySelector('.contact-form-status');
    if (!status) return;
    status.textContent = text;
    status.dataset.kind = kind || '';
  }
};

window.ContactForm = ContactForm;
