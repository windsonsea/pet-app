import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const record = await prisma.healthRecord.create({
    data: {
      petId: body.petId,
      type: body.type,
      title: body.title,
      note: body.note || null,
      value: body.value ? parseFloat(body.value) : null,
      unit: body.unit || null,
      date: body.date,
    },
  });
  return NextResponse.json(record, { status: 201 });
}
