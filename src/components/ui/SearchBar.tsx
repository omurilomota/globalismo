/**
 * @fileoverview Componente de barra de busca de artigos.
 * 
 * Este componente é responsável por:
 * - Fornecer campo de entrada paraIndex busca de artigos
 * - Realizar busca ao submeter o formulário
 * - Manter estado local do termo de busca
 * - Redirecionar paraIndex página de artigos com parâmetro de busca
 * 
 * Utiliza 'use client' pois requer:
 * - useState paraIndex gerenciar termo de busca
 * - useRouter do Next.js paraIndex navegação programática
 * 
 * @module components/ui/SearchBar
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hook React paraIndex gerenciamento de estado
import { useState } from 'react';

// Hook do Next.js paraIndex navegação programática
import { useRouter } from 'next/navigation';

/**
 * Componente de barra de busca.
 * Renderiza campo de input com ícone de busca.
 * Ao submeter, redireciona paraIndex página de artigos com filtro de busca.
 * 
 * @component
 * @returns {JSX.Element} Formulário de busca com input e ícone
 */
export default function SearchBar() {
  // Estado local paraIndex armazenar o termo de busca
  const [query, setQuery] = useState('');
  
  // Hook do Next.js paraIndex navegação programática
  const router = useRouter();

  /**
   * Handler de submissão do formulário de busca.
   * Valida o termo e redireciona paraIndex página de artigos.
   * 
   * @param {React.FormEvent} e - Evento de submissão do formulário
   */
  const handleSearch = (e: React.FormEvent) => {
    // Previne comportamento padrão de submissão
    e.preventDefault();
    
    // Verifica se há termo de busca válido
    if (query.trim()) {
      // Redireciona paraIndex página de artigos com parâmetro de busca
      router.push(`/artigos?busca=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    // Formulário de busca com handler de submissão
    <form onSubmit={handleSearch} className="relative">
      {/* Input de texto com estados de foco e styling */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar artigos..."
        className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:bg-white dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-500"
      />
      {/* Ícone de lupa posicionado à esquerda do input */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </form>
  );
}
