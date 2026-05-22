import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.dailyNote.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const note = await prisma.dailyNote.update({
    where: { id: params.id },
    data: {
      content: body.content,
      mood: body.mood,
    },
  });
  return NextResponse.json(note);
}
