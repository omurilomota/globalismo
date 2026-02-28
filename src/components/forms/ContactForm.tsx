/**
 * @fileoverview Componente de formulário de contato.
 * 
 * Este componente é responsável por:
 * - Coletar dados do usuário (nome, email, assunto, mensagem)
 * - Validar campos obrigatórios no cliente
 * - Enviar dados para API server-side
 * - Exibir feedback visual durante envio
 * - Tratar erros da API
 * 
 * Utiliza 'use client' pois requer:
 * - useState para gerenciar dados do formulário e status
 * - fetch API para chamada server-side
 * - Validação e manipulação de DOM
 * 
 * @module components/forms/ContactForm
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hook React para gerenciamento de estado
import { useState } from 'react';

/**
 * Interface para dados do formulário de contato.
 */
interface FormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/**
 * Interface para erros de validação da API.
 */
interface ApiErrors {
  [key: string]: string;
}

/**
 * Componente de formulário de contato.
 * Renderiza formulário com campos para nome, email, assunto e mensagem.
 * Envia dados para API server-side e exibe feedback visual.
 * 
 * @component
 * @returns {JSX.Element} Formulário de contato ou mensagem de sucesso
 */
export default function ContactForm() {
  // Estado para armazenar dados do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  
  // Estado para gerenciar status do formulário
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  // Estado para armazenar erros da API
  const [errors, setErrors] = useState<ApiErrors>({});

  /**
   * Handler de submissão do formulário.
   * Envia dados para API server-side.
   * 
   * @async
   * @param {React.FormEvent} e - Evento de submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Previne comportamento padrão de submissão
    e.preventDefault();
    
    // Limpa erros anteriores
    setErrors({});
    
    // Define status como enviando
    setStatus('sending');
    
    try {
      // Envia dados para API server-side
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Parse da resposta
      const data = await response.json();
      
      // Verifica se houve erro na API
      if (!response.ok) {
        // Se há erros de validação, exibe eles
        if (data.errors) {
          setErrors(data.errors);
          setStatus('error');
        } else {
          // Erro genérico da API
          setStatus('error');
        }
        return;
      }
      
      // Sucesso - exibe mensagem e limpa formulário
      setStatus('success');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      
    } catch (error) {
      // Erro de rede ou conexão
      console.error('Erro ao enviar formulário:', error);
      setStatus('error');
    }
  };

  // Se mensagem foi enviada com sucesso, exibe confirmação
  if (status === 'success') {
    return (
      // Container de sucesso com styling verde
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        {/* Ícone de checkmark */}
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {/* Título da mensagem de sucesso */}
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">Mensagem enviada!</h3>
        {/* Descrição */}
        <p className="text-green-700 dark:text-green-500">Obrigado pelo contato. Responderemos em breve.</p>
        {/* Botão para enviar outra mensagem */}
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    // Formulário de contato
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo: Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          disabled={status === 'sending'}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
            errors.nome 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-gray-900 dark:focus:ring-white'
          } focus:ring-2 focus:border-transparent outline-none`}
        />
        {/* Erro de validação */}
        {errors.nome && (
          <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
        )}
      </div>

      {/* Campo: Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={status === 'sending'}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
            errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-gray-900 dark:focus:ring-white'
          } focus:ring-2 focus:border-transparent outline-none`}
        />
        {/* Erro de validação */}
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Campo: Assunto */}
      <div>
        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Assunto
        </label>
        <input
          type="text"
          id="assunto"
          required
          value={formData.assunto}
          onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
          disabled={status === 'sending'}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
            errors.assunto 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-gray-900 dark:focus:ring-white'
          } focus:ring-2 focus:border-transparent outline-none`}
        />
        {/* Erro de validação */}
        {errors.assunto && (
          <p className="mt-1 text-sm text-red-500">{errors.assunto}</p>
        )}
      </div>

      {/* Campo: Mensagem */}
      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          rows={5}
          required
          value={formData.mensagem}
          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
          disabled={status === 'sending'}
          className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none ${
            errors.mensagem 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-gray-900 dark:focus:ring-white'
          } focus:ring-2 focus:border-transparent outline-none`}
        />
        {/* Erro de validação */}
        {errors.mensagem && (
          <p className="mt-1 text-sm text-red-500">{errors.mensagem}</p>
        )}
      </div>

      {/* Mensagem de erro geral */}
      {status === 'error' && !Object.keys(errors).length && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            Erro ao enviar mensagem. Tente novamente.
          </p>
        </div>
      )}

      {/* Botão de submissão */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
}
