# Payment Gateway Integration Guide for Celebration Holdings (www.chpl.lk)

This guide provides instructions for configuring and going live with payment gateways on the revamped Celebration Holdings website.

---

## 1. PayHere Sri Lanka Gateway Integration (Recommended for .LK)

PayHere is Sri Lanka's leading Central Bank approved online payment aggregator. It allows you to accept:
- **International & Domestic Credit / Debit Cards**: Visa, Mastercard, AMEX
- **Sri Lankan Mobile Wallets**: Genie, eZ Cash, mCash, FriMi, Sampath Vishwa

### Step 1: Sign up & Get Credentials
1. Register your merchant account at [https://www.payhere.lk](https://www.payhere.lk).
2. Go to **Merchant Portal > Integrations > Domains & Credentials**.
3. Retrieve your:
   - `Merchant ID` (e.g., `1210000`)
   - `Merchant Secret` (Used to generate payment verification hash)

### Step 2: Configure in `js/payment.js`
Open [`js/payment.js`](file:///d:/1.%20Celebration%20Holdings/Web%20Site/New%20Web%20R2%202026%20Sept/js/payment.js) and update the `config.payhere` object:

```javascript
payhere: {
  merchantId: 'YOUR_PAYHERE_MERCHANT_ID', // Replace with your real Merchant ID
  isSandbox: false,                       // Change to false for Live payments
  sandboxUrl: 'https://sandbox.payhere.lk/pay/checkout',
  liveUrl: 'https://www.payhere.lk/pay/checkout',
  returnUrl: 'https://www.chpl.lk/order-success',
  cancelUrl: 'https://www.chpl.lk/order-cancelled',
  notifyUrl: 'https://www.chpl.lk/api/payhere-notify'
}
```

### Step 3: Server-side Webhook / Notify URL
When a customer completes payment on PayHere, PayHere sends a POST request to your `notifyUrl` with the following parameters:
- `merchant_id`
- `order_id`
- `payment_id`
- `payhere_amount`
- `payhere_currency`
- `status_code` (`2` means Successful)
- `md5sig` (Verification hash = `strtoupper(md5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + strtoupper(md5(merchant_secret))))`)

---

## 2. Stripe Gateway Integration (For Overseas Card Payments)

If you have a foreign entity or Stripe account for international buyers:
1. Obtain your `Publishable Key` (`pk_live_...`) from the Stripe Dashboard.
2. In `js/payment.js`, set:
   ```javascript
   stripe: {
     publishableKey: 'pk_live_YOUR_STRIPE_KEY',
     currency: 'usd'
   }
   ```
3. Load Stripe.js in `index.html`:
   ```html
   <script src="https://js.stripe.com/v3/"></script>
   ```

---

## 3. B2B Proforma Invoice & Wire Transfer Routing

For bulk orders and container shipments (FCL/LCL), buyers can choose **B2B Wire / Proforma Invoice** during checkout.
The following details are sent with the proforma:
- **Beneficiary**: Celebration Holdings (Private) Ltd
- **Bank**: Commercial Bank of Ceylon PLC / Hatton National Bank PLC
- **Branch**: Malabe, Sri Lanka
- **Currency Accounts**: USD, EUR, GBP, LKR
- **SWIFT / BIC Code**: Available upon request
