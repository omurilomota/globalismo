/**
 * @fileoverview API Route para inscrição na newsletter.
 *
 * Esta rota é responsável por:
 * - Receber email para inscrição na newsletter
 * - Validar dados no servidor
 * - Sanitizar dados para previnir XSS
 * - Enviar email de confirmação via Resend (produção)
 * - Simular inscrição (desenvolvimento)
 *
 * Endpoint: POST /api/newsletter
 *
 * @module app/api/newsletter/route
 * @author Globalismo
 * @version 1.1.0
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

    // Verificar se está em produção com Resend configurado
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'contato@globalismo.com.br';

    if (resendApiKey && resendApiKey !== 're_...') {
      // Produção: Enviar email via Resend
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Globalismo <onboarding@resend.dev>',
          to: [contactEmail],
          subject: 'Nova inscrição na newsletter',
          html: `
            <h2>Nova inscrição na newsletter</h2>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          `,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('Erro ao enviar email via Resend:', error);
        // Não falha a inscrição, apenas loga o erro
      }
    } else {
      // Desenvolvimento: Apenas loga
      console.log('[Newsletter] Nova inscrição:', sanitizedData.email);
    }

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

  // Por enquanto, sempre retorna que não existe
  return NextResponse.json({
    subscribed: false,
    email,
  });
}
