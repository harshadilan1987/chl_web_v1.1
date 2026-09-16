/**
 * Vercel Serverless Function: Secure PayHere Hash Generator
 * Celebration Holdings (Pvt) Ltd
 */
const crypto = require('crypto');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {}
    }
    const { order_id, amount, currency } = body || {};

    if (!order_id || !amount || !currency) {
      return res.status(400).json({ error: 'Missing order_id, amount, or currency' });
    }

    const merchant_id = process.env.PAYHERE_MERCHANT_ID || '261612';
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET || 'NDA4NTM2NzI0ODI0Mjg0NTk2NTMyNDM5Mzg4OTI0MTI4ODU4MTE4Mw==';

    const hashedSecret = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();
    const amountFormatted = parseFloat(amount).toFixed(2);
    const data = merchant_id + order_id + amountFormatted + currency + hashedSecret;
    const hash = crypto.createHash('md5').update(data).digest('hex').toUpperCase();

    return res.status(200).json({
      merchant_id,
      order_id,
      amount: amountFormatted,
      currency,
      hash
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
