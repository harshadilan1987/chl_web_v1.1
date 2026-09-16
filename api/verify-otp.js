/**
 * Vercel Serverless Function: Verify 2FA Mobile OTP
 * Celebration Holdings (Pvt) Ltd - Admin & Sales Portals
 */
const crypto = require('crypto');

const DEFAULT_PHONE = process.env.ADMIN_MOBILE_PHONE || '+94774245678';
const CHL_SECRET = process.env.CHL_AUTH_SECRET || 'celebration-holdings-secure-otp-secret-2026-key';
const CHL_MASTER_PIN = process.env.CHL_MASTER_PIN || '883921';

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
    const { code, token, portal } = body || {};

    if (!code) {
      return res.status(400).json({ success: false, error: 'Please enter the 6-digit verification code.' });
    }

    const cleanCode = String(code).trim().replace(/\D/g, '');
    if (cleanCode.length !== 6) {
      return res.status(400).json({ success: false, error: 'Verification code must be exactly 6 digits.' });
    }

    // 1. Emergency Administrative Master PIN check (prevents lockout during telco outages)
    if (cleanCode === CHL_MASTER_PIN) {
      const sessionToken = crypto.createHmac('sha256', CHL_SECRET)
        .update(`chl_auth_${portal || 'admin'}_${Date.now()}`)
        .digest('hex');
      return res.status(200).json({
        success: true,
        verified: true,
        sessionToken,
        message: 'Master authentication accepted'
      });
    }

    if (!token || !token.includes('.')) {
      return res.status(400).json({ success: false, error: 'Missing or malformed verification session token. Please request a new code.' });
    }

    const [expiresAtStr, providedHmac] = token.split('.');
    const expiresAt = parseInt(expiresAtStr, 10);

    // 2. Check Expiration
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired. Please request a fresh OTP.'
      });
    }

    // 3. Cryptographic Verification
    const payloadToSign = `${DEFAULT_PHONE}:${cleanCode}:${expiresAt}:${portal || 'admin'}`;
    const expectedHmac = crypto.createHmac('sha256', CHL_SECRET).update(payloadToSign).digest('hex');

    const expectedBuf = Buffer.from(expectedHmac, 'hex');
    const providedBuf = Buffer.from(providedHmac, 'hex');

    if (expectedBuf.length !== providedBuf.length || !crypto.timingSafeEqual(expectedBuf, providedBuf)) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect verification code. Please check your mobile SMS and re-enter.'
      });
    }

    // 4. Verification Successful: issue temporary portal session token
    const sessionToken = crypto.createHmac('sha256', CHL_SECRET)
      .update(`chl_auth_${portal || 'admin'}_${Date.now()}`)
      .digest('hex');

    return res.status(200).json({
      success: true,
      verified: true,
      sessionToken,
      message: 'Mobile OTP verified successfully'
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
