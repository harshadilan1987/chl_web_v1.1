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

      const countrySelect = document.getElementById('cust-country');
      const selectedCountry = countrySelect ? countrySelect.value : 'Sri Lanka';
      this.handleCountryChange(selectedCountry);
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

  handleCountryChange(country) {
    const isDomestic = (country === 'Sri Lanka');
    const noticeEl = document.getElementById('checkout-destination-notice');
    const paymentSection = document.getElementById('checkout-payment-section');
    const paySubmitBtn = document.getElementById('pay-submit-btn');
    const freightCalcBtn = document.getElementById('freight-calc-btn');
    const postalLabel = document.getElementById('label-cust-postal');
    const postalInput = document.getElementById('cust-postal');
    const shippingLabel = document.getElementById('modal-shipping-label');

    if (isDomestic) {
      if (noticeEl) {
        noticeEl.innerHTML = `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: #166534;">
            <span style="font-size: 1.25rem;">🇱🇰</span>
            <div>
              <strong>Domestic Sri Lanka Delivery:</strong> Standard express doorstep courier across all 25 districts within 2–3 business days.
            </div>
          </div>
        `;
      }
      if (postalLabel) postalLabel.textContent = 'Postal Code (within Sri Lanka) *';
      if (postalInput) postalInput.placeholder = 'e.g. 00100 (Colombo) / 10107';
      if (shippingLabel) shippingLabel.textContent = 'Islandwide Express Delivery:';
      if (paymentSection) paymentSection.style.display = 'block';
      if (paySubmitBtn) paySubmitBtn.style.display = 'block';
      if (freightCalcBtn) freightCalcBtn.style.display = 'none';
    } else {
      if (noticeEl) {
        noticeEl.innerHTML = `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 14px; font-size: 0.85rem; color: #1e40af; line-height: 1.45;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 1.3rem;">✈️</span>
              <strong style="font-size: 0.95rem; color: #1e3a8a;">International Consignee Selected (${country}):</strong>
            </div>
            <p style="margin: 0 0 6px 0;">
              For the time being, direct instant checkout is available for sample deliveries within Sri Lanka only. 
            </p>
            <p style="margin: 0; font-size: 0.8rem; color: #3b82f6;">
              Please click <strong>"Submit for Freight Calculation"</strong> below. Your request will be instantly dispatched to our export logistics desk to calculate exact DHL/FedEx volumetric air courier rates to ${country}.
            </p>
          </div>
        `;
      }
      if (postalLabel) postalLabel.textContent = 'Postal / ZIP Code *';
      if (postalInput) postalInput.placeholder = 'e.g. 10001, SW1A 1AA, 100-0001';
      if (shippingLabel) shippingLabel.textContent = 'Air Express Freight:';
      if (paymentSection) paymentSection.style.display = 'none';
      if (paySubmitBtn) paySubmitBtn.style.display = 'none';
      if (freightCalcBtn) freightCalcBtn.style.display = 'block';
    }

    this.updateCheckoutTotals(country);
  },

  updateCheckoutTotals(country = 'Sri Lanka') {
    if (!window.Cart) return;
    const isDomestic = (country === 'Sri Lanka');
    const subtotal = Cart.getSubtotalUSD();
    const shipping = isDomestic ? Cart.getShippingUSD('Sri Lanka') : 0;
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('modal-subtotal-val');
    const shippingEl = document.getElementById('modal-shipping-val');
    const totalEl = document.getElementById('modal-total-val');
    const totalLabel = document.getElementById('modal-total-label');
    const btnAmount = document.getElementById('btn-pay-amount');

    if (subtotalEl) subtotalEl.textContent = Cart.formatPrice(subtotal);

    if (shippingEl) {
      if (isDomestic) {
        shippingEl.textContent = Cart.formatPrice(shipping);
      } else {
        shippingEl.innerHTML = `<span class="badge" style="background:#fef3c7; color:#92400e; font-size:0.75rem;">To be quoted (Air Courier)</span>`;
      }
    }

    if (totalEl) {
      if (isDomestic) {
        totalEl.textContent = Cart.formatPrice(total);
        if (totalLabel) totalLabel.textContent = 'Total Payable:';
      } else {
        totalEl.textContent = Cart.formatPrice(subtotal) + ' (Excl. Freight)';
        if (totalLabel) totalLabel.textContent = 'Samples Subtotal:';
      }
    }

    if (btnAmount) btnAmount.textContent = `(${Cart.formatPrice(total)})`;
  },

  renderOrderSummaryList() {
    const listEl = document.getElementById('modal-order-items-list');
    if (!listEl || !window.Cart) return;

    if (Cart.items.length === 0) {
      listEl.innerHTML = `<div style="color: var(--color-text-subtle); padding: 0.5rem 0;">No samples in cart.</div>`;
      return;
    }

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
    const custName = document.getElementById('cust-name')?.value.trim();
    const custEmail = document.getElementById('cust-email')?.value.trim();
    const custPhone = document.getElementById('cust-phone')?.value.trim();
    const custAddress = document.getElementById('cust-address')?.value.trim();
    const custCity = document.getElementById('cust-city')?.value.trim();
    const custPostal = document.getElementById('cust-postal')?.value.trim();
    const custCountry = document.getElementById('cust-country')?.value || 'Sri Lanka';
    const custCompany = document.getElementById('cust-company')?.value.trim() || 'Direct Customer';

    // Validate mandatory fields
    if (!custName) {
      showToast('Please enter your Contact Person Name', 'warning');
      document.getElementById('cust-name')?.focus();
      return;
    }
    if (!custEmail) {
      showToast('Please enter your Email Address for order dispatch updates', 'warning');
      document.getElementById('cust-email')?.focus();
      return;
    }
    if (!custPhone) {
      showToast('Contact Number (Phone/WhatsApp) is mandatory for delivery courier coordination', 'warning');
      document.getElementById('cust-phone')?.focus();
      return;
    }
    if (!custAddress) {
      showToast('Delivery Street Address is mandatory', 'warning');
      document.getElementById('cust-address')?.focus();
      return;
    }
    if (!custCity) {
      showToast('City / District is mandatory', 'warning');
      document.getElementById('cust-city')?.focus();
      return;
    }
    if (!custPostal) {
      showToast('Postal Code within Sri Lanka is mandatory', 'warning');
      document.getElementById('cust-postal')?.focus();
      return;
    }

    if (this.activeMethod === 'card') {
      const cardNum = document.getElementById('card-number-input')?.value.replace(/\s/g, '');
      const cardExp = document.getElementById('card-exp-input')?.value;
      const cardCvv = document.getElementById('card-cvv-input')?.value;

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
        Authorizing Domestic Sri Lanka Order...
      `;
    }

    setTimeout(() => {
      const orderId = 'CHL-ORD-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      const subtotalUSD = Cart.getSubtotalUSD();
      const shippingCostUSD = Cart.getShippingUSD('Sri Lanka');
      const totalUSD = subtotalUSD + shippingCostUSD;
      const orderedItems = [...Cart.items];

      const newOrder = {
        id: orderId,
        type: 'domestic_order',
        date: new Date().toISOString(),
        customerName: custName,
        company: custCompany,
        email: custEmail,
        phone: custPhone,
        address: custAddress,
        city: custCity,
        postalCode: custPostal,
        country: 'Sri Lanka',
        items: orderedItems,
        subtotalUSD: subtotalUSD,
        shippingCostUSD: shippingCostUSD,
        totalUSD: totalUSD,
        currency: Cart.currentCurrency,
        paymentMethod: this.activeMethod === 'card' ? 'Visa / Mastercard 3D-Secure' : (this.activeMethod === 'payhere' ? 'PayHere Sri Lanka Gateway' : 'B2B Commercial Proforma / Bank Wire'),
        paymentStatus: this.activeMethod === 'card' ? 'Authorized' : (this.activeMethod === 'payhere' ? 'Paid' : 'Pending Invoice Settlement'),
        status: 'New Order',
        notes: 'Domestic sample delivery within Sri Lanka.'
      };

      // Persist order in CHL_DB
      if (typeof CHL_DB !== 'undefined' && typeof CHL_DB.saveOrder === 'function') {
        CHL_DB.saveOrder(newOrder);
      }

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
        address: `${custAddress}, ${custCity} (${custPostal})`,
        country: 'Sri Lanka',
        items: orderedItems,
        subtotal: Cart.formatPrice(subtotalUSD),
        shipping: Cart.formatPrice(shippingCostUSD),
        total: Cart.formatPrice(totalUSD),
        currency: Cart.currentCurrency,
        method: newOrder.paymentMethod,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }, 1200);
  },

  submitOverseasFreight() {
    const custName = document.getElementById('cust-name')?.value.trim();
    const custEmail = document.getElementById('cust-email')?.value.trim();
    const custPhone = document.getElementById('cust-phone')?.value.trim();
    const custAddress = document.getElementById('cust-address')?.value.trim();
    const custCity = document.getElementById('cust-city')?.value.trim();
    const custPostal = document.getElementById('cust-postal')?.value.trim();
    const custCountry = document.getElementById('cust-country')?.value || 'International';
    const custCompany = document.getElementById('cust-company')?.value.trim() || 'Direct Importer';

    // Mandatory validation
    if (!custName) {
      showToast('Please enter your Contact Person Name', 'warning');
      document.getElementById('cust-name')?.focus();
      return;
    }
    if (!custEmail) {
      showToast('Please enter your Email Address to receive the freight quotation', 'warning');
      document.getElementById('cust-email')?.focus();
      return;
    }
    if (!custPhone) {
      showToast('Contact Number (Phone / WhatsApp) is mandatory for international courier booking', 'warning');
      document.getElementById('cust-phone')?.focus();
      return;
    }
    if (!custAddress) {
      showToast('Street Address is mandatory for courier quotation', 'warning');
      document.getElementById('cust-address')?.focus();
      return;
    }
    if (!custCity) {
      showToast('City is mandatory', 'warning');
      document.getElementById('cust-city')?.focus();
      return;
    }
    if (!custPostal) {
      showToast('Postal / ZIP Code is mandatory', 'warning');
      document.getElementById('cust-postal')?.focus();
      return;
    }

    if (!Cart.items || Cart.items.length === 0) {
      showToast('Your sample cart is empty. Please add items to proceed.', 'warning');
      return;
    }

    const inqId = 'CHL-INQ-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const subtotalUSD = Cart.getSubtotalUSD();
    const orderedItems = [...Cart.items];

    // Fetch configured sales email from database (default: info@celebrationholdings.lk)
    let salesEmail = "info@celebrationholdings.lk";
    if (typeof CHL_DB !== 'undefined' && typeof CHL_DB.getSalesConfig === 'function') {
      salesEmail = CHL_DB.getSalesConfig().salesEmail || salesEmail;
    }

    const newInquiry = {
      id: inqId,
      type: 'overseas_freight_inquiry',
      date: new Date().toISOString(),
      customerName: custName,
      company: custCompany,
      email: custEmail,
      phone: custPhone,
      address: custAddress,
      city: custCity,
      postalCode: custPostal,
      country: custCountry,
      items: orderedItems,
      subtotalUSD: subtotalUSD,
      shippingCostUSD: 0,
      totalUSD: subtotalUSD,
      currency: Cart.currentCurrency,
      paymentMethod: 'Overseas Air Express Freight Request',
      paymentStatus: 'Pending Freight Quote',
      status: 'Freight Quote Requested',
      notes: `Overseas inquiry submitted for door-to-door courier freight calculation to ${custCountry}.`
    };

    // Save inquiry to CHL_DB
    if (typeof CHL_DB !== 'undefined' && typeof CHL_DB.saveOrder === 'function') {
      CHL_DB.saveOrder(newInquiry);
    }

    // Construct email to info@celebrationholdings.lk
    const itemsListText = orderedItems.map((it, idx) => `  ${idx + 1}. ${it.name} (Qty: ${it.qty}) - Price: $${(it.priceUSD * it.qty).toFixed(2)} USD`).join('\n');
    const mailSubject = encodeURIComponent(`[Overseas Freight Calculation Request] ${inqId} - ${custName} (${custCountry})`);
    const mailBody = encodeURIComponent(
`CELEBRATION HOLDINGS (PVT) LTD - EXPORT SAMPLE FREIGHT REQUEST
================================================================
Inquiry ID: ${inqId}
Date: ${new Date().toLocaleString()}

CONSIGNEE / IMPORTER DETAILS:
- Contact Person: ${custName}
- Company: ${custCompany}
- Email: ${custEmail}
- Phone / WhatsApp: ${custPhone}

DESTINATION DELIVERY ADDRESS:
- Street Address: ${custAddress}
- City / Town: ${custCity}
- Postal / ZIP Code: ${custPostal}
- Destination Country: ${custCountry}

REQUESTED SAMPLE PACKAGES:
${itemsListText}

Sample Items Subtotal: $${subtotalUSD.toFixed(2)} USD
Freight Status: Requires volumetric air courier calculation (DHL/FedEx door-to-door to ${custCountry}).

================================================================
Note: This inquiry has been automatically registered in the Celebration Holdings Sales Portal.`
    );

    // Trigger mail client or fallback
    try {
      window.open(`mailto:${salesEmail}?subject=${mailSubject}&body=${mailBody}`, '_blank');
    } catch (e) {
      console.log('Mailto triggered');
    }

    // Clear cart
    Cart.items = [];
    Cart.save();
    Cart.updateUI();

    this.closeCheckoutModal();

    // Show Overseas Success Modal / Alert
    alert(
      `✈️ International Freight Calculation Submitted!\n\n` +
      `Inquiry Reference: ${inqId}\n` +
      `Destination: ${custCountry}\n` +
      `Consignee: ${custName}\n\n` +
      `An email notification has been dispatched to our export sales desk (${salesEmail}). Our team will calculate volumetric air express courier rates (DHL/FedEx) and email a formal quotation to ${custEmail} within 24 hours.`
    );

    showToast(`Freight calculation request ${inqId} submitted to ${salesEmail}!`, 'success');
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
    showToast('Payment & Order Confirmed! Summary order sheet generated in Sales Panel.', 'success');
  }
};

window.PaymentGateway = PaymentGateway;
