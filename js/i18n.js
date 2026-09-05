/**
 * Celebration Holdings (Pvt) Ltd - Internationalization & Translation Engine
 * Multi-language switcher with custom flag icons and full website translation
 * Supported Languages: English (en), German (de), Spanish (es), Japanese (ja), French (fr)
 */

(function() {
  'use strict';

  const LANGUAGES = {
    en: {
      name: 'English',
      native: 'English',
      flagSvg: `<svg class="flag-icon" viewBox="0 0 640 480"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 240l240 178v62h-80L320 301 81 480H0v-60l239-180L0 64V0z"/><path fill="#C8102E" d="m424 288 216 161v31-31h-48L376 320zM640 0v10L448 152h48L640 40zM0 480v-10l192-142h-48L0 440zM0 0v40l184 136h48L40 0z"/><path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/><path fill="#C8102E" d="M280 0h80v480h-80zM0 200h640v80H0z"/></svg>`
    },
    de: {
      name: 'German',
      native: 'Deutsch',
      flagSvg: `<svg class="flag-icon" viewBox="0 0 5 3"><rect width="5" height="1" fill="#000"/><rect width="5" height="1" y="1" fill="#D00"/><rect width="5" height="1" y="2" fill="#FFCE00"/></svg>`
    },
    es: {
      name: 'Spanish',
      native: 'Español',
      flagSvg: `<svg class="flag-icon" viewBox="0 0 750 500"><rect width="750" height="500" fill="#c60b1e"/><rect width="750" height="250" y="125" fill="#ffc400"/></svg>`
    },
    ja: {
      name: 'Japanese',
      native: '日本語',
      flagSvg: `<svg class="flag-icon" viewBox="0 0 900 600"><rect width="900" height="600" fill="#fff"/><circle cx="450" cy="300" r="180" fill="#bc002d"/></svg>`
    },
    fr: {
      name: 'French',
      native: 'Français',
      flagSvg: `<svg class="flag-icon" viewBox="0 0 3 2"><rect width="1" height="2" fill="#002654"/><rect width="1" height="2" x="1" fill="#fff"/><rect width="1" height="2" x="2" fill="#ce1126"/></svg>`
    }
  };

  // Immediate UI translations for instant zero-delay responsiveness
  const DICT = {
    de: {
      "Home": "Startseite",
      "About Us": "Über uns",
      "Products Range": "Produktsortiment",
      "Certifications": "Zertifizierungen",
      "Services": "Dienstleistungen",
      "Management": "Unternehmensleitung",
      "Company Blog": "Firmenblog",
      "Contact": "Kontakt",
      "Request Quote": "Angebot anfordern",
      "Online Payments & Samples": "Online-Zahlung & Muster",
      "Staff Portal": "Mitarbeiterportal",
      "Our 5 Product Ranges": "Unsere 5 Produktreihen",
      "Order Testing Samples": "Testmuster anfordern",
      "Explore 100+ Products": "100+ Produkte entdecken",
      "Order Sample Kit": "Musterpaket bestellen",
      "Specs & Details": "Spezifikationen & Details"
    },
    es: {
      "Home": "Inicio",
      "About Us": "Nosotros",
      "Products Range": "Gama de Productos",
      "Certifications": "Certificaciones",
      "Services": "Servicios",
      "Management": "Dirección",
      "Company Blog": "Blog Corporativo",
      "Contact": "Contacto",
      "Request Quote": "Solicitar Cotización",
      "Online Payments & Samples": "Pagos en Línea y Muestras",
      "Staff Portal": "Portal de Personal",
      "Our 5 Product Ranges": "Nuestras 5 Gamas de Productos",
      "Order Testing Samples": "Pedir Muestras de Ensayo",
      "Explore 100+ Products": "Explorar más de 100 Productos",
      "Order Sample Kit": "Pedir Kit de Muestras",
      "Specs & Details": "Especificaciones y Detalles"
    },
    ja: {
      "Home": "ホーム",
      "About Us": "会社概要",
      "Products Range": "製品ラインナップ",
      "Certifications": "認証取得",
      "Services": "輸出サービス",
      "Management": "経営陣紹介",
      "Company Blog": "公式ブログ",
      "Contact": "お問い合わせ",
      "Request Quote": "お見積り依頼",
      "Online Payments & Samples": "オンライン決済・サンプル",
      "Staff Portal": "スタッフポータル",
      "Our 5 Product Ranges": "5つのオーガニック製品群",
      "Order Testing Samples": "サンプルを注文",
      "Explore 100+ Products": "100点以上の製品を見る",
      "Order Sample Kit": "評価キットを注文",
      "Specs & Details": "仕様・詳細を見る"
    },
    fr: {
      "Home": "Accueil",
      "About Us": "À Propos",
      "Products Range": "Gammes de Produits",
      "Certifications": "Certifications",
      "Services": "Services",
      "Management": "Direction",
      "Company Blog": "Blog d'Entreprise",
      "Contact": "Contact",
      "Request Quote": "Demander un Devis",
      "Online Payments & Samples": "Paiements en Ligne & Échantillons",
      "Staff Portal": "Portail Collaborateurs",
      "Our 5 Product Ranges": "Nos 5 Gammes de Produits",
      "Order Testing Samples": "Commander des Échantillons",
      "Explore 100+ Products": "Découvrir 100+ Produits",
      "Order Sample Kit": "Commander le Kit d'Évaluation",
      "Specs & Details": "Spécifications & Détails"
    }
  };

  // Initialize Language Switcher
  function initI18n() {
    const savedLang = localStorage.getItem('chl_selected_lang') || 'en';
    renderCustomDropdown(savedLang);
    setupGoogleTranslateEngine();

    if (savedLang !== 'en') {
      applyQuickTranslations(savedLang);
      // Let engine load and apply full translation
      setTimeout(() => {
        applyGoogleTranslation(savedLang);
      }, 1000);
    }
  }

  // Render the Custom Language Dropdown in the topbar
  function renderCustomDropdown(activeLang) {
    const wrap = document.querySelector('.lang-select-wrap');
    if (!wrap) return;

    const current = LANGUAGES[activeLang] || LANGUAGES.en;

    wrap.innerHTML = `
      <div class="custom-lang-dropdown" id="custom-lang-dropdown">
        <button type="button" class="lang-dropdown-trigger" id="lang-dropdown-trigger" aria-expanded="false" aria-haspopup="true" title="Select Language">
          <span class="lang-flag-current" id="current-lang-flag">${current.flagSvg}</span>
          <span class="lang-name-current" id="current-lang-name">${current.native}</span>
          <svg class="lang-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="lang-dropdown-menu" id="lang-dropdown-menu">
          ${Object.entries(LANGUAGES).map(([code, info]) => `
            <div class="lang-option ${code === activeLang ? 'active' : ''}" data-lang="${code}">
              ${info.flagSvg}
              <span>${info.native} (${info.name})</span>
              <span class="lang-check">${code === activeLang ? '✓' : ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const dropdown = document.getElementById('custom-lang-dropdown');
    const trigger = document.getElementById('lang-dropdown-trigger');
    const menu = document.getElementById('lang-dropdown-menu');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', () => {
      dropdown?.classList.remove('open');
      trigger?.setAttribute('aria-expanded', 'false');
    });

    menu?.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        switchLanguage(lang);
      });
    });
  }

  // Switch Language
  function switchLanguage(lang) {
    if (!LANGUAGES[lang]) lang = 'en';
    localStorage.setItem('chl_selected_lang', lang);

    const current = LANGUAGES[lang];
    const flagEl = document.getElementById('current-lang-flag');
    const nameEl = document.getElementById('current-lang-name');
    if (flagEl) flagEl.innerHTML = current.flagSvg;
    if (nameEl) nameEl.textContent = current.native;

    document.querySelectorAll('.lang-option').forEach(opt => {
      const code = opt.getAttribute('data-lang');
      opt.classList.toggle('active', code === lang);
      const check = opt.querySelector('.lang-check');
      if (check) check.textContent = code === lang ? '✓' : '';
    });

    document.getElementById('custom-lang-dropdown')?.classList.remove('open');

    // 1. Instant local dictionary translation for immediate feedback
    applyQuickTranslations(lang);

    // 2. Trigger automated full-page Google Translate engine
    applyGoogleTranslation(lang);
  }

  // Immediate dictionary localization for top navigation and buttons
  function applyQuickTranslations(lang) {
    const dict = DICT[lang];
    if (!dict) {
      // Revert to English text if switching back
      if (lang === 'en') {
        location.reload();
      }
      return;
    }

    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .top-contact-item span');
    navLinks.forEach(el => {
      const text = el.textContent.trim();
      if (dict[text]) el.textContent = dict[text];
    });

    const buttons = document.querySelectorAll('.btn span, .product-actions .btn');
    buttons.forEach(el => {
      const text = el.textContent.trim();
      if (dict[text]) el.textContent = dict[text];
    });
  }

  // Headless Google Translate Integration for 100% full-page translation
  function setupGoogleTranslateEngine() {
    // Create hidden translate container if not present
    if (!document.getElementById('google_translate_element')) {
      const gDiv = document.createElement('div');
      gDiv.id = 'google_translate_element';
      gDiv.style.display = 'none';
      document.body.appendChild(gDiv);
    }

    // Set callback
    window.chlGoogleTranslateInit = function() {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,de,es,ja,fr',
        autoDisplay: false
      }, 'google_translate_element');
    };

    // Load Google Translate script
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=chlGoogleTranslateInit';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  function applyGoogleTranslation(lang) {
    // Set googtrans cookie
    const domain = window.location.hostname;
    const cookieVal = lang === 'en' ? '' : `/en/${lang}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    if (domain && domain !== 'localhost') {
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain};`;
    }

    // Attempt to trigger google combo select
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    } else {
      // Wait slightly if engine is still loading
      setTimeout(() => {
        const sel = document.querySelector('.goog-te-combo');
        if (sel) {
          sel.value = lang;
          sel.dispatchEvent(new Event('change'));
        }
      }, 800);
    }

    if (lang === 'en') {
      // Clear cookie completely to revert
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      }
      // If translated classes are attached, clean reload restores original DOM
      if (document.documentElement.classList.contains('translated-ltr')) {
        location.reload();
      }
    }
  }

  window.CHL_I18N = {
    init: initI18n,
    switchLanguage: switchLanguage,
    LANGUAGES: LANGUAGES
  };

  document.addEventListener('DOMContentLoaded', initI18n);

})();
