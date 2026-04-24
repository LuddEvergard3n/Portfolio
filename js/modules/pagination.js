/**
 * PAGINATION MODULE
 * 
 * Gerencia paginação de projetos e sites
 */

const Pagination = {
  itemsPerPage: 5,
  currentProjectsPage: 1,
  currentSitesPage: 1,
  currentEcosystemPage: 1,
  
  /**
   * Inicializa o sistema de paginação
   */
  init() {
    console.log('Pagination module initialized');
    this.setupEventListeners();
    this.checkHashOnLoad();
  },
  
  /**
   * Verifica hash na URL ao carregar (ex: #projects-page-2)
   */
  checkHashOnLoad() {
    const hash = window.location.hash;
    if (hash.startsWith('#projects-page-')) {
      const page = parseInt(hash.split('-')[2]);
      if (!isNaN(page)) {
        this.currentProjectsPage = page;
      }
    } else if (hash.startsWith('#sites-page-')) {
      const page = parseInt(hash.split('-')[2]);
      if (!isNaN(page)) {
        this.currentSitesPage = page;
      }
    } else if (hash.startsWith('#ecosystem-page-')) {
      const page = parseInt(hash.split('-')[2]);
      if (!isNaN(page)) {
        this.currentEcosystemPage = page;
      }
    }
  },
  
  /**
   * Setup event listeners para navegacao por teclado.
   *
   * As setas so devem paginar quando a secao "Projetos" esta visivel E a aba
   * atual eh de projects/sites/ecosystem. O codigo anterior procurava um
   * elemento com id "projects-content" / "sites-content" que NAO existe no
   * HTML — a estrutura real usa .project-tab-content com ids tab-<nome>-<lang>.
   * Resultado: o listener retornava cedo sempre e as setas nao paginavam nada.
   */
  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      // Ignorar combinacoes com modificadores
      if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

      // A secao "Projetos" precisa estar visivel
      const projectsSection = document.getElementById('projects');
      if (!projectsSection || projectsSection.classList.contains('hidden')) return;

      // Nao interferir quando o foco esta num campo de texto
      const ae = document.activeElement;
      if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable)) {
        return;
      }

      // Identificar a aba ativa dentro do container do idioma atual
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      const activeTab = document.querySelector(
        `#projects .lang.${lang} .project-tab-content.active`
      );
      if (!activeTab) return;

      // activeTab.id e da forma "tab-<nome>-<lang>"
      const parts = activeTab.id.split('-');
      const tabName = parts[1]; // 'sites' | 'projects' | 'ecosystem'

      if (e.key === 'ArrowRight') {
        if (tabName === 'projects') this.nextProjectsPage();
        else if (tabName === 'sites') this.nextSitesPage();
        else if (tabName === 'ecosystem') this.nextEcosystemPage();
        else return;
        e.preventDefault();
      } else { // ArrowLeft
        if (tabName === 'projects') this.prevProjectsPage();
        else if (tabName === 'sites') this.prevSitesPage();
        else if (tabName === 'ecosystem') this.prevEcosystemPage();
        else return;
        e.preventDefault();
      }
    });
  },
  
  /**
   * Pagina array de items
   * @param {Array} items - Array de items
   * @param {number} page - Número da página (1-indexed)
   * @returns {Object} - { items, totalPages, currentPage }
   */
  paginate(items, page) {
    const totalPages = Math.ceil(items.length / this.itemsPerPage);
    const validPage = Math.max(1, Math.min(page, totalPages));
    
    const startIndex = (validPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      totalPages,
      currentPage: validPage,
      hasNext: validPage < totalPages,
      hasPrev: validPage > 1
    };
  },
  
  /**
   * Renderiza projetos com paginação
   * @param {string} containerId - ID do container
   */
  renderProjects(containerId = 'projects-list-pt') {
    const projects = window.i18n.getProjects();
    const paginated = this.paginate(projects, this.currentProjectsPage);
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';
    
    // Renderizar items
    paginated.items.forEach(project => {
      const card = this.createProjectCard(project);
      container.appendChild(card);
    });
    
    // Atualizar controles de paginação
    this.updatePaginationControls('projects', paginated, containerId);
    
    // Atualizar URL hash
    window.location.hash = `projects-page-${paginated.currentPage}`;
    
    // Animação fade-in
    this.animateFadeIn(container);
  },
  
  /**
   * Renderiza sites com paginação
   * @param {string} containerId - ID do container
   */
  renderSites(containerId = 'sites-list-pt') {
    const sites = window.i18n.getSites();
    const paginated = this.paginate(sites, this.currentSitesPage);
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';
    
    // Renderizar items
    paginated.items.forEach(site => {
      const card = this.createProjectCard(site); // Usa mesma estrutura
      container.appendChild(card);
    });
    
    // Atualizar controles de paginação
    this.updatePaginationControls('sites', paginated, containerId);
    
    // Atualizar URL hash
    window.location.hash = `sites-page-${paginated.currentPage}`;
    
    // Animação fade-in
    this.animateFadeIn(container);
  },
  
  /**
   * Renderiza ecossistema educacional com paginação
   * @param {string} containerId - ID do container
   */
  renderEcosystem(containerId = 'ecosystem-list-pt') {
    const ecosystem = window.i18n.getEcosystem();
    const paginated = this.paginate(ecosystem, this.currentEcosystemPage);
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limpar container
    container.innerHTML = '';
    
    // Renderizar items
    paginated.items.forEach(site => {
      const card = this.createProjectCard(site); // Usa mesma estrutura
      container.appendChild(card);
    });
    
    // Atualizar controles de paginação
    this.updatePaginationControls('ecosystem', paginated, containerId);
    
    // Atualizar URL hash
    window.location.hash = `ecosystem-page-${paginated.currentPage}`;
    
    // Animação fade-in
    this.animateFadeIn(container);
  },
  
  /**
   * Cria card de projeto/site (usa mesma estrutura do Navigation)
   * @param {Object} item - Projeto ou site
   * @returns {HTMLElement}
   */
  createProjectCard(item) {
    const card = document.createElement('div');
    card.className = 'project';
    
    // Título
    const title = document.createElement('h3');
    title.textContent = item.name;
    card.appendChild(title);
    
    // Descrição
    const description = document.createElement('p');
    description.textContent = item.description;
    card.appendChild(description);
    
    // Tags (se existirem)
    if (item.tags && item.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'project-tags';
      
      item.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
      
      card.appendChild(tagsContainer);
    }
    
    // Link
    const lang = window.Language ? window.Language.getCurrent() : 'pt';
    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'project-link';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = lang === 'pt' ? 'Ver projeto' : 'View project';
    
    card.appendChild(link);
    
    return card;
  },
  
  /**
   * Atualiza controles de paginação
   * @param {string} type - 'projects' ou 'sites'
   * @param {Object} paginated - Dados da paginação
   * @param {string} containerId - ID do container específico
   */
  updatePaginationControls(type, paginated, containerId = null) {
    const lang = window.Language ? window.Language.getCurrent() : 'pt';
    const controlsId = containerId ? `${containerId}-pagination` : 
                      (type === 'projects' ? `projects-pagination-${lang}` : `sites-pagination-${lang}`);
    let controls = document.getElementById(controlsId);
    
    // Criar controles se não existirem
    if (!controls) {
      controls = document.createElement('div');
      controls.id = controlsId;
      controls.className = 'pagination-controls';
      
      const container = document.getElementById(containerId || 
        (type === 'projects' ? `projects-list-${lang}` : `sites-list-${lang}`)
      );
      if (container && container.parentNode) {
        container.parentNode.appendChild(controls);
      }
    }
    
    // Renderizar controles apenas se houver mais de 1 página
    if (paginated.totalPages <= 1) {
      controls.style.display = 'none';
      return;
    }
    
    // Obter traduções (lang já foi declarado na linha 213)
    const prevText = window.i18n ? window.i18n.t('pagination.previous', lang) : 'Anterior';
    const nextText = window.i18n ? window.i18n.t('pagination.next', lang) : 'Próxima';
    const pageText = window.i18n ? window.i18n.t('pagination.page', lang) : 'Página';
    const ofText = window.i18n ? window.i18n.t('pagination.of', lang) : 'de';
    
    controls.style.display = 'flex';
    controls.innerHTML = `
      <button 
        class="pagination-btn" 
        id="${type}-prev"
        ${!paginated.hasPrev ? 'disabled' : ''}
        aria-label="${prevText}">
        ← ${prevText}
      </button>
      
      <span class="pagination-info">
        ${pageText} ${paginated.currentPage} ${ofText} ${paginated.totalPages}
      </span>
      
      <button 
        class="pagination-btn" 
        id="${type}-next"
        ${!paginated.hasNext ? 'disabled' : ''}
        aria-label="${nextText}">
        ${nextText} →
      </button>
    `;
    
    // Adicionar event listeners
    const prevBtn = controls.querySelector(`#${type}-prev`);
    const nextBtn = controls.querySelector(`#${type}-next`);
    
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (type === 'projects') {
          this.prevProjectsPage();
        } else if (type === 'sites') {
          this.prevSitesPage();
        } else if (type === 'ecosystem') {
          this.prevEcosystemPage();
        }
      };
    }
    
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (type === 'projects') {
          this.nextProjectsPage();
        } else if (type === 'sites') {
          this.nextSitesPage();
        } else if (type === 'ecosystem') {
          this.nextEcosystemPage();
        }
      };
    }
  },
  
  /**
   * Próxima página de projetos
   */
  nextProjectsPage() {
    const projects = window.i18n.getProjects();
    const totalPages = Math.ceil(projects.length / this.itemsPerPage);
    
    if (this.currentProjectsPage < totalPages) {
      this.currentProjectsPage++;
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      this.renderProjects(`projects-list-${lang}`);
      this.scrollToTop();
    }
  },
  
  /**
   * Página anterior de projetos
   */
  prevProjectsPage() {
    if (this.currentProjectsPage > 1) {
      this.currentProjectsPage--;
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      this.renderProjects(`projects-list-${lang}`);
      this.scrollToTop();
    }
  },
  
  /**
   * Próxima página de sites
   */
  nextSitesPage() {
    const sites = window.i18n.getSites();
    const totalPages = Math.ceil(sites.length / this.itemsPerPage);
    
    if (this.currentSitesPage < totalPages) {
      this.currentSitesPage++;
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      this.renderSites(`sites-list-${lang}`);
      this.scrollToTop();
    }
  },
  
  /**
   * Página anterior de sites
   */
  prevSitesPage() {
    if (this.currentSitesPage > 1) {
      this.currentSitesPage--;
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      this.renderSites(`sites-list-${lang}`);
      this.scrollToTop();
    }
  },
  
  /**
   * Próxima página de ecosystem
   */
  nextEcosystemPage() {
    const ecosystem = window.i18n.getEcosystem();
    const totalPages = Math.ceil(ecosystem.length / this.itemsPerPage);
    
    if (this.currentEcosystemPage < totalPages) {
      this.currentEcosystemPage++;
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      this.renderEcosystem(`ecosystem-list-${lang}`);
      this.scrollToTop();
    }
  },
  
  /**
   * Página anterior de ecosystem
   */
  prevEcosystemPage() {
    if (this.currentEcosystemPage > 1) {
      this.currentEcosystemPage--;
      const lang = window.Language ? window.Language.getCurrent() : 'pt';
      this.renderEcosystem(`ecosystem-list-${lang}`);
      this.scrollToTop();
    }
  },
  
  /**
   * Scroll suave para o topo do conteúdo
   */
  scrollToTop() {
    const activeContent = document.querySelector('.window-content.active');
    if (activeContent) {
      activeContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  
  /**
   * Animação fade-in
   * @param {HTMLElement} element
   */
  animateFadeIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  },
  
  /**
   * Reseta paginação ao trocar de idioma
   */
  reset() {
    this.currentProjectsPage = 1;
    this.currentSitesPage = 1;
    this.currentEcosystemPage = 1;
  }
};

// Exportar para uso global
window.Pagination = Pagination;