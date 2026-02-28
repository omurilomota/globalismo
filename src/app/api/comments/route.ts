/**
 * @fileoverview API route for article comments.
 * 
 * @module app/api/comments/route
 * @author Globalismo
 * @version 1.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/rateLimit';
import { validateComment } from '@/lib/validation';

interface Comment {
  id: string;
  articleSlug: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  parentId?: string;
}

const comments: Comment[] = [];

export async function GET(request: NextRequest) {
  const rateLimitResult = await rateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const filtered = slug 
    ? comments.filter(c => c.articleSlug === slug)
    : comments;

  return NextResponse.json(filtered.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ));
}

export async function POST(request: NextRequest) {
  const rateLimitResult = await rateLimit(request);
  if (rateLimitResult) return rateLimitResult;

  try {
    const body = await request.json();
    const { articleSlug, author, email, content, parentId } = body;

    const validation = validateComment({ author, email, content, articleSlug });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      articleSlug,
      author: author.trim(),
      email: email.trim().toLowerCase(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      parentId: parentId || undefined,
    };

    comments.push(newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
