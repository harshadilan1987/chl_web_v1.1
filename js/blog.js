/**
 * Celebration Holdings (Pvt) Ltd - Blog Controller
 * Handles article rendering, category filtering, and modal reader
 */

let activeBlogCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilters();
  renderBlogPosts();

  // Check URL hash for direct article link
  if (window.location.hash) {
    const slug = window.location.hash.substring(1);
    if (slug) {
      setTimeout(() => openArticleReader(slug), 200);
    }
  }

  // Close reader on backdrop or escape
  document.getElementById('article-reader-backdrop')?.addEventListener('click', closeArticleReader);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArticleReader();
  });
});

function initBlogFilters() {
  const pills = document.querySelectorAll('.blog-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeBlogCategory = pill.getAttribute('data-cat');
      renderBlogPosts();
    });
  });
}

function renderBlogPosts() {
  if (typeof CHL_DB === 'undefined') return;

  const posts = CHL_DB.getPosts(true); // Published only
  const featuredContainer = document.getElementById('featured-story-container');
  const grid = document.getElementById('blog-grid');

  const filtered = posts.filter(p => {
    return activeBlogCategory === 'all' || p.category === activeBlogCategory;
  });

  // Render Featured Post (first featured post or first matching post)
  if (featuredContainer) {
    const featured = filtered.find(p => p.featured) || filtered[0];
    if (featured && activeBlogCategory === 'all') {
      featuredContainer.style.display = 'block';
      featuredContainer.innerHTML = `
        <article class="featured-article-card">
          <div class="featured-img-wrap" style="background-image: url('${featured.coverImage || 'assets/images/banner/hero-bg.jpg'}');"></div>
          <div class="featured-content">
            <span class="badge badge-gold" style="align-self: flex-start; margin-bottom: 0.75rem;">★ Featured Exhibition Dispatch</span>
            <h2 style="font-size: var(--text-2xl); color: var(--color-primary-dark); margin-bottom: 0.75rem; line-height: 1.3;">
              ${featured.title}
            </h2>
            <div style="display: flex; gap: 10px; font-size: 0.8rem; color: var(--color-text-subtle); margin-bottom: 1rem;">
              <span>📅 ${featured.publishedDate}</span>
              <span>•</span>
              <span>⏱️ ${featured.readingTime || '4 min read'}</span>
              <span>•</span>
              <span>✍️ ${featured.author || 'CHL Team'}</span>
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.65;">
              ${featured.excerpt}
            </p>
            <div>
              <button class="btn btn-primary btn-sm" onclick="openArticleReader('${featured.slug}')">
                Read Full Exhibition Report →
              </button>
            </div>
          </div>
        </article>
      `;
    } else {
      featuredContainer.style.display = 'none';
    }
  }

  // Render Grid
  if (grid) {
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #79877e;">
          <p style="font-size: 1.1rem;">No articles found in this category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(post => {
      const photos = (post.photos && Array.isArray(post.photos) && post.photos.length > 0) ? post.photos : [post.coverImage || 'assets/images/banner/hero-bg.jpg'];
      const hasMulti = photos.length > 1;

      return `
      <article class="blog-card">
        <div style="position: relative; overflow: hidden;">
          <img src="${photos[0]}" alt="${post.title}" class="blog-card-img" loading="lazy">
          ${hasMulti ? `<span class="badge" style="position: absolute; top: 12px; right: 12px; background: rgba(12,77,47,0.85); color: #fff; font-size: 0.72rem; backdrop-filter: blur(4px);">📷 ${photos.length} Photos</span>` : ''}
        </div>
        <div class="blog-card-body">
          <div class="blog-meta-row">
            <span class="badge" style="background: #e0f2fe; color: #0369a1;">${post.category}</span>
            <span>${post.publishedDate}</span>
          </div>
          <h3 style="font-size: 1.1rem; color: var(--color-primary-dark); margin-bottom: 0.5rem; line-height: 1.35;">
            ${post.title}
          </h3>
          <p style="font-size: 0.86rem; color: var(--color-text-muted); margin-bottom: 1.25rem; flex-grow: 1; line-height: 1.6;">
            ${post.excerpt}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-light); padding-top: 0.85rem; margin-top: auto;">
            <span style="font-size: 0.75rem; color: var(--color-text-subtle);">⏱️ ${post.readingTime || '3 min'}</span>
            <button class="btn btn-outline btn-sm" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="openArticleReader('${post.slug}')">
              Read Story →
            </button>
          </div>
        </div>
      </article>
    `;
    }).join('');
  }
}

function openArticleReader(slugOrId) {
  if (typeof CHL_DB === 'undefined') return;
  const post = CHL_DB.getPostBySlug(slugOrId);
  if (!post) return;

  const modal = document.getElementById('article-reader-modal');
  const backdrop = document.getElementById('article-reader-backdrop');

  document.getElementById('read-category-badge').textContent = post.category;
  document.getElementById('read-article-title').textContent = post.title;
  document.getElementById('read-author').textContent = post.author || "Celebration Holdings Editorial";
  document.getElementById('read-date').textContent = post.publishedDate;
  document.getElementById('read-time').textContent = post.readingTime || "4 min read";

  const coverWrap = document.getElementById('read-cover-wrap');
  const photos = (post.photos && Array.isArray(post.photos) && post.photos.length > 0) ? post.photos : (post.coverImage ? [post.coverImage] : []);

  if (photos.length > 1) {
    coverWrap.style.display = 'block';
    coverWrap.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; border-radius: 12px; overflow: hidden; margin-bottom: 1rem;">
        ${photos.map((pUrl, i) => `
          <div style="position: relative; border-radius: 8px; overflow: hidden; height: 190px; background: #0c4d2f;">
            <img src="${pUrl}" alt="${post.title} - Photo ${i+1}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onerror="this.src='assets/images/banner/hero-bg.jpg'">
            <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.65); color: #fff; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px;">#${i+1}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (photos.length === 1) {
    coverWrap.style.display = 'block';
    coverWrap.innerHTML = `<img id="read-cover-img" src="${photos[0]}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
  } else {
    coverWrap.style.display = 'none';
  }

  document.getElementById('read-article-content').innerHTML = post.content || `<p>${post.excerpt}</p>`;

  modal?.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Update URL hash smoothly
  history.replaceState(null, null, `#${post.slug}`);
}
window.openArticleReader = openArticleReader;

function closeArticleReader() {
  const modal = document.getElementById('article-reader-modal');
  const backdrop = document.getElementById('article-reader-backdrop');
  modal?.classList.remove('active');
  backdrop?.classList.remove('active');
  document.body.style.overflow = '';
  history.replaceState(null, null, ' ');
}
window.closeArticleReader = closeArticleReader;
