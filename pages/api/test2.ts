import type { NextApiRequest, NextApiResponse } from 'next'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import * as fs from 'fs'
import * as path from 'path'

// Define the API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void> // Use `void` because we are sending an image, not JSON
) {
  try {
    // Define file path and read the image file
    const filePath = path.resolve('@/public/gt.png'); // Ensure the file is in the public directory
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

    // Generate buffer from sticker
    const buffer = await sticker.toBuffer();

    // Set the content type and send the image
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Error generating sticker:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
