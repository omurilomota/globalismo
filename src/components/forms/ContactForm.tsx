'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('success');
    setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">Mensagem enviada!</h3>
        <p className="text-green-700 dark:text-green-500">Obrigado pelo contato. Responderemos em breve.</p>
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
