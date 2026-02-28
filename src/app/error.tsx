/**
 * @fileoverview Global error boundary for the application.
 * 
 * @module app/error
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Algo deu errado
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Desculpe, ocorreu um erro ao carregar esta página.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
