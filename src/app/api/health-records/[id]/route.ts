import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.healthRecord.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const record = await prisma.healthRecord.update({
    where: { id: params.id },
    data: {
      type: body.type,
      title: body.title,
      note: body.note ?? null,
      value: body.value ? parseFloat(body.value) : null,
      unit: body.unit ?? null,
      date: body.date,
    },
  });
  return NextResponse.json(record);
}
