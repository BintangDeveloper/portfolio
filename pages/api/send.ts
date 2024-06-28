// pages/api/send.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import crypto from 'crypto';

const verifyTurnstileToken = async (token: string, remoteip: string): Promise<boolean> => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY!;
  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token,
          remoteip: remoteip,
        },
      }
    );
    return response.data.success;
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return false;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, subject, message, turnstileToken } = req.body;
  const remoteip = req.headers['x-forwarded-for'] || req.headers['CF-Connecting-IP'] || req.socket.remoteAddress;
  const idempotencyKey = req.headers['idempotency-key'] || crypto.randomBytes(16).toString('hex');

  if (!email || !subject || !message || !turnstileToken) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const isTokenValid = await verifyTurnstileToken(turnstileToken, remoteip as string);
  if (!isTokenValid) {
    return res.status(400).json({ success: false, error: 'Invalid Turnstile token' });
  }

  try {
    // Process the contact form (e.g., send email)
    // Include idempotencyKey in your processing logic if needed
    // ...

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default handler;
