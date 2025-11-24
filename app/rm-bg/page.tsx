"use client";

import { useState } from "react";

export default function RemoveBgPage() {
  const [img, setImg] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const removeBg = async () => {
    if (!img) return;

    const bitmap = await createImageBitmap(img);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    ctx.drawImage(bitmap, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Remove branco
    for (let i = 0; i < data.data.length; i += 4) {
      if (data.data[i] > 230 && data.data[i + 1] > 230 && data.data[i + 2] > 230) {
        data.data[i + 3] = 0;
      }
    }

    ctx.putImageData(data, 0, 0);

    setResult(canvas.toDataURL("image/png"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Removedor de Fundo</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImg(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={removeBg}>
        Remover
      </button>

      {result && <img src={result} className="mt-6 w-full rounded shadow" />}
    </div>
  );
}
