"use client";

import { useState } from "react";

export default function RemoveBgPage() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const removeBackground = async () => {
    if (!image) return;

    const bitmap = await createImageBitmap(image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    ctx.drawImage(bitmap, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // remover fundo branco / claro
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      if (r > 200 && g > 200 && b > 200) {
        imageData.data[i + 3] = 0; // transparência
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setResult(canvas.toDataURL("image/png"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Removedor de Fundo</h1>

      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button
        onClick={removeBackground}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Remover fundo
      </button>

      {result && (
        <div className="mt-6">
          <img src={result} className="w-full border rounded" />
        </div>
      )}
    </div>
  );
}
