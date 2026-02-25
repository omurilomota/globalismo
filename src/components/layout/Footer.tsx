import Link from 'next/link';
import { Globe, Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-7 h-7 text-indigo-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
                Globalismo
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              🌎 Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-indigo-500 transition-all duration-300 group">
                <Twitter className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-indigo-500 transition-all duration-300 group">
                <Github className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white/10 hover:bg-indigo-500 transition-all duration-300 group">
                <Linkedin className="w-5 h-5 group-hover:text-white" />
              </a>
              <a href="/contato" className="p-2.5 rounded-full bg-white/10 hover:bg-indigo-500 transition-all duration-300 group">
                <Mail className="w-5 h-5 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>🧭</span> Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>🏠</span> Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>📖</span> Sobre
                </Link>
              </li>
              <li>
                <Link href="/artigos" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>📰</span> Artigos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>✉️</span> Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>📂</span> Categorias
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/artigos?categoria=economia" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span>💰</span> Economia
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=politica" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>🏛️</span> Política
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=cultura" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-2">
                  <span>🎭</span> Cultura
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=geopolitica" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>📡</span> Geopolítica
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-8 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            © {currentYear} 🌐 Globalismo. Feito com <Heart className="w-4 h-4 text-red-500 animate-pulse" /> para um mundo mais conectado.
          </p>
        </div>
      </div>
    </footer>
  );
}
