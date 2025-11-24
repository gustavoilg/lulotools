import "./globals.css";

export const metadata = {
  title: "LuloTools",
  description: "Coleção de ferramentas online premium"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
