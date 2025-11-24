"use client";

import { useEffect, useState } from "react";

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const convert = async () => {
    if (!pdfFile) return;

    const arrayBuffer = await pdfFile.arrayBuffer();

    // @ts-ignore
    const pdfLib = window.PDFLib;
    const pdfDoc = await pdfLib.PDFDocument.load(arrayBuffer);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    const png = await pdfDoc.saveAsBase64({ dataUri: true });

    const newWindow = window.open();
    newWindow?.document.write(`
      <h2>Primeira página do PDF</h2>
      <img src="${png}" style="width:100%;max-width:800px;">
    `);
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

      <button
        onClick={convert}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Converter PDF
      </button>
    </div>
  );
}
