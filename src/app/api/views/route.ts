/**
 * @fileoverview API Route para contagem de visualizações de artigos.
 *
 * Esta rota é responsável por:
 * - Incrementar contador de visualizações quando um artigo é acessado
 * - Retornar contagem atual de visualizações
 * - Retornar artigos mais lidos (top 5)
 *
 * Armazenamento: JSON file (em produção, usar banco de dados)
 *
 * Endpoint: POST /api/views - Incrementa visualização
 * Endpoint: GET /api/views - Retorna contagem do artigo
 * Endpoint: GET /api/views/top - Retorna artigos mais lidos
 *
 * @module app/api/views/route
 * @author Globalismo
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import artigosData from '@/data/artigos.json';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const VIEWS_FILE = path.join(process.cwd(), 'src', 'data', 'views.json');

/**
 * Lê as visualizações do arquivo JSON
 */
async function readViews(): Promise<Record<string, number>> {
  try {
    const data = await readFile(VIEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

/**
 * Escreve as visualizações no arquivo JSON
 */
async function writeViews(views: Record<string, number>): Promise<void> {
  await writeFile(VIEWS_FILE, JSON.stringify(views, null, 2));
}

/**
 * Handler POST - Incrementa visualização de um artigo
 */
export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug é obrigatório' }, { status: 400 });
    }

    const views = await readViews();
    views[slug] = (views[slug] || 0) + 1;
    await writeViews(views);

    return NextResponse.json({ slug, views: views[slug] });
  } catch (error) {
    console.error('Erro ao incrementar visualização:', error);
    return NextResponse.json({ error: 'Erro ao registrar visualização' }, { status: 500 });
  }
}

/**
 * Handler GET - Retorna contagem de visualizações ou top artigos
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const top = searchParams.get('top');

    const views = await readViews();

    // Retorna top artigos mais lidos
    if (top) {
      const limit = parseInt(top) || 5;
      const articlesWithViews = artigosData.artigos
        .map(article => ({
          ...article,
          visualizacoes: (article.visualizacoes || 0) + (views[article.slug] || 0),
        }))
        .sort((a, b) => b.visualizacoes - a.visualizacoes)
        .slice(0, limit);

      return NextResponse.json({ articles: articlesWithViews });
    }

    // Retorna visualizações de um artigo específico
    if (slug) {
      const article = artigosData.artigos.find(a => a.slug === slug);
      if (!article) {
        return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
      }

      const totalViews = (article.visualizacoes || 0) + (views[slug] || 0);
      return NextResponse.json({ slug, views: totalViews });
    }

    return NextResponse.json({ error: 'Parâmetro necessário: slug ou top' }, { status: 400 });
  } catch (error) {
    console.error('Erro ao buscar visualizações:', error);
    return NextResponse.json({ error: 'Erro ao buscar visualizações' }, { status: 500 });
  }
}
