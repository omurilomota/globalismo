'use client';

import { useState } from 'react';

interface FormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.assunto.trim()) {
      newErrors.assunto = 'Assunto é obrigatório';
    } else if (formData.assunto.trim().length < 3) {
      newErrors.assunto = 'Assunto deve ter pelo menos 3 caracteres';
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('sending');

    try {
      // TODO: Replace with actual API call to contact endpoint
      // Example implementation:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('Failed to send message');

      // Simulated API call for development
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('success');
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' });
      setErrors({});
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <div 
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
        role="alert"
        aria-live="polite"
      >
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">Mensagem enviada!</h3>
        <p className="text-green-700 dark:text-green-500">Obrigado pelo contato. Responderemos em breve.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div 
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
        role="alert"
        aria-live="assertive"
      >
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Erro ao enviar</h3>
        <p className="text-red-700 dark:text-red-500">Ocorreu um erro ao enviar sua mensagem. Tente novamente.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          aria-required="true"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'nome-error' : undefined}
          value={formData.nome}
          onChange={handleChange('nome')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors"
        />
        {errors.nome && (
          <p id="nome-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          value={formData.email}
          onChange={handleChange('email')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Assunto <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="assunto"
          name="assunto"
          required
          aria-required="true"
          aria-invalid={!!errors.assunto}
          aria-describedby={errors.assunto ? 'assunto-error' : undefined}
          value={formData.assunto}
          onChange={handleChange('assunto')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors"
        />
        {errors.assunto && (
          <p id="assunto-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.assunto}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mensagem <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          required
          aria-required="true"
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
          value={formData.mensagem}
          onChange={handleChange('mensagem')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors resize-none"
        />
        {errors.mensagem && (
          <p id="mensagem-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.mensagem}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:ring-offset-2"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
}
