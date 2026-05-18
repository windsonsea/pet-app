import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const pets = await prisma.pet.findMany({
    include: { _count: { select: { healthRecords: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(pets);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pet = await prisma.pet.create({
    data: {
      name: body.name,
      species: body.species,
      breed: body.breed || '',
      birthDate: body.birthDate || null,
      gender: body.gender || null,
      weight: body.weight || null,
      avatarUrl: body.avatarUrl || '🐾',
    },
  });
  return NextResponse.json(pet, { status: 201 });
}
