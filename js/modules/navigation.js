/**
 * NAVIGATION MODULE
 * 
 * Gerencia a navegação entre seções (Sobre, Projetos, Contato)
 * e entre as abas de projetos (Sites, Projetos)
 */

const Navigation = {
  /**
   * Mostra uma seção específica
   * @param {string} sectionId - ID da seção a ser mostrada
   * @param {Event} event - Evento do clique (opcional)
   */
  showSection(sectionId, event) {
    // Ocultar todas as seções
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    
    // Atualizar abas de navegação
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    if (event && event.target) {
      const tab = event.target.closest('.nav-tab');
      if (tab) tab.classList.add('active');
    } else {
      const tab = document.querySelector(`.nav-tab[data-section="${sectionId}"]`);
      if (tab) tab.classList.add('active');
    }
    
    // Atualizar barra de endereço
    Language.updateAddressBar();
  },
  
  /**
   * Mostra uma aba de projeto (Sites ou Projetos)
   * @param {string} tabId - ID da aba ('sites' ou 'projects')
   * @param {Event} event - Evento do clique (opcional)
   */
  showProjectTab(tabId, event) {
    // Obter idioma atual
    const lang = Language.getCurrent();
    
    // Ocultar todas as abas de conteúdo do idioma atual
    const langContainer = document.querySelector(`#projects .lang.${lang}`);
    if (langContainer) {
      langContainer.querySelectorAll('.project-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Mostrar aba selecionada
      const targetContent = langContainer.querySelector(`#tab-${tabId}-${lang}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      // Atualizar botões de aba
      langContainer.querySelectorAll('.project-tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      if (event && event.target) {
        event.target.classList.add('active');
      }
      
      // Renderizar com paginação
      if (window.Pagination) {
        if (tabId === 'projects') {
          Pagination.renderProjects('projects-list-' + lang);
        } else if (tabId === 'sites') {
          Pagination.renderSites('sites-list-' + lang);
        } else if (tabId === 'ecosystem') {
          Pagination.renderEcosystem('ecosystem-list-' + lang);
        } else if (tabId === 'featured') {
          Pagination.renderFeatured('featured-list-' + lang);
          const projects = document.getElementById('projects');
          if (projects && !projects.classList.contains('hidden')) {
            history.replaceState(null, '', '#highlights');
          }
        }
      }
    }
  },
  
  /**
   * Renderiza os projetos dinamicamente com base no CONFIG
   */
  renderProjects() {
    const config = window.PORTFOLIO_CONFIG;
    if (!config) {
      console.error('Configuração não encontrada');
      return;
    }
    
    // Renderizar Sites
    this.renderProjectList('sites-list-pt', config.sites.pt);
    this.renderProjectList('sites-list-en', config.sites.en);
    
    // Renderizar Projetos
    this.renderProjectList('projects-list-pt', config.projects.pt);
    this.renderProjectList('projects-list-en', config.projects.en);
    
    // Renderizar Ecossistema Educacional
    this.renderProjectList('ecosystem-list-pt', config.ecosystem.pt);
    this.renderProjectList('ecosystem-list-en', config.ecosystem.en);
  },
  
  /**
   * Renderiza uma lista de projetos
   * @param {string} containerId - ID do container onde renderizar
   * @param {Array} projects - Array de projetos
   */
  renderProjectList(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!projects || projects.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Nenhum projeto disponível no momento.</p></div>';
      return;
    }
    
    projects.forEach(project => {
      const projectElement = this.createProjectCard(project);
      container.appendChild(projectElement);
    });
  },
  
  /**
   * Cria um card de projeto.
   *
   * Delega para Pagination.createProjectCard, que é a fonte única de verdade
   * para a estrutura do card (suporta featured, wip, repo, tags etc.).
   * Fallback local minimo caso Pagination ainda nao esteja carregado.
   *
   * @param {Object} project - Dados do projeto
   * @returns {HTMLElement} - Elemento do card
   */
  createProjectCard(project) {
    if (window.Pagination && typeof window.Pagination.createProjectCard === 'function') {
      return window.Pagination.createProjectCard(project);
    }
    // Fallback conservador (nao deveria acontecer — Pagination eh carregado antes)
    const card = document.createElement('div');
    card.className = 'project';
    const title = document.createElement('h3');
    title.textContent = project.name;
    card.appendChild(title);
    const p = document.createElement('p');
    p.textContent = project.description;
    card.appendChild(p);
    return card;
  },
  
  /**
   * Renderiza a aba "Sobre Mim" inteira: descricao + filosofia + skills.
   * Idempotente — substitui innerHTML do container, sem listeners
   * remanescentes.
   */
  renderSkills() {
    const i18n = window.i18n;
    if (!i18n) return;

    this.renderAboutContent('skills-container-pt', i18n.getAboutData('pt'));
    this.renderAboutContent('skills-container-en', i18n.getAboutData('en'));
  },

  /**
   * Renderiza o conteudo completo do Sobre Mim em um container.
   *
   * @param {string} containerId
   * @param {Object} data - Estrutura retornada por i18n.getAboutData()
   */
  renderAboutContent(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container || !data) return;

    container.innerHTML = '';

    // Descricao curta (cabecalho da aba)
    const desc = document.createElement('p');
    desc.className = 'about-description';
    desc.textContent = data.description;
    container.appendChild(desc);

    // Bloco de filosofia
    if (data.philosophy && Array.isArray(data.philosophy.paragraphs)) {
      const phBlock = document.createElement('section');
      phBlock.className = 'about-philosophy';

      const phTitle = document.createElement('h3');
      phTitle.textContent = data.philosophy.heading;
      phBlock.appendChild(phTitle);

      data.philosophy.paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        phBlock.appendChild(p);
      });

      container.appendChild(phBlock);
    }

    // Skills (mantem renderizacao anterior)
    this.renderSkillsList(container, data.skills);
  },

  /**
   * Renderiza lista de skills em um container ja existente.
   * Aceita HTMLElement (preferido) ou string (id) para compatibilidade.
   *
   * @param {HTMLElement|string} target
   * @param {Array} skills - Array de categorias de skills
   */
  renderSkillsList(target, skills) {
    const container = (typeof target === 'string')
      ? document.getElementById(target)
      : target;
    if (!container || !Array.isArray(skills)) return;

    skills.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';

      const title = document.createElement('h3');
      title.textContent = category.category;
      categoryDiv.appendChild(title);

      const list = document.createElement('ul');
      category.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });

      categoryDiv.appendChild(list);
      container.appendChild(categoryDiv);
    });
  },
  
  /**
   * Inicializa o módulo de navegação
   */
  init() {
    // Renderizar skills (mantido)
    this.renderSkills();

    // Inicializar paginação
    if (window.Pagination) {
      Pagination.init();
      Pagination.renderFeatured('featured-list-pt');
      Pagination.renderFeatured('featured-list-en');
      // Renderizar primeira página de sites, projetos e ecosystem em ambos idiomas
      Pagination.renderSites('sites-list-pt');
      Pagination.renderSites('sites-list-en');
      Pagination.renderProjects('projects-list-pt');
      Pagination.renderProjects('projects-list-en');
      Pagination.renderEcosystem('ecosystem-list-pt');
      Pagination.renderEcosystem('ecosystem-list-en');
    }

    // Renderizar secao Ratio em ambos idiomas
    if (window.Ratio && typeof window.Ratio.render === 'function') {
      window.Ratio.render();
    }

    // Mostrar primeira aba de projetos
    this.showProjectTab('featured');
  }
};

// Exportar para uso global
window.Navigation = Navigation;

// Funções globais para compatibilidade com onclick
function showSection(id, event) {
  Navigation.showSection(id, event);
}

function showProjectTab(id, event) {
  Navigation.showProjectTab(id, event);
}
