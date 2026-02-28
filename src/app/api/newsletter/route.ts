/**
 * @fileoverview API Route para inscrição na newsletter.
 * 
 * Esta rota é responsável por:
 * - Receber email para inscrição na newsletter
 * - Validar dados no servidor
 * - Sanitizar dados para previnir XSS
 * - Simular inscrição (em produção, integrar com serviço de email)
 * 
 * Endpoint: POST /api/newsletter
 * 
 * @module app/api/newsletter/route
 * @author Globalismo
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { validateNewsletterForm, sanitizeNewsletterForm } from '@/lib/validation';

/**
 * Handler da rota POST para inscrição na newsletter.
 * 
 * @async
 * @function POST
 * @param {Request} request - Objeto de requisição do Next.js
 * @returns {Promise<NextResponse>} Resposta JSON com sucesso ou erros
 */
export async function POST(request: Request) {
  try {
    // Parse do body da requisição
    const body = await request.json();
    
    // Validar dados no servidor
    const validation = validateNewsletterForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Email inválido', errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Sanitizar dados para previnir XSS
    const sanitizedData = sanitizeNewsletterForm(body);
    
    // Simular inscrição em banco de dados ou serviço de email
    // Em produção, integrar com:
    // - Mailchimp
    // - ConvertKit
    // - SendGrid
    // - Resend
    // - AWS SES
    
    // Exemplo:
    // await db.newsletter.create({
    //   email: sanitizedData.email,
    //   subscribedAt: new Date(),
    //   source: 'website',
    // });
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Retornar sucesso
    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      data: {
        email: sanitizedData.email,
      },
    });
    
  } catch (error) {
    console.error('Erro ao processar inscrição na newsletter:', error);
    
    return NextResponse.json(
      { error: 'Erro ao processar solicitação. Tente novamente.' },
      { status: 500 }
    );
  }
}

/**
 * Handler da rota GET para verificar status da newsletter.
 * Útil para verificar se email já está cadastrado.
 * 
 * @async
 * @function GET
 * @param {Request} request - Objeto de requisição do Next.js
 * @returns {Promise<NextResponse>} Resposta JSON com status
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email é obrigatório' },
      { status: 400 }
    );
  }
  
  // Em produção, verificar no banco de dados
  // const existing = await db.newsletter.findUnique({ where: { email } });
  
  // Por enquanto, sempre retorna que não existe
  return NextResponse.json({
    subscribed: false,
    email,
  });
}
