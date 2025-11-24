"use client";

import { useState, useEffect } from "react";

export default function PdfToImagePage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    // Adiciona PDF.js no navegador
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const convert = async () => {
    if (!pdfFile) return;

    const arrayBuffer = await pdfFile.arrayBuffer();

    // @ts-ignore
    const pdfjsLib = window["pdfjs-dist/build/pdf"];

    // @ts-ignore
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    const img = canvas.toDataURL("image/png");
    const win = window.open();
    win?.document.write(`<img src="${img}" style="width:100%">`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Conversor PDF → Imagem</h1>

      <input
        type="file"
        accept="application/pdf"
        className="mb-4"
        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
      />

      <button className="bg-blue-600 text-white p-2 rounded" onClick={convert}>
        Converter
      </button>
    </div>
  );
}
