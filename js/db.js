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
        "id":  "post-mttxd9zz",
        "title":  "Always Go for the Kill: Uncompromising Pursuit of Technical Excellence",
        "category":  "Foreign Exhibitions",
        "publishedDate":  "2026-08-15",
        "author":  "Suresh Jayasinghe, Director - Technical \u0026 International Marketing",
        "status":  "Published",
        "photos":  [
                       "assets/images/Blog/post-mttxd9zz/photo_1.jpg",
                       "assets/images/Blog/post-mttxd9zz/photo_2.jpg",
                       "assets/images/Blog/post-mttxd9zz/photo_3.jpg",
                       "assets/images/Blog/post-mttxd9zz/photo_4.jpg",
                       "assets/images/Blog/post-mttxd9zz/photo_5.jpg",
                       "assets/images/Blog/post-mttxd9zz/photo_6.jpg"
                   ],
        "coverImage":  "assets/images/Blog/post-mttxd9zz/cover.jpg",
        "readingTime":  "5 min read",
        "excerpt":  "Refusing to cut corners or compromise on equipment, Celebration Holdings (CHL) ventures directly to world-class manufacturing hubs in China, investing aggressively in cutting-edge industrial technology to deliver unmatched purity and export-grade quality.",
        "content":  "\u003ch3\u003eEngineering Superiority: No Half-Measures, No Compromises\u003c/h3\u003e\n\u003cp\u003eWhen it comes to processing purity and product integrity, Celebration Holdings (Private) Ltd operates on an absolute conviction: \u003cstrong\u003ealways go for the kill\u003c/strong\u003e. Delivering world-class organic coconut products, botanical oils, and dried tropical superfoods demands more than good intentions—it requires industry-dominating technical capability. Our leadership team recently concluded an intensive technical procurement tour across top-tier manufacturing hubs and precision engineering facilities in China.\u003c/p\u003e\n\n\u003cp\u003eMediocrity has no place in our production lines. Where conventional processors settle for second-rate machinery to minimize overheads, CHL aggressively inspects, tests, and commissions the absolute gold standard in industrial processing technology. Regardless of capital expenditure, our mandate is unequivocal: if an engineering innovation enhances nutrient retention, refines particle size, or eliminates contamination risks, we acquire it.\u003c/p\u003e\n\n\u003cdiv style=\"background: #f4f2eb; padding: 1.5rem; border-left: 4px solid #0c4d2f; margin-block: 1.5rem; border-radius: 6px;\"\u003e\n  \u003ch4 style=\"margin-bottom: 0.5rem; color: #0c4d2f;\"\u003eStrategic Technical Procurement Milestones:\u003c/h4\u003e\n  \u003cul style=\"margin-left: 1.25rem;\"\u003e\n    \u003cli\u003eDirect factory inspections and trials of automated low-temperature dehydrators to preserve raw enzymatic activity and cellular structure in tropical fruits.\u003c/li\u003e\n    \u003cli\u003eAcquisition of high-precision stainless steel filtration and expeller extraction machinery for ultra-pure botanical and seed oils.\u003c/li\u003e\n    \u003cli\u003eIntegration of state-of-the-art optical color sorters and hermetic nitrogen-flush packaging systems to guarantee extended shelf-life without chemical stabilizers.\u003c/li\u003e\n  \u003c/ul\u003e\n\u003c/div\u003e\n\n\u003ch3\u003eUncompromising Quality as an Industrial Moat\u003c/h3\u003e\n\u003cp\u003eTrue market leadership is earned on the factory floor. By pairing Sri Lanka\u0027s finest organic harvests with the world\u0027s most advanced processing machinery, CHL builds a technical moat that guarantees unmatched batch-to-batch consistency, complete food safety compliance, and peak export performance across global markets.\u003c/p\u003e",
        "slug":  "always-go-for-the-kill-uncompromising-pursuit-of-technical-excellence"
    },
    {
        "id":  "post-mttwmtvr",
        "title":  "Brings Certified Organic Purity to Asia-Pacific at FOODEX Japan",
        "category":  "Foreign Exhibitions",
        "publishedDate":  "2023-03-15",
        "author":  "Dilan Fernando, Director Marketing \u0026 Finance",
        "status":  "Published",
        "photos":  [
                       "assets/images/Blog/2. FoodEx 2023/1.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/2.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/3.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/4.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/5.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/6.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/7.jpeg",
                       "assets/images/Blog/2. FoodEx 2023/8.jpeg"
                   ],
        "coverImage":  "assets/images/Blog/2. FoodEx 2023/1.jpeg",
        "readingTime":  "4 min read",
        "excerpt":  "Marking a major trade expansion into East Asia, Celebration Holdings (Pvt) Ltd (CHL) unveiled its premium line of certified organic coconut derivatives, single-origin Ceylon spices, and dehydrated tropical fruits at FOODEX Japan at Tokyo Big Sight.",
        "content":  "\u003ch3\u003eCaptivating the Japanese Market at FOODEX Japan\u003c/h3\u003e\n\u003cp\u003eCelebration Holdings (Private) Ltd proudly showcased its certified organic export portfolio at \u003cstrong\u003eFOODEX Japan\u003c/strong\u003e at Tokyo Big Sight — Asia\u0027s largest and most prestigious trade event for the food and beverage industry.\u003c/p\u003e\n\n\u003cp\u003eThe Japanese market is globally renowned for its exacting standards regarding food safety, traceability, and sensory quality. Our showcase of \u003cstrong\u003eTrue Ceylon Cinnamon (Cinnamomum verum)\u003c/strong\u003e quills and powder, low-glycemic coconut blossom syrup, and zero-sulfur dehydrated tropical fruits generated remarkable interest from Japanese importers, specialty tea blenders, and clean-label confectionery brands.\u003c/p\u003e\n\n\u003cdiv style=\"background: #f4f2eb; padding: 1.5rem; border-left: 4px solid #0c4d2f; margin-block: 1.5rem; border-radius: 6px;\"\u003e\n  \u003ch4 style=\"margin-bottom: 0.5rem; color: #0c4d2f;\"\u003eKey FOODEX Japan Trade Highlights:\u003c/h4\u003e\n  \u003cul style=\"margin-left: 1.25rem;\"\u003e\n    \u003cli\u003eAdvanced retail and bulk distribution inquiries secured for JAS-compliant Organic Extra Virgin Coconut Oil and fine Coconut Flour.\u003c/li\u003e\n    \u003cli\u003eStrong commercial interest from premium beverage manufacturers in single-origin spice distillations, including Cardamom, Clove Bud, and Ginger essential oils.\u003c/li\u003e\n    \u003cli\u003eHigh demand from health-conscious snack distributors for our clean-label Dried Organic Mango, Pineapple, and Papaya with zero added sugars or preservatives.\u003c/li\u003e\n  \u003c/ul\u003e\n\u003c/div\u003e\n\n\u003ch3\u003eFostering East Asian Partnerships Rooted in Quality\u003c/h3\u003e\n\u003cp\u003eCHL’s presence at FOODEX Japan marks a pivotal step in bridging Sri Lanka’s organic smallholder farming networks with Asia\u0027s most discerning retail sectors, delivering certified purity, rigorous international compliance, and farm-to-shelf integrity.\u003c/p\u003e",
        "slug":  "brings-certified-organic-purity-to-asia-pacific-at-foodex-japan"
    },
    {
        "id":  "post-01",
        "slug":  "showcases-premium-organic-sri-lankan-innovations-at-ife-london",
        "title":  "Showcases Premium Organic Sri Lankan Innovations at IFE London",
        "category":  "Foreign Exhibitions",
        "publishedDate":  "2025-03-31",
        "author":  "Suresh Jayasinghe, Director - Technical \u0026 International Marketing",
        "readingTime":  "4 min read",
        "coverImage":  "assets/images/Blog/post-01/cover.jpg",
        "photos":  [
                       "assets/images/Blog/post-01/photo_1.jpg",
                       "assets/images/Blog/post-01/photo_2.jpg",
                       "assets/images/Blog/post-01/photo_3.jpg",
                       "assets/images/Blog/post-01/photo_4.jpg",
                       "assets/images/Blog/post-01/photo_5.jpg"
                   ],
        "excerpt":  "Sri Lankan agro-export innovator Celebration Holdings (Pvt) Ltd (CHL) took center stage at the International Food \u0026 Drink Event (IFE) at ExCeL London, presenting its certified organic portfolio—from virgin coconut derivatives and dried tropical fruits to single-origin spices and pure botanical oils.",
        "content":  "\u003ch3\u003eChampioning Pure Organic Innovation at IFE London\u003c/h3\u003e\n\u003cp\u003eCelebration Holdings (Private) Ltd proudly showcased its comprehensive export portfolio of certified organic agricultural innovations at \u003cstrong\u003eIFE (International Food \u0026 Drink Event)\u003c/strong\u003e at ExCeL London — the United Kingdom’s premier trade platform for sustainable food sourcing and product discovery.\u003c/p\u003e\n\n\u003cp\u003eWith British and European retail buyers seeking transparent, clean-label ingredients, our presentation of \u003cstrong\u003eTrue Ceylon Cinnamon (Cinnamomum verum)\u003c/strong\u003e, pure coconut blossom derivatives, and unadulterated spice distillations captured significant interest. Buyers commended our zero-additive processing methods, reliable supply chain traceability, and full compliance with stringent EU and UK organic import standards.\u003c/p\u003e\n\n\u003cdiv style=\"background: #f4f2eb; padding: 1.5rem; border-left: 4px solid #0c4d2f; margin-block: 1.5rem; border-radius: 6px;\"\u003e\n  \u003ch4 style=\"margin-bottom: 0.5rem; color: #0c4d2f;\"\u003eKey IFE London Commercial Takeaways:\u003c/h4\u003e\n  \u003cul style=\"margin-left: 1.25rem;\"\u003e\n    \u003cli\u003eOver 50 targeted trade inquiries secured for container-load exports of Organic Virgin Coconut Oil, Coconut Milk Powder, and Coconut Flour.\u003c/li\u003e\n    \u003cli\u003eHigh interest from UK health-snack distributors for our dehydrated, unsweetened tropical fruits, including Organic Dried Mango, Pineapple, Papaya, and Banana.\u003c/li\u003e\n    \u003cli\u003eSupply agreements initiated with specialty food brands for cold-pressed sesame oil, alongside steam-distilled Cardamom, Clove Bud, and Ginger essential oils.\u003c/li\u003e\n  \u003c/ul\u003e\n\u003c/div\u003e\n\n\u003ch3\u003eBridging Sri Lankan Smallholders with Global Retail\u003c/h3\u003e\n\u003cp\u003eOur successful showcase at IFE London reinforces CHL’s long-term export vision: empowering Sri Lankan agro-forestry communities through fair-trade practices while delivering pristine, single-origin organic staples to the global culinary and wellness sectors.\u003c/p\u003e",
        "status":  "Published",
        "featured":  true
    },
    {
        "id":  "post-02",
        "slug":  "revitalizing-the-1910-sekkuwa-how-cold-stone-squeezed-sesame-extraction-preserves-pure-sesamol",
        "title":  "Revitalizing the 1910 Sekkuwa: How Cold Stone-Squeezed Sesame Extraction Preserves Pure Sesamol",
        "category":  "Organic Innovations",
        "publishedDate":  "2024-01-20",
        "author":  "Dilan Fernando, Director Marketing \u0026 Finance",
        "readingTime":  "5 min read",
        "coverImage":  "assets/images/services/traditional-sekku.jpg",
        "photos":  [
                       "assets/images/services/traditional-sekku.jpg",
                       "assets/images/Blog/post-02/photo_2.jpg"
                   ],
        "excerpt":  "Ancient Ceylon stone-squeezing mortar extraction transforms the modern wellness industry. Discover how our engineered Sekkuwa protects fragile antioxidant compounds below 38°C.",
        "content":  "\u003ch3\u003eThe Science Behind Stone-Squeezing (Sekkuwa)\u003c/h3\u003e\n      \u003cp\u003eModern industrial oil expellers generate friction temperatures exceeding 80°C to 120°C. While this maximizes commercial yields, it oxidizes delicate unsaturated fatty acids and destroys vital antioxidants.\u003c/p\u003e\n      \n      \u003cp\u003eAt Celebration Holdings, our engineering team looked back to a photograph captured in 1910 documenting the Sri Lankan \u003cem\u003e\"Sekkuwa\"\u003c/em\u003e — a massive granite mortar and wooden pestle driven slowly by gentle rotation. By applying modern stainless steel sanitary housings around natural granite stone crushers, we created our proprietary \u003cstrong\u003eModern Sekku Squeezer\u003c/strong\u003e.\u003c/p\u003e\n      \n      \u003ch3\u003eRetaining Sesamol and Natural Anti-Inflammatory Power\u003c/h3\u003e\n      \u003cp\u003eLaboratory comparative assays performed on our stone-squeezed white and black sesame oils demonstrated:\u003c/p\u003e\n      \u003cul style=\"margin-left: 1.25rem; margin-bottom: 1.25rem;\"\u003e\n        \u003cli\u003e\u003cstrong\u003eSub-38°C Processing:\u003c/strong\u003e Preserves 100% of the active Sesamin, Sesamol, and Sesamolin compounds.\u003c/li\u003e\n        \u003cli\u003e\u003cstrong\u003eExceptional Oxidative Shelf Life:\u003c/strong\u003e Natural phenolic antioxidants act as an innate preservative without artificial tocopherols.\u003c/li\u003e\n        \u003cli\u003e\u003cstrong\u003eSilky Viscosity:\u003c/strong\u003e Perfect for traditional Ayurvedic oil-pulling, dermatological massage, and gourmet Asian culinary finishing.\u003c/li\u003e\n      \u003c/ul\u003e\n      \u003cp\u003eWe are proud to bring this authentic artisanal heritage to kitchens and wellness clinics across Japan, Europe, and Australia.\u003c/p\u003e",
        "status":  "Published",
        "featured":  true
    },
    {
        "id":  "post-03",
        "slug":  "targeting-10m-by-2030-expanding-sri-lanka-s-certified-organic-footprint-to-japan-and-australia",
        "title":  "Targeting $10M by 2030: Expanding Sri Lanka\u0027s Certified Organic Footprint to Japan and Australia",
        "category":  "Company Milestones",
        "publishedDate":  "2022-01-01",
        "author":  "Sharmen Perera, Director HR \u0026 Administration",
        "readingTime":  "3 min read",
        "coverImage":  "assets/images/Blog/post-03/cover.jpg",
        "photos":  [
                       "assets/images/Blog/post-03/photo_1.jpg"
                   ],
        "excerpt":  "Celebration Holdings outlines its 2030 strategic export roadmap, announcing new cold-chain logistics agreements and expanded grower cooperative networks in Kurunegala and Matale.",
        "content":  "\u003ch3\u003eOur Strategic Horizon 2030\u003c/h3\u003e\n      \u003cp\u003eFrom our humble beginnings in 2016 founded by three young visionaries, Celebration Holdings has grown into a respected player in Sri Lanka\u0027s agricultural export landscape. Today, we reaffirm our corporate mission: \u003cem\u003eto surpass $10 Million in annual certified organic exports by the year 2030.\u003c/em\u003e\u003c/p\u003e\n      \n      \u003ch3\u003eExpanding Our Pacific \u0026 Asian Trade Corridors\u003c/h3\u003e\n      \u003cp\u003eFollowing high-level bilateral trade meetings in Tokyo and Melbourne, CHL has finalized direct logistics channels into major Japanese ports (Yokohama, Kobe) and Australian entry points (Sydney, Melbourne). Key growth drivers include:\u003c/p\u003e\n      \u003cul style=\"margin-left: 1.25rem;\"\u003e\n        \u003cli\u003eHigh-grade \u003cstrong\u003eOrganic Virgin Coconut Oil \u0026 MCT Powder\u003c/strong\u003e tailored for Japan\u0027s booming health and functional beverage sector.\u003c/li\u003e\n        \u003cli\u003eBulk retail-ready pouches of \u003cstrong\u003eCeylon Alba Cinnamon\u003c/strong\u003e and whole spices for gourmet Australian organic supermarket cooperatives.\u003c/li\u003e\n        \u003cli\u003eFair trade off-take contracts with 250+ additional certified farming families in the North Western Coconut Triangle.\u003c/li\u003e\n      \u003c/ul\u003e",
        "status":  "Published",
        "featured":  false
    },
    {
        "id":  "post-04",
        "slug":  "achieving-eu-usda-organic-certification-cu-853200-a-testament-to-pure-food-integrity",
        "title":  "Achieving EU \u0026 USDA Organic Certification CU 853200: A Testament to Pure Food Integrity",
        "category":  "Certifications",
        "publishedDate":  "2023-02-21",
        "author":  "Bhagya Neththikumara, Director Quality Assurance",
        "readingTime":  "4 min read",
        "coverImage":  "assets/images/Blog/blog_3.jpg",
        "photos":  [
                       "assets/images/Blog/blog_3.jpg"
                   ],
        "excerpt":  "A deep dive into our rigorous farm-to-shipment audit processes under Control Union CU 853200, guaranteeing non-GMO, pesticide-free pure Ceylon produce.",
        "content":  "\u003ch3\u003eOrganic You Can Trust Across the Globe\u003c/h3\u003e\n      \u003cp\u003eWhile many commercial brands make generalized claims about organic purity, Celebration Holdings backs every harvest with internationally accredited audits. Our primary certification under \u003cstrong\u003eControl Union Certifications (CU 853200)\u003c/strong\u003e guarantees compliance with both European Union (EU) Organic regulations and the United States Department of Agriculture (USDA) National Organic Program (NOP).\u003c/p\u003e\n      \n      \u003ch3\u003eWhat CU 853200 Guarantees:\u003c/h3\u003e\n      \u003cul style=\"margin-left: 1.25rem;\"\u003e\n        \u003cli\u003e\u003cstrong\u003eComplete Soil Traceability:\u003c/strong\u003e Zero synthetic chemical fertilizers, pesticides, or glyphosate applied for a minimum of 3 consecutive harvest cycles.\u003c/li\u003e\n        \u003cli\u003e\u003cstrong\u003eCleanroom Processing:\u003c/strong\u003e Strict separation of organic product streams with zero risk of cross-contamination.\u003c/li\u003e\n        \u003cli\u003e\u003cstrong\u003eNon-GMO Verification:\u003c/strong\u003e Rigorous genetic testing verifying 100% natural, heritage Ceylon cultivars.\u003c/li\u003e\n        \u003cli\u003e\u003cstrong\u003eBatch-Level COA:\u003c/strong\u003e Certificates of Analysis provided for every commercial container dispatched from Colombo Port.\u003c/li\u003e\n      \u003c/ul\u003e",
        "status":  "Published",
        "featured":  false
    }
]
;

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
        "id":  "kit-01",
        "name":  "Organic Coconut Importer Sample Kit",
        "category":  "kit",
        "priceUSD":  45,
        "badge":  "Export Testing Kit",
        "image":  "assets/images/sample-kits/sample_kit_1.png",
        "items":  "Virgin Coconut Oil (500ml), MCT Oil (500ml), Coconut Milk Powder (1kg), Coconut Flour (1kg), Desiccated Coconut (1kg), Coconut Milk (400ml), Coconut Butter (220ml)",
        "desc":  "Complete testing pack with technical specifications, COA, and EU/USDA certificates for food buyers."
    },
    {
        "id":  "kit-02",
        "name":  "Ceylon Spices Sample Kit",
        "category":  "kit",
        "priceUSD":  145,
        "badge":  "Export Testing Kit",
        "image":  "assets/images/sample-kits/sample_kit_2.png",
        "items":  "Alba Cinnamon Sticks(500g), Black Pepper (500g), Cinnamon Powder (500g), Turmeric Powder (500g), Cardamom (500g), Moringa Powder (500g)",
        "desc":  "Premier grade Ceylon spices with laboratory coumarin \u0026 piperine assay reports."
    },
    {
        "id":  "kit-03",
        "name":  "Sesame Products Kit",
        "category":  "kit",
        "priceUSD":  35,
        "badge":  "Export Testing Kit",
        "image":  "assets/images/sample-kits/sample_kit_3.png",
        "items":  "Black seeds Sesame Oil (Expeller Pressed) (500ml), White seeds Sesame Oil Stone Squeezed (500ml), Tahini (250g)",
        "desc":  "High-margin artisanal sesame trio featuring expeller-pressed and stone-squeezed varieties, fully certified for food safety with ready-to-sell retail packaging."
    }
]
;

// Default 6 Photos for Home Photo Carousel
const CHL_DEFAULT_PHOTO_CAROUSEL = [
  {
    id: "carousel-photo-01",
    title: "Organic Coconut Processing",
    badge: "Processing Facility",
    caption: "Hygienic production and packaging under strict quality protocols.",
    image: "assets/images/middle caresoul/4.jpeg"
  },
  {
    id: "carousel-photo-02",
    title: "Honestlife Premium Range",
    badge: "Honestlife Brand",
    caption: "Pure Organic Virgin Coconut Oil, Coconut Butter, and RBD Coconut Oil.",
    image: "assets/images/middle caresoul/8.jpeg"
  },
  {
    id: "carousel-photo-03",
    title: "Precision Bottle Packaging",
    badge: "Export Grade",
    caption: "Sealed amber glass bottles prepared for international export markets.",
    image: "assets/images/middle caresoul/6.jpeg"
  },
  {
    id: "carousel-photo-04",
    title: "Container Freight Logistics",
    badge: "Global Logistics",
    caption: "Professional palletized cargo loading for ocean freight distribution.",
    image: "assets/images/middle caresoul/7.jpeg"
  },
  {
    id: "carousel-photo-05",
    title: "Bulk IBC Liquid Export",
    badge: "Bulk Supply",
    caption: "Industrial food-grade intermediate bulk containers for global ingredient supply.",
    image: "assets/images/middle caresoul/5.jpeg"
  },
  {
    id: "carousel-photo-06",
    title: "Sustainable Cultivation Fields",
    badge: "Organic Agriculture",
    caption: "Rich equatorial crop cultivation and direct sustainable farmer partnerships.",
    image: "assets/images/middle caresoul/12.jpeg"
  }
];

// Default Sales Configuration & Shipping Rates
const CHL_DEFAULT_SALES_CONFIG = {
  salesEmail: "info@celebrationholdings.lk",
  domesticShippingUSD: 3.00,
  domesticShippingLKR: 650,
  policyNote: "For the time being, sample orders are directly accepted within Sri Lanka only. International requests are submitted for direct Air Express freight calculation."
};

// Initial Orders / Inquiries Seed Data
const CHL_DEFAULT_ORDERS = [
  {
    id: "CHL-ORD-2026-1048",
    type: "domestic_order",
    date: "2026-09-06T14:30:00.000Z",
    customerName: "Dr. Asela Perera",
    company: "Lanka Herbal Formulations (Pvt) Ltd",
    email: "asela.perera@lankaherbals.lk",
    phone: "077 345 6789",
    address: "No. 45/2, Nawala Road",
    city: "Rajagiriya",
    postalCode: "10107",
    country: "Sri Lanka",
    items: [
      { id: "kit-01", name: "Executive Organic Coconut Range Evaluation Kit", priceUSD: 45.00, qty: 1 },
      { id: "kit-02", name: "Ceylon Cinnamon & Black Pepper Master Exporter Kit", priceUSD: 55.00, qty: 1 }
    ],
    subtotalUSD: 100.00,
    shippingCostUSD: 3.00,
    totalUSD: 103.00,
    currency: "USD",
    paymentMethod: "PayHere Sri Lanka (Online Gateway)",
    paymentStatus: "Paid",
    status: "Processing",
    notes: "Deliver before 5:00 PM on weekdays."
  },
  {
    id: "CHL-ORD-2026-1049",
    type: "overseas_freight_inquiry",
    date: "2026-09-07T09:15:00.000Z",
    customerName: "Marcus Weber",
    company: "BioVital GmbH",
    email: "m.weber@biovital-hamburg.de",
    phone: "+49 40 1234 5678",
    address: "Speicherstadt Block D, Am Sandtorkai 23",
    city: "Hamburg",
    postalCode: "20457",
    country: "Germany",
    items: [
      { id: "kit-02", name: "Ceylon Cinnamon & Black Pepper Master Exporter Kit", priceUSD: 55.00, qty: 2 }
    ],
    subtotalUSD: 110.00,
    shippingCostUSD: 0,
    totalUSD: 110.00,
    currency: "USD",
    paymentMethod: "Overseas Air Freight Quote Requested",
    paymentStatus: "Pending Quote",
    status: "Freight Quote Requested",
    notes: "Requires EU Organic transaction certificate (TC) with samples."
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
    PHOTO_CAROUSEL: "chl_db_photo_carousel_v2",
    CONFIG: "chl_db_config_v2",
    ORDERS: "chl_db_orders_v1",
    SALES_CONFIG: "chl_db_sales_config_v1"
  },

  init() {
    this.ensureSeedData();
    this.broadcastChange();
  },
  ensureSeedData() {
    // Check synchronization version to push latest 40 products and 6 blog stories
    const SYNC_VERSION_KEY = 'chl_db_sync_v3_2026_09_09';
    if (!localStorage.getItem(SYNC_VERSION_KEY)) {
      localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(CHL_DEFAULT_BLOG_POSTS));
      if (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA) && PRODUCTS_DATA.length > 0) {
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(PRODUCTS_DATA));
      }
      localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(CHL_DEFAULT_SAMPLE_KITS));
      localStorage.setItem(SYNC_VERSION_KEY, '3.0');
    }
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
    } else {
      // Migrate Suresh's designation in existing stored blog posts
      try {
        const storedPosts = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.BLOG) || '[]');
        if (Array.isArray(storedPosts) && storedPosts.length > 0) {
          let updated = false;
          const mappedPosts = storedPosts.map(p => {
            if (p.author && p.author.includes('Suresh') && p.author.includes('Director Operations')) {
              updated = true;
              return {
                ...p,
                author: p.author.replace('Director Operations', 'Director - Technical & International Marketing')
              };
            }
            return p;
          });
          if (updated) {
            localStorage.setItem(this.STORAGE_KEYS.BLOG, JSON.stringify(mappedPosts));
          }
        }
      } catch (e) {}
    }

    // 4. Coconut Harvest (5 items)
    if (!localStorage.getItem(this.STORAGE_KEYS.COCONUT_HARVEST)) {
      localStorage.setItem(this.STORAGE_KEYS.COCONUT_HARVEST, JSON.stringify(CHL_DEFAULT_COCONUT_HARVEST));
    }

    // 5. Sample Kits
    if (!localStorage.getItem(this.STORAGE_KEYS.SAMPLE_KITS)) {
      localStorage.setItem(this.STORAGE_KEYS.SAMPLE_KITS, JSON.stringify(CHL_DEFAULT_SAMPLE_KITS));
    }

    // 5b. Photo Carousel (6 photos)
    const storedCarousel = localStorage.getItem(this.STORAGE_KEYS.PHOTO_CAROUSEL);
    if (!storedCarousel) {
      // If legacy v1 existed but contained old demo images, remove it and initialize with default 6 custom photos
      localStorage.removeItem("chl_db_photo_carousel_v1");
      localStorage.setItem(this.STORAGE_KEYS.PHOTO_CAROUSEL, JSON.stringify(CHL_DEFAULT_PHOTO_CAROUSEL));
    }



    // 6. Orders
    if (!localStorage.getItem(this.STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(CHL_DEFAULT_ORDERS));
    }

    // 7. Sales Config
    if (!localStorage.getItem(this.STORAGE_KEYS.SALES_CONFIG)) {
      localStorage.setItem(this.STORAGE_KEYS.SALES_CONFIG, JSON.stringify(CHL_DEFAULT_SALES_CONFIG));
    }

    // 8. General Config
    if (!localStorage.getItem(this.STORAGE_KEYS.CONFIG)) {
      localStorage.setItem(this.STORAGE_KEYS.CONFIG, JSON.stringify({
        storeName: "Celebration Holdings (Pvt) Ltd",
        currency: "LKR",
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
  // PHOTO CAROUSEL (8 PHOTOS) CRUD & REORDERING
  // ==========================================
  getPhotoCarousel() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.PHOTO_CAROUSEL);
      return data ? JSON.parse(data) : CHL_DEFAULT_PHOTO_CAROUSEL;
    } catch (e) {
      return CHL_DEFAULT_PHOTO_CAROUSEL;
    }
  },

  getPhotoCarouselItemById(id) {
    const list = this.getPhotoCarousel();
    return list.find(p => p.id === id) || null;
  },

  savePhotoCarousel(items) {
    if (!Array.isArray(items)) return false;
    localStorage.setItem(this.STORAGE_KEYS.PHOTO_CAROUSEL, JSON.stringify(items));
    this.broadcastChange();
    return items;
  },

  addPhotoCarouselItem(item) {
    let list = this.getPhotoCarousel();
    if (!item.id) {
      item.id = 'carousel-photo-' + Date.now().toString(36);
    }
    list.push(item);
    this.savePhotoCarousel(list);
    return item;
  },

  updatePhotoCarouselItem(id, itemData) {
    let list = this.getPhotoCarousel();
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...itemData };
      this.savePhotoCarousel(list);
      return list[idx];
    }
    return null;
  },

  deletePhotoCarouselItem(id) {
    let list = this.getPhotoCarousel();
    list = list.filter(p => p.id !== id);
    this.savePhotoCarousel(list);
    return true;
  },

  movePhotoCarouselItem(id, direction) {
    let list = this.getPhotoCarousel();
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

    this.savePhotoCarousel(list);
    return true;
  },

  resetPhotoCarouselDefaults() {
    this.savePhotoCarousel(CHL_DEFAULT_PHOTO_CAROUSEL);
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
      sampleKits: this.getSampleKits(),
      photoCarousel: this.getPhotoCarousel()
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
      if (data.photoCarousel && Array.isArray(data.photoCarousel)) {
        localStorage.setItem(this.STORAGE_KEYS.PHOTO_CAROUSEL, JSON.stringify(data.photoCarousel));
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
    localStorage.removeItem(this.STORAGE_KEYS.PHOTO_CAROUSEL);
    this.ensureSeedData();
    this.broadcastChange();
    return true;
  },

  // Event Broadcasting across tabs and components
  broadcastChange() {
    window.dispatchEvent(new CustomEvent('chl_db_updated', {
      detail: { timestamp: Date.now() }
    }));
  },

  // ==========================================
  // ORDERS & SUMMARY ORDER SHEETS CRUD
  // ==========================================
  getOrders() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : CHL_DEFAULT_ORDERS;
    } catch (e) {
      return CHL_DEFAULT_ORDERS;
    }
  },

  getOrderById(id) {
    const list = this.getOrders();
    return list.find(o => o.id === id) || null;
  },

  saveOrder(order) {
    let list = this.getOrders();
    if (!order.id) {
      const prefix = order.type === 'overseas_freight_inquiry' ? 'CHL-INQ-' : 'CHL-ORD-';
      order.id = prefix + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    }
    if (!order.date) {
      order.date = new Date().toISOString();
    }
    const idx = list.findIndex(o => o.id === order.id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...order };
    } else {
      list.unshift(order);
    }
    localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(list));
    this.broadcastChange();
    return order;
  },

  updateOrderStatus(id, newStatus) {
    let list = this.getOrders();
    const order = list.find(o => o.id === id);
    if (order) {
      order.status = newStatus;
      localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(list));
      this.broadcastChange();
      return order;
    }
    return null;
  },

  deleteOrder(id) {
    let list = this.getOrders();
    list = list.filter(o => o.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.ORDERS, JSON.stringify(list));
    this.broadcastChange();
    return true;
  },

  // ==========================================
  // SALES CONFIG (EMAIL & SHIPPING RATES)
  // ==========================================
  getSalesConfig() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SALES_CONFIG);
      return data ? { ...CHL_DEFAULT_SALES_CONFIG, ...JSON.parse(data) } : CHL_DEFAULT_SALES_CONFIG;
    } catch (e) {
      return CHL_DEFAULT_SALES_CONFIG;
    }
  },

  saveSalesConfig(config) {
    const current = this.getSalesConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(this.STORAGE_KEYS.SALES_CONFIG, JSON.stringify(updated));
    this.broadcastChange();
    return updated;
  }
};

// Initialize immediately
CHL_DB.init();
window.CHL_DB = CHL_DB;
