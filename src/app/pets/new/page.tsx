'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SPECIES = ['狗', '猫', '兔子', '仓鼠', '鸟', '鱼', '乌龟', '其他'];
const AVATARS: Record<string, string> = {
  '狗': '🐕', '猫': '🐱', '兔子': '🐰', '仓鼠': '🐹',
  '鸟': '🐦', '鱼': '🐟', '乌龟': '🐢', '其他': '🐾',
};

export default function NewPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', species: '狗', breed: '', birthDate: '',
    gender: '', weight: '', avatarUrl: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setLoading(true);
    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        weight: form.weight ? parseFloat(form.weight) : null,
        avatarUrl: form.avatarUrl || AVATARS[form.species] || '🐾',
      }),
    });
    if (res.ok) router.push('/');
    else { alert('添加失败'); setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-stone-800 mb-6 text-center">➕ 添加新宠物</h1>
      <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">名字 *</label>
          <input type="text" required value={form.name} placeholder="给TA取个名字~"
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">种类</label>
          <div className="grid grid-cols-4 gap-2">
            {SPECIES.map(s => (
              <button key={s} type="button"
                onClick={() => setForm({ ...form, species: s, avatarUrl: AVATARS[s] })}
                className={`py-2 rounded-lg text-sm font-medium transition ${
                  form.species === s ? 'bg-orange-500 text-white shadow' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}>
                {AVATARS[s]} {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">品种</label>
            <input type="text" value={form.breed} placeholder="如：金毛"
              onChange={e => setForm({ ...form, breed: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">性别</label>
            <select value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-400 outline-none transition">
              <option value="">未知</option>
              <option value="公">公 ♂</option>
              <option value="母">母 ♀</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">出生日期</label>
            <input type="date" value={form.birthDate}
              onChange={e => setForm({ ...form, birthDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-400 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">体重 (kg)</label>
            <input type="number" step="0.1" min="0" value={form.weight} placeholder="0.0"
              onChange={e => setForm({ ...form, weight: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-400 outline-none transition" />
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 disabled:opacity-50 transition">
          {loading ? '添加中...' : '✅ 确认添加'}
        </button>
      </form>
    </div>
  );
}
