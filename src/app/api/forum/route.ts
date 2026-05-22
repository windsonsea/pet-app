import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: 获取所有帖子
export async function GET() {
  const posts = await prisma.forumPost.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}

// POST: 发布新帖子
export async function POST(req: NextRequest) {
  const body = await req.json();
  const post = await prisma.forumPost.create({
    data: {
      author: body.author || '匿名',
      text: body.text,
      time: body.time || new Date().toLocaleString('zh-CN'),
    },
  });
  return NextResponse.json(post, { status: 201 });
}

// PUT: 编辑帖子
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const post = await prisma.forumPost.update({
    where: { id: body.id },
    data: {
      text: body.text,
    },
  });
  return NextResponse.json(post);
}

// DELETE: 删除帖子
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  await prisma.forumPost.delete({
    where: { id: body.id },
  });
  return NextResponse.json({ success: true });
}