import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipe Genius - 智能大厨",
  description: "上传食材，获取美味菜谱。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen text-gray-900 font-sans">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <header className="mb-8 text-center py-6 border-b border-orange-200">
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-3 tracking-tight">
              Recipe Genius 智能大厨 🍳
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              拍下您的食材，让 AI 为您定制美味佳肴！
            </p>
            <div className="mt-4 flex justify-center">
              <Link
                href="/flag"
                className="px-4 py-2 rounded-full text-sm font-medium bg-orange-600 text-white"
              >
                IRIS出品
              </Link>
            </div>
          </header>
          {children}
          <footer className="mt-12 text-center text-sm text-gray-500 py-6 border-t border-gray-200">
            <p>彩虹代码</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
