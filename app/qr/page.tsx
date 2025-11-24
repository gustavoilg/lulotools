"use client";

import { useState, useEffect } from "react";

export default function QrPage() {
  const [text, setText] = useState("");
  const [qrImg, setQrImg] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const generate = () => {
    // @ts-ignore
    const QRCode = window.QRCode;

    QRCode.toDataURL(text, (err: any, url: string) => {
      if (!err) setQrImg(url);
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gerador de QR Code</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Digite algo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="bg-green-600 text-white p-2 rounded" onClick={generate}>
        Gerar
      </button>

      {qrImg && (
        <img src={qrImg} className="mt-6 w-48 mx-auto border rounded" />
      )}
    </div>
  );
}
