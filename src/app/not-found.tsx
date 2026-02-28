/**
 * @fileoverview Página 404 (Not Found) do site Globalismo.
 *
 * Esta página é responsável por:
 * - Exibir mensagem de erro quando uma página não é encontrada
 * - Fornecer navegação de retorno para a página inicial
 * - Manter consistência visual com o design do site
 * - Oferecer links úteis para o usuário
 *
 * Este componente é automaticamente renderizado pelo Next.js
 * quando uma rota não corresponde a nenhuma página existente.
 *
 * @module app/not-found
 * @author Globalismo
 * @version 1.1.0
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { Globe, Home, BookOpen, FileText, Mail } from 'lucide-react';

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
  const quickLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/artigos', label: 'Artigos', icon: FileText },
    { href: '/sobre', label: 'Sobre', icon: BookOpen },
    { href: '/contato', label: 'Contato', icon: Mail },
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Ícone do globo */}
        <div className="flex justify-center mb-6">
          <Globe className="w-20 h-20 text-gray-300 dark:text-gray-600" />
        </div>

        {/* Código de erro 404 em destaque */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-200 dark:text-gray-700 mb-4">
          404
        </h1>

        {/* Mensagem principal de erro */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          Página não encontrada
        </h2>

        {/* Descrição do erro */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Ops! A página que você está procurando não existe ou foi movida.
        </p>

        {/* Botão principal para retornar à home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors mb-8"
        >
          <Home className="w-5 h-5" />
          Voltar para Home
        </Link>

        {/* Links rápidos */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Ou explore nosso conteúdo:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
