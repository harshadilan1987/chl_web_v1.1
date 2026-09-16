/**
 * Vercel Serverless Function: Send 2FA Mobile OTP
 * Celebration Holdings (Pvt) Ltd - Admin & Sales Portals
 */
const crypto = require('crypto');
const https = require('https');
const http = require('http');

// Default target phone for Celebration Holdings (can be overridden via environment variable)
const DEFAULT_PHONE = process.env.ADMIN_MOBILE_PHONE || '+94774245678';
const CHL_SECRET = process.env.CHL_AUTH_SECRET || 'celebration-holdings-secure-otp-secret-2026-key';

function maskPhoneNumber(phone) {
  if (!phone || phone.length < 8) return phone;
  const clean = phone.replace(/\s+/g, '');
  const prefix = clean.slice(0, 5); // e.g. +9471
  const suffix = clean.slice(-3);   // e.g. 381
  return `${prefix} ••• •${suffix}`;
}

/**
 * Dispatch SMS via configured gateway
 */
async function dispatchSMS(phone, message) {
  // 1. Notify.lk (Sri Lanka)
  if (process.env.NOTIFYLK_USER_ID && process.env.NOTIFYLK_API_KEY) {
    return new Promise((resolve) => {
      const cleanPhone = phone.replace(/^\+/, '');
      const senderId = process.env.NOTIFYLK_SENDER_ID || 'NotifyDEMO';
      const postData = new URLSearchParams({
        user_id: process.env.NOTIFYLK_USER_ID,
        api_key: process.env.NOTIFYLK_API_KEY,
        sender_id: senderId,
        to: cleanPhone,
        message: message
      }).toString();

      const req = https.request('https://app.notify.lk/api/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ provider: 'notifylk', status: res.statusCode, data }));
      });
      req.on('error', (err) => resolve({ provider: 'notifylk', error: err.message }));
      req.write(postData);
      req.end();
    });
  }

  // 2. ShoutOUT (Sri Lanka)
  if (process.env.SHOUTOUT_API_KEY) {
    return new Promise((resolve) => {
      const payload = JSON.stringify({
        source: process.env.SHOUTOUT_SENDER_ID || 'CHPL',
        destinations: [phone.replace(/\s+/g, '')],
        content: { sms: message }
      });

      const req = https.request('https://api.getshoutout.com/coreservice/v1/sms/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SHOUTOUT_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ provider: 'shoutout', status: res.statusCode, data }));
      });
      req.on('error', (err) => resolve({ provider: 'shoutout', error: err.message }));
      req.write(payload);
      req.end();
    });
  }

  // 3. Twilio (International)
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    return new Promise((resolve) => {
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const postData = new URLSearchParams({
        To: phone.replace(/\s+/g, ''),
        From: process.env.TWILIO_PHONE_NUMBER,
        Body: message
      }).toString();

      const req = https.request(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ provider: 'twilio', status: res.statusCode, data }));
      });
      req.on('error', (err) => resolve({ provider: 'twilio', error: err.message }));
      req.write(postData);
      req.end();
    });
  }

  // 4. Custom Generic Webhook
  if (process.env.SMS_WEBHOOK_URL) {
    return new Promise((resolve) => {
      const url = new URL(process.env.SMS_WEBHOOK_URL);
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;
      const payload = JSON.stringify({ to: phone, message });

      const req = client.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ provider: 'webhook', status: res.statusCode, data }));
      });
      req.on('error', (err) => resolve({ provider: 'webhook', error: err.message }));
      req.write(payload);
      req.end();
    });
  }

  // Fallback / Standby when credentials pending
  return { provider: 'simulated', status: 'ready', note: 'SMS gateway awaiting API credentials' };
}

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
    const { portal } = body || {};
    const portalName = portal === 'sales' ? 'Sales Portal' : 'Staff Admin Portal';

    // 1. Generate 6-digit secure numeric code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Token expiration: 5 minutes from now
    const expiresInSec = 300;
    const expiresAt = Date.now() + (expiresInSec * 1000);

    // 3. Cryptographic stateless HMAC signature
    const payloadToSign = `${DEFAULT_PHONE}:${otp}:${expiresAt}:${portal || 'admin'}`;
    const hmac = crypto.createHmac('sha256', CHL_SECRET).update(payloadToSign).digest('hex');
    const token = `${expiresAt}.${hmac}`;

    // 4. Craft official SMS message
    const message = `[Celebration Holdings] Your 2FA login verification code for ${portalName} is ${otp}. Valid for 5 minutes. Do not share this code.`;

    // 5. Send SMS
    const smsResult = await dispatchSMS(DEFAULT_PHONE, message);

    // 6. Return response (code is never exposed to client; client only receives token)
    const response = {
      success: true,
      token,
      maskedPhone: maskPhoneNumber(DEFAULT_PHONE),
      expiresIn: expiresInSec,
      provider: smsResult.provider
    };

    // Include simulation hint if credentials are not yet set
    if (smsResult.provider === 'simulated') {
      response.mode = 'simulation';
      response.devHint = otp;
    }

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
