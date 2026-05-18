import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function HomePage() {
  const pets = await prisma.pet.findMany({
    include: { healthRecords: { orderBy: { date: 'desc' }, take: 1 } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">🐾 毛孩子小窝</h1>
        <p className="text-stone-500">记录它们的每一个重要时刻</p>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🐕</div>
          <h2 className="text-xl font-semibold text-stone-600 mb-2">还没有添加宠物</h2>
          <p className="text-stone-400 mb-6">添加你的第一只毛孩子吧</p>
          <Link
            href="/pets/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
          >
            <span>➕</span> 添加宠物
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {pets.map((pet) => (
            <Link
              key={pet.id}
              href={`/pets/${pet.id}`}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:shadow-md hover:border-orange-200 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {pet.avatarUrl || '🐾'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-stone-800">{pet.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                      {pet.species}
                    </span>
                  </div>
                  {pet.breed && <p className="text-sm text-stone-500 mb-1">{pet.breed}</p>}
                  <div className="flex gap-3 mt-2 text-xs text-stone-400">
                    {pet.birthDate && <span>🎂 {pet.birthDate}</span>}
                    {pet.weight && <span>⚖️ {pet.weight}kg</span>}
                    {pet.gender && <span>{pet.gender === '公' ? '♂️' : pet.gender === '母' ? '♀️' : ''} {pet.gender}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
