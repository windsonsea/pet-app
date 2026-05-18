import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '🐾 宠物管家',
  description: '记录毛孩子的每一个重要时刻',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-white/80 backdrop-blur border-b border-orange-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-lg text-orange-600">
              <span>🐾</span> 宠物管家
            </a>
            <nav className="flex gap-1">
              <a href="/" className="px-2 py-1 text-sm text-stone-600 hover:text-orange-600 rounded transition-colors">首页</a>
              <a href="/pets/new" className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">➕ 添加宠物</a>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
