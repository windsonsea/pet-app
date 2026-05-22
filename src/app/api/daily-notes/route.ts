import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const note = await prisma.dailyNote.create({
    data: {
      petId: body.petId,
      content: body.content,
      mood: body.mood || 'neutral',
    },
  });
  return NextResponse.json(note, { status: 201 });
}
