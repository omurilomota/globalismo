/**
 * @fileoverview Página "Sobre" do site Globalismo.
 * 
 * Esta página é responsável por:
 * - Apresentar o projeto Globalismo e seus objetivos
 * - Explicar a missão e propósito do blog
 * - Listar os temas abordados pelo site
 * - Convidar colaboradores para contribuir com conteúdo
 * 
 * Página estática com conteúdo informativo sobre o projeto.
 * 
 * @module app/sobre/page
 * @author Globalismo
 * @version 1.0.0
 */

import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/articles';

// Configuração de metadados SEO para a página sobre
export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o projeto Globalismo - um espaço para reflexão sobre os impactos da globalização.',
  // URL canônica para evitar conteúdo duplicado
  alternates: {
    canonical: getCanonicalUrl('/sobre')
  }
};

/**
 * Página "Sobre" do Globalismo.
 * Apresenta informações sobre o projeto, missão, temas e chamada para colaboração.
 * 
 * @component
 * @returns {JSX.Element} Página sobre com conteúdo institucional
 */
export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Container do artigo com tipografia melhorada via Tailwind Typography */}
      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold">
        {/* Título principal da página */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Sobre o Globalismo</h1>
        
        {/* Introdução/elevator pitch do projeto */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          O Globalismo é um espaço dedicado à reflexão crítica sobre os impactos da globalização 
          em diferentes dimensões da sociedade contemporânea.
        </p>

        {/* Seção: Nossa Missão */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Nossa Missão</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Buscamos promover o entendimento sobre os fenômenos globais que moldam nosso mundo, 
          abrangendo questões econômicas, políticas, culturais e sociais. Acreditamos que a 
          compreensão desses processos é fundamental para uma cidadania informada e ativa.
        </p>

        {/* Seção: Temas Abordados */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Temas Abordados</h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
          <li>Economia global e mercados internacionais</li>
          <li>Políticas e governance mundial</li>
          <li>Cultura e identidade na era digital</li>
          <li>Comunicação e mídia transnacional</li>
          <li>Justiça social e desigualdade global</li>
          <li>Blocos econômicos e relações internacionais</li>
        </ul>

        {/* Seção: Nossa Abordagem */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Nossa Abordagem</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Propomos uma análise crítica e multifacetada dos processos de globalização, 
          reconhecendo tanto suas oportunidades quanto seus desafios. Valorizamos o 
          pensamento independente e a diversidade de perspectivas.
        </p>

        {/* Box de chamada para ação - convite para colaboradores */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contribua</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tem interesse em escrever para o Globalismo? Entre em contato conosco 
            através da página de contato. Aceitamos colaborações que agreguem à discussão 
            sobre globalização e seus impactos.
          </p>
        </div>
      </article>
    </div>
  );
}
