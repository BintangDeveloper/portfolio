// pages/api/send.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const verifyTurnstileToken = async (token: string, remoteip: string): Promise<{ success: boolean, data?: any }> => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY!;
  
  const data = {
    secret: secretKey,
    response: token,
    remoteip: remoteip
  };
  const JSONdata = JSON.stringify(data);
  
  const options = {
    // The method is POST because we are sending data.
    method: "POST",
    // Tell the server we're sending JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  };
  
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      options
    );
    const results = await response.json(); // await the response
    return { success: results.success, data: results };
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return { success: false, data: error };
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const debug = req.query.debug === 'true';

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, subject, message, turnstileToken } = req.body;
  const forwarded = req.headers['x-forwarded-for'] as string;
  const remoteip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  const idempotencyKey = req.headers['idempotency-key'] || crypto.randomBytes(16).toString('hex');

  if (!email || !subject || !message || !turnstileToken) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const verificationResult = await verifyTurnstileToken(turnstileToken, remoteip as string);
  const isTokenValid = verificationResult.success;

  if (!isTokenValid) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid Turnstile token', 
      ...(debug && { verificationResult })
    });
  }

  try {
    // Process the contact form (e.g., send email)
    // Include idempotencyKey in your processing logic if needed
    // ...

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully', 
      ...(debug && { email, subject, message, turnstileToken, remoteip, idempotencyKey })
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal Server Error', 
      ...(debug && { error })
    });
  }
};

export default handler;
