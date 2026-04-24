/**
 * RATIO MODULE
 *
 * Renderiza a secao "Ratio" — empresa do portfolio + produto principal Norma.
 *
 * Fonte unica de verdade:
 *   - URLs: CONFIG.ratio (definido em js/config.js)
 *   - Textos: i18n.translations.pt/en com prefixos "ratio." e "norma."
 *
 * Eh idempotente: chamar render() duas vezes substitui o conteudo anterior,
 * sem duplicar listeners (nao ha listeners anexados aqui — tudo eh HTML
 * estatico com <a href>).
 */

const Ratio = {
  /**
   * Renderiza o conteudo da secao Ratio em ambos os idiomas.
   * Procura containers #ratio-content-pt e #ratio-content-en.
   */
  render() {
    const config = window.PORTFOLIO_CONFIG;
    const i18n = window.i18n;
    if (!config || !i18n) {
      console.warn('[Ratio] CONFIG ou i18n ausente; render abortado');
      return;
    }

    this.renderForLang('ratio-content-pt', 'pt', config, i18n);
    this.renderForLang('ratio-content-en', 'en', config, i18n);
  },

  /**
   * @private
   */
  renderForLang(containerId, lang, config, i18n) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ratio = config.ratio;

    // Helper local: traduzir pela chave no idioma dado
    const t = (key) => i18n.t(key, lang);

    // Construir innerHTML eh aceitavel aqui: nenhuma string eh user-supplied;
    // todas vem de i18n.js que nos mesmos escrevemos. Evita dezenas de
    // createElement/appendChild e mantem o markup legivel.
    const verLabel = lang === 'pt' ? 'Acessar site' : 'Visit site';

    // Features da Norma: 14 itens traduzidos, montados em lista
    const featuresHtml = [];
    for (let i = 1; i <= 14; i++) {
      featuresHtml.push(`<li>${t('norma.features.' + i)}</li>`);
    }

    container.innerHTML = `
      <h2>${t('ratio.title')}</h2>
      <p class="ratio-description">${t('ratio.description')}</p>

      <!-- Destaque: Norma -->
      <article class="ratio-card ratio-card--featured">
        <header class="ratio-card-header">
          <h3>${t('norma.title')}</h3>
          <span class="project-badge project-badge--featured">${lang === 'pt' ? 'Produto principal' : 'Flagship product'}</span>
        </header>
        <p class="ratio-card-subtitle">${t('norma.subtitle')}</p>

        <section class="ratio-card-section">
          <h4>${t('norma.what.title')}</h4>
          <p>${t('norma.what.text')}</p>
        </section>

        <section class="ratio-card-section">
          <h4>${t('norma.who.title')}</h4>
          <p>${t('norma.who.text')}</p>
        </section>

        <section class="ratio-card-section">
          <h4>${t('norma.features.title')}</h4>
          <ul class="ratio-features">${featuresHtml.join('')}</ul>
        </section>

        <section class="ratio-card-section">
          <h4>${t('norma.arch.title')}</h4>
          <p>${t('norma.arch.text')}</p>
        </section>

        <section class="ratio-card-section">
          <h4>${t('norma.norms.title')}</h4>
          <p>${t('norma.norms.list')}</p>
        </section>

        <section class="ratio-card-section ratio-card-contact">
          <strong>${lang === 'pt' ? 'Contato comercial Norma' : 'Norma business contact'}:</strong>
          <a href="tel:+5547997833118">${ratio.norma.phone}</a>
        </section>

        <div class="project-links">
          <a href="${ratio.norma.url}" class="project-link" target="_blank" rel="noopener noreferrer">${t('norma.visit')}</a>
        </div>
      </article>

      <!-- Site institucional -->
      <article class="ratio-card">
        <header class="ratio-card-header">
          <h3>${t('ratio.site')}</h3>
        </header>
        <p>${t('ratio.site.desc')}</p>
        <div class="project-links">
          <a href="${ratio.company.url}" class="project-link" target="_blank" rel="noopener noreferrer">${verLabel}</a>
        </div>
      </article>
    `;
  }
};

window.Ratio = Ratio;
