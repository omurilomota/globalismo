import { NextResponse } from 'next/server';
import { IArticle, IPaginatedResult } from '@/types';
import artigosData from '@/data/artigos.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const categoria = searchParams.get('categoria');
  const busca = searchParams.get('busca');

  let artigos: IArticle[] = [...(artigosData as { artigos: IArticle[] }).artigos];

  if (categoria) {
    artigos = artigos.filter(a => 
      a.categorias.some(c => c.toLowerCase() === categoria.toLowerCase())
    );
  }

  if (busca) {
    const searchLower = busca.toLowerCase();
    artigos = artigos.filter(a => 
      a.titulo.toLowerCase().includes(searchLower) ||
      a.resumo.toLowerCase().includes(searchLower) ||
      a.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  artigos.sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime());

  const total = artigos.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedArticles = artigos.slice(startIndex, startIndex + limit);

  const result: IPaginatedResult = {
    artigos: paginatedArticles,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  };

  return NextResponse.json(result);
}
