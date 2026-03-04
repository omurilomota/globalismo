/**
 * @fileoverview Componente de newsletter full-width para a home.
 *
 * Este componente é responsável por:
 * - Coletar email do usuário para inscrição na newsletter
 * - Validar formato do email antes do envio
 * - Enviar dados para API server-side
 * - Exibir estados de feedback (sucesso, erro, carregamento)
 * - Tratar erros da API
 *
 * @module components/ui/NewsletterFull
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Mail, Send } from 'lucide-react';

export default function NewsletterFull() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Por favor, insira seu email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Por favor, insira um email válido.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || data.error || 'Ocorreu um erro ao inscrever.');
        return;
      }

      setStatus('success');
      setMessage('Inscrição realizada com sucesso! Verifique seu email.');
      setEmail('');

    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
      setStatus('error');
      setMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 dark:from-blue-950 dark:via-blue-900 dark:to-purple-950 rounded-2xl p-8 md:p-16 my-12 overflow-hidden relative shadow-xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Cabeçalho com ícone e título */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
            Newsletter
          </h2>
        </div>

        {/* Descrição */}
        <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
          Receba as últimas análises sobre globalismo diretamente no seu email.
        </p>

        {/* Formulário */}
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-green-300 bg-green-900/30 p-6 rounded-xl max-w-md mx-auto">
            <CheckCircle className="w-8 h-8 flex-shrink-0" />
            <span className="text-lg">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                      setStatus('idle');
                      setMessage('');
                    }
                  }}
                  placeholder="Seu melhor email"
                  disabled={status === 'loading'}
                  className={`w-full px-6 py-4 rounded-xl border-2 transition-all bg-white/95 dark:bg-gray-800 text-lg text-gray-900 dark:text-white outline-none focus:ring-4 focus:border-transparent ${
                    status === 'error'
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-transparent focus:ring-blue-400/50'
                  }`}
                  aria-label="Seu melhor email"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[180px] shadow-lg hover:shadow-xl"
              >
                {status === 'loading' ? (
                  <span className="w-6 h-6 border-3 border-blue-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span className="text-lg">Inscrever</span>
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-red-300 mt-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-base">{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
