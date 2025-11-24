"use client";

import { useState, useEffect } from "react";

export default function QrPage() {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";
    document.body.appendChild(script);
  }, []);

  const generate = async () => {
    // @ts-ignore
    const QRCode = window.QRCode;
    
    QRCode.toDataURL(text, (err: any, url: string) => {
      if (err) return alert("Erro ao gerar QR");
      setQr(url);
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerador de QR Code</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Digite..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={generate} className="px-4 py-2 bg-green-600 text-white rounded">
        Gerar QR
      </button>

      {qr && <img src={qr} className="mt-6 w-48 mx-auto" />}
    </div>
  );
}
