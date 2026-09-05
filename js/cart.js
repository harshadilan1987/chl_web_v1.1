/**
 * Celebration Holdings (Pvt) Ltd - Shopping Cart & Multi-Currency Engine
 * Manages sample kit orders, currency conversion, and cart drawer
 */

const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.78, label: "GBP (£)" },
  AUD: { symbol: "A$", rate: 1.52, label: "AUD (A$)" },
  JPY: { symbol: "¥", rate: 152.0, label: "JPY (¥)" },
  LKR: { symbol: "Rs. ", rate: 305.0, label: "LKR (Rs)" }
};

const Cart = {
  items: [],
  currentCurrency: 'USD',
  flatShippingUSD: 18.00, // Standard international express courier for samples

  init() {
    // Load persisted cart from localStorage
    const saved = localStorage.getItem('chl_cart_items');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        this.items = [];
      }
    }

    const savedCur = localStorage.getItem('chl_currency');
    if (savedCur && CURRENCIES[savedCur]) {
      this.currentCurrency = savedCur;
    }

    this.bindEvents();
    this.updateUI();
  },

  bindEvents() {
    // Currency selectors
    const curSelects = document.querySelectorAll('.currency-selector');
    curSelects.forEach(select => {
      select.value = this.currentCurrency;
      select.addEventListener('change', (e) => {
        this.setCurrency(e.target.value);
      });
    });

    // Cart trigger buttons
    const triggers = document.querySelectorAll('.cart-trigger-btn');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close drawer buttons
    const closeBtns = document.querySelectorAll('.close-cart-btn, .cart-drawer-backdrop');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeDrawer();
      });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) {
          showToast('Your sample cart is empty. Please add items to proceed.', 'warning');
          return;
        }
        this.closeDrawer();
        if (window.PaymentGateway) {
          window.PaymentGateway.openCheckoutModal();
        }
      });
    }
  },

  setCurrency(cur) {
    if (CURRENCIES[cur]) {
      this.currentCurrency = cur;
      localStorage.setItem('chl_currency', cur);
      // Sync all select elements on page
      document.querySelectorAll('.currency-selector').forEach(s => s.value = cur);
      this.updateUI();
      // Also update any prices on the page
      if (window.renderProductCatalog) {
        window.renderProductCatalog();
      }
      showToast(`Currency changed to ${CURRENCIES[cur].label}`, 'info');
    }
  },

  formatPrice(usdAmount) {
    const cur = CURRENCIES[this.currentCurrency] || CURRENCIES.USD;
    const converted = usdAmount * cur.rate;
    if (this.currentCurrency === 'JPY') {
      return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${cur.symbol}${converted.toFixed(2)}`;
  },

  addItem(product, qty = 1) {
    const existingIndex = this.items.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        priceUSD: product.samplePriceUSD || product.priceUSD || 15.00,
        image: product.image || 'assets/images/logo/chl-logo.jpg',
        category: product.categoryName || 'Sample',
        qty: qty
      });
    }
    this.save();
    this.updateUI();
    this.openDrawer();
    showToast(`Added ${product.name} sample to cart`, 'success');
  },

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
    this.updateUI();
    showToast('Item removed from cart', 'info');
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeItem(id);
      } else {
        this.save();
        this.updateUI();
      }
    }
  },

  save() {
    localStorage.setItem('chl_cart_items', JSON.stringify(this.items));
  },

  getSubtotalUSD() {
    return this.items.reduce((sum, item) => sum + (item.priceUSD * item.qty), 0);
  },

  getShippingUSD() {
    return this.items.length > 0 ? this.flatShippingUSD : 0;
  },

  getTotalUSD() {
    return this.getSubtotalUSD() + this.getShippingUSD();
  },

  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  updateUI() {
    // Update badge counts
    const totalCount = this.items.reduce((sum, i) => sum + i.qty, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Update cart drawer items
    const listEl = document.getElementById('cart-items-container');
    if (!listEl) return;

    if (this.items.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-subtle);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.6;">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-primary-dark);">Your Sample Cart is Empty</h4>
          <p style="font-size: 0.85rem;">Explore our 5 organic ranges to order certified testing samples directly to your doorstep.</p>
          <a href="#products-section" class="btn btn-primary btn-sm close-cart-btn" style="margin-top: 1rem;">Explore Products</a>
        </div>
      `;
    } else {
      listEl.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/logo/chl-logo.jpg'">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <div class="cart-item-price">${this.formatPrice(item.priceUSD)} <span style="font-size: 0.72rem; color: var(--color-text-subtle); font-weight: 400;">/ sample</span></div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="Cart.updateQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="Cart.updateQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button onclick="Cart.removeItem('${item.id}')" style="color: var(--color-text-subtle); padding: 6px;" title="Remove">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `).join('');
    }

    // Update totals
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const shippingEl = document.getElementById('cart-shipping-val');
    const totalEl = document.getElementById('cart-total-val');

    if (subtotalEl) subtotalEl.textContent = this.formatPrice(this.getSubtotalUSD());
    if (shippingEl) shippingEl.textContent = this.items.length > 0 ? this.formatPrice(this.getShippingUSD()) : this.formatPrice(0);
    if (totalEl) totalEl.textContent = this.formatPrice(this.getTotalUSD());
  }
};

window.Cart = Cart;
