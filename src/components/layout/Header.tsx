/**
 * @fileoverview Componente de cabeçalho/navegação principal do site Globalismo.
 * 
 * Este componente é responsável por:
 * - Exibir o logo e nome do site
 * - Mostrar navegação desktop com links para as principais páginas
 * - Fornecer menu mobile (drawer) responsivo
 * - Implementar alternância de tema claro/escuro (dark mode)
 * - Indicar visualmente a página ativa
 * 
 * Utiliza 'use client' por ser um componente interativo que requer
 * estado React e manipulação do DOM para o tema e menu mobile.
 * 
 * @module components/layout/Header
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hooks React utilizados no componente
import { useState, useEffect, useSyncExternalStore } from 'react';

// Componente Link do Next.js para navegação interna
import Link from 'next/link';

// Hook usePathname do Next.js para obter a rota atual
import { usePathname } from 'next/navigation';

// Ícones da biblioteca Lucide React
import { Home, BookOpen, FileText, Mail, Sun, Moon, Globe, Menu, X } from 'lucide-react';

// Array de links de navegação do site
const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/sobre', label: 'Sobre', icon: BookOpen },
  { href: '/artigos', label: 'Artigos', icon: FileText },
  { href: '/contato', label: 'Contato', icon: Mail },
];

/**
 * Função para obter o estado atual do tema (claro ou escuro).
 * Retorna true se a classe 'dark' está presente no elemento HTML.
 * Função snapshot usada pelo useSyncExternalStore para SSR.
 */
function getThemeSnapshot() {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/**
 * Função subscribe para observar mudanças na classe 'dark' do HTML.
 * Usa MutationObserver para detectar alterações no elemento HTML.
 */
function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  if (typeof document !== 'undefined') {
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
  }
  return () => observer.disconnect();
}

/**
 * Componente principal de cabeçalho/navegação.
 * Funcionalidades:
 * - Logo com link para home
 * - Navegação desktop com links para as principais páginas
 * - Menu mobile (drawer) responsivo
 * - Botão de alternância de tema (dark/light mode)
 * - Destaque para página atual
 */
export default function Header() {
  // Estado para controlar a abertura/fechamento do menu mobile
  const [isOpen, setIsOpen] = useState(false);
  
  // Hook que retorna o pathname atual da rota
  const pathname = usePathname();
  
  // Hook useSyncExternalStore para gerenciar estado do tema
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false
  );

  // useEffect para aplicar o tema inicial ao carregar a página
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Função para alternar entre tema claro e escuro
  const toggleDarkMode = () => {
    const currentlyDark = document.documentElement.classList.contains('dark');
    
    if (currentlyDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Função para fechar o drawer/menu mobile
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Header fixo no topo da página */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Container flex para alinhar logo, nav e botões */}
          <div className="flex items-center justify-between h-16">
            {/* Logo do site com link para home */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Globe className="w-7 h-7 text-blue-900 dark:text-blue-400" />
              <span className="text-xl font-bold text-blue-900 dark:text-white font-serif">
                Globalismo
              </span>
            </Link>
            
            {/* Navegação desktop - oculta em mobile, visível a partir de md (768px) */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* Mapeia os links de navegação */}
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-green-600 dark:text-green-400' : ''}`} />
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Botão de alternância de tema (dark mode) */}
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Alternar tema"
              >
                {/* Condicional: mostra sol (claro) ou lua (escuro) */}
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </nav>

            {/* Container de botões para mobile - visível apenas em mobile */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Botão de dark mode para mobile */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
                aria-label="Alternar tema"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              {/* Botão de menu hamburger - abre o drawer mobile */}
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
                aria-label="Abrir menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay/backdrop do menu mobile - aparece quando o menu está aberto */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer/menu lateral mobile - slide in from the left */}
      <div className={`fixed top-0 left-0 z-50 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Cabeçalho do drawer com título e botão de fechar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-900 dark:text-blue-400" />
            <span className="text-lg font-bold text-blue-900 dark:text-white">Menu</span>
          </div>
          {/* Botão de fechar (X) */}
          <button 
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navegação do drawer */}
        <nav className="p-4 space-y-2">
          {/* Mapeia links para o menu mobile */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
