import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  
  const checkins = await prisma.checkin.findMany({
    where: { date: today },
    orderBy: { createdAt: 'desc' },
  });
  
  return NextResponse.json(checkins);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const today = new Date().toISOString().split('T')[0];
  
  const checkin = await prisma.checkin.upsert({
    where: {
      id: body.id || 'new-' + body.type + '-' + today,
    },
    update: {
      completed: body.completed,
      note: body.note,
    },
    create: {
      type: body.type || 'health',
      date: today,
      completed: body.completed ?? true,
      note: body.note,
    },
  });
  
  return NextResponse.json(checkin, { status: 201 });
}