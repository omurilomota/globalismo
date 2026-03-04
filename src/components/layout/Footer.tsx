/**
 * @fileoverview Componente de rodapé (Footer) do site Globalismo.
 * 
 * @module components/layout/Footer
 * @author Globalismo
 * @version 1.0.0
 */

import Link from 'next/link';
import { Globe, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-6 h-6 text-blue-900 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-blue-900 dark:text-white font-serif">
                Globalismo
              </h3>
            </div>
            
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.
            </p>
            
            <div className="flex gap-3 mt-4">
              <a href="https://x.com/omurilomota" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="Twitter/X">
                <Twitter className="w-4 h-4" />
              </a>
              
              <a href="https://github.com/omurilomota" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              
              <a href="https://www.linkedin.com/in/murilo-henrique-622354358/" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              
              <a href="/contato" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
              Navegação
            </h4>
            
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/artigos" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Artigos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
              Categorias
            </h4>
            
            <ul className="space-y-2">
              <li>
                <Link href="/artigos?categoria=economia" className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Economia
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=politica" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Política
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=cultura" className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Cultura
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=geopolitica" className="text-sm text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Geopolítica
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © {currentYear} Globalismo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
