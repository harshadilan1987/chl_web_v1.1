/**
 * Celebration Holdings (Pvt) Ltd - Main Application Controller
 * High-performance, Accessible, Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroCarousel();
  initStatsCounter();
  initLanguageSelector();
  initProductCatalog();
  initProductModal();
  initContactForm();
  initNewsletter();
  initModals();
  
  if (window.Cart) {
    window.Cart.init();
  }
  if (window.PaymentGateway) {
    window.PaymentGateway.init();
  }
});

// Toast Notification System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const colors = {
    success: '#0c4d2f',
    warning: '#b45309',
    danger: '#b91c1c',
    info: '#062a19'
  };

  toast.style.cssText = `
    background: ${colors[type] || colors.info};
    color: #ffffff;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    font-size: 0.88rem;
    font-weight: 600;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    border-left: 4px solid var(--color-accent);
  `;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}
window.showToast = showToast;

/* --------------------------------------------------------------------------
   Header & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const closeMobileBtn = document.getElementById('close-mobile-drawer');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer
  const openMenu = () => {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openMenu);
  closeMobileBtn?.addEventListener('click', closeMenu);
  mobileBackdrop?.addEventListener('click', closeMenu);

  // Close drawer on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   Product Catalog & Dynamic Category Filtering from CHL_DB
   -------------------------------------------------------------------------- */
let activeCategory = 'all';
let searchQuery = '';

function getActiveProducts() {
  if (typeof CHL_DB !== 'undefined') {
    return CHL_DB.getProducts();
  }
  return typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [];
}

function initProductCatalog() {
  renderCategoryTabs();

  const searchInput = document.getElementById('product-search');
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProductCatalog();
  });

  window.addEventListener('chl_db_updated', () => {
    renderCategoryTabs();
    renderProductCatalog();
    renderHomeBlogPreview();
  });

  renderProductCatalog();
  renderSampleBundles();
  renderHomeBlogPreview();
}

function renderCategoryTabs() {
  const container = document.querySelector('.product-tabs');
  if (!container || typeof CHL_DB === 'undefined') return;

  const categories = CHL_DB.getCategories();
  container.innerHTML = `
    <button class="tab-btn ${activeCategory === 'all' ? 'active' : ''}" data-category="all">All Products (100+)</button>
  ` + categories.map(cat => `
    <button class="tab-btn ${activeCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
      ${cat.icon || ''} ${cat.name}
    </button>
  `).join('');

  container.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      renderProductCatalog();
    });
  });
}

function renderProductCatalog() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const allProducts = getActiveProducts();

  const filtered = allProducts.filter(prod => {
    const matchesCat = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch = !searchQuery || 
      prod.name.toLowerCase().includes(searchQuery) ||
      (prod.botanicalName && prod.botanicalName.toLowerCase().includes(searchQuery)) ||
      (prod.shortDesc && prod.shortDesc.toLowerCase().includes(searchQuery));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--color-text-subtle);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No organic products matched your filter.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters()">Reset Category & Search</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => {
    const stockStatus = prod.availability || "In Stock";
    const stockClass = {
      'In Stock': 'stock-in',
      'Seasonal Harvest': 'stock-seasonal',
      'Limited Batch': 'stock-limited',
      'Out of Stock': 'stock-out'
    }[stockStatus] || 'stock-in';

    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="product-thumb-wrap">
          <span class="badge badge-organic product-badge-top">${prod.badge || 'Certified Organic'}</span>
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='assets/images/logo/chl-logo.jpg'">
        </div>
        <div class="product-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span class="product-category-tag" style="margin: 0;">${prod.categoryName || prod.category}</span>
            <span class="stock-badge ${stockClass}" style="font-size: 0.7rem;">${stockStatus}</span>
          </div>
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-botanical">${prod.botanicalName || ''}</p>
          <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem; flex-grow: 1;">
            ${prod.shortDesc || ''}
          </p>
          <div class="product-meta-row">
            <span>Sample Unit: <strong>${window.Cart ? window.Cart.formatPrice(prod.samplePriceUSD || 15) : '$' + (prod.samplePriceUSD || 15).toFixed(2)}</strong></span>
            <span style="font-size: 0.72rem; color: var(--color-text-subtle);">${prod.certifications ? prod.certifications.length + ' Certs' : 'Certified'}</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-outline btn-sm" onclick="openProductModal('${prod.id}')">
              Specs & Details
            </button>
            <button class="btn btn-primary btn-sm" onclick='addToSampleCart(${JSON.stringify(prod).replace(/'/g, "&apos;")})' ${stockStatus === 'Out of Stock' ? 'disabled style="opacity: 0.5;"' : ''}>
              ${stockStatus === 'Out of Stock' ? 'Unavailable' : 'Order Sample'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}
window.renderProductCatalog = renderProductCatalog;

/* --------------------------------------------------------------------------
   Latest News & Exhibitions Preview for Home Page
   -------------------------------------------------------------------------- */
function renderHomeBlogPreview() {
  const container = document.getElementById('home-blog-preview-grid');
  if (!container || typeof CHL_DB === 'undefined') return;

  const posts = CHL_DB.getPosts(true).slice(0, 3); // Latest 3 posts
  container.innerHTML = posts.map(p => `
    <article class="card" style="overflow: hidden; display: flex; flex-direction: column;">
      <div style="height: 190px; overflow: hidden; position: relative;">
        <img src="${p.coverImage || 'assets/images/banner/hero-bg.jpg'}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);">
        <span class="badge" style="position: absolute; top: 12px; left: 12px; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd;">${p.category}</span>
      </div>
      <div style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
        <div style="font-size: 0.75rem; color: var(--color-text-subtle); margin-bottom: 0.5rem;">
          📅 ${p.publishedDate} • ⏱️ ${p.readingTime || '4 min'}
        </div>
        <h4 style="font-size: 1.05rem; color: var(--color-primary-dark); margin-bottom: 0.5rem; line-height: 1.4;">
          ${p.title}
        </h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.25rem; flex-grow: 1; line-height: 1.6;">
          ${p.excerpt}
        </p>
        <a href="blog.html#${p.slug}" class="btn btn-outline btn-sm" style="align-self: flex-start;">
          Read Story →
        </a>
      </div>
    </article>
  `).join('');
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  document.querySelectorAll('.tab-btn').forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
  const input = document.getElementById('product-search');
  if (input) input.value = '';
  renderProductCatalog();
}
window.resetFilters = resetFilters;

function renderSampleBundles() {
  const container = document.getElementById('sample-kits-container');
  if (!container || typeof SAMPLE_BUNDLES === 'undefined') return;

  container.innerHTML = SAMPLE_BUNDLES.map(kit => `
    <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--color-accent);">
      <div>
        <span class="badge badge-gold" style="margin-bottom: 0.75rem;">Export Testing Kit</span>
        <h4 style="font-size: 1.15rem; color: var(--color-primary-dark); margin-bottom: 0.5rem;">${kit.name}</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">${kit.desc}</p>
        <div style="background: var(--color-surface-muted); padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; margin-bottom: 1.25rem;">
          <strong>Included Samples:</strong><br>
          <span style="color: var(--color-text-subtle);">${kit.items}</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border-light); padding-top: 1rem;">
        <div>
          <span style="font-size: 0.75rem; color: var(--color-text-subtle); display: block;">Kit Price</span>
          <strong style="font-size: 1.25rem; color: var(--color-primary);">${window.Cart ? window.Cart.formatPrice(kit.priceUSD) : '$' + kit.priceUSD.toFixed(2)}</strong>
        </div>
        <button class="btn btn-accent btn-sm" onclick='addToSampleCart(${JSON.stringify(kit).replace(/'/g, "&apos;")})'>
          Order Sample Kit
        </button>
      </div>
    </div>
  `).join('');
}

function addToSampleCart(prod) {
  if (window.Cart) {
    window.Cart.addItem(prod, 1);
  }
}
window.addToSampleCart = addToSampleCart;

/* --------------------------------------------------------------------------
   Product Detail Modal
   -------------------------------------------------------------------------- */
function initProductModal() {
  const closeBtn = document.getElementById('close-product-modal');
  const backdrop = document.getElementById('product-modal-backdrop');

  closeBtn?.addEventListener('click', closeProductModal);
  backdrop?.addEventListener('click', closeProductModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      if (window.Cart) window.Cart.closeDrawer();
      if (window.PaymentGateway) window.PaymentGateway.closeCheckoutModal();
    }
  });
}

function openProductModal(id) {
  const prod = getActiveProducts().find(p => p.id === id);
  if (!prod) return;

  const modal = document.getElementById('product-detail-modal');
  const backdrop = document.getElementById('product-modal-backdrop');

  document.getElementById('modal-prod-img').src = prod.image;
  document.getElementById('modal-prod-badge').textContent = (prod.availability ? `${prod.availability} • ` : '') + (prod.badge || 'Certified Organic');
  document.getElementById('modal-prod-cat').textContent = prod.categoryName || prod.category;
  document.getElementById('modal-prod-title').textContent = prod.name;
  document.getElementById('modal-prod-botanical').textContent = prod.botanicalName || '';
  document.getElementById('modal-prod-desc').textContent = prod.description || prod.shortDesc;
  document.getElementById('modal-prod-grades').textContent = prod.grades || 'Export Grade';
  document.getElementById('modal-prod-sample-price').textContent = window.Cart ? window.Cart.formatPrice(prod.samplePriceUSD || 15) : '$' + (prod.samplePriceUSD || 15);

  // Benefits
  const benefitsList = document.getElementById('modal-prod-benefits');
  if (benefitsList) {
    benefitsList.innerHTML = prod.benefits.map(b => `
      <li style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; font-size: 0.85rem; color: var(--color-text-muted);">
        <span style="color: var(--color-primary); font-weight: bold;">✓</span> ${b}
      </li>
    `).join('');
  }

  // Packaging
  const pkgList = document.getElementById('modal-prod-packaging');
  if (pkgList) {
    pkgList.innerHTML = prod.packaging.map(p => `
      <li style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 4px;">• ${p}</li>
    `).join('');
  }

  // Sample CTA button inside modal
  const addBtn = document.getElementById('modal-add-sample-btn');
  if (addBtn) {
    addBtn.onclick = () => {
      addToSampleCart(prod);
      closeProductModal();
    };
  }

  // Bulk inquiry button
  const bulkBtn = document.getElementById('modal-bulk-inquiry-btn');
  if (bulkBtn) {
    bulkBtn.onclick = () => {
      closeProductModal();
      const subjectSelect = document.getElementById('contact-subject');
      const msgArea = document.getElementById('contact-message');
      if (subjectSelect) subjectSelect.value = 'Product inquiry';
      if (msgArea) msgArea.value = `Hello Celebration Holdings Team,\n\nWe would like to request a commercial container / wholesale quote for: ${prod.name} (${prod.grades}).\nTarget Destination Port:\nEstimated Volume (MT / Containers):`;
      
      const contactSec = document.getElementById('contact-section');
      contactSec?.scrollIntoView({ behavior: 'smooth' });
    };
  }

  modal?.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
}
window.openProductModal = openProductModal;

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  const backdrop = document.getElementById('product-modal-backdrop');
  modal?.classList.remove('active');
  backdrop?.classList.remove('active');
  document.body.style.overflow = '';
}
window.closeProductModal = closeProductModal;

/* --------------------------------------------------------------------------
   Contact Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span>Sending Inquiry...</span>`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();
      showToast('Thank you! Your inquiry has been dispatched to our international export team. We will respond within 24 hours.', 'success');
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   Newsletter Handler (With high-contrast accessible feedback)
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById('footer-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast(`Subscribed ${input.value} to Celebration Holdings Organic Harvest updates!`, 'success');
      input.value = '';
    }
  });
}

/* --------------------------------------------------------------------------
   Careers & Supplier Modals
   -------------------------------------------------------------------------- */
function initModals() {
  window.openInfoModal = function(type) {
    const modal = document.getElementById('info-modal');
    const backdrop = document.getElementById('info-modal-backdrop');
    const title = document.getElementById('info-modal-title');
    const body = document.getElementById('info-modal-body');

    if (type === 'careers') {
      title.textContent = "Careers at Celebration Holdings";
      body.innerHTML = `
        <p>We love hearing from fellow nature lovers and professionals who want to join our vibrant team in Sri Lanka!</p>
        <p>Currently, our core operational positions are filled, but as a fast-growing global organic exporter, new vacancies in Food Chemistry, Quality Assurance, International Logistics, and Export Sales arise frequently.</p>
        <div style="background: var(--color-surface-muted); padding: 1.25rem; border-radius: 8px; margin-block: 1rem;">
          <h5 style="color: var(--color-primary-dark); margin-bottom: 0.5rem;">Send an Open Application</h5>
          <p style="font-size: 0.85rem; margin: 0;">Please forward your Curriculum Vitae along with a brief statement of interest to our HR Directorate:</p>
          <a href="mailto:careers@celebrationholdings.lk" style="color: var(--color-accent); font-weight: 700;">careers@celebrationholdings.lk</a>
        </div>
      `;
    } else if (type === 'suppliers') {
      title.textContent = "Organic Supplier & Grower Partnerships";
      body.innerHTML = `
        <p>We are always thrilled to partner with certified organic farmers, agricultural cooperatives, and consistent producers across Sri Lanka.</p>
        <p>CHL practices <strong>True Fair Trade</strong> across our entire value chain, guaranteeing fair premium prices, technical farming support, and long-term off-take contracts.</p>
        <div style="background: var(--color-surface-muted); padding: 1.25rem; border-radius: 8px; margin-block: 1rem;">
          <h5 style="color: var(--color-primary-dark); margin-bottom: 0.5rem;">Purchasing Department</h5>
          <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">If you produce certified EU/USDA organic coconuts, spices, sesame, or fresh tropical fruits, reach out directly to our sourcing directors:</p>
          <a href="mailto:purchasing@celebrationholdings.lk" style="color: var(--color-primary); font-weight: 700;">purchasing@celebrationholdings.lk</a>
        </div>
      `;
    }

    modal?.classList.add('active');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeInfoModal = function() {
    const modal = document.getElementById('info-modal');
    const backdrop = document.getElementById('info-modal-backdrop');
    modal?.classList.remove('active');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Printable receipt
  window.printReceipt = function() {
    window.print();
  };
}

// =========================================================================
// Hero Carousel Controller (Auto-play, Arrows, Dot pagination)
// =========================================================================
function initHeroCarousel() {
  const track = document.getElementById('hero-slides-track');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      startAutoplay();
    });
  });

  // Pause autoplay on hover
  const carousel = document.getElementById('hero-section');
  carousel?.addEventListener('mouseenter', stopAutoplay);
  carousel?.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

// =========================================================================
// Stats Counter Strip (IntersectionObserver animated counting)
// =========================================================================
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(stat => observer.observe(stat));

  function animateStat(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }
}

// =========================================================================
// Language Selector Menu
// =========================================================================
function initLanguageSelector() {
  const langSelect = document.getElementById('top-language-select');
  if (!langSelect) return;

  const savedLang = localStorage.getItem('chl_selected_lang');
  if (savedLang) {
    langSelect.value = savedLang;
    document.documentElement.lang = savedLang;
  }

  const greetings = {
    en: "Language set to English. Welcome to Celebration Holdings!",
    de: "Sprache auf Deutsch aktualisiert. Willkommen bei Celebration Holdings!",
    es: "Idioma cambiado a Español. ¡Bienvenido a Celebration Holdings!",
    ja: "言語を日本語に切り替えました。セレブレーション・ホールディングスへようこそ！",
    fr: "Langue configurée en Français. Bienvenue chez Celebration Holdings !"
  };

  langSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    localStorage.setItem('chl_selected_lang', val);
    document.documentElement.lang = val;
    showToast(greetings[val] || greetings.en, 'info');
  });
}
