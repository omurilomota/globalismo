/**
 * @fileoverview Componente de cabeçalho/navegação principal do site Globalismo.
 *
 * Este componente é responsável por:
 * - Exibir o logo e nome do site
 * - Mostrar navegação desktop com links para as principais páginas
 * - Fornecer menu mobile (drawer) responsivo
 * - Implementar alternância de tema claro/escuro (dark mode)
 * - Indicar visualmente a página ativa
 * - Seletor de idioma
 *
 * Utiliza 'use client' por ser um componente interativo que requer
 * estado React e manipulação do DOM para o tema e menu mobile.
 *
 * @module components/layout/Header
 * @author Globalismo
 * @version 1.1.0
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Home, BookOpen, FileText, Mail, Sun, Moon, Globe, Menu, X, Search } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/sobre', label: 'Sobre', icon: BookOpen },
  { href: '/artigos', label: 'Artigos', icon: FileText },
  { href: '/contato', label: 'Contato', icon: Mail },
];

/**
 * Componente principal de cabeçalho/navegação.
 * Funcionalidades:
 * - Logo com link para home
 * - Navegação desktop com links para as principais páginas
 * - Menu mobile (drawer) responsivo
 * - Botão de alternância de tema (dark/light mode)
 * - Seletor de idioma
 * - Destaque para página atual
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeDrawer = () => setIsOpen(false);

  const isDark = mounted ? (resolvedTheme === 'dark') : false;

  return (
    <>
      {/* Header fixo no topo da página */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" suppressHydrationWarning>
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
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-green-600 dark:text-green-400' : ''}`} />
                    {link.label}
                  </Link>
                );
              })}

              {/* Botão de busca */}
              <button
                onClick={() => document.getElementById('header-search')?.focus()}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Seletor de idioma */}
              <div className="ml-2">
                <LanguageSwitcher />
              </div>

              {/* Botão de alternância de tema (dark mode) */}
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Alternar tema"
                suppressHydrationWarning
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
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
                aria-label="Alternar tema"
                suppressHydrationWarning
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
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
                aria-label="Abrir menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Barra de busca - visível apenas em desktop */}
        <div className="hidden md:block border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div id="header-search">
              <SearchBar />
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
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
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
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
