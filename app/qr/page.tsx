"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QrPage() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState<string | null>(null);

  const generateQr = async () => {
    try {
      const qrCodeUrl = await QRCode.toDataURL(text);
      setQr(qrCodeUrl);
    } catch (err) {
      alert("Erro ao gerar QR Code");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerador de QR Code</h1>

      <input
        type="text"
        placeholder="Digite algo..."
        className="border p-2 rounded w-full mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generateQr}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Gerar QR
      </button>

      {qr && (
        <div className="mt-6">
          <img src={qr} className="w-48 mx-auto" />
        </div>
      )}
    </div>
  );
}
