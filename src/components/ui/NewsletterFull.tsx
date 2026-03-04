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
    <section className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8 my-8 border border-gray-200 dark:border-gray-700">
      <div className="max-w-3xl mx-auto text-center">
        {/* Cabeçalho com título */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Newsletter
          </h2>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Receba as últimas análises sobre globalismo diretamente no seu email.
        </p>

        {/* Formulário */}
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
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
                  className={`w-full px-4 py-2.5 rounded-lg border transition-colors bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:border-transparent ${
                    status === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-gray-400'
                  }`}
                  aria-label="Seu melhor email"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 dark:bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Inscrever</span>
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400 mt-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
