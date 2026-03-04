/**
 * @fileoverview Componente de inscrição na newsletter.
 *
 * Este componente é responsável por:
 * - Coletar email do usuário para inscrição na newsletter
 * - Validar formato do email antes do envio
 * - Enviar dados para API server-side
 * - Exibir estados de feedback (sucesso, erro, carregamento)
 * - Tratar erros da API
 *
 * Utiliza 'use client' pois requer:
 * - useState para gerenciar email, status e mensagens
 * - Validação de email no cliente
 * - Fetch API para chamada server-side
 *
 * @module components/ui/Newsletter
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Mail, Send } from 'lucide-react';

/**
 * Componente de newsletter.
 * Renderiza formulário de inscrição com validação de email
 * e estados de feedback visuais. Envia dados para API server-side.
 *
 * @component
 * @returns {JSX.Element} Container com formulário de newsletter
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');

  // Estado para gerenciar status: idle, loading, success, error
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Estado para mensagem de feedback
  const [message, setMessage] = useState('');

  /**
   * Handler de submissão do formulário.
   * Valida email e envia para API server-side.
   *
   * @async
   * @param {React.FormEvent} e - Evento de submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Previne comportamento padrão de submissão
    e.preventDefault();

    // Valida se email não está vazio
    if (!email.trim()) {
      setStatus('error');
      setMessage('Por favor, insira seu email.');
      return;
    }

    // Valida formato do email usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Por favor, insira um email válido.');
      return;
    }

    // Define estado como carregando
    setStatus('loading');
    setMessage('');

    try {
      // Envia dados para API server-side
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Parse da resposta
      const data = await response.json();

      // Verifica se houve erro na API
      if (!response.ok) {
        setStatus('error');
        setMessage(data.message || data.error || 'Ocorreu um erro ao inscrever.');
        return;
      }

      // Sucesso - limpa campos e exibe mensagem
      setStatus('success');
      setMessage('Inscrição realizada com sucesso!');
      setEmail('');

    } catch (error) {
      // Erro de rede ou conexão
      console.error('Erro ao enviar inscrição:', error);
      setStatus('error');
      setMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    // Container com styling de card - maior e mais atrativo
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 md:p-10 border border-blue-200 dark:border-blue-800 shadow-sm overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 pointer-events-none" />
      
      {/* Container com z-index para ficar acima da decoration */}
      <div className="relative">
        {/* Cabeçalho com ícone e título - maior e mais atrativo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-900 dark:bg-blue-700 rounded-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Newsletter
          </h3>
        </div>

        {/* Descrição do serviço - maior e mais proeminente */}
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Receba as últimas análises sobre globalismo diretamente no seu email.
        </p>

        {/* Se sucesso, exibe mensagem de confirmação */}
        {status === 'success' ? (
          <div className="flex items-center gap-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <span className="text-base">{message}</span>
          </div>
        ) : (
          // Formulário de inscrição
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Container do input e botão em coluna - melhor espaçamento */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Input de email - maior e mais confortável */}
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Limpa erro quando usuário começa a digitar
                    if (status === 'error') {
                      setStatus('idle');
                      setMessage('');
                    }
                  }}
                  placeholder="Seu melhor email"
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors bg-white dark:bg-gray-700 text-base text-gray-900 dark:text-white outline-none focus:ring-2 focus:border-transparent ${
                    status === 'error'
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-900 dark:focus:ring-blue-400'
                  }`}
                  aria-label="Seu melhor email"
                />
              </div>
              {/* Botão de submissão - maior e mais atrativo */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-6 py-3 bg-blue-900 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {/* Spinner de carregamento ou ícone de envio */}
                {status === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Inscrever</span>
                  </>
                )}
              </button>
            </div>

            {/* Mensagem de erro */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
