import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PetDetailPage({ params }: { params: { id: string } }) {
  const pet = await prisma.pet.findUnique({
    where: { id: params.id },
    include: {
      healthRecords: { orderBy: { date: 'desc' } },
      dailyNotes: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!pet) notFound();

  const ageStr = pet.birthDate
    ? `${Math.floor((Date.now() - new Date(pet.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} 岁`
    : '未知';

  return (
    <div>
      <Link href="/" className="text-sm text-stone-400 hover:text-stone-600 mb-4 inline-block">← 返回首页</Link>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center text-4xl">
            {pet.avatarUrl || '🐾'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-stone-800">{pet.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">{pet.species}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-500">
              {pet.breed && <span>🐾 {pet.breed}</span>}
              {pet.gender && <span>{pet.gender === '公' ? '♂️ 公' : '♀️ 母'}</span>}
              {pet.birthDate && <span>🎂 {pet.birthDate}</span>}
              {pet.weight && <span>⚖️ {pet.weight}kg</span>}
              <span>📅 {ageStr}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 健康记录 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
        <h2 className="font-bold text-lg text-stone-800 mb-4">💊 健康记录</h2>
        {pet.healthRecords.length === 0 ? (
          <p className="text-stone-400 text-sm">暂无健康记录</p>
        ) : (
          <div className="space-y-2">
            {pet.healthRecords.map(r => (
              <div key={r.id} className="flex items-center gap-3 py-2 border-b border-stone-50 last:border-0">
                <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-600 whitespace-nowrap">
                  {{ vaccination: '💉 疫苗', checkup: '🩺 体检', medication: '💊 用药', weight: '⚖️ 体重', other: '📋 其他' }[r.type] || r.type}
                </span>
                <span className="flex-1 text-sm text-stone-700">{r.title}</span>
                {r.value != null && <span className="text-sm text-stone-500">{r.value}{r.unit}</span>}
                <span className="text-xs text-stone-400">{r.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 日常笔记 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h2 className="font-bold text-lg text-stone-800 mb-4">📝 日常笔记</h2>
        {pet.dailyNotes.length === 0 ? (
          <p className="text-stone-400 text-sm">还没有笔记</p>
        ) : (
          <div className="space-y-3">
            {pet.dailyNotes.map(n => (
              <div key={n.id} className="p-4 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span>{{ happy: '😊', sad: '😢', neutral: '😐' }[n.mood || ''] || '📝'}</span>
                  <span className="text-xs text-stone-400">{new Date(n.createdAt).toLocaleDateString('zh-CN')}</span>
                </div>
                <p className="text-sm text-stone-700">{n.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
