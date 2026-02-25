import { NextResponse } from 'next/server';
import { IArticle } from '@/types';
import artigosData from '@/data/artigos.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;
  const article = artigos.find(a => a.slug === slug);

  if (!article) {
    return NextResponse.json(
      { error: 'Artigo não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(article);
}
