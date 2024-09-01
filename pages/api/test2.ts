import type { NextApiRequest, NextApiResponse } from 'next';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import * as fs from 'fs';
import * as path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | { message: string }>
) {
  try {
    // Define file path and read the image file
    const filePath = path.resolve('./public/gt.png'); // Ensure the file is in the public directory
    const image = fs.readFileSync(filePath);

    // Create the sticker
    const sticker = new Sticker(image, {
      pack: 'Testing',
      author: '@NaviAI',
      type: StickerTypes.FULL,
      categories: ['🎉'],
      id: '286090429',
      quality: 50,
      background: '#000000',
    });

    // Generate buffer from sticker, with webp output if `d=true`
    const downloadAsWebp = req.query.d === 'true';
    const buffer = downloadAsWebp ? await sticker.toBuffer('webp') : await sticker.toBuffer();

    // Set headers based on the format
    if (downloadAsWebp) {
      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Content-Disposition', 'attachment; filename="sticker.webp"');
    } else {
      res.setHeader('Content-Type', 'image/png');
    }

    // Send the image
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error generating sticker:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
