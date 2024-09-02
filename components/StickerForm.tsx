"use client";
import React, { useState } from 'react';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

// Utility function to convert File to Buffer
const fileToBuffer = (file: File): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(Buffer.from(reader.result as ArrayBuffer));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

function makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default function StickerForm() {
  const [image, setImage] = useState<File | null>(null);
  const [stickerUrl, setStickerUrl] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    try {
      const stickerUuid = makeid(16);
      // Convert File to Buffer
      const imageBuffer = await fileToBuffer(image);

      const sticker = new Sticker(imageBuffer, {
        pack: 'Sticker-' + stickerUuid, // The name of your sticker pack
        author: '@NaviAI', // Your name or brand
        id: stickerUuid,
        type: StickerTypes.FULL, // Sticker type
        quality: 70, // Quality of the sticker
      });

      const stickerData = await sticker.toBuffer();
      const stickerBlob = new Blob([stickerData], { type: 'image/webp' });
      const stickerUrl = URL.createObjectURL(stickerBlob);

      setStickerUrl(stickerUrl);
    } catch (error) {
      console.error('Error creating sticker:', error);
    }
  };

  return (
    <div>
      <h1>Convert Image to WhatsApp Sticker</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Convert to Sticker</button>
      </form>

      {stickerUrl && (
        <div>
          <h2>Your Sticker:</h2>
          <img src={stickerUrl} alt="WhatsApp Sticker" />
          <a href={stickerUrl} download="sticker.webp">Download Sticker</a>
        </div>
      )}
    </div>
  );
}
