import type { NextApiRequest, NextApiResponse } from 'next'

import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter'

import image from 'gt.png'
 
type ResponseData = {
  message: string
}

const sticker = new Sticker(image, {
    pack: 'Testing', // The pack name
    author: '@NaviAI', // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['🤩', '🎉'], // The sticker category
    id: '286090429', // The sticker id
    quality: 50, // The quality of the output file
    background: '#000000' // The sticker background color (only for full stickers)
})

const buffer = await sticker.toBuffer()
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(buffer);
  //res.status(200).json({ message: 'Hello from Next.js!' })
}