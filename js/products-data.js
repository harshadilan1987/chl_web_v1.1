/**
 * Celebration Holdings (Pvt) Ltd - Master Products Database
 * Authentic Sri Lankan Organic Export Range
 */

const PRODUCTS_DATA = [
  // ==========================================
  // 1. COCONUT RANGE (Cocos nucifera)
  // ==========================================
  {
    id: "coco-01",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Virgin Coconut Oil (VCO)",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Virgin Coconut Oil.jpeg",
    badge: "EU / USDA Organic",
    shortDesc: "100% cold-pressed, unrefined extra virgin coconut oil extracted from fresh organic mature kernel.",
    description: "Our Organic Virgin Coconut Oil (VCO) is cold-pressed without chemical refining, bleaching, or deodorizing. Rich in Medium Chain Triglycerides (MCTs) particularly Lauric Acid (approx. 50%), it maintains a fresh, delicate tropical aroma and exquisite taste. Ideal for culinary use, nutraceuticals, natural cosmetics, and skin care.",
    benefits: [
      "Rich in Lauric Acid and bioactive antioxidants",
      "Cold-pressed below 45°C to preserve natural nutrients",
      "Supports cardiovascular wellness and metabolic energy",
      "Superior natural skin moisturizer and hair conditioner"
    ],
    packaging: [
      "Glass Jars: 200ml, 375ml, 500ml, 1000ml",
      "Bulk Drums: 190kg / 200L food-grade steel drums",
      "IBC Totes: 920kg / 1000L with heating blankets"
    ],
    grades: "Extra Virgin, Cold Pressed, Organic Certified",
    samplePriceUSD: 14.50
  },
  {
    id: "coco-02",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "MCT Coconut Oil & Powder",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/MCT Coconut Oil.jpeg",
    badge: "Keto & Vegan",
    shortDesc: "C8 & C10 concentrated medium-chain triglycerides in pure liquid oil or micro-encapsulated powder.",
    description: "Extracted exclusively from 100% pure organic coconut oil through physical fractionation. Highly rich in Caprylic Acid (C8) and Capric Acid (C10) for rapid cellular ketone conversion and clean mental & physical energy without digestive burden.",
    benefits: [
      "Concentrated C8 / C10 ketone fuel for mind and body",
      "Zero palm oil, non-GMO, carrier-free or clean acacia fiber",
      "Instantly soluble in hot or cold beverages, shakes, and food",
      "Popular for ketogenic, paleo, and functional sports nutrition"
    ],
    packaging: [
      "Powder: 250g, 500g, 1kg retail pouches; 20kg bulk kraft bags",
      "Oil: 500ml amber bottles; 20L jerrycans; 200L drums"
    ],
    grades: "Pure C8/C10 60:40 or 70:30; 70% Oil Powder",
    samplePriceUSD: 22.00
  },
  {
    id: "coco-03",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Organic Coconut Milk Powder",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Coconut Milk Powder.jpeg",
    badge: "100% Dairy Free",
    shortDesc: "Spray-dried pure coconut milk powder with authentic creaminess and zero artificial additives.",
    description: "Manufactured by spray-drying freshly extracted organic coconut cream. Dissolves effortlessly in warm water to produce delicious, rich coconut milk or cream on demand, saving storage space and freight costs.",
    benefits: [
      "Authentic fresh Ceylon coconut aroma and rich texture",
      "Vegan, lactose-free, dairy-free alternative to cow milk",
      "Extended shelf life (24 months) under ambient conditions",
      "Versatile for curries, desserts, confectionery, and bakeries"
    ],
    packaging: [
      "Retail: 150g, 300g, 1kg foil pouches",
      "Bulk: 15kg / 20kg multi-wall kraft paper bags with inner PE liner"
    ],
    grades: "60% Fat (Rich Cream) and 40% Fat (Medium)",
    samplePriceUSD: 12.00
  },
  {
    id: "coco-04",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Desiccated Coconut (High & Low Fat)",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Desiccated Coconut (High Fat Medium).jpeg",
    badge: "Grade A Export",
    shortDesc: "Dehydrated, shredded pure white kernel in Fine and Medium cuts for international confectioners.",
    description: "Made from inspected, hand-picked mature coconuts from Sri Lanka's famed Coconut Triangle. Produced under sterile HACCP and ISO standards without sulfur dioxide, sweeteners, or chemical preservatives.",
    benefits: [
      "Natural snow-white color with sweet, pure coconut flavor",
      "High dietary fiber content with essential minerals",
      "Consistent granulation for confectionery, cakes, and toppings",
      "Rigid microbiological clearance (Salmonella negative)"
    ],
    packaging: [
      "Bulk: 25kg / 50kg 4-ply kraft paper bags with food-grade inner poly liner",
      "Palletized: 20ft (11MT) / 40ft (24MT) containers"
    ],
    grades: "Fine Cut, Medium Cut, Toasted, Low Fat",
    samplePriceUSD: 9.50
  },
  {
    id: "coco-05",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Organic Coconut Flour",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Coconut Flour.jpeg",
    badge: "Gluten-Free",
    shortDesc: "Finely ground defatted organic coconut meat, super-rich in fiber and protein for grain-free baking.",
    description: "An exceptional wheat flour substitute produced from dehydrated, defatted coconut meat after cold oil extraction. Extremely high in dietary fiber (over 40%) and low in glycemic index, making it ideal for keto, diabetic, and gluten-free dietary lifestyles.",
    benefits: [
      "High dietary fiber promotes optimal digestion and satiety",
      "Low glycemic index helps maintain steady blood sugar levels",
      "Naturally gluten-free and grain-free baking flour",
      "Imparts light moisture and delicate sweetness to pastries"
    ],
    packaging: [
      "Retail: 500g, 1kg resealable stand-up pouches",
      "Bulk: 25kg multi-wall kraft paper bags"
    ],
    grades: "Fine Mesh 80-100, Raw Organic",
    samplePriceUSD: 8.50
  },
  {
    id: "coco-06",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Organic Coconut Butter / Creamed Coconut",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Coconut Butter.jpeg",
    badge: "Pure Kernel",
    shortDesc: "Whole mature coconut flesh ground into a velvety, creamy paste with natural oil and fiber intact.",
    description: "Unlike coconut oil which contains only the pressed fats, coconut butter is made by micro-milling the entire dehydrated coconut kernel into an ultra-smooth, melt-in-the-mouth butter. It contains all the natural fibers, proteins, and minerals.",
    benefits: [
      "Contains both wholesome coconut oil and healthy dietary fiber",
      "Silky smooth texture ideal for smoothies, spreads, and raw desserts",
      "Natural source of potassium, magnesium, and iron",
      "No palm oil, zero emulsifiers, 100% single ingredient"
    ],
    packaging: [
      "Glass Jars: 200g, 350g, 500g",
      "Food Pails: 10kg, 20kg plastic pails; 200kg drums"
    ],
    grades: "Creamed Paste, Raw Organic",
    samplePriceUSD: 11.00
  },
  {
    id: "coco-07",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Organic Coconut Aminos & Vinegar",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Coconut Aminos.jpeg",
    badge: "Soy-Free Seasoning",
    shortDesc: "Fermented coconut blossom sap delivering savory umami flavor with low sodium and zero soy.",
    description: "A delicious, healthy alternative to conventional soy sauce made from the aged sap of organic coconut blossom, blended with pure mineral-rich sea salt. Naturally rich in 17 amino acids, B vitamins, and essential minerals.",
    benefits: [
      "100% Soy-free, wheat-free, gluten-free savory umami seasoning",
      "Over 65% lower sodium content compared to commercial soy sauce",
      "Naturally fermented with organic gut-friendly live probiotics",
      "Perfect for dressings, stir-fries, marinades, and dipping"
    ],
    packaging: [
      "Bottles: 250ml, 500ml, 1000ml glass / PET",
      "Bulk: 20L food pails, 200L drums, 1000L IBC"
    ],
    grades: "Natural Aged, Barrel Fermented",
    samplePriceUSD: 10.50
  },
  {
    id: "coco-08",
    category: "coconut",
    categoryName: "Coconut Range",
    name: "Toasted Coconut Chips & Crunch",
    botanicalName: "Cocos nucifera",
    image: "assets/images/products/coconut/Coconut Chips.jpeg",
    badge: "Crunchy Snack",
    shortDesc: "Gently toasted organic coconut slices available in natural, salted, and spiced flavors.",
    description: "Thin ribbons of fresh coconut kernel slow-baked to golden perfection. Retains all natural healthy fats and crunch without deep frying. Available in Natural Plain, Sea Salt, Ceylon Cinnamon, and Coconut Nectar glazed varieties.",
    benefits: [
      "Baked never fried, with zero hydrogenated vegetable oils",
      "Satisfying healthy crunch rich in satisfying dietary fiber",
      "Clean label snacking for adults and children alike",
      "Ideal breakfast yogurt topper, salad garnish, or trail mix ingredient"
    ],
    packaging: [
      "Retail: 40g, 80g, 150g nitrogen-flushed foil pouches",
      "Bulk: 10kg corrugated cartons with double poly liner"
    ],
    grades: "Natural, Salted, Cinnamon Glazed",
    samplePriceUSD: 7.50
  },

  // ==========================================
  // 2. SESAME RANGE & STONE-SQUEEZED SEKKU
  // ==========================================
  {
    id: "sesame-01",
    category: "sesame",
    categoryName: "Sesame Range",
    name: "Stone-Squeezed Sesame Oil (Traditional Sekku)",
    botanicalName: "Sesamum indicum",
    image: "assets/images/products/sesame/White seeds Sesame Oil Stone Squeezed.jpg",
    badge: "Heritage Sekku Pressed",
    shortDesc: "Extracted using centuries-old granite Sekku stone squeezing for unparalleled flavor and purity.",
    description: "Sri Lanka has practiced stone-squeezed oil extraction ('Sekkuwa') since ancient times. Our engineers modernised the traditional granite mortar and pestle mechanism to squeeze organic sesame seeds slowly at room temperature, without chemical solvents or thermal degradation. Contains rich natural antioxidants sesamin, sesamol, and sesamolin.",
    benefits: [
      "Cold-extracted below 38°C with pure granite stone friction",
      "Rich in Sesamol and Sesamin for natural oxidative stability",
      "Celebrated in Ayurveda for oral oil-pulling, joint massage, and culinary wellness",
      "Unmatched authentic aromatic profile and nutty Ceylon flavor"
    ],
    packaging: [
      "Glass Bottles: 250ml, 500ml, 750ml, 1000ml",
      "Bulk: 20L Jerrycans, 200L Food-grade drums"
    ],
    grades: "White Sesame Sekku, Black Sesame Sekku",
    samplePriceUSD: 16.00
  },
  {
    id: "sesame-02",
    category: "sesame",
    categoryName: "Sesame Range",
    name: "Stone-Ground Organic Tahini Paste",
    botanicalName: "Sesamum indicum",
    image: "assets/images/products/sesame/Tahini.jpeg",
    badge: "100% Pure Sesame",
    shortDesc: "Silky, stone-ground paste from hulled or unhulled Ceylon sesame seeds with zero additives.",
    description: "Crafted by slowly grinding select organic sesame seeds between natural millstones into a creamy, pourable paste. Packed with plant calcium, iron, zinc, and heart-healthy unsaturated fatty acids.",
    benefits: [
      "Dense in natural plant calcium (higher than dairy milk ounce for ounce)",
      "High protein and healthy fats for sustained energy and heart health",
      "Essential base for gourmet hummus, dressings, halva, and bakery sauces",
      "Single-ingredient formulation: 100% Certified Organic Sesame"
    ],
    packaging: [
      "Glass Jars: 200g, 350g, 500g, 900g",
      "Food Pails: 5kg, 18kg, 200kg drums"
    ],
    grades: "Hulled Tahini, Whole Seed (Unhulled) Tahini",
    samplePriceUSD: 13.00
  },
  {
    id: "sesame-03",
    category: "sesame",
    categoryName: "Sesame Range",
    name: "Whole Ceylon Sesame Seeds (White & Black)",
    botanicalName: "Sesamum indicum",
    image: "assets/images/products/sesame/Whole White Sesseme Seeds.jpg",
    badge: "99.9% Purity Machine Cleaned",
    shortDesc: "Mechanically cleaned and sorted premium Ceylon sesame seeds with natural nutty aroma.",
    description: "Grown in the sunny dry zones of Sri Lanka by smallholder organic cooperative farmers. Cleaned through optical color sorters and magnetic separators to guarantee 99.9% purity and negligible moisture.",
    benefits: [
      "Abundant in phytosterols that help balance cholesterol levels",
      "Excellent plant-based source of copper, manganese, and magnesium",
      "Superior germination rate and high oil content (48-52%)",
      "Perfect for baking, artisan breads, confectionery, and oil pressing"
    ],
    packaging: [
      "Retail: 250g, 500g, 1kg craft stand-up pouches",
      "Bulk: 25kg / 50kg polypropylene woven bags with PE inner liner"
    ],
    grades: "Natural White 99.9%, Natural Black 99.9%, Hulled",
    samplePriceUSD: 8.00
  },

  // ==========================================
  // 3. CEYLON SPICES & HERBS RANGE
  // ==========================================
  {
    id: "spice-01",
    category: "spices",
    categoryName: "Spices & Herbs",
    name: "True Ceylon Cinnamon (Alba & 5C Special)",
    botanicalName: "Cinnamomum verum / zeylanicum",
    image: "assets/images/products/spices/Cinnamon Alba.jpg",
    badge: "Ultra-Low Coumarin",
    shortDesc: "The world's highest grade Ceylon Cinnamon with paper-thin sweet quills and zero Cassia toxicity.",
    description: "Native exclusively to Sri Lanka ('Ceylon'), True Cinnamon is universally celebrated for its delicate layered quills, refined sweet aroma, and negligible coumarin levels (safe for daily liver health, unlike Chinese Cassia). Our Alba grade is the pinnacle of Ceylon craftsmanship, rolled by master peelers with pencil-thin diameter.",
    benefits: [
      "Ultra-low coumarin (<0.004%) compared to toxic Cassia cinnamon",
      "Potent cinnamaldehyde supports healthy blood sugar regulation",
      "Rich in polyphenol antioxidants with powerful anti-inflammatory benefits",
      "Exquisite sweet, woody flavor that elevates culinary creations and teas"
    ],
    packaging: [
      "Quills: Bundled in 25kg / 45kg bales (cut lengths 3.5\" to 42\")",
      "Retail: Glass tubes 5-10 quills; 50g, 100g, 250g pouches; Powder 100g tins"
    ],
    grades: "Alba, 5C Special, 5C, 4C, 4M, H1, H2, Quillings, Powder",
    samplePriceUSD: 19.50
  },
  {
    id: "spice-02",
    category: "spices",
    categoryName: "Spices & Herbs",
    name: "Pure Ceylon Black Pepper (550 GL)",
    botanicalName: "Piper nigrum",
    image: "assets/images/products/spices/Black Pepper (550-GL).jpg",
    badge: "High Piperine (>6%)",
    shortDesc: "Sun-dried bold black peppercorns from Sri Lankan central highlands with intense pungency.",
    description: "Ceylon Black Pepper is globally renowned for possessing the highest natural Piperine content (6% to 9%), which gives it superior biting pungency, intense fragrance, and maximum therapeutic efficacy in boosting curcumin absorption.",
    benefits: [
      "Natural high piperine boosts nutrient bioavailability by up to 2000%",
      "Heavy bulk density (550 GL) indicates plump, mature berries",
      "Sun-cured naturally without artificial fumigation or chemical treatment",
      "Essential culinary master spice and pharmaceutical extract source"
    ],
    packaging: [
      "Retail: 100g glass grinder bottles, 250g kraft pouches",
      "Bulk: 25kg / 50kg multi-layer jute / PP bags"
    ],
    grades: "550 GL, 525 GL, 500 GL, FAQ, Light Berries, Fine Powder",
    samplePriceUSD: 11.50
  },
  {
    id: "spice-03",
    category: "spices",
    categoryName: "Spices & Herbs",
    name: "Organic Ceylon Turmeric & Curcumin Butter",
    botanicalName: "Curcuma longa",
    image: "assets/images/products/spices/Turmeric Powder.jpg",
    badge: "Curcumin > 5%",
    shortDesc: "Vibrant golden turmeric roots and concentrated paste with exceptional natural curcuminoids.",
    description: "Cultivated in fertile tropical soil, our organic turmeric fingers are washed, steamed, and slow-dried to preserve their radiant orange hue and therapeutic volatile oils (turmerones and curcuminoids).",
    benefits: [
      "Standardized natural curcumin content exceeding 5%",
      "Remarkable antioxidant and anti-inflammatory cellular protection",
      "Free of lead chromate or synthetic color adulteration",
      "Ideal for golden milk lattes, culinary dishes, and wellness cosmetics"
    ],
    packaging: [
      "Retail: 100g, 250g, 500g airtight jars and pouches",
      "Bulk: 25kg multi-wall paper sacks with moisture barrier"
    ],
    grades: "Whole Fingers, Polished Fingers, Mesh 100 Powder, Curcumin Butter",
    samplePriceUSD: 9.00
  },
  {
    id: "spice-04",
    category: "spices",
    categoryName: "Spices & Herbs",
    name: "Organic Moringa Leaf Powder",
    botanicalName: "Moringa oleifera",
    image: "assets/images/products/spices/Moringa Powder.jpg",
    badge: "Green Superfood",
    shortDesc: "Shadow-dried tender moringa leaves ground into raw emerald green nutrition-dense powder.",
    description: "Regarded as the 'Miracle Tree', our moringa leaves are gently harvested, washed in ozone-purified water, and dehydrated at low temperatures in shade drying tunnels to retain all active vitamins, minerals, and amino acids.",
    benefits: [
      "Contains all 9 essential amino acids — a rare complete plant protein",
      "Concentrated in Vitamins A, C, Calcium, Potassium, and Iron",
      "Promotes sustained natural energy, immunity, and cellular vitality",
      "Easily blends into green smoothies, juices, and herbal capsules"
    ],
    packaging: [
      "Retail: 100g, 250g, 500g foil pouches",
      "Bulk: 20kg food-grade fiber drums with PE inner liner"
    ],
    grades: "100% Pure Raw Leaf Powder, Mesh 120",
    samplePriceUSD: 12.50
  },
  {
    id: "spice-05",
    category: "spices",
    categoryName: "Spices & Herbs",
    name: "Ceylon Bourbon Vanilla Beans & Extract",
    botanicalName: "Vanilla planifolia",
    image: "assets/images/products/spices/Vanilla Beans.jpg",
    badge: "Grade A Gourmet",
    shortDesc: "Hand-pollinated and traditionally cured plump vanilla pods with high vanillin content.",
    description: "Grown in the lush cloud forests of Sri Lanka, our vanilla beans are hand-pollinated, harvested at peak maturity, and sun-cured over months to develop their characteristic dark, supple appearance and deep, balsamic floral aroma.",
    benefits: [
      "Plump, moist gourmet Grade A pods (16cm - 20cm length)",
      "High natural vanillin level (2.0% - 2.4%) with oily crystalline frost",
      "Rich caviar seed count ideal for high-end bakeries and perfumery",
      "Pure organic extraction without corn syrup or artificial flavors"
    ],
    packaging: [
      "Retail: Vacuum-sealed glass tubes (2-5 beans); 50g, 100g packs",
      "Bulk: 1kg vacuum sealed bags in 10kg export cartons"
    ],
    grades: "Grade A Gourmet (30-35% moisture), Grade B Extraction",
    samplePriceUSD: 28.00
  },
  {
    id: "spice-06",
    category: "spices",
    categoryName: "Spices & Herbs",
    name: "Ceylon Green Cardamom & Whole Cloves",
    botanicalName: "Elettaria cardamomum / Syzygium aromaticum",
    image: "assets/images/products/spices/Whole Cardamom.jpg",
    badge: "Hand Sorted Bold",
    shortDesc: "Jumbo aromatic cardamom pods and heavy-oil clove buds picked by hand in southern estates.",
    description: "Sourced directly from certified organic smallholders in Matale and Kandy. Our cloves are rich in eugenol (over 18%), and cardamoms feature uniform deep green pods full of plump, pitch-black aromatic seeds.",
    benefits: [
      "Rich in essential eugenol and cineole oils with intense aroma",
      "Natural oral freshness and traditional digestive comfort",
      "Grade 1 Hand-picked selection with zero stems and broken pieces",
      "Unmatched flavor enhancer for gourmet chai, curries, and pastries"
    ],
    packaging: [
      "Retail: 50g, 100g, 250g stand-up resealable pouches",
      "Bulk: 10kg / 25kg export cartons with desiccants"
    ],
    grades: "Green Cardamom Jumbo (8mm+), Hand Picked Cloves (HPS)",
    samplePriceUSD: 18.00
  },

  // ==========================================
  // 4. TROPICAL FRUITS RANGE
  // ==========================================
  {
    id: "fruit-01",
    category: "fruits",
    categoryName: "Tropical Fruits",
    name: "Young Green Jackfruit in Brine / Salt",
    botanicalName: "Artocarpus heterophyllus",
    image: "assets/images/products/fruits/Young Jackfruit in Brine.jpg",
    badge: "Meat Alternative",
    shortDesc: "The premier plant-based meat alternative with shredded meat texture and neutral flavor absorption.",
    description: "Harvested at tender maturity before seeds develop sugars, our Young Jackfruit has an authentic shredded texture identical to pulled pork or shredded chicken. It readily absorbs savory seasonings and BBQ glazes, making it the #1 clean meat alternative in European and American vegan markets.",
    benefits: [
      "Exceptional fibrous texture mimicking shredded meat naturally",
      "Low in calories, rich in prebiotic dietary fiber, zero cholesterol",
      "Free of soy, gluten, pea isolate, or chemical texturizers",
      "Packed in natural Himalayan sea salt brine or organic citric solution"
    ],
    packaging: [
      "Cans: 400g (Easy-open tin), 800g, 3kg food-service A10 tins",
      "Glass Jars: 350g, 500g; Bulk: 200kg food-grade barrels"
    ],
    grades: "Chunks in Brine, Shredded in Brine, Salt & Vinegar",
    samplePriceUSD: 8.50
  },
  {
    id: "fruit-02",
    category: "fruits",
    categoryName: "Tropical Fruits",
    name: "Organic Dehydrated Mango & Papaya Strips",
    botanicalName: "Mangifera indica / Carica papaya",
    image: "assets/images/products/fruits/Mango Strips.jpg",
    badge: "No Added Sugar",
    shortDesc: "Naturally sweet, sun-ripened tropical fruit strips slow-dried with zero sulfur dioxide.",
    description: "Prepared from ripe, fragrant Ceylon mangoes and papayas. Peeled, sliced, and dehydrated under controlled hygienic conditions without added cane sugar, sulfur dioxide (SO2), or artificial preservatives.",
    benefits: [
      "100% Fruit — zero added sugars, sulfur, or artificial colorings",
      "Naturally abundant in Vitamin A, Vitamin C, and digestive enzymes",
      "Chewy, soft texture bursting with sweet tropical sunshine flavor",
      "Resealable snack packs or bulk ingredients for muesli and cereal"
    ],
    packaging: [
      "Retail: 50g, 100g, 250g nitrogen-flushed barrier pouches",
      "Bulk: 10kg corrugated export cartons with PE liner"
    ],
    grades: "Spears, Strips, Cuts, Dice",
    samplePriceUSD: 10.00
  },
  {
    id: "fruit-03",
    category: "fruits",
    categoryName: "Tropical Fruits",
    name: "Organic Pineapple in Natural Juice & Rings",
    botanicalName: "Ananas comosus",
    image: "assets/images/products/fruits/Pineapple in juice.jpg",
    badge: "Pure Juice Packed",
    shortDesc: "Sweet, tangy Queen/Mauritius pineapple slices packed in their own natural unadulterated juice.",
    description: "Grown in Sri Lanka's warm lowlands, our pineapples are famous for intense sweetness and golden color. Canned or packed in glass within 24 hours of harvest to preserve maximum freshness and active bromelain enzyme.",
    benefits: [
      "Natural source of Bromelain enzyme which supports digestion",
      "Packed exclusively in pure pineapple juice — no heavy sugar syrups",
      "Brimming with immune-boosting Vitamin C and antioxidants",
      "Uniform slices perfect for culinary gourmet recipes and snacking"
    ],
    packaging: [
      "Cans: 400g, 565g, 850g, 3kg A10 cans with BPA-NI inner coating",
      "Glass Jars: 500ml, 720ml"
    ],
    grades: "Rings, Chunks, Tidbits, Crushed",
    samplePriceUSD: 7.50
  },
  {
    id: "fruit-04",
    category: "fruits",
    categoryName: "Tropical Fruits",
    name: "Cassava Tapioca & Banana Blossom in Brine",
    botanicalName: "Manihot esculenta / Musa acuminata",
    image: "assets/images/products/fruits/Banana Blosson in Brine.jpg",
    badge: "Vegan Seafood Texture",
    shortDesc: "Delicate Banana Blossom for vegan fish fillets and ultra-pure native Cassava tapioca starch.",
    description: "Banana Blossom has an incredible flaky, layered structure that makes it the premier plant-based substitute for fish fillets and seafood tacos. Combined with our gluten-free Ceylon Cassava flour, it empowers creative modern plant-based chefs.",
    benefits: [
      "Layered, flaky texture creates stunning vegan fish and chips",
      "Cassava flour is 1:1 gluten-free baking substitute with smooth texture",
      "High in resistant starch promoting gut microbiome health",
      "Ethically wild-harvested and sustainably processed"
    ],
    packaging: [
      "Banana Blossom: 400g cans, 800g glass jars",
      "Cassava: 500g retail bags, 25kg bulk bags"
    ],
    grades: "Flakes in Brine, Flour Mesh 100",
    samplePriceUSD: 8.00
  },

  // ==========================================
  // 5. PURE ESSENTIAL OIL RANGE
  // ==========================================
  {
    id: "oil-01",
    category: "oils",
    categoryName: "Essential Oils",
    name: "Ceylon Cinnamon Bark Oil (60-75% Cinnamaldehyde)",
    botanicalName: "Cinnamomum verum",
    image: "assets/images/products/oils/Cinnamon Bark Oil.jpg",
    badge: "100% Pure Steam Distilled",
    shortDesc: "Rare and precious therapeutic-grade essential oil distilled from the inner bark of Ceylon Cinnamon.",
    description: "One of the world's most sought-after botanical oils. Extracted via slow steam distillation in our specialized stills. Possesses a warm, fiery-sweet, balsamic aroma with high natural cinnamaldehyde (60-75%). Widely utilized in premium perfumery, pharmaceutical syrups, dental care, and aromatherapy.",
    benefits: [
      "Powerful antimicrobial and antiseptic natural compounds",
      "Stimulates circulation, emotional warmth, and mental clarity",
      "100% pure and natural, free of carrier diluents or synthetic enhancers",
      "Gas Chromatography-Mass Spectrometry (GC-MS) tested for purity"
    ],
    packaging: [
      "Bottles: 10ml, 30ml, 100ml amber dropper bottles",
      "Bulk: 1kg, 5kg aluminum flasks; 25kg, 180kg UN-certified steel drums"
    ],
    grades: "Therapeutic Grade 60%, 70%, 75% Cinnamaldehyde",
    samplePriceUSD: 35.00
  },
  {
    id: "oil-02",
    category: "oils",
    categoryName: "Essential Oils",
    name: "Ceylon Lemongrass & Citronella Oil",
    botanicalName: "Cymbopogon flexuosus / nardus",
    image: "assets/images/products/oils/Lemongrass Oil.jpg",
    badge: "High Citral (>75%)",
    shortDesc: "Bright, invigorating citrus essential oils distilled from fresh wild Ceylon lemongrass.",
    description: "Steam-distilled from freshly cut green blades of organic lemongrass. Rich in active Citral (Geranial & Neral), imparting a crisp, radiant lemon aroma that revitalizes fatigue, cleanses spaces, and provides natural insect repelling properties.",
    benefits: [
      "Natural insect deterrent without synthetic DEET or toxic chemicals",
      "Invigorates mental focus, uplifts mood, and purifies ambient air",
      "Natural toner and astringent in high-end personal care soaps",
      "Certified organic and cruelty-free distillation"
    ],
    packaging: [
      "Retail: 10ml, 50ml, 100ml amber bottles",
      "Bulk: 5kg aluminum containers, 25kg & 190kg HDPE drums"
    ],
    grades: "100% Pure Steam Distilled, East Indian Type",
    samplePriceUSD: 16.50
  },
  {
    id: "oil-03",
    category: "oils",
    categoryName: "Essential Oils",
    name: "Ceylon Black Pepper & Cardamom Oil",
    botanicalName: "Piper nigrum / Elettaria cardamomum",
    image: "assets/images/products/oils/Black Pepper Oil.jpg",
    badge: "Spicy Therapeutic",
    shortDesc: "Warm, spicy, and woody essential oils extracted from hand-selected Ceylon highland spices.",
    description: "Possesses the sharp, dry-woody, and warm character of freshly cracked peppercorns and sweet, camphoric notes of green cardamom. Excellent for soothing muscular massage balms, natural perfumery bases, and respiratory diffuser blends.",
    benefits: [
      "Promotes warming comfort for sore joints and muscle fatigue",
      "Aids respiratory ease and respiratory clarity during winter seasons",
      "Rich in beta-caryophyllene, alpha-pinene, and limonene",
      "Sustainably distilled with closed-loop water condensation"
    ],
    packaging: [
      "Bottles: 15ml, 50ml, 100ml amber glass",
      "Bulk: 1kg, 5kg, 20kg UN drums"
    ],
    grades: "Pure Distillate, Food & Pharma Grade",
    samplePriceUSD: 24.00
  },
  {
    id: "oil-04",
    category: "oils",
    categoryName: "Essential Oils",
    name: "Ceylon Clove Bud & Leaf Oil",
    botanicalName: "Syzygium aromaticum",
    image: "assets/images/products/oils/Clove Bud Oil.jpg",
    badge: "Eugenol > 85%",
    shortDesc: "Intense warming essential oil famous for oral hygiene, soothing sensations, and natural protection.",
    description: "Distilled from premium organic clove buds and stems from Sri Lanka's spice valleys. Renowned for exceptionally high Eugenol content (85-90%), which provides strong numbing, antimicrobial, and antioxidant properties.",
    benefits: [
      "Time-honored natural toothache remedy and oral cleanser",
      "Among the highest natural ORAC antioxidant scores of any essential oil",
      "Warming analgesic qualities when diluted in carrier oils",
      "Trusted ingredient in dental, pharmaceutical, and aromatherapy formulations"
    ],
    packaging: [
      "Bottles: 10ml, 30ml, 100ml amber bottles",
      "Bulk: 5kg, 25kg, 200kg drums"
    ],
    grades: "Clove Bud Oil (85% Eugenol), Clove Stem Oil",
    samplePriceUSD: 18.50
  }
];

// Sample Kit Bundles for International Importers
const SAMPLE_BUNDLES = [
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
