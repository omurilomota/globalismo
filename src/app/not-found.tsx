/**
 * @fileoverview Página 404 (Not Found) do site Globalismo.
 * 
 * Esta página é responsável por:
 * - Exibir mensagem de erro quando uma página não é encontrada
 * - Fornecer navegação de retorno para a página inicial
 * - Manter consistência visual com o design do site
 * 
 * Este componente é automaticamente renderizado pelo Next.js
 * quando uma rota não corresponde a nenhuma página existente.
 * 
 * @module app/not-found
 * @author Globalismo
 * @version 1.0.0
 */

import Link from 'next/link';
import { Metadata } from 'next';

// Configuração de metadados para a página 404
export const metadata: Metadata = {
  title: 'Página não encontrada'
};

/**
 * Componente de página 404 - Página Não Encontrada.
 * Exibe mensagem de erro amigável com opção de retornar ao início.
 * 
 * @component
 * @returns {JSX.Element} Página de erro 404 com link para home
 */
export default function NotFound() {
  return (
    // Container com altura mínima de 60% da viewport, centralizado
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Código de erro 404 em destaque */}
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
        
        {/* Mensagem principal de erro */}
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">
          Página não encontrada
        </p>
        
        {/* Descrição do erro */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        {/* Botão/link para retornar à página inicial */}
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
