"use client";
import React, { useState } from 'react';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

export default function StickerForm() {
  const [image, setImage] = useState(null);
  const [stickerUrl, setStickerUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
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
