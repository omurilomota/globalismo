'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, FileText, Mail, Sun, Moon, Globe, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home, description: 'Página inicial' },
  { href: '/sobre', label: 'Sobre', icon: BookOpen, description: 'Sobre o projeto' },
  { href: '/artigos', label: 'Artigos', icon: FileText, description: 'Todos os artigos' },
  { href: '/contato', label: 'Contato', icon: Mail, description: 'Entre em contato' },
];

function getThemeSnapshot() {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 rounded-lg px-2 py-1 -ml-2"
              aria-label="Globalismo - Página inicial"
            >
              <Globe className="w-7 h-7 text-blue-900 dark:text-blue-400" aria-hidden="true" />
              <span className="text-xl font-bold text-blue-900 dark:text-white font-serif">
                Globalismo
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Navegação principal">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 ${
                      isActive
                        ? 'text-blue-900 dark:text-white bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={link.description}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-green-600 dark:text-green-400' : ''}`} aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={toggleDarkMode}
                className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
                aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
                type="button"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
                aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
                type="button"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
              
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
                aria-label="Abrir menu de navegação"
                aria-expanded={isOpen}
                type="button"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-900 dark:text-blue-400" aria-hidden="true" />
            <span className="text-lg font-bold text-blue-900 dark:text-white">Menu</span>
          </div>
          <button 
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
            aria-label="Fechar menu"
            type="button"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2" role="navigation" aria-label="Menu mobile">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
