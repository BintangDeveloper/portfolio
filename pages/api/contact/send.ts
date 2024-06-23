// pages/api/contact/send.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const verifyTurnstileToken = async (token: string) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY!;
  const response = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', null, {
    params: {
      secret: secretKey,
      response: token,
    },
  });

  return response.data.success;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, subject, message, turnstileToken } = req.body;

    // Verify Turnstile token
    const isTokenValid = await verifyTurnstileToken(turnstileToken);
    if (!isTokenValid) {
      return res.status(400).json({ success: false, error: 'Invalid Turnstile token' });
    }

    // Process the contact form (e.g., send email)
    // ...

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
