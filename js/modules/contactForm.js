/**
 * CONTACT FORM MODULE
 *
 * Sends the bilingual contact forms to Formspree without leaving the site.
 */

const ContactForm = {
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
    const submitButton = form.querySelector('.contact-form-submit');

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
    data.set('_subject', lang === 'en'
      ? 'New portfolio contact'
      : 'Novo contato pelo portfólio');

    if (submitButton) submitButton.disabled = true;
    this._setStatus(
      form,
      lang === 'en' ? 'Sending...' : 'Enviando...',
      'pending'
    );

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);

      form.reset();
      this._setStatus(
        form,
        lang === 'en' ? 'Message sent successfully.' : 'Mensagem enviada com sucesso.',
        'success'
      );
    } catch (error) {
      console.error('[ContactForm] Submission failed:', error);
      this._setStatus(
        form,
        lang === 'en'
          ? 'Unable to send. Please try again.'
          : 'Não foi possível enviar. Tente novamente.',
        'error'
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
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
