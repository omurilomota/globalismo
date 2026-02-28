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

// Hook React para gerenciamento de estado
import { useState } from 'react';

// Ícones da biblioteca Lucide React
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Componente de newsletter.
 * Renderiza formulário de inscrição com validação de email
 * e estados de feedback visuais. Envia dados para API server-side.
 * 
 * @component
 * @returns {JSX.Element} Container com formulário de newsletter
 */
export default function Newsletter() {
  // Estado para armazenar email inserido
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
        setMessage(data.message || data.error || 'Erro ao inscribir. Tente novamente.');
        return;
      }
      
      // Sucesso - limpa campos e exibe mensagem
      setStatus('success');
      setMessage('Obrigado! Você foi inscrito com sucesso.');
      setEmail('');
      
    } catch (error) {
      // Erro de rede ou conexão
      console.error('Erro ao enviar inscrição:', error);
      setStatus('error');
      setMessage('Erro ao inscribir. Tente novamente.');
    }
  };

  return (
    // Container com styling de card
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
      {/* Cabeçalho com ícone e título */}
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-blue-900 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
          Newsletter
        </h3>
      </div>
      
      {/* Descrição do serviço */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Receba as últimas análises sobre globalismo diretamente no seu email.
      </p>
      
      {/* Se sucesso, exibe mensagem de confirmação */}
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm">{message}</span>
        </div>
      ) : (
        // Formulário de inscrição
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Container do input e botão */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Input de email */}
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
              className={`flex-1 px-4 py-2 rounded-lg border transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none min-h-[42px] ${
                status === 'error'
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent'
              }`}
              aria-label="Email para newsletter"
            />
            {/* Botão de submissão */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap min-h-[42px]"
            >
              {/* Spinner de carregamento ou ícone de envio */}
              {status === 'loading' ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Inscrever</span>
                </>
              )}
            </button>
          </div>
          
          {/* Mensagem de erro */}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
