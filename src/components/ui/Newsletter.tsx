'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Newsletter() {
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

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Obrigado! Você foi inscrito com sucesso.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Erro ao inscribir. Tente novamente.');
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-blue-900 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
          Newsletter
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Receba as últimas análises sobre globalismo diretamente no seu email.
      </p>
      
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors"
              aria-label="Email para newsletter"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="sm:hidden lg:inline">Inscrever</span>
                </>
              )}
            </button>
          </div>
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
