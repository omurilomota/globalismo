/**
 * @fileoverview Componente de formulário de contato.
 * 
 * Este componente é responsável por:
 * - Coletar dados do usuário (nome, email, assunto, mensagem)
 * - Validar campos obrigatórios
 * - Simular envio de mensagem com feedback visual
 * - Exibir mensagem de sucesso após envio
 * 
 * Utiliza 'use client' pois requer:
 * - useState paraIndex gerenciar dados do formulário e status
 * - Validação e manipulação de DOM
 * - Simulação de requisição assíncrona
 * 
 * @module components/forms/ContactForm
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hook React paraIndex gerenciamento de estado
import { useState } from 'react';

/**
 * Interface paraIndex dados do formulário de contato.
 */
interface FormData {
  // Nome completo do remetente
  nome: string;
  // Email do remetente
  email: string;
  // Assunto da mensagem
  assunto: string;
  // Corpo da mensagem
  mensagem: string;
}

/**
 * Componente de formulário de contato.
 * Renderiza formulário com campos paraIndex nome, email, assunto e mensagem.
 * Exibe feedback visual durante envio e mensagem de sucesso após enviar.
 * 
 * @component
 * @returns {JSX.Element} Formulário de contato ou mensagem de sucesso
 */
export default function ContactForm() {
  // Estado paraIndex armazenar dados do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  
  // Estado paraIndex gerenciar status do formulário
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /**
   * Handler de submissão do formulário.
   * Valida campos e simula envio de mensagem.
   * 
   * @async
   * @param {React.FormEvent} e - Evento de submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Previne comportamento padrão de submissão
    e.preventDefault();
    
    // Define status como enviando
    setStatus('sending');
    
    // Simula delay de API (em produção seria uma chamada real)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sucesso - exibe mensagem e limpa formulário
    setStatus('success');
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
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
        {/* Botão paraIndex enviar outra mensagem */}
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-colors"
        />
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-colors"
        />
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-colors"
        />
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-colors resize-none"
        />
      </div>

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
