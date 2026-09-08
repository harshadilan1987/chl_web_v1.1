/**
 * Celebration Holdings (Pvt) Ltd - Sales & Orders Portal Engine (js/sales.js)
 * Manages Authentication, Order Sheets, Overseas Freight Inquiries, Shipping Rates & Official Invoices
 */

(function () {
  'use strict';

  // --- STATE ---
  let allOrders = [];
  let currentTab = 'tab-sales-overview';
  let activeOrderForModal = null;

  // --- AUTHENTICATION ---
  const SALES_AUTH_KEY = 'chl_sales_logged_in';
  const VALID_PASSWORDS = ['chl@sales123#'];

  function checkAuth() {
    const isAuth = sessionStorage.getItem(SALES_AUTH_KEY) === 'true';
    const authGate = document.getElementById('sales-auth-gate');
    const salesApp = document.getElementById('sales-app');

    if (isAuth) {
      if (authGate) authGate.style.display = 'none';
      if (salesApp) salesApp.style.display = 'flex';
      loadDataAndRender();
    } else {
      if (authGate) authGate.style.display = 'flex';
      if (salesApp) salesApp.style.display = 'none';
    }
  }

  function initAuth() {
    const authForm = document.getElementById('sales-auth-form');
    if (authForm) {
      authForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const passInput = document.getElementById('sales-pass');
        const pass = passInput ? passInput.value.trim() : '';

        if (VALID_PASSWORDS.includes(pass)) {
          sessionStorage.setItem(SALES_AUTH_KEY, 'true');
          showToast('Welcome to the Sales & Orders Portal', 'success');
          checkAuth();
        } else {
          showToast('Invalid sales authorization password', 'error');
          if (passInput) {
            passInput.value = '';
            passInput.focus();
          }
        }
      });
    }

    const logoutBtn = document.getElementById('btn-sales-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        sessionStorage.removeItem(SALES_AUTH_KEY);
        showToast('Logged out of Sales Portal', 'info');
        checkAuth();
      });
    }
  }

  // --- NAVIGATION ---
  function initNavigation() {
    const navItems = document.querySelectorAll('.sales-sidebar .sales-nav-item[data-tab]');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');
        if (tabId) switchSalesTab(tabId);
      });
    });
  }

  window.switchSalesTab = function (tabId) {
    currentTab = tabId;

    // Update nav links
    document.querySelectorAll('.sales-sidebar .sales-nav-item[data-tab]').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    // Update tab sections
    document.querySelectorAll('.sales-tab-content').forEach(section => {
      section.style.display = section.id === tabId ? 'block' : 'none';
    });

    // Refresh data on tab switch
    if (tabId === 'tab-sales-settings') {
      loadSalesSettings();
    } else {
      renderCurrentTab();
    }
  };

  // --- TOAST NOTIFICATIONS ---
  window.showToast = function (msg, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bg = type === 'success' ? '#0c4d2f' : (type === 'error' ? '#dc2626' : (type === 'warning' ? '#d97706' : '#1e3a8a'));
    const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : (type === 'warning' ? '⚠' : 'ℹ'));

    toast.style.cssText = `background: ${bg}; color: #ffffff; padding: 12px 18px; border-radius: 8px; font-size: 0.88rem; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 8px; pointer-events: auto; animation: slideIn 0.25s ease forwards; transition: opacity 0.3s ease;`;
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // --- DATA LOADING ---
  function loadDataAndRender() {
    if (typeof CHL_DB !== 'undefined' && typeof CHL_DB.getOrders === 'function') {
      allOrders = CHL_DB.getOrders();
    } else {
      allOrders = [];
    }

    updateBadgeCounts();
    renderOverviewMetrics();
    renderCurrentTab();
  }

  function updateBadgeCounts() {
    const domesticCount = allOrders.filter(o => o.type === 'domestic_order').length;
    const overseasCount = allOrders.filter(o => o.type === 'overseas_freight_inquiry').length;

    const bDomestic = document.getElementById('nav-count-domestic');
    const bOverseas = document.getElementById('nav-count-overseas');

    if (bDomestic) bDomestic.textContent = domesticCount;
    if (bOverseas) bOverseas.textContent = overseasCount;
  }

  function renderCurrentTab() {
    if (currentTab === 'tab-sales-overview') {
      renderOverviewRecentTable();
    } else if (currentTab === 'tab-order-sheets') {
      renderDomesticOrdersTable();
    } else if (currentTab === 'tab-overseas-freight') {
      renderOverseasTable();
    } else if (currentTab === 'tab-sales-settings') {
      loadSalesSettings();
    }
  }

  // --- TAB 1: OVERVIEW ---
  function renderOverviewMetrics() {
    const totalOrders = allOrders.length;
    const domesticOrders = allOrders.filter(o => o.type === 'domestic_order');
    const overseasOrders = allOrders.filter(o => o.type === 'overseas_freight_inquiry');
    const pendingOrders = domesticOrders.filter(o => o.status === 'New Order' || o.status === 'Processing');

    const totalRevenueUSD = domesticOrders.reduce((sum, o) => sum + (parseFloat(o.totalUSD) || 0), 0);

    const elTotal = document.getElementById('stat-total-orders');
    const elDom = document.getElementById('stat-domestic-orders');
    const elOver = document.getElementById('stat-overseas-inquiries');
    const elPend = document.getElementById('stat-pending-dispatch');
    const elRev = document.getElementById('stat-sample-revenue');

    if (elTotal) elTotal.textContent = totalOrders;
    if (elDom) elDom.textContent = domesticOrders.length;
    if (elOver) elOver.textContent = overseasOrders.length;
    if (elPend) elPend.textContent = pendingOrders.length;
    if (elRev) elRev.textContent = '$' + totalRevenueUSD.toFixed(2);
  }

  function renderOverviewRecentTable() {
    const tbody = document.getElementById('sales-overview-recent-tbody');
    if (!tbody) return;

    if (allOrders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #79877e; padding: 2rem;">No orders or inquiries recorded yet.</td></tr>`;
      return;
    }

    const recent = allOrders.slice(0, 8);
    tbody.innerHTML = recent.map(order => {
      const isDomestic = order.type === 'domestic_order';
      const itemsCount = (order.items || []).reduce((s, i) => s + (i.qty || 1), 0);
      const formattedDate = formatDateShort(order.date);

      return `
        <tr>
          <td>
            <strong style="color: #0c4d2f;">${order.id}</strong>
            <div style="font-size: 0.72rem; color: #79877e;">${isDomestic ? '🇱🇰 Domestic' : '✈️ Overseas'}</div>
          </td>
          <td style="white-space: nowrap; color: #4b5950;">${formattedDate}</td>
          <td>
            <strong>${escapeHtml(order.customerName || 'N/A')}</strong>
            ${order.company ? `<div style="font-size: 0.75rem; color: #607266;">${escapeHtml(order.company)}</div>` : ''}
          </td>
          <td>
            <span>${order.country === 'Sri Lanka' ? '🇱🇰 Sri Lanka' : escapeHtml(order.country || 'Overseas')}</span>
            ${order.city ? `<div style="font-size: 0.75rem; color: #79877e;">${escapeHtml(order.city)}</div>` : ''}
          </td>
          <td>${itemsCount} sample(s)</td>
          <td>
            <strong>$${(parseFloat(order.totalUSD) || 0).toFixed(2)}</strong>
            ${isDomestic && order.shippingCostUSD ? `<div style="font-size: 0.72rem; color: #166534;">+$${order.shippingCostUSD.toFixed(2)} shipping</div>` : ''}
          </td>
          <td>
            ${renderStatusBadge(order.status)}
          </td>
          <td style="text-align: right; white-space: nowrap;">
            ${isDomestic ? `
              <button class="btn btn-outline btn-sm" onclick="openOrderSheet('${order.id}')" style="padding: 4px 9px; font-size: 0.8rem;">
                📄 Sheet
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="switchSalesTab('tab-overseas-freight')" style="padding: 4px 9px; font-size: 0.8rem;">
                ✈️ Quote
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- TAB 2: SRI LANKA DOMESTIC ORDERS ---
  function renderDomesticOrdersTable() {
    const tbody = document.getElementById('sales-orders-tbody');
    if (!tbody) return;

    const searchInput = document.getElementById('order-search-input');
    const filterSelect = document.getElementById('order-status-filter');

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const statusFilter = filterSelect ? filterSelect.value : 'all';

    let domesticList = allOrders.filter(o => o.type === 'domestic_order');

    if (statusFilter !== 'all') {
      domesticList = domesticList.filter(o => o.status === statusFilter);
    }

    if (query) {
      domesticList = domesticList.filter(o =>
        (o.id && o.id.toLowerCase().includes(query)) ||
        (o.customerName && o.customerName.toLowerCase().includes(query)) ||
        (o.phone && o.phone.toLowerCase().includes(query)) ||
        (o.email && o.email.toLowerCase().includes(query)) ||
        (o.city && o.city.toLowerCase().includes(query)) ||
        (o.postalCode && o.postalCode.toLowerCase().includes(query)) ||
        (o.company && o.company.toLowerCase().includes(query))
      );
    }

    if (domesticList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #79877e; padding: 2.5rem;">No domestic orders match your search or filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = domesticList.map(order => {
      const itemsSummary = (order.items || []).map(i => `${escapeHtml(i.name)} (×${i.qty})`).join('<br>');
      const itemsCount = (order.items || []).reduce((s, i) => s + (i.qty || 1), 0);
      const subtotal = (parseFloat(order.subtotalUSD) || 0).toFixed(2);
      const shipping = (parseFloat(order.shippingCostUSD) || 0).toFixed(2);
      const total = (parseFloat(order.totalUSD) || 0).toFixed(2);

      return `
        <tr>
          <td>
            <strong style="color: #0c4d2f; font-size: 0.92rem;">${order.id}</strong>
            <div style="font-size: 0.72rem; color: #166534; font-weight: 600;">🇱🇰 Sri Lanka</div>
          </td>
          <td style="white-space: nowrap; color: #4b5950; font-size: 0.82rem;">
            ${formatDateTime(order.date)}
          </td>
          <td>
            <strong>${escapeHtml(order.customerName || 'N/A')}</strong>
            ${order.company ? `<div style="font-size: 0.78rem; color: #607266;">${escapeHtml(order.company)}</div>` : ''}
            <div style="font-size: 0.78rem; color: #0c4d2f; font-weight: 600;">📞 ${escapeHtml(order.phone || 'N/A')}</div>
            <div style="font-size: 0.74rem; color: #79877e;">✉️ ${escapeHtml(order.email || 'N/A')}</div>
          </td>
          <td>
            <div style="max-width: 220px; font-size: 0.82rem; line-height: 1.35;">
              <div>${escapeHtml(order.address || 'N/A')}</div>
              <div><strong>${escapeHtml(order.city || '')}</strong></div>
              <div style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; margin-top: 3px;">
                📮 Postal Code: ${escapeHtml(order.postalCode || 'N/A')}
              </div>
            </div>
          </td>
          <td style="font-size: 0.82rem;">
            <div style="font-weight: 700; margin-bottom: 3px;">${itemsCount} item(s)</div>
            <div style="font-size: 0.75rem; color: #5f7065; max-height: 50px; overflow-y: auto;">
              ${itemsSummary}
            </div>
          </td>
          <td style="font-size: 0.82rem; white-space: nowrap;">
            <div>Items: $${subtotal}</div>
            <div style="color: #166534; font-weight: 600;">Courier: +$${shipping}</div>
          </td>
          <td style="white-space: nowrap;">
            <strong style="color: #0c4d2f; font-size: 0.98rem;">$${total}</strong>
            <div style="font-size: 0.72rem; color: #79877e;">${escapeHtml(order.paymentMethod || 'Online')}</div>
          </td>
          <td>
            <select class="form-control" onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 4px 6px; font-size: 0.78rem; font-weight: 600; border-radius: 6px; width: 120px;">
              <option value="New Order" ${order.status === 'New Order' ? 'selected' : ''}>New Order</option>
              <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Dispatched</option>
              <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button class="btn btn-primary btn-sm" onclick="openOrderSheet('${order.id}')" style="padding: 5px 10px; font-size: 0.8rem;">
              📄 Order Sheet
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- TAB 3: OVERSEAS FREIGHT REQUESTS ---
  function renderOverseasTable() {
    const tbody = document.getElementById('sales-overseas-tbody');
    if (!tbody) return;

    const overseasList = allOrders.filter(o => o.type === 'overseas_freight_inquiry');

    if (overseasList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #79877e; padding: 2.5rem;">No overseas freight requests submitted yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = overseasList.map(order => {
      const itemsList = (order.items || []).map(i => `• ${escapeHtml(i.name)} (×${i.qty}) - $${(i.priceUSD * i.qty).toFixed(2)}`).join('\n');
      const itemsHtml = (order.items || []).map(i => `• <strong>${escapeHtml(i.name)}</strong> (×${i.qty})`).join('<br>');
      const mailtoSubject = encodeURIComponent(`RE: Air Freight Quote for ${order.id} - ${order.customerName} (${order.country})`);
      const mailtoBody = encodeURIComponent(`Dear ${order.customerName},\n\nThank you for requesting samples from Celebration Holdings (Pvt) Ltd Sri Lanka.\n\nWe have prepared your volumetric air courier freight quotation (DHL/FedEx door-to-door):\n\nInquiry Ref: ${order.id}\nDestination: ${order.address}, ${order.city}, ${order.postalCode}, ${order.country}\n\nRequested Samples:\n${itemsList}\n\nSamples Value: $${(parseFloat(order.subtotalUSD) || 0).toFixed(2)} USD\nAir Freight Courier Fee: $___.00 USD\nTotal Payable: $___.00 USD\n\nEstimated Delivery Time: 3-5 Business Days\n\nPlease let us know if you would like us to issue the commercial proforma invoice and dispatch your package.\n\nWarm regards,\nExport Logistics Desk\nCelebration Holdings (Pvt) Ltd\ninfo@celebrationholdings.lk`);

      return `
        <tr>
          <td>
            <strong style="color: #7c3aed; font-size: 0.92rem;">${order.id}</strong>
            <div style="font-size: 0.72rem; color: #79877e;">Volumetric Air Freight</div>
          </td>
          <td style="white-space: nowrap; color: #4b5950; font-size: 0.82rem;">${formatDateShort(order.date)}</td>
          <td>
            <strong>${escapeHtml(order.customerName || 'N/A')}</strong>
            ${order.company ? `<div style="font-size: 0.78rem; color: #607266;">${escapeHtml(order.company)}</div>` : ''}
          </td>
          <td>
            <div style="font-weight: 700; color: #1e3a8a;">✈️ ${escapeHtml(order.country || 'International')}</div>
            <div style="font-size: 0.78rem; color: #607266;">City: ${escapeHtml(order.city || '')}</div>
          </td>
          <td>
            <div><a href="mailto:${escapeHtml(order.email || '')}" style="color: #0c4d2f; font-weight: 600; text-decoration: none;">✉️ ${escapeHtml(order.email || 'N/A')}</a></div>
            <div style="font-size: 0.78rem; color: #607266;">📞 ${escapeHtml(order.phone || 'N/A')}</div>
          </td>
          <td>
            <div style="font-size: 0.8rem; max-width: 220px; line-height: 1.35;">
              <div>${escapeHtml(order.address || 'N/A')}</div>
              <div style="color: #7c3aed; font-weight: 600;">ZIP/Postal: ${escapeHtml(order.postalCode || 'N/A')}</div>
            </div>
          </td>
          <td>
            <div style="font-size: 0.78rem; max-width: 200px; line-height: 1.4;">
              ${itemsHtml}
            </div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #0c4d2f; margin-top: 4px;">
              Value: $${(parseFloat(order.subtotalUSD) || 0).toFixed(2)} USD
            </div>
          </td>
          <td>
            <select class="form-control" onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 4px 6px; font-size: 0.78rem; font-weight: 600; border-radius: 6px; width: 140px;">
              <option value="Freight Quote Requested" ${order.status === 'Freight Quote Requested' ? 'selected' : ''}>Quote Requested</option>
              <option value="Quote Sent" ${order.status === 'Quote Sent' ? 'selected' : ''}>Quote Sent</option>
              <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Dispatched" ${order.status === 'Dispatched' ? 'selected' : ''}>Air Courier Dispatched</option>
              <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <a href="mailto:${escapeHtml(order.email || '')}?subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-primary btn-sm" style="padding: 5px 9px; font-size: 0.78rem; text-decoration: none; display: inline-block;">
              ✉️ Send Quote
            </a>
            <button class="btn btn-outline btn-sm" onclick="openOrderSheet('${order.id}')" style="padding: 5px 8px; font-size: 0.78rem;" title="View inquiry sheet">
              📄 Sheet
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- TAB 4: SETTINGS ---
  function loadSalesSettings() {
    if (typeof CHL_DB === 'undefined' || typeof CHL_DB.getSalesConfig !== 'function') return;

    const cfg = CHL_DB.getSalesConfig();
    const emailInput = document.getElementById('setting-sales-email');
    const usdInput = document.getElementById('setting-domestic-shipping-usd');
    const lkrInput = document.getElementById('setting-domestic-shipping-lkr');
    const noteInput = document.getElementById('setting-policy-note');

    if (emailInput) emailInput.value = cfg.salesEmail || 'info@celebrationholdings.lk';
    if (usdInput) usdInput.value = cfg.domesticShippingUSD || 3.00;
    if (lkrInput) lkrInput.value = cfg.domesticShippingLKR || 650;
    if (noteInput) noteInput.value = cfg.policyNote || '';
  }

  function initSettingsForm() {
    const form = document.getElementById('sales-settings-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('setting-sales-email')?.value.trim() || 'info@celebrationholdings.lk';
        const usd = parseFloat(document.getElementById('setting-domestic-shipping-usd')?.value) || 3.00;
        const lkr = parseFloat(document.getElementById('setting-domestic-shipping-lkr')?.value) || 650;
        const policyNote = document.getElementById('setting-policy-note')?.value.trim() || '';

        if (typeof CHL_DB !== 'undefined' && typeof CHL_DB.saveSalesConfig === 'function') {
          CHL_DB.saveSalesConfig({
            salesEmail: email,
            domesticShippingUSD: usd,
            domesticShippingLKR: lkr,
            policyNote: policyNote
          });
          showToast('Sales, Notification & Shipping rates updated successfully!', 'success');
        }
      });
    }
  }

  // --- STATUS UPDATES ---
  window.updateOrderStatus = function (orderId, newStatus) {
    if (typeof CHL_DB !== 'undefined' && typeof CHL_DB.updateOrderStatus === 'function') {
      CHL_DB.updateOrderStatus(orderId, newStatus);
      showToast(`Order ${orderId} status changed to "${newStatus}"`, 'success');
      loadDataAndRender();
    }
  };

  // --- SUMMARY ORDER SHEET MODAL (PRINTABLE) ---
  window.openOrderSheet = function (orderId) {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) {
      showToast('Order not found', 'error');
      return;
    }

    activeOrderForModal = order;
    renderOrderSheetModal(order);

    const modal = document.getElementById('order-sheet-modal');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeOrderSheetModal = function () {
    const modal = document.getElementById('order-sheet-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    activeOrderForModal = null;
  };

  function renderOrderSheetModal(order) {
    const container = document.getElementById('printable-order-sheet-content');
    if (!container) return;

    const isDomestic = order.type === 'domestic_order';
    const subtotal = (parseFloat(order.subtotalUSD) || 0).toFixed(2);
    const shipping = (parseFloat(order.shippingCostUSD) || 0).toFixed(2);
    const total = (parseFloat(order.totalUSD) || 0).toFixed(2);

    const items = order.items || [];
    let itemsRows = '';

    items.forEach((item, index) => {
      const itemPrice = parseFloat(item.priceUSD || 0).toFixed(2);
      const itemQty = item.qty || 1;
      const lineTotal = (itemPrice * itemQty).toFixed(2);

      itemsRows += `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5ede7; text-align: center; color: #607266;">${index + 1}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5ede7;">
            <strong style="color: #0c4d2f; font-size: 0.92rem;">${escapeHtml(item.name)}</strong>
            <div style="font-size: 0.78rem; color: #607266;">Item Ref: ${escapeHtml(item.id || 'KIT-SMPL')}</div>
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5ede7; text-align: center;">Testing Sample</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5ede7; text-align: right;">$${itemPrice}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5ede7; text-align: center; font-weight: 700;">${itemQty}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5ede7; text-align: right; font-weight: 700; color: #0c4d2f;">$${lineTotal}</td>
        </tr>
      `;
    });

    container.innerHTML = `
      <!-- Company Official Header -->
      <div style="border-bottom: 2px solid #0c4d2f; padding-bottom: 1.25rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="assets/images/logo/chl-logo.jpg" alt="CHL Logo" style="width: 58px; height: 58px; border-radius: 8px; border: 1px solid #cbd8ce; object-fit: cover;">
          <div>
            <h2 style="margin: 0; font-size: 1.4rem; color: #0c4d2f; letter-spacing: -0.01em;">Celebration Holdings (Pvt) Ltd</h2>
            <div style="font-size: 0.78rem; color: #5f7065; font-weight: 600; margin-top: 2px;">
              Certified Organic Coconut Products, Ceylon Spices &amp; Distilled Pure Essential Oils
            </div>
            <div style="font-size: 0.74rem; color: #79877e; margin-top: 2px;">
              Head Office: Colombo, Sri Lanka • Email: info@celebrationholdings.lk • Web: www.celebrationholdings.lk
            </div>
          </div>
        </div>

        <div style="text-align: right;">
          <div style="display: inline-block; background: #0c4d2f; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
            ${isDomestic ? 'Commercial Summary Order Sheet' : 'Overseas Freight Quotation Sheet'}
          </div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #0c4d2f;">Ref: ${order.id}</div>
          <div style="font-size: 0.78rem; color: #607266;">Generated: ${formatDateTime(order.date || new Date())}</div>
        </div>
      </div>

      <!-- Consignee & Order Metadata Grid -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem; background: #f8faf9; border: 1px solid #e1e8e3; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; color: #0c4d2f; margin-bottom: 6px;">
            Consignee / Customer Delivery Address
          </div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #1a2e22; margin-bottom: 2px;">
            ${escapeHtml(order.customerName || 'N/A')}
          </div>
          ${order.company ? `<div style="font-size: 0.85rem; color: #4b5950; font-weight: 600; margin-bottom: 4px;">${escapeHtml(order.company)}</div>` : ''}
          <div style="font-size: 0.86rem; color: #334539; line-height: 1.45; margin-top: 4px;">
            <div>${escapeHtml(order.address || 'N/A')}</div>
            <div><strong>${escapeHtml(order.city || '')}</strong> ${order.postalCode ? `— Postal Code: <strong>${escapeHtml(order.postalCode)}</strong>` : ''}</div>
            <div><strong>${order.country === 'Sri Lanka' ? '🇱🇰 Sri Lanka' : escapeHtml(order.country || 'International')}</strong></div>
          </div>
          <div style="margin-top: 8px; font-size: 0.82rem; color: #0c4d2f; font-weight: 600;">
            📞 Phone / WhatsApp: <span style="color: #1a2e22;">${escapeHtml(order.phone || 'N/A')}</span>
          </div>
          <div style="font-size: 0.82rem; color: #607266;">
            ✉️ Email: <span style="color: #1a2e22;">${escapeHtml(order.email || 'N/A')}</span>
          </div>
        </div>

        <div style="border-left: 1px solid #e5ede7; padding-left: 1.25rem;">
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; color: #0c4d2f; margin-bottom: 6px;">
            Fulfillment &amp; Payment Specifications
          </div>
          <table style="width: 100%; font-size: 0.82rem; border-collapse: collapse;">
            <tr>
              <td style="padding: 3px 0; color: #607266;">Order Type:</td>
              <td style="padding: 3px 0; font-weight: 700; text-align: right; color: ${isDomestic ? '#166534' : '#7c3aed'};">
                ${isDomestic ? '🇱🇰 Domestic Sri Lanka Delivery' : '✈️ Overseas Air Courier'}
              </td>
            </tr>
            <tr>
              <td style="padding: 3px 0; color: #607266;">Current Status:</td>
              <td style="padding: 3px 0; font-weight: 700; text-align: right;">${renderStatusBadge(order.status)}</td>
            </tr>
            <tr>
              <td style="padding: 3px 0; color: #607266;">Payment Method:</td>
              <td style="padding: 3px 0; font-weight: 600; text-align: right;">${escapeHtml(order.paymentMethod || 'Online Gateway')}</td>
            </tr>
            <tr>
              <td style="padding: 3px 0; color: #607266;">Payment Status:</td>
              <td style="padding: 3px 0; font-weight: 700; text-align: right; color: ${order.paymentStatus === 'Paid' ? '#166534' : '#c68b2c'};">
                ${escapeHtml(order.paymentStatus || 'Pending')}
              </td>
            </tr>
            <tr>
              <td style="padding: 3px 0; color: #607266;">Fulfillment Hub:</td>
              <td style="padding: 3px 0; font-weight: 600; text-align: right;">Colombo Main Logistics Center</td>
            </tr>
          </table>

          ${order.notes ? `
            <div style="margin-top: 10px; background: #ffffff; border: 1px dashed #cbd8ce; border-radius: 6px; padding: 6px 10px; font-size: 0.78rem; color: #4b5950;">
              <strong>Delivery Notes:</strong> ${escapeHtml(order.notes)}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Itemized Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.88rem;">
        <thead>
          <tr style="background: #0c4d2f; color: #ffffff;">
            <th style="padding: 9px 12px; text-align: center; width: 40px; font-weight: 700;">#</th>
            <th style="padding: 9px 12px; text-align: left; font-weight: 700;">Sample Product Description</th>
            <th style="padding: 9px 12px; text-align: center; font-weight: 700;">Package Unit</th>
            <th style="padding: 9px 12px; text-align: right; font-weight: 700;">Price (USD)</th>
            <th style="padding: 9px 12px; text-align: center; font-weight: 700;">Qty</th>
            <th style="padding: 9px 12px; text-align: right; font-weight: 700;">Line Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <!-- Order Totals Box -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 2rem;">
        <div style="width: 320px; background: #fbfdfb; border: 1px solid #dce8df; border-radius: 8px; padding: 1rem; font-size: 0.88rem;">
          <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #4b5950;">
            <span>Sample Items Subtotal:</span>
            <strong>$${subtotal} USD</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #166534;">
            <span>${isDomestic ? '🇱🇰 Sri Lanka Courier Delivery:' : '✈️ Air Courier Freight:'}</span>
            <strong>${isDomestic ? '+$' + shipping + ' USD' : '<span style="color:#7c3aed;">Quote on request</span>'}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0 0 0; margin-top: 6px; border-top: 2px solid #0c4d2f; font-size: 1.08rem; color: #0c4d2f;">
            <span style="font-weight: 800;">Grand Total Payable:</span>
            <strong style="font-weight: 800;">$${total} USD</strong>
          </div>
          ${isDomestic ? `
            <div style="font-size: 0.75rem; color: #79877e; text-align: right; margin-top: 4px;">
              (Standard Doorstep Delivery islandwide across Sri Lanka)
            </div>
          ` : `
            <div style="font-size: 0.75rem; color: #7c3aed; text-align: right; margin-top: 4px;">
              (Air Express volumetric courier quotation in progress)
            </div>
          `}
        </div>
      </div>

      <!-- Packing, Quality & Dispatch Sign-Off Block -->
      <div style="border-top: 1px solid #d9e3dc; padding-top: 1.5rem; margin-top: 1.5rem;">
        <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; color: #0c4d2f; margin-bottom: 1rem;">
          Official Dispatch Verification &amp; Customer Handover
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; font-size: 0.78rem;">
          <div style="border: 1px solid #e1e8e3; border-radius: 6px; padding: 0.75rem; background: #ffffff;">
            <span style="color: #79877e; display: block; margin-bottom: 1.5rem;">Packed &amp; Sealed by:</span>
            <div style="border-bottom: 1px dashed #79877e; height: 16px;"></div>
            <span style="font-size: 0.7rem; color: #79877e; margin-top: 3px; display: block;">Warehouse Officer</span>
          </div>

          <div style="border: 1px solid #e1e8e3; border-radius: 6px; padding: 0.75rem; background: #ffffff;">
            <span style="color: #79877e; display: block; margin-bottom: 1.5rem;">Quality COA Attached:</span>
            <div style="border-bottom: 1px dashed #79877e; height: 16px;"></div>
            <span style="font-size: 0.7rem; color: #79877e; margin-top: 3px; display: block;">QA / Lab Inspector</span>
          </div>

          <div style="border: 1px solid #e1e8e3; border-radius: 6px; padding: 0.75rem; background: #ffffff;">
            <span style="color: #79877e; display: block; margin-bottom: 1.5rem;">Courier Waybill No:</span>
            <div style="border-bottom: 1px dashed #79877e; height: 16px;"></div>
            <span style="font-size: 0.7rem; color: #79877e; margin-top: 3px; display: block;">Tracking Reference</span>
          </div>

          <div style="border: 1px solid #e1e8e3; border-radius: 6px; padding: 0.75rem; background: #ffffff;">
            <span style="color: #79877e; display: block; margin-bottom: 1.5rem;">Consignee Received by:</span>
            <div style="border-bottom: 1px dashed #79877e; height: 16px;"></div>
            <span style="font-size: 0.7rem; color: #79877e; margin-top: 3px; display: block;">Signature &amp; Date</span>
          </div>
        </div>
      </div>
    `;
  }

  // --- CSV EXPORT ---
  window.exportOrdersCSV = function () {
    if (allOrders.length === 0) {
      showToast('No order data to export', 'warning');
      return;
    }

    const headers = ['Order ID', 'Type', 'Date', 'Customer Name', 'Company', 'Phone', 'Email', 'Address', 'City', 'Postal Code', 'Country', 'Items Qty', 'Subtotal USD', 'Shipping USD', 'Total USD', 'Status', 'Payment Method'];
    const rows = allOrders.map(o => [
      `"${o.id || ''}"`,
      `"${o.type || ''}"`,
      `"${o.date || ''}"`,
      `"${(o.customerName || '').replace(/"/g, '""')}"`,
      `"${(o.company || '').replace(/"/g, '""')}"`,
      `"${(o.phone || '').replace(/"/g, '""')}"`,
      `"${(o.email || '').replace(/"/g, '""')}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${(o.city || '').replace(/"/g, '""')}"`,
      `"${(o.postalCode || '').replace(/"/g, '""')}"`,
      `"${(o.country || '').replace(/"/g, '""')}"`,
      `"${(o.items || []).reduce((s, i) => s + (i.qty || 1), 0)}"`,
      `"${(o.subtotalUSD || 0)}"`,
      `"${(o.shippingCostUSD || 0)}"`,
      `"${(o.totalUSD || 0)}"`,
      `"${o.status || ''}"`,
      `"${(o.paymentMethod || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Celebration_Holdings_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV successfully!', 'success');
  };

  // --- HELPERS ---
  function renderStatusBadge(status) {
    const s = status || 'New Order';
    let cls = 'order-status-new';
    if (s === 'Processing') cls = 'order-status-processing';
    else if (s === 'Dispatched') cls = 'order-status-dispatched';
    else if (s === 'Delivered') cls = 'order-status-delivered';
    else if (s === 'Cancelled') cls = 'order-status-cancelled';
    else if (s.toLowerCase().includes('quote') || s.toLowerCase().includes('inquiry')) cls = 'order-status-inquiry';

    return `<span class="order-badge ${cls}">${escapeHtml(s)}</span>`;
  }

  function formatDateShort(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function formatDateTime(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- EVENT LISTENERS ---
  function bindGlobalEvents() {
    // Search input for domestic orders
    const searchInput = document.getElementById('order-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderDomesticOrdersTable();
      });
    }

    // Status filter dropdown
    const filterSelect = document.getElementById('order-status-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', function () {
        renderDomesticOrdersTable();
      });
    }

    // Modal background close
    const modal = document.getElementById('order-sheet-modal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeOrderSheetModal();
        }
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeOrderSheetModal();
      }
    });

    // Cross-tab synchronization via custom event or storage
    window.addEventListener('chl_db_updated', function () {
      loadDataAndRender();
    });

    window.addEventListener('storage', function (e) {
      if (e.key === 'chl_db_orders_v1' || e.key === 'chl_db_sales_config_v1') {
        loadDataAndRender();
      }
    });
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', function () {
    initAuth();
    initNavigation();
    initSettingsForm();
    bindGlobalEvents();
    checkAuth();
  });

})();
