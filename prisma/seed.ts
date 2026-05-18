import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 清空旧数据
  await prisma.healthRecord.deleteMany();
  await prisma.dailyNote.deleteMany();
  await prisma.pet.deleteMany();

  // 创建示例宠物
  const doudou = await prisma.pet.create({
    data: {
      name: '豆豆',
      species: '狗',
      breed: '金毛寻回犬',
      birthDate: '2024-06-15',
      gender: '公',
      weight: 28.5,
      avatarUrl: '🐕',
      healthRecords: {
        create: [
          { type: 'vaccination', title: '狂犬疫苗', note: '年度接种', date: '2025-03-10' },
          { type: 'weight', title: '体重记录', value: 28.5, unit: 'kg', date: '2025-05-01' },
          { type: 'checkup', title: '年度体检', note: '一切正常，牙齿有点黄', date: '2025-04-15' },
          { type: 'weight', title: '体重记录', value: 27.8, unit: 'kg', date: '2025-03-01' },
          { type: 'weight', title: '体重记录', value: 27.0, unit: 'kg', date: '2025-01-15' },
        ],
      },
      dailyNotes: {
        create: [
          { content: '今天带豆豆去公园散步，遇到了好多小伙伴！', mood: 'happy' },
          { content: '新买的狗粮豆豆不太爱吃…明天换回原来的牌子', mood: 'neutral' },
          { content: '豆豆学会坐下握手了，太聪明了！', mood: 'happy' },
        ],
      },
    },
  });

  const mimi = await prisma.pet.create({
    data: {
      name: '咪咪',
      species: '猫',
      breed: '英短蓝猫',
      birthDate: '2023-09-01',
      gender: '母',
      weight: 4.2,
      avatarUrl: '🐱',
      healthRecords: {
        create: [
          { type: 'vaccination', title: '猫三联疫苗', note: '第三针加强', date: '2025-02-20' },
          { type: 'weight', title: '体重记录', value: 4.2, unit: 'kg', date: '2025-05-10' },
          { type: 'weight', title: '体重记录', value: 3.9, unit: 'kg', date: '2025-03-10' },
          { type: 'medication', title: '驱虫药', note: '体内外一体驱虫', date: '2025-04-01' },
        ],
      },
      dailyNotes: {
        create: [
          { content: '咪咪今天抓到了一只飞蛾，骄傲地叼过来给我看 😂', mood: 'happy' },
          { content: '新买的猫爬架到了，咪咪很喜欢，一直在最高层睡觉', mood: 'happy' },
          { content: '今天剪指甲很不配合，被抓了一下 😢', mood: 'sad' },
        ],
      },
    },
  });

  console.log('✅ 种子数据已创建！');
  console.log(`  🐕 ${doudou.name} (${doudou.species})`);
  console.log(`  🐱 ${mimi.name} (${mimi.species})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
