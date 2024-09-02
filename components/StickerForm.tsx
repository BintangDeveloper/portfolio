"use client";
import React, { useState } from 'react';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

export default function StickerForm() {
  const [image, setImage] = useState<File | null>(null);
  const [stickerUrl, setStickerUrl] = useState<string>('');

  // Type for the event is React.ChangeEvent<HTMLInputElement>
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  // Type for the event is React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    try {
      const sticker = new Sticker(image, {
        pack: 'MyPack', // The name of your sticker pack
        author: 'MyAuthor', // Your name or brand
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
