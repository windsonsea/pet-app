import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const pet = await prisma.pet.findUnique({
    where: { id: params.id },
    include: {
      healthRecords: { orderBy: { date: 'desc' } },
      dailyNotes: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!pet) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(pet);
}
