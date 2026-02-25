import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Globalismo</h3>
            <p className="text-sm text-gray-400">
              Um espaço para reflexão sobre os impactos da globalização na economia, política, cultura e sociedade.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/artigos" className="text-gray-400 hover:text-white transition-colors">
                  Artigos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/artigos?categoria=economia" className="text-gray-400 hover:text-white transition-colors">
                  Economia
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=politica" className="text-gray-400 hover:text-white transition-colors">
                  Política
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=cultura" className="text-gray-400 hover:text-white transition-colors">
                  Cultura
                </Link>
              </li>
              <li>
                <Link href="/artigos?categoria=geopolitica" className="text-gray-400 hover:text-white transition-colors">
                  Geopolítica
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Globalismo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
