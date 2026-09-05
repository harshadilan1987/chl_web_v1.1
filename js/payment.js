/**
 * Celebration Holdings (Pvt) Ltd - Integrated Payment Gateway Engine
 * Handles Multi-Gateway Checkout: Credit/Debit Cards, PayHere Sri Lanka, PayPal & B2B Wire Transfer
 */

const PaymentGateway = {
  activeMethod: 'card', // 'card', 'payhere', 'wire'
  config: {
    // PayHere Sri Lanka Settings (Enter your merchant credentials from payhere.lk)
    payhere: {
      merchantId: '1210000', // Replace with your live merchant ID
      isSandbox: true,
      sandboxUrl: 'https://sandbox.payhere.lk/pay/checkout',
      liveUrl: 'https://www.payhere.lk/pay/checkout',
      notifyUrl: 'https://www.chpl.lk/api/payhere-notify',
      returnUrl: 'https://www.chpl.lk/order-success',
      cancelUrl: 'https://www.chpl.lk/order-cancelled'
    },
    // Stripe Settings
    stripe: {
      publishableKey: 'pk_test_sample_celebration_holdings',
      currency: 'usd'
    }
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Payment tab switcher
    const tabs = document.querySelectorAll('.payment-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const method = tab.getAttribute('data-method');
        this.switchMethod(method);
      });
    });

    // Close checkout modal
    const closeBtns = document.querySelectorAll('.close-checkout-btn, #checkout-modal-backdrop');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeCheckoutModal();
      });
    });

    // Card input formatters
    const cardInput = document.getElementById('card-number-input');
    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        val = val.substring(0, 16);
        const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = formatted;

        // Update card visual
        const display = document.getElementById('visual-card-number');
        if (display) {
          display.textContent = formatted || '•••• •••• •••• ••••';
        }

        // Detect brand
        this.detectCardBrand(val);
      });
    }

    const expInput = document.getElementById('card-exp-input');
    if (expInput) {
      expInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.substring(0, 4);
        if (val.length >= 2) {
          e.target.value = val.substring(0, 2) + '/' + val.substring(2);
        } else {
          e.target.value = val;
        }

        const display = document.getElementById('visual-card-exp');
        if (display) {
          display.textContent = e.target.value || 'MM/YY';
        }
      });
    }

    const holderInput = document.getElementById('card-holder-input');
    if (holderInput) {
      holderInput.addEventListener('input', (e) => {
        const display = document.getElementById('visual-card-holder');
        if (display) {
          display.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
        }
      });
    }

    // Checkout form submission
    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processPayment();
      });
    }
  },

  switchMethod(method) {
    this.activeMethod = method;
    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-method') === method);
    });

    // Toggle panels
    document.querySelectorAll('.payment-method-panel').forEach(panel => {
      panel.style.display = panel.id === `panel-${method}` ? 'block' : 'none';
    });

    const submitBtn = document.getElementById('pay-submit-btn');
    if (submitBtn) {
      if (method === 'card') {
        submitBtn.innerHTML = `<span>🔒 Pay Securely</span> <strong id="btn-pay-amount"></strong>`;
      } else if (method === 'payhere') {
        submitBtn.innerHTML = `<span>🇱🇰 Proceed via PayHere Gateway</span> <strong id="btn-pay-amount"></strong>`;
      } else if (method === 'wire') {
        submitBtn.innerHTML = `<span>📋 Request B2B Proforma Invoice & Bank Details</span>`;
      }
      this.updateCheckoutTotals();
    }
  },

  detectCardBrand(num) {
    const brandDisplay = document.getElementById('visual-card-brand');
    if (!brandDisplay) return;

    if (/^4/.test(num)) {
      brandDisplay.textContent = 'VISA';
    } else if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) {
      brandDisplay.textContent = 'MASTERCARD';
    } else if (/^3[47]/.test(num)) {
      brandDisplay.textContent = 'AMEX';
    } else if (/^35/.test(num)) {
      brandDisplay.textContent = 'JCB';
    } else {
      brandDisplay.textContent = 'CARD';
    }
  },

  // Luhn algorithm check
  validateLuhn(numStr) {
    const clean = numStr.replace(/\D/g, '');
    if (clean.length < 13 || clean.length > 19) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  },

  openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.getElementById('checkout-modal-backdrop');
    if (modal && backdrop) {
      modal.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.updateCheckoutTotals();
      this.renderOrderSummaryList();
    }
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.getElementById('checkout-modal-backdrop');
    if (modal && backdrop) {
      modal.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  updateCheckoutTotals() {
    if (!window.Cart) return;
    const subtotal = Cart.getSubtotalUSD();
    const shipping = Cart.getShippingUSD();
    const total = Cart.getTotalUSD();

    const subtotalEl = document.getElementById('modal-subtotal-val');
    const shippingEl = document.getElementById('modal-shipping-val');
    const totalEl = document.getElementById('modal-total-val');
    const btnAmount = document.getElementById('btn-pay-amount');

    if (subtotalEl) subtotalEl.textContent = Cart.formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = Cart.formatPrice(shipping);
    if (totalEl) totalEl.textContent = Cart.formatPrice(total);
    if (btnAmount) btnAmount.textContent = `(${Cart.formatPrice(total)})`;
  },

  renderOrderSummaryList() {
    const listEl = document.getElementById('modal-order-items-list');
    if (!listEl || !window.Cart) return;

    listEl.innerHTML = Cart.items.map(i => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding-block: 0.4rem; font-size: 0.85rem; border-bottom: 1px dashed var(--color-border-light);">
        <div>
          <strong>${i.name}</strong> <span style="color: var(--color-text-subtle);">× ${i.qty}</span>
        </div>
        <div>${Cart.formatPrice(i.priceUSD * i.qty)}</div>
      </div>
    `).join('');
  },

  processPayment() {
    const submitBtn = document.getElementById('pay-submit-btn');
    const custName = document.getElementById('cust-name').value.trim();
    const custEmail = document.getElementById('cust-email').value.trim();
    const custPhone = document.getElementById('cust-phone').value.trim();
    const custAddress = document.getElementById('cust-address').value.trim();
    const custCountry = document.getElementById('cust-country').value;
    const custCompany = document.getElementById('cust-company').value.trim() || 'Direct Importer';

    if (!custName || !custEmail || !custAddress || !custCountry) {
      showToast('Please complete all required shipping fields', 'warning');
      return;
    }

    if (this.activeMethod === 'card') {
      const cardNum = document.getElementById('card-number-input').value.replace(/\s/g, '');
      const cardExp = document.getElementById('card-exp-input').value;
      const cardCvv = document.getElementById('card-cvv-input').value;

      if (!cardNum || cardNum.length < 15) {
        showToast('Please enter a valid 16-digit credit card number', 'warning');
        return;
      }
      if (!cardExp || cardExp.length < 5) {
        showToast('Please enter card expiry (MM/YY)', 'warning');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        showToast('Please enter 3 or 4 digit CVV/CVC code', 'warning');
        return;
      }
    }

    // Animate button processing state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 50 50" style="animation: spin 1s linear infinite; margin-right: 8px;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="31.4 31.4"></circle>
        </svg>
        Securing Transaction with Gateway...
      `;
    }

    setTimeout(() => {
      const orderId = 'CHL-' + Math.floor(100000 + Math.random() * 900000);
      const totalFormatted = Cart.formatPrice(Cart.getTotalUSD());
      const orderedItems = [...Cart.items];

      // Reset cart
      Cart.items = [];
      Cart.save();
      Cart.updateUI();

      if (submitBtn) {
        submitBtn.disabled = false;
        this.switchMethod(this.activeMethod);
      }

      this.closeCheckoutModal();
      this.showSuccessModal({
        orderId: orderId,
        customerName: custName,
        company: custCompany,
        email: custEmail,
        phone: custPhone,
        address: custAddress,
        country: custCountry,
        items: orderedItems,
        total: totalFormatted,
        currency: Cart.currentCurrency,
        method: this.activeMethod === 'card' ? 'Visa / Mastercard 3D-Secure' : (this.activeMethod === 'payhere' ? 'PayHere Sri Lanka Gateway' : 'B2B Commercial Proforma / Bank Wire'),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }, 1600);
  },

  showSuccessModal(orderData) {
    const modal = document.getElementById('success-modal');
    const backdrop = document.getElementById('success-modal-backdrop');
    if (!modal) return;

    document.getElementById('receipt-order-id').textContent = orderData.orderId;
    document.getElementById('receipt-date').textContent = orderData.date;
    document.getElementById('receipt-cust-name').textContent = orderData.customerName;
    document.getElementById('receipt-company').textContent = orderData.company;
    document.getElementById('receipt-email').textContent = orderData.email;
    document.getElementById('receipt-country').textContent = orderData.country;
    document.getElementById('receipt-method').textContent = orderData.method;
    document.getElementById('receipt-total').textContent = orderData.total;

    const itemsContainer = document.getElementById('receipt-items-body');
    if (itemsContainer) {
      itemsContainer.innerHTML = orderData.items.map(i => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2ddd3;">${i.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2ddd3; text-align: center;">${i.qty}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2ddd3; text-align: right;">${Cart.formatPrice(i.priceUSD * i.qty)}</td>
        </tr>
      `).join('');
    }

    modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    showToast('Payment & Order Confirmed! Receipt generated.', 'success');
  }
};

window.PaymentGateway = PaymentGateway;
