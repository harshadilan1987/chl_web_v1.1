# Database Customization & Company Blog User Manual

This guide explains how to manage products, adjust prices, toggle stock availability, select certifications, and publish stories to the company blog on the Celebration Holdings web platform.

---

## 🔑 1. Accessing the Admin Management Portal

1. Open [`admin.html`](file:///d:/1.%20Celebration%20Holdings/Web%20Site/New%20Web%20R2%202026%20Sept/admin.html) in your browser, or click **"Staff Portal"** in the top navigation bar of `index.html`.
2. When prompted, enter your administrative passcode:
   - **Default Passcode**: `admin123` (or `chl2026`)
3. Click **"Unlock Admin Dashboard"**.

---

## 📦 2. Managing Products & Customizing Details

Navigate to the **"Products Manager"** tab on the sidebar.

### A. Adjusting Prices & Stock Availability
1. Locate the product in the table (or use the search bar / category filter).
2. Click the **"Edit"** button.
3. In the modal, you can adjust:
   - **Sample Price (USD)**: Enter the evaluation unit price (e.g. `16.50`).
   - **Stock Availability**: Choose between:
     - 🟢 **In Stock**: Available for immediate sample ordering and container booking.
     - 🔵 **Seasonal Harvest**: Available during specific Sri Lankan monsoon crop cycles.
     - 🟡 **Limited Batch**: Low inventory remaining; urgent inquiry needed.
     - 🔴 **Out of Stock**: Temporarily unavailable (the "Order Sample" button on the website will automatically disable).
4. Click **"Save Product Changes"**.
5. The live website (`index.html`) will instantly reflect the updated badge and price without requiring a server reboot or page rebuild!

### B. Updating Organic Certifications
Under the **"Applicable Certifications"** checklist in the product modal, check or uncheck:
- [x] EU Organic (CU 853200)
- [x] USDA Organic
- [x] Control Union
- [x] HACCP Certified
- [x] US FDA Registered
- [x] 100% Vegan
- [x] Non-GMO Project

The product card and detail modal will immediately display the exact number of active certifications.

### C. Adding a New Product
1. Click **"+ Add New Product"** at the top right of the Products tab.
2. Fill in the Commercial Name (e.g. *Organic King Coconut Water*), Botanical Name, and select the Category from the dropdown.
3. Enter the Sample Price, stock status, image path or URL, descriptions, export grades, and packaging formats.
4. Click **"Save Product Changes"**. The new product will appear immediately under its respective category on `index.html`.

---

## 📑 3. Adding or Removing Product Categories

Navigate to the **"Categories"** tab on the sidebar.

- **To Add a Category**: Click **"+ Add New Category"**.
  - Enter the Name (e.g. *Herbal Teas & Infusions*).
  - Enter an icon or emoji (e.g. 🍵).
  - Enter a brief description.
  - The new category will automatically generate its own filter button on `index.html`!
- **To Remove a Category**: Click **"Del"** next to the category name.

---

## ✍️ 4. Company Blog & Foreign Exhibitions

Navigate to the **"Company Blog"** tab on the sidebar, or visit [`blog.html`](file:///d:/1.%20Celebration%20Holdings/Web%20Site/New%20Web%20R2%202026%20Sept/blog.html).

### Publishing an Exhibition or Milestone Article
1. Click **"+ Write New Story"**.
2. Complete the fields:
   - **Article Title**: e.g., *Celebration Holdings Signs Major Coconut Oil Distribution Pact at Foodex Japan*.
   - **Category**: Select *Foreign Exhibitions*, *Company Milestones*, *Organic Innovations*, or *Certifications*.
   - **Author**: e.g., *Dilan Fernando, Director Marketing*.
   - **Cover Image**: URL or local path (e.g., `assets/images/banner/hero-bg.jpg`).
   - **Short Excerpt**: 2-line preview that appears on blog cards.
   - **Full Article Body**: Full story text (HTML and headings supported).
   - **Status**: Set to *Published*.
3. Click **"Save & Publish Article"**.
4. The new story will automatically appear on [`blog.html`](file:///d:/1.%20Celebration%20Holdings/Web%20Site/New%20Web%20R2%202026%20Sept/blog.html) and in the **"Latest from Our Blog & Foreign Exhibitions"** preview grid on `index.html`!

---

## 💾 5. Data Backup, Restore & Cloud Database Connectors

Navigate to the **"Backup & Sync"** tab.

### One-Click JSON Backup & Restore
- **Download Backup**: Click **"💾 Download Backup (.json)"** to download `CHL_Database_Backup_YYYY-MM-DD.json`. This contains all products, prices, stock statuses, categories, and blog posts.
- **Restore from File**: Click **"📂 Restore from File"** to restore from any previous backup.
- **Factory Reset**: Reverts the entire system back to the initial 25 authentic Ceylon products and default exhibition articles.

### Cloud Database Synchronization (Supabase / Firebase)
For multi-device or multi-user team editing:
1. Create a free project on [Supabase](https://supabase.com) or [Firebase](https://firebase.google.com).
2. Enter your **Project URL** and **API Key** in the Cloud Sync card.
3. All local changes will synchronize through the `CHL_DB` cloud adapter!
