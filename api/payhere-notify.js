/**
 * Vercel Serverless Function: PayHere Webhook Listener (IPN Notification)
 * Celebration Holdings (Pvt) Ltd
 */
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const body = req.body || {};
    const merchant_id = body.merchant_id;
    const order_id = body.order_id;
    const payhere_amount = body.payhere_amount;
    const payhere_currency = body.payhere_currency;
    const status_code = body.status_code; // 2 = success, 0 = pending, -1 = canceled, -2 = failed, -3 = chargedback
    const md5sig = body.md5sig;

    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET || 'NDA4NTM2NzI0ODI0Mjg0NTk2NTMyNDM5Mzg4OTI0MTI4ODU4MTE4Mw==';
    const hashedSecret = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();

    // md5sig = strtoupper(md5(merchant_id + order_id + payhere_amount + payhere_currency + status_code + strtoupper(md5(merchant_secret))))
    const data = merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret;
    const expectedSig = crypto.createHash('md5').update(data).digest('hex').toUpperCase();

    if (md5sig === expectedSig && status_code === '2') {
      console.log(`[PayHere Webhook] Verified Payment Successful for Order: ${order_id}`);
      return res.status(200).send('OK');
    } else {
      console.warn(`[PayHere Webhook] Signature mismatch or non-success code (${status_code}) for Order: ${order_id}`);
      return res.status(400).send('Signature Verification Failed');
    }
  } catch (err) {
    console.error('[PayHere Webhook Error]', err);
    return res.status(500).send('Internal Server Error');
  }
};
