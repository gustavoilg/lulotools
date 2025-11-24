"use client";

import { useState } from "react";

export default function PdfToImagePage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const convertPdfToImage = async () => {
    if (!pdfFile) return;
    setLoading(true);

    const reader = new FileReader();
    reader.readAsArrayBuffer(pdfFile);
    reader.onload = async () => {
      try {
        const pdfjs = await import("pdfjs-dist/build/pdf");
        await import("pdfjs-dist/build/pdf.worker.entry");

        pdfjs.GlobalWorkerOptions.workerSrc =
          "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

        const pdf = await pdfjs.getDocument(reader.result).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const img = canvas.toDataURL("image/png");
        setImageSrc(img);
      } catch (err) {
        alert("Erro ao converter PDF");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Converter PDF para Imagem</h1>

      <input
        type="file"
        accept="application/pdf"
        className="mb-4"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={convertPdfToImage}
        disabled={!pdfFile || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Convertendo..." : "Converter"}
      </button>

      {imageSrc && (
        <div className="mt-6">
          <img src={imageSrc} className="w-full border rounded" />
        </div>
      )}
    </div>
  );
}
