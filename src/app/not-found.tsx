import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página não encontrada'
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
          Página não encontrada
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
