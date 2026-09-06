/**
 * Celebration Holdings (Pvt) Ltd - Unified Database Engine
 * Manages Products, Categories, Blog Posts, Coconut Harvest Line, Sample Kits & Persistence
 */

const CHL_DEFAULT_CATEGORIES = [
  { id: "coconut", name: "Organic Coconut Range", icon: "🥥", order: 1, desc: "Certified organic virgin coconut oil, MCT, milk powder, flour, and aminos." },
  { id: "spices", name: "Ceylon Spices & Herbs", icon: "🌿", order: 2, desc: "True Ceylon Cinnamon (Alba/5C), 550 GL Black Pepper, Turmeric, and Moringa." },
  { id: "sesame", name: "Sesame & Sekku Oils", icon: "🌱", order: 3, desc: "Traditional Sekku stone-squeezed oils, raw whole seeds, and gourmet tahini." },
  { id: "fruits", name: "Tropical Fruits & Jackfruit", icon: "🍍", order: 4, desc: "Young green jackfruit in brine, dried mango strips, and pineapple in natural juice." },
  { id: "oils", name: "Pure Essential Oils", icon: "💧", order: 5, desc: "Therapeutic steam-distilled Ceylon Cinnamon bark, lemongrass, clove, and pepper oils." }
];

const CHL_DEFAULT_BLOG_POSTS = [
  {
    id: "post-01",
    slug: "celebration-holdings-showcases-true-ceylon-cinnamon-at-biofach-germany",
    title: "Celebration Holdings Showcases True Ceylon Cinnamon & Organic Coconut at BIOFACH Germany",
    category: "Foreign Exhibitions",
    publishedDate: "2026-02-18",
    author: "Suresh Jayasinghe, Director Operations",
    readingTime: "4 min read",
    coverImage: "assets/images/banner/hero-bg.jpg",
    photos: [
      "assets/images/banner/hero-bg.jpg",
      "assets/images/about/about-harvest-spread.jpg",
      "assets/images/about/about-ceylon-cinnamon.jpg"
    ],
    excerpt: "Representing Sri Lanka at Nuremberg's prestigious BIOFACH Organic Trade Fair, CHL connected with leading European organic distributors seeking ultra-low coumarin True Ceylon Cinnamon and single-origin Virgin Coconut Oil.",
    content: `
      <h3>Connecting with European Organic Leaders at Nuremberg</h3>
      <p>In February 2026, Celebration Holdings (Private) Ltd proudly showcased its portfolio of certified organic products at <strong>BIOFACH</strong> in Nuremberg, Germany — the world's leading trade fair for organic food and sustainable agriculture.</p>
      
      <p>The European market has placed stringent regulatory scrutiny on coumarin levels found in Chinese and Indonesian Cassia cinnamon. Our presentation of <strong>True Ceylon Cinnamon (Cinnamomum verum)</strong> in exquisite Alba and 5C Special grades received extraordinary acclaim from German, French, and Swiss buyers due to its certified ultra-low coumarin profile (&lt;0.004%) and delicate sweet notes.</p>
      
      <div style="background: #f4f2eb; padding: 1.5rem; border-left: 4px solid #0c4d2f; margin-block: 1.5rem; border-radius: 6px;">
        <h4 style="margin-bottom: 0.5rem; color: #0c4d2f;">Key European Trade Takeaways:</h4>
        <ul style="margin-left: 1.25rem;">
          <li>Over 45 formal commercial inquiries generated for 20ft/40ft container shipments of Organic Virgin Coconut Oil and Desiccated Coconut.</li>
          <li>Strong demand for our <em>Young Green Jackfruit in Brine</em> as a clean-label, soy-free plant-based meat alternative in European supermarket chains.</li>
          <li>Partnerships initiated for private-label organic coconut milk powder and MCT oil distribution across the DACH region.</li>
        </ul>
      </div>

      <h3>Advancing Sri Lanka's Agricultural Heritage</h3>
      <p>Our presence at BIOFACH reaffirms CHL's strategic mission: connecting the timeless agricultural traditions of Sri Lankan smallholder farmers with discerning global buyers who value unadulterated quality and complete organic traceability.</p>
    `,
    status: "Published",
    featured: true
  },
  {
    id: "post-02",
    slug: "revitalizing-the-1910-traditional-sekkuwa-stone-squeezed-sesame-oil",
    title: "Revitalizing the 1910 Sekkuwa: How Cold Stone-Squeezed Sesame Extraction Preserves Pure Sesamol",
    category: "Organic Innovations",
    publishedDate: "2026-04-12",
    author: "Dilan Fernando, Director Marketing & Finance",
    readingTime: "5 min read",
    coverImage: "assets/images/services/traditional-sekku.jpg",
    photos: [
      "assets/images/services/traditional-sekku.jpg",
      "assets/images/banner/service-bg.jpg",
      "assets/images/about/about-growers.jpg"
    ],
    excerpt: "Ancient Ceylon stone-squeezing mortar extraction transforms the modern wellness industry. Discover how our engineered Sekkuwa protects fragile antioxidant compounds below 38°C.",
    content: `
      <h3>The Science Behind Stone-Squeezing (Sekkuwa)</h3>
      <p>Modern industrial oil expellers generate friction temperatures exceeding 80°C to 120°C. While this maximizes commercial yields, it oxidizes delicate unsaturated fatty acids and destroys vital antioxidants.</p>
      
      <p>At Celebration Holdings, our engineering team looked back to a photograph captured in 1910 documenting the Sri Lankan <em>"Sekkuwa"</em> — a massive granite mortar and wooden pestle driven slowly by gentle rotation. By applying modern stainless steel sanitary housings around natural granite stone crushers, we created our proprietary <strong>Modern Sekku Squeezer</strong>.</p>
      
      <h3>Retaining Sesamol and Natural Anti-Inflammatory Power</h3>
      <p>Laboratory comparative assays performed on our stone-squeezed white and black sesame oils demonstrated:</p>
      <ul style="margin-left: 1.25rem; margin-bottom: 1.25rem;">
        <li><strong>Sub-38°C Processing:</strong> Preserves 100% of the active Sesamin, Sesamol, and Sesamolin compounds.</li>
        <li><strong>Exceptional Oxidative Shelf Life:</strong> Natural phenolic antioxidants act as an innate preservative without artificial tocopherols.</li>
        <li><strong>Silky Viscosity:</strong> Perfect for traditional Ayurvedic oil-pulling, dermatological massage, and gourmet Asian culinary finishing.</li>
      </ul>
      <p>We are proud to bring this authentic artisanal heritage to kitchens and wellness clinics across Japan, Europe, and Australia.</p>
    `,
    status: "Published",
    featured: true
  },
  {
    id: "post-03",
    slug: "targeting-10-million-revenue-by-2030-expanding-to-japan-and-australia",
    title: "Targeting $10M by 2030: Expanding Sri Lanka's Certified Organic Footprint to Japan and Australia",
    category: "Company Milestones",
    publishedDate: "2026-06-25",
    author: "Sharmen Perera, Director HR & Administration",
    readingTime: "3 min read",
    coverImage: "assets/images/banner/service.jpg",
    photos: [
      "assets/images/banner/service.jpg",
      "assets/images/banner/carousel-tropical-climate.jpg",
      "assets/images/banner/carousel-ceylon-hospitality.jpg"
    ],
    excerpt: "Celebration Holdings outlines its 2030 strategic export roadmap, announcing new cold-chain logistics agreements and expanded grower cooperative networks in Kurunegala and Matale.",
    content: `
      <h3>Our Strategic Horizon 2030</h3>
      <p>From our humble beginnings in 2016 founded by three young visionaries, Celebration Holdings has grown into a respected player in Sri Lanka's agricultural export landscape. Today, we reaffirm our corporate mission: <em>to surpass $10 Million in annual certified organic exports by the year 2030.</em></p>
      
      <h3>Expanding Our Pacific & Asian Trade Corridors</h3>
      <p>Following high-level bilateral trade meetings in Tokyo and Melbourne, CHL has finalized direct logistics channels into major Japanese ports (Yokohama, Kobe) and Australian entry points (Sydney, Melbourne). Key growth drivers include:</p>
      <ul style="margin-left: 1.25rem;">
        <li>High-grade <strong>Organic Virgin Coconut Oil & MCT Powder</strong> tailored for Japan's booming health and functional beverage sector.</li>
        <li>Bulk retail-ready pouches of <strong>Ceylon Alba Cinnamon</strong> and whole spices for gourmet Australian organic supermarket cooperatives.</li>
        <li>Fair trade off-take contracts with 250+ additional certified farming families in the North Western Coconut Triangle.</li>
      </ul>
    `,
    status: "Published",
    featured: false
  },
  {
    id: "post-04",
    slug: "achieving-eu-and-usda-organic-certification-cu-853200-a-testament-to-food-integrity",
    title: "Achieving EU & USDA Organic Certification CU 853200: A Testament to Pure Food Integrity",
    category: "Certifications",
    publishedDate: "2026-08-10",
    author: "Bhagya Neththikumara, Director Quality Assurance",
    readingTime: "4 min read",
    coverImage: "assets/images/certifications/cert-1.jpg",
    photos: [
      "assets/images/certifications/cert-1.jpg",
      "assets/images/certifications/cert-2.jpg",
      "assets/images/certifications/cert-3.jpg",
      "assets/images/certifications/jas-organic.png"
    ],
    excerpt: "A deep dive into our rigorous farm-to-shipment audit processes under Control Union CU 853200, guaranteeing non-GMO, pesticide-free pure Ceylon produce.",
    content: `
      <h3>Organic You Can Trust Across the Globe</h3>
      <p>While many commercial brands make generalized claims about organic purity, Celebration Holdings backs every harvest with internationally accredited audits. Our primary certification under <strong>Control Union Certifications (CU 853200)</strong> guarantees compliance with both European Union (EU) Organic regulations and the United States Department of Agriculture (USDA) National Organic Program (NOP).</p>
      
      <h3>What CU 853200 Guarantees:</h3>
      <ul style="margin-left: 1.25rem;">
        <li><strong>Complete Soil Traceability:</strong> Zero synthetic chemical fertilizers, pesticides, or glyphosate applied for a minimum of 3 consecutive harvest cycles.</li>
        <li><strong>Cleanroom Processing:</strong> Strict separation of organic product streams with zero risk of cross-contamination.</li>
        <li><strong>Non-GMO Verification:</strong> Rigorous genetic testing verifying 100% natural, heritage Ceylon cultivars.</li>
        <li><strong>Batch-Level COA:</strong> Certificates of Analysis provided for every commercial container dispatched from Colombo Port.</li>
      </ul>
    `,
    status: "Published",
    featured: false
  }
];

// Default 5 Sri Lanka Organic Coconut Harvest Line Products
const CHL_DEFAULT_COCONUT_HARVEST = [
  {
    id: "harvest-01",
    title: "Virgin Coconut Oil",
    sub: "Centrifuge Extracted < 38°C",
    badge: "Cold Pressed",
    image: "assets/images/products/coconut/Virgin Coconut Oil.jpeg",
    category: "coconut"
  },
  {
    id: "harvest-02",
    title: "King Coconut Water",
    sub: "100% Native Thambili",
    badge: "Indigenous Ceylon",
    image: "assets/images/products/coconut/King Coconut Water.jpeg",
    category: "coconut"
  },
  {
    id: "harvest-03",
    title: "Coconut Milk & Cream",
    sub: "17% & 22% Fat Formulations",
    badge: "Rich & Aseptic",
    image: "assets/images/products/coconut/Coconut Milk.jpeg",
    category: "coconut"
  },
  {
    id: "harvest-04",
    title: "Desiccated Coconut",
    sub: "High Fat Fine & Medium Shreds",
    badge: "Gourmet Bakery",
    image: "assets/images/products/coconut/Desiccated Coconut (High Fat Medium).jpeg",
    category: "coconut"
  },
  {
    id: "harvest-05",
    title: "Organic Coconut Flour",
    sub: "Rich in Fiber & Low Carb",
    badge: "Gluten-Free / Low GI",
    image: "assets/images/products/coconut/Coconut Flour.jpeg",
    category: "coconut"
  }
];

// Curated Sample Evaluation Kits
const CHL_DEFAULT_SAMPLE_KITS = [
  {
    id: "kit-01",
    name: "Organic Coconut Importer Sample Kit",
    category: "kit",
    priceUSD: 45.00,
    badge: "Export Testing Kit",
    image: "assets/images/products/coconut/Virgin Coconut Oil.jpeg",
    items: "Virgin Coconut Oil (100ml), MCT Oil (100ml), Coconut Milk Powder (150g), Flour (100g), Desiccated High Fat (100g)",
    desc: "Complete testing pack with technical specifications, COA, and EU/USDA certificates for food buyers."
  },
  {
    id: "kit-02",
    name: "Ceylon Spices & True Cinnamon Connoisseur Kit",
    category: "kit",
    priceUSD: 55.00,
    badge: "Export Testing Kit",
    image: "assets/images/products/spices/Ceylon Alba Cinnamon.jpg",
    items: "Alba Cinnamon Quills (50g), 550 GL Black Pepper (100g), Curcumin Turmeric (100g), Cardamom (50g), Gourmet Vanilla Pods (2 pcs)",
    desc: "Premier grade Ceylon spices with laboratory coumarin & piperine assay reports."
  },
  {
    id: "kit-03",
    name: "Pure Ceylon Essential Oils Master Tasting Pack",
    category: "kit",
    priceUSD: 65.00,
    badge: "Export Testing Kit",
    image: "assets/images/products/oils/Cinnamon Bark Oil.jpg",
    items: "Cinnamon Bark Oil (5ml), Lemongrass Oil (10ml), Black Pepper Oil (5ml), Clove Bud Oil (10ml), Vetiver Oil (5ml)",
    desc: "GC-MS tested pharmaceutical & perfumery pure distillates with dropper vials."
  }
];

/**
 * Intelligent mapper for authentic Celebration Holdings Technical Specs & MSDS documents
 */
function getDefaultProductDocs(productName = '', category = '') {
  const name = (productName || '').toLowerCase();
  let spec = "assets/docs/Product Specification - Organic MCT Powder.pdf";
  let msds = "assets/docs/MSDS - Full Products List.pdf";

  if (name.includes("mct")) {
    spec = "assets/docs/Organic MCT Coconut Oil - C8 -99%Min.pdf";
    msds = "assets/docs/MSDS - Organic Coconut MCT (C8).pdf";
  } else if (name.includes("desiccated")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Full Products List.pdf";
  } else if (name.includes("virgin coconut") || name.includes("vco")) {
    spec = "assets/docs/Organic MCT Coconut Oil - C8 -99%Min.pdf";
    msds = "assets/docs/MSDS - Organic Virgin Coconut Oil.pdf";
  } else if (name.includes("milk powder")) {
    spec = "assets/docs/Product Specification - Organic MCT Powder.pdf";
    msds = "assets/docs/MSDS - Organic Coconut Milk Powder.pdf";
  } else if (name.includes("milk")) {
    spec = "assets/docs/Product Specification - Organic MCT Powder.pdf";
    msds = "assets/docs/MSDS - Organic Coconut Milk (17% FAT).pdf";
  } else if (name.includes("cream")) {
    spec = "assets/docs/Product Specification - Organic MCT Powder.pdf";
    msds = "assets/docs/MSDS - Organic Coconut Cream (22% FAT).pdf";
  } else if (name.includes("sugar")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Coconut Sugar.pdf";
  } else if (name.includes("cinnamon stick") || name.includes("alba") || name.includes("quill")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Cinnamon Sticks.pdf";
  } else if (name.includes("cinnamon powder")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Cinnamon Powder.pdf";
  } else if (name.includes("pepper")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Black Pepper Whole.pdf";
  } else if (name.includes("clove")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Clove Whole.pdf";
  } else if (name.includes("turmeric")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Turmeric Powder.pdf";
  } else if (name.includes("ginger")) {
    spec = "assets/docs/Product Specification - Defatted Desiccated Coconut.pdf";
    msds = "assets/docs/MSDS - Organic Ginger Powder.pdf";
  } else if (name.includes("oil") && (category === 'oils' || name.includes("cinnamon oil"))) {
    spec = "assets/docs/Organic MCT Coconut Oil - C8 -99%Min.pdf";
    msds = "assets/docs/MSDS - Cinnamon Oil.pdf";
  }

  return {
    specDocUrl: spec,
    specDocName: spec.split('/').pop(),
    msdsDocUrl: msds,
    msdsDocName: msds.split('/').pop()
  };
}

/**
 * The CHL Database Engine (CHL_DB)
 */
const CHL_DB = {
  STORAGE_KEYS: {
    PRODUCTS: "chl_db_products_v2",
    CATEGORIES: "chl_db_categories_v2",
    BLOG: "chl_db_blog_posts_v2",
    COCONUT_HARVEST: "chl_db_coconut_harvest_v2",
    SAMPLE_KITS: "chl_db_sample_kits_v2",
    CONFIG: "chl_db_config_v2"
  },

  init() {
    this.ensureSeedData();
    this.broadcastChange();
  },

  ensureSeedData() {
    // 1. Categories
    if (!localStorage.getItem(this.STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(this.STORAGE_KEYS.CATEGORIES, JSON.stringify(CHL_DEFAULT_CATEGORIES));
    }

    // 2. Products
    if (!localStorage.getItem(this.STORAGE_KEYS.PRODUCTS)) {
      let initialProducts = [];
      if (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA) && PRODUCTS_DATA.length > 0) {
        initialProducts = PRODUCTS_DATA.map(p => {
          const docs = getDefaultProductDocs(p.name, p.category);
          return {
            ...p,
            availability: p.availability || "In Stock",
            certifications: p.certifications || ["EU Organic (CU 853200)", "USDA Organic", "Control Union", "HACCP", "Non-GMO"],
            bulkPriceGuidelineUSD: p.bulkPriceGuidelineUSD || (p.samplePriceUSD ? (p.samplePriceUSD * 0.45).toFixed(2) + " / kg (FOB Colombo)" : "Contact for FCL Quote"),
            specDocUrl: p.specDocUrl || docs.specDocUrl,
            specDocName: p.specDocName || docs.specDocName,
            msdsDocUrl: p.msdsDocUrl || docs.msdsDocUrl,
            msdsDocName: p.msdsDocName || docs.msdsDocName
          };
        });
      }
      localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    } else {
      // Enrich existing stored products with default docs if missing
      try {
        const stored = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.PRODUCTS) || '[]');
        if (Array.isArray(stored) && stored.length > 0) {
          let updated = false;
          const mapped = stored.map(p => {
            if (!p.specDocUrl || !p.msdsDocUrl) {
              updated = true;
              const docs = getDefaultProductDocs(p.name, p.category);
              return {
                ...p,
                specDocUrl: p.specDocUrl || docs.specDocUrl,
                specDocName: p.specDocName || docs.specDocName,
                msdsDocUrl: p.msdsDocUrl || docs.msdsDocUrl,
                msdsDocName: p.msdsDocName || docs.msdsDocName
              };
            }
            return p;
          });
          if (updated) {
            localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(mapped));
          }
        }
      } catch (e) {}
    }

    // 3. Blog Posts
    if (!localStorage.getItem(this.STORAGE_KEYS.BLOG)) {
      localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(CHL_DEFAULT_BLOG_POSTS));
    }

    // 4. Coconut Harvest (5 items)
    if (!localStorage.getItem(this.STORAGE_KEYS.COCONUT_HARVEST)) {
      localStorage.setItem(this.STORAGE_KEYS.COCONUT_HARVEST, JSON.stringify(CHL_DEFAULT_COCONUT_HARVEST));
    }

    // 5. Sample Kits
    if (!localStorage.getItem(this.STORAGE_KEYS.SAMPLE_KITS)) {
      localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(CHL_DEFAULT_SAMPLE_KITS));
    }

    // 6. Config
    if (!localStorage.getItem(this.STORAGE_KEYS.CONFIG)) {
      localStorage.setItem(this.STORAGE_KEYS.CONFIG, JSON.stringify({
        storeName: "Celebration Holdings (Pvt) Ltd",
        currency: "USD",
        adminEmail: "info@celebrationholdings.lk",
        cloudSync: {
          enabled: false,
          provider: "supabase",
          endpoint: "",
          apiKey: ""
        }
      }));
    }
  },

  // ==========================================
  // CATEGORIES CRUD
  // ==========================================
  getCategories() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : CHL_DEFAULT_CATEGORIES;
    } catch (e) {
      return CHL_DEFAULT_CATEGORIES;
    }
  },

  saveCategory(category) {
    let list = this.getCategories();
    if (!category.id) {
      category.id = category.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    const idx = list.findIndex(c => c.id === category.id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...category };
    } else {
      list.push({
        ...category,
        order: list.length + 1
      });
    }
    localStorage.setItem(this.STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
    this.broadcastChange();
    return category;
  },

  getCategoryById(catId) {
    const list = this.getCategories();
    return list.find(c => c.id === catId) || null;
  },

  deleteCategory(catId) {
    let list = this.getCategories();
    list = list.filter(c => c.id !== catId);
    localStorage.setItem(this.STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  // ==========================================
  // PRODUCTS CRUD & REORDERING
  // ==========================================
  getProducts() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  getProductById(id) {
    const list = this.getProducts();
    return list.find(p => p.id === id) || null;
  },

  saveProduct(product) {
    let list = this.getProducts();
    if (!product.id) {
      product.id = 'prod-' + Date.now().toString(36);
    }

    if (!product.availability) product.availability = "In Stock";
    if (!product.certifications || !Array.isArray(product.certifications)) {
      product.certifications = ["EU Organic (CU 853200)", "USDA Organic"];
    }

    // Default docs if not provided
    if (!product.specDocUrl || !product.msdsDocUrl) {
      const docs = getDefaultProductDocs(product.name, product.category);
      if (!product.specDocUrl) {
        product.specDocUrl = docs.specDocUrl;
        product.specDocName = docs.specDocName;
      }
      if (!product.msdsDocUrl) {
        product.msdsDocUrl = docs.msdsDocUrl;
        product.msdsDocName = docs.msdsDocName;
      }
    }

    const idx = list.findIndex(p => p.id === product.id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...product };
    } else {
      list.unshift(product);
    }

    localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
    this.broadcastChange();
    return product;
  },

  deleteProduct(id) {
    let list = this.getProducts();
    list = list.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  moveProduct(id, direction) {
    let list = this.getProducts();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return false;

    if (direction === 'up' && idx > 0) {
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
    } else if (direction === 'down' && idx < list.length - 1) {
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
    } else {
      return false;
    }

    localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  updateProductPriceAndStock(id, samplePriceUSD, availability) {
    let list = this.getProducts();
    const item = list.find(p => p.id === id);
    if (item) {
      if (samplePriceUSD !== undefined) item.samplePriceUSD = parseFloat(samplePriceUSD);
      if (availability !== undefined) item.availability = availability;
      localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
      this.broadcastChange();
      return item;
    }
    return null;
  },

  // ==========================================
  // BLOG POSTS CRUD & REORDERING
  // ==========================================
  getPosts(publishedOnly = false) {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.BLOG);
      let posts = data ? JSON.parse(data) : CHL_DEFAULT_BLOG_POSTS;
      if (publishedOnly) {
        posts = posts.filter(p => p.status === 'Published');
      }
      // Ensure photos array exists (up to 10 photos)
      posts.forEach(p => {
        if (!p.photos || !Array.isArray(p.photos) || p.photos.length === 0) {
          p.photos = p.coverImage ? [p.coverImage] : ['assets/images/banner/hero-bg.jpg'];
        }
        if (p.photos.length > 10) {
          p.photos = p.photos.slice(0, 10);
        }
      });
      return posts; // Respects saved array order for manual prioritization
    } catch (e) {
      return CHL_DEFAULT_BLOG_POSTS;
    }
  },

  getPostBySlug(slug) {
    const list = this.getPosts();
    return list.find(p => p.slug === slug || p.id === slug) || null;
  },

  savePost(post) {
    let list = this.getPosts();
    if (!post.id) {
      post.id = 'post-' + Date.now().toString(36);
    }
    if (!post.slug) {
      post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!post.publishedDate) {
      post.publishedDate = new Date().toISOString().split('T')[0];
    }
    // Handle photos array (up to 10 photos)
    if (!post.photos || !Array.isArray(post.photos) || post.photos.length === 0) {
      post.photos = post.coverImage ? [post.coverImage] : ['assets/images/banner/hero-bg.jpg'];
    }
    if (post.photos.length > 10) {
      post.photos = post.photos.slice(0, 10);
    }
    if (!post.coverImage && post.photos.length > 0) {
      post.coverImage = post.photos[0];
    }

    const idx = list.findIndex(p => p.id === post.id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...post };
    } else {
      list.unshift(post);
    }

    localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(list));
    this.broadcastChange();
    return post;
  },

  deletePost(id) {
    let list = this.getPosts();
    list = list.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  movePost(id, direction) {
    let list = this.getPosts();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return false;

    if (direction === 'up' && idx > 0) {
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
    } else if (direction === 'down' && idx < list.length - 1) {
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
    } else {
      return false;
    }

    localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  // ==========================================
  // COCONUT HARVEST (5 ITEMS)
  // ==========================================
  getCoconutHarvestItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.COCONUT_HARVEST);
      return data ? JSON.parse(data) : CHL_DEFAULT_COCONUT_HARVEST;
    } catch (e) {
      return CHL_DEFAULT_COCONUT_HARVEST;
    }
  },

  saveCoconutHarvestItems(items) {
    if (!Array.isArray(items) || items.length === 0) return false;
    localStorage.setItem(this.STORAGE_KEYS.COCONUT_HARVEST, JSON.stringify(items));
    this.broadcastChange();
    return items;
  },

  updateCoconutHarvestItem(index, itemData) {
    let items = this.getCoconutHarvestItems();
    if (index >= 0 && index < items.length) {
      items[index] = { ...items[index], ...itemData };
      this.saveCoconutHarvestItems(items);
      return items[index];
    }
    return null;
  },

  // ==========================================
  // SAMPLE EVALUATION KITS CRUD & REORDERING
  // ==========================================
  getSampleKits() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SAMPLE_KITS);
      return data ? JSON.parse(data) : CHL_DEFAULT_SAMPLE_KITS;
    } catch (e) {
      return CHL_DEFAULT_SAMPLE_KITS;
    }
  },

  getSampleKitById(id) {
    const list = this.getSampleKits();
    return list.find(k => k.id === id) || null;
  },

  saveSampleKit(kit) {
    let list = this.getSampleKits();
    if (!kit.id) {
      kit.id = 'kit-' + Date.now().toString(36);
    }
    const idx = list.findIndex(k => k.id === kit.id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...kit };
    } else {
      list.push(kit);
    }
    localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(list));
    this.broadcastChange();
    return kit;
  },

  deleteSampleKit(id) {
    let list = this.getSampleKits();
    list = list.filter(k => k.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  moveSampleKit(id, direction) {
    let list = this.getSampleKits();
    const idx = list.findIndex(k => k.id === id);
    if (idx === -1) return false;

    if (direction === 'up' && idx > 0) {
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
    } else if (direction === 'down' && idx < list.length - 1) {
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
    } else {
      return false;
    }

    localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  // ==========================================
  // DATA BACKUP & RESTORE
  // ==========================================
  exportBackup() {
    const backup = {
      exportDate: new Date().toISOString(),
      store: "Celebration Holdings (Pvt) Ltd",
      categories: this.getCategories(),
      products: this.getProducts(),
      blog: this.getPosts(),
      coconutHarvest: this.getCoconutHarvestItems(),
      sampleKits: this.getSampleKits()
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.categories && Array.isArray(data.categories)) {
        localStorage.setItem(this.STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
      }
      if (data.products && Array.isArray(data.products)) {
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
      }
      if (data.blog && Array.isArray(data.blog)) {
        localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(data.blog));
      }
      if (data.coconutHarvest && Array.isArray(data.coconutHarvest)) {
        localStorage.setItem(this.STORAGE_KEYS.COCONUT_HARVEST, JSON.stringify(data.coconutHarvest));
      }
      if (data.sampleKits && Array.isArray(data.sampleKits)) {
        localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(data.sampleKits));
      }
      this.broadcastChange();
      return { success: true, message: "Database restored successfully!" };
    } catch (e) {
      return { success: false, message: "Invalid JSON backup file: " + e.message };
    }
  },

  resetToFactoryDefaults() {
    localStorage.removeItem(this.STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(this.STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(this.STORAGE_KEYS.BLOG);
    localStorage.removeItem(this.STORAGE_KEYS.COCONUT_HARVEST);
    localStorage.removeItem(this.STORAGE_KEYS.SAMPLE_KITS);
    this.ensureSeedData();
    this.broadcastChange();
    return true;
  },

  // Event Broadcasting across tabs and components
  broadcastChange() {
    window.dispatchEvent(new CustomEvent('chl_db_updated', {
      detail: { timestamp: Date.now() }
    }));
  }
};

// Initialize immediately
CHL_DB.init();
window.CHL_DB = CHL_DB;