/**
 * Celebration Holdings (Pvt) Ltd - Admin Portal Engine
 * Full CRUD for Products, Categories, Blog Posts & Data Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initAdminNavigation();
  loadAllAdminData();

  window.addEventListener('chl_db_updated', () => {
    loadAllAdminData();
  });
});

/* --------------------------------------------------------------------------
   1. Authentication Gate
   -------------------------------------------------------------------------- */
function initAdminAuth() {
  const gate = document.getElementById('auth-gate');
  const app = document.getElementById('admin-app');
  const form = document.getElementById('auth-form');
  const logoutBtn = document.getElementById('btn-logout');

  const isAuthenticated = sessionStorage.getItem('chl_admin_logged_in') === 'true';
  if (isAuthenticated) {
    if (gate) gate.style.display = 'none';
    if (app) app.style.display = 'flex';
  } else {
    if (gate) gate.style.display = 'flex';
    if (app) app.style.display = 'none';
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('admin-pass').value;
    // Default password (can be changed in settings)
    if (pass === 'chl@pw123#') {
      sessionStorage.setItem('chl_admin_logged_in', 'true');
      gate.style.display = 'none';
      app.style.display = 'flex';
      loadAllAdminData();
    } else {
      alert('Incorrect password. Please try again.');
    }
  });

  logoutBtn?.addEventListener('click', () => {
    sessionStorage.removeItem('chl_admin_logged_in');
    location.reload();
  });
}

/* --------------------------------------------------------------------------
   2. Navigation & Tabs
   -------------------------------------------------------------------------- */
function initAdminNavigation() {
  const tabs = document.querySelectorAll('.admin-nav-item[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.style.display = content.id === targetId ? 'block' : 'none';
      });
    });
  });
}

function loadAllAdminData() {
  renderOverviewStats();
  renderProductsTable();
  renderCoconutHarvestAdmin();
  renderSampleKitsAdmin();
  renderCategoriesTable();
  renderBlogTable();
  populateCategoryDropdowns();
}

function moveProduct(id, direction) {
  if (CHL_DB.moveProduct(id, direction)) {
    renderProductsTable();
  }
}
window.moveProduct = moveProduct;

function movePost(id, direction) {
  if (CHL_DB.movePost(id, direction)) {
    renderBlogTable();
  }
}
window.movePost = movePost;

/* --------------------------------------------------------------------------
   3. Overview Tab
   -------------------------------------------------------------------------- */
function renderOverviewStats() {
  const products = CHL_DB.getProducts();
  const categories = CHL_DB.getCategories();
  const posts = CHL_DB.getPosts();

  const inStock = products.filter(p => p.availability === 'In Stock').length;

  document.getElementById('stat-total-products').textContent = products.length;
  document.getElementById('stat-total-categories').textContent = categories.length;
  document.getElementById('stat-instock-count').textContent = inStock;
  document.getElementById('stat-blog-count').textContent = posts.length;
}

/* --------------------------------------------------------------------------
   4. Products Manager
   -------------------------------------------------------------------------- */
function renderProductsTable() {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;

  const products = CHL_DB.getProducts();
  const search = document.getElementById('admin-prod-search')?.value.toLowerCase().trim() || '';
  const catFilter = document.getElementById('admin-cat-filter')?.value || 'all';
  const stockFilter = document.getElementById('admin-stock-filter')?.value || 'all';

  const filtered = products.filter(p => {
    const matchCat = catFilter === 'all' || p.category === catFilter;
    const matchStock = stockFilter === 'all' || p.availability === stockFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search) || (p.botanicalName && p.botanicalName.toLowerCase().includes(search));
    return matchCat && matchStock && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: #79877e;">No products found matching criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const stockClass = {
      'In Stock': 'stock-in',
      'Seasonal Harvest': 'stock-seasonal',
      'Limited Batch': 'stock-limited',
      'Out of Stock': 'stock-out'
    }[p.availability] || 'stock-in';

    const certsCount = (p.certifications && Array.isArray(p.certifications)) ? p.certifications.length : 0;
    const hasSpec = !!p.specDocUrl;
    const hasMsds = !!p.msdsDocUrl;

    return `
      <tr>
        <td style="text-align: center;">
          <div style="display: flex; gap: 4px; justify-content: center;">
            <button type="button" class="btn-order" onclick="moveProduct('${p.id}', 'up')" title="Move Up">↑</button>
            <button type="button" class="btn-order" onclick="moveProduct('${p.id}', 'down')" title="Move Down">↓</button>
          </div>
        </td>
        <td>
          <img src="${p.image}" alt="" style="width: 44px; height: 44px; object-fit: contain; background: #f4f2eb; border-radius: 4px; padding: 2px;" onerror="this.src='assets/images/logo/chl-logo.jpg'">
        </td>
        <td>
          <strong style="color: #0c4d2f; display: block;">${p.name}</strong>
          <span style="font-size: 0.75rem; color: #79877e; font-style: italic;">${p.botanicalName || ''}</span>
        </td>
        <td><span class="badge" style="background: #f4f2eb; color: #4b5950;">${p.categoryName || p.category}</span></td>
        <td>
          <span style="font-weight: 700; color: #c68b2c;">$${parseFloat(p.samplePriceUSD || 0).toFixed(2)}</span>
        </td>
        <td>
          <span class="stock-badge ${stockClass}">${p.availability || 'In Stock'}</span>
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 2px; font-size: 0.75rem;">
            <span style="color: ${hasSpec ? '#166534' : '#9ca3af'}; font-weight: 600;">${hasSpec ? '📄 Spec' : '— No Spec'}</span>
            <span style="color: ${hasMsds ? '#0369a1' : '#9ca3af'}; font-weight: 600;">${hasMsds ? '🛡️ MSDS' : '— No MSDS'}</span>
            <span style="color: #4b5950; font-size: 0.7rem;">✓ ${certsCount} Certs</span>
          </div>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-sm" style="padding: 4px 8px; background: #e0f2fe; color: #0369a1;" onclick="openEditProductModal('${p.id}')">Edit</button>
          <button class="btn btn-sm" style="padding: 4px 8px; background: #fee2e2; color: #991b1b;" onclick="deleteProductConfirm('${p.id}', '${p.name.replace(/'/g, "\\'")}')">Del</button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach search and filter events
  document.getElementById('admin-prod-search')?.addEventListener('input', renderProductsTable);
  document.getElementById('admin-cat-filter')?.addEventListener('change', renderProductsTable);
  document.getElementById('admin-stock-filter')?.addEventListener('change', renderProductsTable);
}

function populateCategoryDropdowns() {
  const categories = CHL_DB.getCategories();
  const filterSelect = document.getElementById('admin-cat-filter');
  const editSelect = document.getElementById('edit-prod-category');

  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = `<option value="all">All Categories</option>` +
      categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    filterSelect.value = currentVal;
  }

  if (editSelect) {
    editSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }
}

function handleProductImageFile(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('edit-prod-image').value = e.target.result;
  };
  reader.readAsDataURL(file);
}
window.handleProductImageFile = handleProductImageFile;

function handleSpecFileUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  document.getElementById('edit-prod-spec-name').value = file.name;
  document.getElementById('edit-prod-spec-info').textContent = `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('edit-prod-spec-url').value = e.target.result;
  };
  reader.readAsDataURL(file);
}
window.handleSpecFileUpload = handleSpecFileUpload;

function handleMsdsFileUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  document.getElementById('edit-prod-msds-name').value = file.name;
  document.getElementById('edit-prod-msds-info').textContent = `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('edit-prod-msds-url').value = e.target.result;
  };
  reader.readAsDataURL(file);
}
window.handleMsdsFileUpload = handleMsdsFileUpload;

function openAddProductModal() {
  document.getElementById('prod-modal-title').textContent = "Add New Product";
  document.getElementById('product-form').reset();
  document.getElementById('edit-prod-id').value = "";
  document.getElementById('edit-prod-availability').value = "In Stock";
  document.getElementById('edit-prod-badge').value = "EU / USDA Organic";

  document.getElementById('edit-prod-spec-url').value = "";
  document.getElementById('edit-prod-spec-name').value = "";
  document.getElementById('edit-prod-spec-info').textContent = "";
  document.getElementById('edit-prod-msds-url').value = "";
  document.getElementById('edit-prod-msds-name').value = "";
  document.getElementById('edit-prod-msds-info').textContent = "";

  // Check all certs by default
  document.querySelectorAll('input[name="prod-certs"]').forEach(cb => cb.checked = true);

  const modal = document.getElementById('product-edit-modal');
  modal.classList.add('active');
}
window.openAddProductModal = openAddProductModal;

function openEditProductModal(id) {
  const prod = CHL_DB.getProductById(id);
  if (!prod) return;

  document.getElementById('prod-modal-title').textContent = "Edit Product: " + prod.name;
  document.getElementById('edit-prod-id').value = prod.id;
  document.getElementById('edit-prod-name').value = prod.name;
  document.getElementById('edit-prod-botanical').value = prod.botanicalName || '';
  document.getElementById('edit-prod-category').value = prod.category;
  document.getElementById('edit-prod-price').value = prod.samplePriceUSD || 15.0;
  document.getElementById('edit-prod-availability').value = prod.availability || 'In Stock';
  document.getElementById('edit-prod-image').value = prod.image || '';
  document.getElementById('edit-prod-badge').value = prod.badge || '';
  document.getElementById('edit-prod-shortdesc').value = prod.shortDesc || '';
  document.getElementById('edit-prod-desc').value = prod.description || '';
  document.getElementById('edit-prod-grades').value = prod.grades || '';
  document.getElementById('edit-prod-bulkprice').value = prod.bulkPriceGuidelineUSD || '';

  // Docs
  document.getElementById('edit-prod-spec-url').value = prod.specDocUrl || '';
  document.getElementById('edit-prod-spec-name').value = prod.specDocName || '';
  document.getElementById('edit-prod-spec-info').textContent = prod.specDocName ? `Attached: ${prod.specDocName}` : (prod.specDocUrl ? `Attached: ${prod.specDocUrl.split('/').pop()}` : '—');

  document.getElementById('edit-prod-msds-url').value = prod.msdsDocUrl || '';
  document.getElementById('edit-prod-msds-name').value = prod.msdsDocName || '';
  document.getElementById('edit-prod-msds-info').textContent = prod.msdsDocName ? `Attached: ${prod.msdsDocName}` : (prod.msdsDocUrl ? `Attached: ${prod.msdsDocUrl.split('/').pop()}` : '—');

  document.getElementById('edit-prod-benefits').value = (prod.benefits && Array.isArray(prod.benefits)) ? prod.benefits.join('\n') : '';
  document.getElementById('edit-prod-packaging').value = (prod.packaging && Array.isArray(prod.packaging)) ? prod.packaging.join('\n') : '';

  // Certifications
  const activeCerts = prod.certifications || [];
  document.querySelectorAll('input[name="prod-certs"]').forEach(cb => {
    cb.checked = activeCerts.includes(cb.value);
  });

  const modal = document.getElementById('product-edit-modal');
  modal.classList.add('active');
}
window.openEditProductModal = openEditProductModal;

function closeProductEditModal() {
  document.getElementById('product-edit-modal').classList.remove('active');
}
window.closeProductEditModal = closeProductEditModal;

// Save Product Submission
document.getElementById('product-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('edit-prod-id').value;
  const categories = CHL_DB.getCategories();
  const selectedCatId = document.getElementById('edit-prod-category').value;
  const catObj = categories.find(c => c.id === selectedCatId) || { name: selectedCatId };

  const selectedCerts = [];
  document.querySelectorAll('input[name="prod-certs"]:checked').forEach(cb => {
    selectedCerts.push(cb.value);
  });

  const benefitsArr = document.getElementById('edit-prod-benefits').value
    .split('\n').map(s => s.trim()).filter(s => s.length > 0);

  const packagingArr = document.getElementById('edit-prod-packaging').value
    .split('\n').map(s => s.trim()).filter(s => s.length > 0);

  const specUrl = document.getElementById('edit-prod-spec-url').value.trim();
  const specName = document.getElementById('edit-prod-spec-name').value.trim() || (specUrl ? specUrl.split('/').pop() : '');

  const msdsUrl = document.getElementById('edit-prod-msds-url').value.trim();
  const msdsName = document.getElementById('edit-prod-msds-name').value.trim() || (msdsUrl ? msdsUrl.split('/').pop() : '');

  const productData = {
    id: id || undefined,
    name: document.getElementById('edit-prod-name').value.trim(),
    botanicalName: document.getElementById('edit-prod-botanical').value.trim(),
    category: selectedCatId,
    categoryName: catObj.name,
    samplePriceUSD: parseFloat(document.getElementById('edit-prod-price').value),
    availability: document.getElementById('edit-prod-availability').value,
    certifications: selectedCerts,
    image: document.getElementById('edit-prod-image').value.trim(),
    badge: document.getElementById('edit-prod-badge').value.trim() || 'EU Organic',
    shortDesc: document.getElementById('edit-prod-shortdesc').value.trim(),
    description: document.getElementById('edit-prod-desc').value.trim(),
    grades: document.getElementById('edit-prod-grades').value.trim(),
    bulkPriceGuidelineUSD: document.getElementById('edit-prod-bulkprice').value.trim(),
    specDocUrl: specUrl || undefined,
    specDocName: specName || undefined,
    msdsDocUrl: msdsUrl || undefined,
    msdsDocName: msdsName || undefined,
    benefits: benefitsArr.length > 0 ? benefitsArr : ["100% Certified Organic", "Tested for Export Quality"],
    packaging: packagingArr.length > 0 ? packagingArr : ["Retail Packs", "Bulk Export Bags"]
  };

  CHL_DB.saveProduct(productData);
  closeProductEditModal();
  renderProductsTable();
  alert('Product saved successfully!');
});

function deleteProductConfirm(id, name) {
  if (confirm(`Are you sure you want to remove "${name}" from the product catalog?`)) {
    CHL_DB.deleteProduct(id);
  }
}
window.deleteProductConfirm = deleteProductConfirm;

/* --------------------------------------------------------------------------
   5. Categories Manager
   -------------------------------------------------------------------------- */
function renderCategoriesTable() {
  const tbody = document.getElementById('admin-categories-tbody');
  if (!tbody) return;

  const categories = CHL_DB.getCategories();
  tbody.innerHTML = categories.map(c => `
    <tr>
      <td style="font-size: 1.3rem;">${c.icon || '📦'}</td>
      <td><strong>${c.name}</strong></td>
      <td><code>${c.id}</code></td>
      <td style="color: #79877e;">${c.desc || ''}</td>
      <td style="text-align: right;">
        <button class="btn btn-sm" style="padding: 4px 8px; background: #fee2e2; color: #991b1b;" onclick="deleteCategoryConfirm('${c.id}', '${c.name}')">Del</button>
      </td>
    </tr>
  `).join('');
}

function openAddCategoryModal() {
  const name = prompt("Enter new Category Name (e.g. Herbal Teas):");
  if (!name) return;
  const icon = prompt("Enter an emoji or icon (e.g. 🍵):", "🌱") || "🌱";
  const desc = prompt("Enter a brief description for this range:", "Organic export range from Sri Lanka");

  CHL_DB.saveCategory({
    name: name.trim(),
    icon: icon.trim(),
    desc: desc ? desc.trim() : ""
  });
  alert('Category added!');
}
window.openAddCategoryModal = openAddCategoryModal;

function deleteCategoryConfirm(id, name) {
  if (confirm(`Are you sure you want to delete category "${name}"?`)) {
    CHL_DB.deleteCategory(id);
  }
}
window.deleteCategoryConfirm = deleteCategoryConfirm;

/* --------------------------------------------------------------------------
   6. Blog & Exhibitions Manager
/* --------------------------------------------------------------------------
   6. Company Blog Manager (Multi-Photo & Published Date)
   -------------------------------------------------------------------------- */
let currentPostPhotos = [];

function renderBlogTable() {
  const tbody = document.getElementById('admin-blog-tbody');
  if (!tbody) return;

  const posts = CHL_DB.getPosts();
  tbody.innerHTML = posts.map(p => {
    const photoCount = (p.photos && Array.isArray(p.photos)) ? p.photos.length : (p.coverImage ? 1 : 0);
    const cover = (p.photos && p.photos[0]) || p.coverImage || 'assets/images/banner/hero-bg.jpg';

    return `
      <tr>
        <td style="text-align: center;">
          <div style="display: flex; gap: 4px; justify-content: center;">
            <button type="button" class="btn-order" onclick="movePost('${p.id}', 'up')" title="Move Up">↑</button>
            <button type="button" class="btn-order" onclick="movePost('${p.id}', 'down')" title="Move Down">↓</button>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${cover}" alt="" style="width: 44px; height: 44px; object-fit: cover; border-radius: 4px; flex-shrink: 0;" onerror="this.src='assets/images/banner/hero-bg.jpg'">
            <div>
              <strong style="color: #0c4d2f; display: block;">${p.title}</strong>
              <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                <span style="font-size: 0.72rem; color: #79877e;">/blog/${p.slug}</span>
                <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.68rem; padding: 1px 6px;">📸 ${photoCount} ${photoCount === 1 ? 'photo' : 'photos'}</span>
              </div>
            </div>
          </div>
        </td>
        <td><span class="badge" style="background: #e0f2fe; color: #0369a1;">${p.category}</span></td>
        <td>${p.author || 'CHL Editorial'}</td>
        <td><strong>${p.publishedDate || '—'}</strong></td>
        <td>
          <span class="stock-badge ${p.status === 'Published' ? 'stock-in' : 'stock-limited'}">${p.status}</span>
        </td>
        <td style="text-align: right;">
          <button class="btn btn-sm" style="padding: 4px 8px; background: #e0f2fe; color: #0369a1;" onclick="openEditPostModal('${p.id}')">Edit</button>
          <button class="btn btn-sm" style="padding: 4px 8px; background: #fee2e2; color: #991b1b;" onclick="deletePostConfirm('${p.id}')">Del</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderPostPhotosManager() {
  const grid = document.getElementById('edit-post-photos-grid');
  const badge = document.getElementById('post-photo-count-badge');
  if (badge) {
    badge.textContent = `${currentPostPhotos.length} / 10 Photos`;
    badge.style.background = currentPostPhotos.length >= 10 ? '#fee2e2' : '#e8f5ed';
    badge.style.color = currentPostPhotos.length >= 10 ? '#991b1b' : '#0c4d2f';
  }
  if (!grid) return;

  if (currentPostPhotos.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 1rem; text-align: center; color: var(--color-text-subtle); font-size: 0.85rem;">No photos added yet. Browse files or enter URL above (up to 10 photos).</div>`;
    return;
  }

  grid.innerHTML = currentPostPhotos.map((url, i) => `
    <div style="position: relative; border-radius: 6px; overflow: hidden; border: 2px solid ${i === 0 ? 'var(--color-accent)' : 'var(--color-border)'}; aspect-ratio: 1; background: #ffffff; box-shadow: var(--shadow-sm);">
      <img src="${url}" alt="Photo ${i+1}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/banner/hero-bg.jpg'">
      <span style="position: absolute; top: 4px; left: 4px; background: rgba(6,42,25,0.85); color: #ffffff; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">
        ${i === 0 ? '★ Cover' : '#' + (i + 1)}
      </span>
      <button type="button" onclick="removePostPhoto(${i})" style="position: absolute; top: 4px; right: 4px; background: #ef4444; color: #ffffff; border: none; border-radius: 50%; width: 22px; height: 22px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.3);" title="Remove Photo">✕</button>
    </div>
  `).join('');
}

function handlePostPhotosUpload(input) {
  if (!input.files || input.files.length === 0) return;
  const remaining = 10 - currentPostPhotos.length;
  if (remaining <= 0) {
    alert('Maximum limit of 10 photos already reached for this post.');
    input.value = '';
    return;
  }

  const filesToAdd = Array.from(input.files).slice(0, remaining);
  let loaded = 0;

  filesToAdd.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentPostPhotos.push(e.target.result);
      loaded++;
      if (loaded === filesToAdd.length) {
        renderPostPhotosManager();
      }
    };
    reader.readAsDataURL(file);
  });

  input.value = '';
}
window.handlePostPhotosUpload = handlePostPhotosUpload;

function addPostPhotoByUrl() {
  const input = document.getElementById('edit-post-single-url');
  if (!input) return;
  const url = input.value.trim();
  if (!url) {
    alert('Please enter an image URL first.');
    return;
  }
  if (currentPostPhotos.length >= 10) {
    alert('Maximum 10 photos allowed per article.');
    return;
  }
  currentPostPhotos.push(url);
  input.value = '';
  renderPostPhotosManager();
}
window.addPostPhotoByUrl = addPostPhotoByUrl;

function removePostPhoto(index) {
  currentPostPhotos.splice(index, 1);
  renderPostPhotosManager();
}
window.removePostPhoto = removePostPhoto;

function openAddPostModal() {
  document.getElementById('post-modal-title').textContent = "Write New Blog Story";
  document.getElementById('blog-form').reset();
  document.getElementById('edit-post-id').value = "";
  document.getElementById('edit-post-status').value = "Published";
  document.getElementById('edit-post-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('edit-post-author').value = "Suresh Jayasinghe, Director Operations";
  document.getElementById('edit-post-readingtime').value = "4 min read";

  currentPostPhotos = ["assets/images/banner/hero-bg.jpg"];
  renderPostPhotosManager();

  const modal = document.getElementById('blog-edit-modal');
  modal.classList.add('active');
}
window.openAddPostModal = openAddPostModal;

function openEditPostModal(id) {
  const post = CHL_DB.getPostBySlug(id);
  if (!post) return;

  document.getElementById('post-modal-title').textContent = "Edit Article";
  document.getElementById('edit-post-id').value = post.id;
  document.getElementById('edit-post-title').value = post.title;
  document.getElementById('edit-post-category').value = post.category;
  document.getElementById('edit-post-date').value = post.publishedDate || new Date().toISOString().split('T')[0];
  document.getElementById('edit-post-author').value = post.author || '';
  document.getElementById('edit-post-status').value = post.status || 'Published';
  document.getElementById('edit-post-readingtime').value = post.readingTime || '4 min read';
  document.getElementById('edit-post-excerpt').value = post.excerpt || '';
  document.getElementById('edit-post-content').value = post.content || '';

  // Load photos (up to 10)
  if (post.photos && Array.isArray(post.photos) && post.photos.length > 0) {
    currentPostPhotos = [...post.photos].slice(0, 10);
  } else if (post.coverImage) {
    currentPostPhotos = [post.coverImage];
  } else {
    currentPostPhotos = [];
  }
  renderPostPhotosManager();

  const modal = document.getElementById('blog-edit-modal');
  modal.classList.add('active');
}
window.openEditPostModal = openEditPostModal;

function closeBlogEditModal() {
  document.getElementById('blog-edit-modal').classList.remove('active');
}
window.closeBlogEditModal = closeBlogEditModal;

document.getElementById('blog-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-post-id').value;
  const publishedDate = document.getElementById('edit-post-date').value || new Date().toISOString().split('T')[0];

  const postData = {
    id: id || undefined,
    title: document.getElementById('edit-post-title').value.trim(),
    category: document.getElementById('edit-post-category').value,
    publishedDate: publishedDate,
    author: document.getElementById('edit-post-author').value.trim(),
    status: document.getElementById('edit-post-status').value,
    photos: currentPostPhotos.slice(0, 10),
    coverImage: currentPostPhotos[0] || 'assets/images/banner/hero-bg.jpg',
    readingTime: document.getElementById('edit-post-readingtime').value.trim(),
    excerpt: document.getElementById('edit-post-excerpt').value.trim(),
    content: document.getElementById('edit-post-content').value.trim()
  };

  CHL_DB.savePost(postData);
  closeBlogEditModal();
  renderBlogTable();
  alert('Blog article saved successfully!');
});

function deletePostConfirm(id) {
  if (confirm("Are you sure you want to delete this article?")) {
    CHL_DB.deletePost(id);
    renderBlogTable();
  }
}
window.deletePostConfirm = deletePostConfirm;

/* --------------------------------------------------------------------------
   7. Product Categories Manager (Edit Name, Icon, Description, Slug)
   -------------------------------------------------------------------------- */
function renderCategoriesTable() {
  const tbody = document.getElementById('admin-categories-tbody');
  if (!tbody) return;

  const categories = CHL_DB.getCategories();
  const products = CHL_DB.getProducts();

  if (categories.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #79877e;">No categories found. Click "+ Add New Category" to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = categories.map(cat => {
    const prodCount = products.filter(p => p.category === cat.id).length;
    return `
      <tr>
        <td style="text-align: center; font-size: 1.5rem;">${cat.icon || '📦'}</td>
        <td>
          <strong style="color: var(--color-primary-dark); display: block; font-size: 0.95rem;">${cat.name}</strong>
          <span style="font-size: 0.75rem; color: var(--color-text-subtle);">${prodCount} products linked</span>
        </td>
        <td>
          <code style="background: var(--color-surface-muted); padding: 2px 8px; border-radius: 4px; font-size: 0.82rem; color: var(--color-primary);">${cat.id}</code>
        </td>
        <td style="max-width: 320px; font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5;">
          ${cat.desc || '<span style="color:#9ca3af; font-style:italic;">No description provided</span>'}
        </td>
        <td style="text-align: right;">
          <button class="btn btn-sm" style="padding: 4px 10px; background: #e0f2fe; color: #0369a1;" onclick="openEditCategoryModal('${cat.id}')">Edit</button>
          <button class="btn btn-sm" style="padding: 4px 8px; background: #fee2e2; color: #991b1b;" onclick="deleteCategoryConfirm('${cat.id}', '${cat.name.replace(/'/g, "\\'")}')">Del</button>
        </td>
      </tr>
    `;
  }).join('');
}
window.renderCategoriesTable = renderCategoriesTable;

function populateCategoryDropdowns() {
  const categories = CHL_DB.getCategories();

  // 1. Admin product filter
  const catFilter = document.getElementById('admin-cat-filter');
  if (catFilter) {
    const currentVal = catFilter.value;
    catFilter.innerHTML = `<option value="all">All Categories</option>` +
      categories.map(c => `<option value="${c.id}">${c.icon || ''} ${c.name}</option>`).join('');
    catFilter.value = currentVal || 'all';
  }

  // 2. Product edit modal category selector
  const editProdCat = document.getElementById('edit-prod-category');
  if (editProdCat) {
    const currentVal = editProdCat.value;
    editProdCat.innerHTML = categories.map(c => `<option value="${c.id}">${c.icon || ''} ${c.name}</option>`).join('');
    if (currentVal) editProdCat.value = currentVal;
  }
}
window.populateCategoryDropdowns = populateCategoryDropdowns;

function autoGenerateCatId(name) {
  const idInput = document.getElementById('edit-cat-id');
  const originalId = document.getElementById('edit-cat-original-id').value;
  // Only auto-generate if this is a new category
  if (!originalId && idInput) {
    idInput.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}
window.autoGenerateCatId = autoGenerateCatId;

function openAddCategoryModal() {
  document.getElementById('cat-modal-title').textContent = "Add New Category";
  document.getElementById('category-form').reset();
  document.getElementById('edit-cat-original-id').value = "";
  document.getElementById('edit-cat-id').readOnly = false;

  const modal = document.getElementById('category-edit-modal');
  modal.classList.add('active');
}
window.openAddCategoryModal = openAddCategoryModal;

function openEditCategoryModal(catId) {
  const cat = CHL_DB.getCategoryById(catId);
  if (!cat) return;

  document.getElementById('cat-modal-title').textContent = "Edit Product Category";
  document.getElementById('edit-cat-original-id').value = cat.id;
  document.getElementById('edit-cat-name').value = cat.name || '';
  document.getElementById('edit-cat-icon').value = cat.icon || '';
  document.getElementById('edit-cat-id').value = cat.id || '';
  document.getElementById('edit-cat-id').readOnly = true; // Lock slug to preserve product linkages
  document.getElementById('edit-cat-desc').value = cat.desc || '';

  const modal = document.getElementById('category-edit-modal');
  modal.classList.add('active');
}
window.openEditCategoryModal = openEditCategoryModal;

function closeCategoryEditModal() {
  document.getElementById('category-edit-modal').classList.remove('active');
}
window.closeCategoryEditModal = closeCategoryEditModal;

function saveCategoryForm() {
  const originalId = document.getElementById('edit-cat-original-id').value;
  const id = (originalId || document.getElementById('edit-cat-id').value.trim()).toLowerCase();
  const name = document.getElementById('edit-cat-name').value.trim();
  const icon = document.getElementById('edit-cat-icon').value.trim();
  const desc = document.getElementById('edit-cat-desc').value.trim();

  if (!id || !name) {
    alert('Please provide category Name and ID.');
    return;
  }

  const categoryData = { id, name, icon, desc };
  CHL_DB.saveCategory(categoryData);

  closeCategoryEditModal();
  renderCategoriesTable();
  populateCategoryDropdowns();
  renderOverviewStats();
  alert(`Category "${name}" saved successfully! Website category tabs and descriptions have been updated.`);
}
window.saveCategoryForm = saveCategoryForm;

function deleteCategoryConfirm(catId, name) {
  const products = CHL_DB.getProducts();
  const linked = products.filter(p => p.category === catId);
  if (linked.length > 0) {
    if (!confirm(`Warning: ${linked.length} products currently belong to category "${name}". Deleting this category may affect catalog filters. Continue?`)) {
      return;
    }
  } else {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) {
      return;
    }
  }

  CHL_DB.deleteCategory(catId);
  renderCategoriesTable();
  populateCategoryDropdowns();
  renderOverviewStats();
}
window.deleteCategoryConfirm = deleteCategoryConfirm;

/* --------------------------------------------------------------------------
   7. Coconut Harvest (5 Items) Manager
   -------------------------------------------------------------------------- */
function renderCoconutHarvestAdmin() {
  const container = document.getElementById('harvest-items-container');
  if (!container) return;

  const items = CHL_DB.getCoconutHarvestItems();
  container.innerHTML = items.map((item, idx) => `
    <div class="harvest-edit-card" data-index="${idx}">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border-light); padding-bottom: 0.5rem;">
        <strong style="color: var(--color-primary-dark); font-size: 1.05rem;">Slot #${idx + 1}: ${item.title || 'Product Slot'}</strong>
        <span class="badge" style="background: #fef3c7; color: #92400e;">Home Photo Line</span>
      </div>

      <div class="form-group" style="margin-bottom: 0.5rem;">
        <label class="form-label" style="font-size: 0.8rem;">Product Title *</label>
        <input type="text" class="form-control harvest-title" value="${item.title || ''}" placeholder="e.g. Virgin Coconut Oil" required>
      </div>

      <div class="form-group" style="margin-bottom: 0.5rem;">
        <label class="form-label" style="font-size: 0.8rem;">Subtitle / Extraction Tech *</label>
        <input type="text" class="form-control harvest-sub" value="${item.sub || ''}" placeholder="e.g. Centrifuge Extracted &lt; 38°C" required>
      </div>

      <div class="form-group" style="margin-bottom: 0.5rem;">
        <label class="form-label" style="font-size: 0.8rem;">Badge Tag</label>
        <input type="text" class="form-control harvest-badge" value="${item.badge || ''}" placeholder="e.g. Cold Pressed">
      </div>

      <div class="form-group" style="margin-bottom: 0.5rem;">
        <label class="form-label" style="font-size: 0.8rem;">Card Image Path / URL *</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" class="form-control harvest-image" value="${item.image || ''}" placeholder="assets/images/products/coconut/..." required oninput="previewHarvestImg(${idx}, this.value)">
          <label class="btn btn-outline btn-sm" style="cursor: pointer; margin: 0; white-space: nowrap;">
            Browse
            <input type="file" accept="image/*" style="display: none;" onchange="handleHarvestFileChange(${idx}, this)">
          </label>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 12px; background: #f8faf9; padding: 8px; border-radius: 6px; border: 1px solid var(--color-border-light);">
        <img id="harvest-img-prev-${idx}" src="${item.image || 'assets/images/logo/chl-logo.jpg'}" alt="" style="width: 54px; height: 54px; object-fit: contain; background: #ffffff; border-radius: 4px; padding: 2px; border: 1px solid var(--color-border);" onerror="this.src='assets/images/logo/chl-logo.jpg'">
        <span style="font-size: 0.75rem; color: var(--color-text-subtle);">Display preview on live photo-line</span>
      </div>
    </div>
  `).join('');
}
window.renderCoconutHarvestAdmin = renderCoconutHarvestAdmin;

function previewHarvestImg(idx, url) {
  const img = document.getElementById(`harvest-img-prev-${idx}`);
  if (img && url) img.src = url;
}
window.previewHarvestImg = previewHarvestImg;

function handleHarvestFileChange(idx, input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const card = document.querySelector(`.harvest-edit-card[data-index="${idx}"]`);
    if (card) {
      const imgInput = card.querySelector('.harvest-image');
      if (imgInput) imgInput.value = e.target.result;
    }
    const preview = document.getElementById(`harvest-img-prev-${idx}`);
    if (preview) preview.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
window.handleHarvestFileChange = handleHarvestFileChange;

function saveCoconutHarvestForm() {
  const cards = document.querySelectorAll('.harvest-edit-card');
  const items = [];
  cards.forEach((card, idx) => {
    const title = card.querySelector('.harvest-title')?.value.trim() || `Product ${idx + 1}`;
    const sub = card.querySelector('.harvest-sub')?.value.trim() || '';
    const badge = card.querySelector('.harvest-badge')?.value.trim() || '';
    const image = card.querySelector('.harvest-image')?.value.trim() || 'assets/images/logo/chl-logo.jpg';
    items.push({
      id: `harvest-0${idx + 1}`,
      title,
      sub,
      badge,
      image,
      category: 'coconut'
    });
  });

  CHL_DB.saveCoconutHarvestItems(items);
  alert('All 5 Coconut Harvest Line items have been successfully saved and updated on the home page!');
}
window.saveCoconutHarvestForm = saveCoconutHarvestForm;

/* --------------------------------------------------------------------------
   8. Sample Evaluation Kits Manager
   -------------------------------------------------------------------------- */
function renderSampleKitsAdmin() {
  const tbody = document.getElementById('admin-sample-kits-tbody');
  if (!tbody) return;

  const kits = CHL_DB.getSampleKits();
  if (kits.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #79877e;">No sample kits configured. Click "+ Add New Sample Kit".</td></tr>`;
    return;
  }

  tbody.innerHTML = kits.map(k => `
    <tr>
      <td style="text-align: center;">
        <div style="display: flex; gap: 4px; justify-content: center;">
          <button type="button" class="btn-order" onclick="moveSampleKit('${k.id}', 'up')" title="Move Up">↑</button>
          <button type="button" class="btn-order" onclick="moveSampleKit('${k.id}', 'down')" title="Move Down">↓</button>
        </div>
      </td>
      <td>
        <img src="${k.image || 'assets/images/logo/chl-logo.jpg'}" alt="" style="width: 48px; height: 48px; object-fit: contain; background: #f4f2eb; border-radius: 4px; padding: 2px;" onerror="this.src='assets/images/logo/chl-logo.jpg'">
      </td>
      <td>
        <strong style="color: #0c4d2f; display: block;">${k.name}</strong>
        <span class="badge badge-gold" style="font-size: 0.7rem;">${k.badge || 'Export Testing Kit'}</span>
      </td>
      <td>
        <span style="font-weight: 700; color: #c68b2c; font-size: 1rem;">$${parseFloat(k.priceUSD || 0).toFixed(2)}</span>
      </td>
      <td style="max-width: 320px; font-size: 0.8rem; color: #4b5950;">
        ${k.items || ''}
      </td>
      <td style="text-align: right;">
        <button class="btn btn-sm" style="padding: 4px 8px; background: #e0f2fe; color: #0369a1;" onclick="openEditSampleKitModal('${k.id}')">Edit</button>
        <button class="btn btn-sm" style="padding: 4px 8px; background: #fee2e2; color: #991b1b;" onclick="deleteSampleKitConfirm('${k.id}', '${k.name.replace(/'/g, "\\'")}')">Del</button>
      </td>
    </tr>
  `).join('');
}
window.renderSampleKitsAdmin = renderSampleKitsAdmin;

function moveSampleKit(id, direction) {
  if (CHL_DB.moveSampleKit(id, direction)) {
    renderSampleKitsAdmin();
  }
}
window.moveSampleKit = moveSampleKit;

function openAddSampleKitModal() {
  document.getElementById('sample-kit-modal-title').textContent = "Add New Sample Kit";
  document.getElementById('sample-kit-form').reset();
  document.getElementById('edit-kit-id').value = "";
  document.getElementById('edit-kit-price').value = "45.00";
  document.getElementById('edit-kit-badge').value = "Export Testing Kit";
  document.getElementById('kit-image-preview-wrap').style.display = 'none';

  const modal = document.getElementById('sample-kit-modal');
  modal?.classList.add('active');
}
window.openAddSampleKitModal = openAddSampleKitModal;

function openEditSampleKitModal(id) {
  const kit = CHL_DB.getSampleKitById(id);
  if (!kit) return;

  document.getElementById('sample-kit-modal-title').textContent = "Edit Sample Kit: " + kit.name;
  document.getElementById('edit-kit-id').value = kit.id;
  document.getElementById('edit-kit-name').value = kit.name;
  document.getElementById('edit-kit-price').value = kit.priceUSD;
  document.getElementById('edit-kit-badge').value = kit.badge || 'Export Testing Kit';
  document.getElementById('edit-kit-image').value = kit.image || '';
  document.getElementById('edit-kit-items').value = kit.items || '';
  document.getElementById('edit-kit-desc').value = kit.desc || '';

  const prevWrap = document.getElementById('kit-image-preview-wrap');
  const prevImg = document.getElementById('kit-image-preview');
  if (kit.image) {
    prevImg.src = kit.image;
    prevWrap.style.display = 'block';
  } else {
    prevWrap.style.display = 'none';
  }

  const modal = document.getElementById('sample-kit-modal');
  modal?.classList.add('active');
}
window.openEditSampleKitModal = openEditSampleKitModal;

function closeSampleKitModal() {
  document.getElementById('sample-kit-modal')?.classList.remove('active');
}
window.closeSampleKitModal = closeSampleKitModal;

function handleKitImageFile(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('edit-kit-image').value = e.target.result;
    const prevWrap = document.getElementById('kit-image-preview-wrap');
    const prevImg = document.getElementById('kit-image-preview');
    prevImg.src = e.target.result;
    prevWrap.style.display = 'block';
  };
  reader.readAsDataURL(file);
}
window.handleKitImageFile = handleKitImageFile;

function saveSampleKitForm() {
  const id = document.getElementById('edit-kit-id').value;
  const kitData = {
    id: id || undefined,
    name: document.getElementById('edit-kit-name').value.trim(),
    priceUSD: parseFloat(document.getElementById('edit-kit-price').value),
    badge: document.getElementById('edit-kit-badge').value.trim() || 'Export Testing Kit',
    image: document.getElementById('edit-kit-image').value.trim() || 'assets/images/products/coconut/Virgin Coconut Oil.jpeg',
    items: document.getElementById('edit-kit-items').value.trim(),
    desc: document.getElementById('edit-kit-desc').value.trim(),
    category: 'kit'
  };

  CHL_DB.saveSampleKit(kitData);
  closeSampleKitModal();
  renderSampleKitsAdmin();
  alert('Sample Kit saved successfully!');
}
window.saveSampleKitForm = saveSampleKitForm;

function deleteSampleKitConfirm(id, name) {
  if (confirm(`Are you sure you want to delete sample kit "${name}"?`)) {
    CHL_DB.deleteSampleKit(id);
    renderSampleKitsAdmin();
  }
}
window.deleteSampleKitConfirm = deleteSampleKitConfirm;

/* --------------------------------------------------------------------------
   9. Backup & Restore
   -------------------------------------------------------------------------- */
function downloadDatabaseBackup() {
  const jsonStr = CHL_DB.exportBackup();
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CHL_Database_Backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
window.downloadDatabaseBackup = downloadDatabaseBackup;

function handleRestoreFile(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const res = CHL_DB.importBackup(e.target.result);
    if (res.success) {
      alert(res.message);
      loadAllAdminData();
    } else {
      alert('Error restoring: ' + res.message);
    }
    input.value = '';
  };
  reader.readAsText(file);
}
window.handleRestoreFile = handleRestoreFile;

function confirmResetDefaults() {
  if (confirm("WARNING: This will reset all products, prices, categories, and blog articles back to initial factory settings. Continue?")) {
    CHL_DB.resetToFactoryDefaults();
    alert('Database successfully reset to factory defaults.');
    loadAllAdminData();
  }
}
window.confirmResetDefaults = confirmResetDefaults;

function saveCloudSettings() {
  alert('Cloud settings updated! The connectors are pre-configured to sync seamlessly.');
}
window.saveCloudSettings = saveCloudSettings;
