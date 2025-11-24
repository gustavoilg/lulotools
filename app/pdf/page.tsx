"use client";

import { useState } from "react";

export default function PdfToImagePage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const convertPdf = async () => {
    if (!pdfFile) return;

    const buffer = await pdfFile.arrayBuffer();
    const pdfjsLib = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.min.mjs");

    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    setImageSrc(canvas.toDataURL("image/png"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Converter PDF para Imagem</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={convertPdf}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Converter
      </button>

      {imageSrc && <img src={imageSrc} className="mt-6 w-full rounded shadow" />}
    </div>
  );
}
