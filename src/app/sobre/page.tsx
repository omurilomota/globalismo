/**
 * @fileoverview Página "Sobre" do site Globalismo.
 *
 * Esta página é responsável por:
 * - Apresentar o projeto Globalismo e seus objetivos
 * - Explicar a missão e propósito do blog
 * - Listar os temas abordados pelo site
 * - Apresentar a equipe e colaboradores
 * - Convidar colaboradores para contribuir com conteúdo
 *
 * Página estática com conteúdo informativo sobre o projeto.
 *
 * @module app/sobre/page
 * @author Globalismo
 * @version 1.1.0
 */

import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/articles';
import { Github, Twitter, Linkedin, Mail, BookOpen, Users, Target, Lightbulb } from 'lucide-react';
import Link from 'next/link';

// Configuração de metadados SEO para a página sobre
export const metadata: Metadata = {
  title: 'Sobre o Projeto',
  description: 'Conheça o Globalismo - um espaço para reflexão crítica sobre os impactos da globalização na economia, política e cultura.',
  // URL canônica para evitar conteúdo duplicado
  alternates: {
    canonical: getCanonicalUrl('/sobre')
  }
};

/**
 * Página "Sobre" do Globalismo.
 * Apresenta informações sobre o projeto, missão, equipe, temas e chamada para colaboração.
 *
 * @component
 * @returns {JSX.Element} Página sobre com conteúdo institucional
 */
export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section com introdução */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Sobre o Globalismo
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Um espaço dedicado à reflexão crítica sobre os impactos da globalização
          em diferentes dimensões da sociedade contemporânea.
        </p>
      </div>

      {/* Cards de Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <Target className="w-8 h-8 text-blue-900 dark:text-blue-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Missão</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Promover o entendimento sobre fenômenos globais que moldam nosso mundo, abrangendo questões econômicas, políticas, culturais e sociais.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <BookOpen className="w-8 h-8 text-green-900 dark:text-green-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Educação</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Disponibilizar conteúdo informativo neutro e embasado, apresentando múltiplas perspectivas sobre globalismo.
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <Lightbulb className="w-8 h-8 text-purple-900 dark:text-purple-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pensamento Crítico</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Valorizamos o pensamento independente e a diversidade de perspectivas, reconhecendo oportunidades e desafios.
          </p>
        </div>
      </div>

      {/* Seção: Temas Abordados */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Temas Abordados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Economia Global', desc: 'Mercados internacionais, comércio e finanças' },
            { title: 'Política Internacional', desc: 'Governance mundial e relações entre Estados' },
            { title: 'Cultura e Identidade', desc: 'Impactos culturais na era digital' },
            { title: 'Mídia Transnacional', desc: 'Comunicação e integração social global' },
            { title: 'Desigualdade Social', desc: 'Justiça social e disparidades globais' },
            { title: 'Blocos Econômicos', desc: 'UE, MERCOSUL, BRICS e outras organizações' },
          ].map((tema) => (
            <div key={tema.title} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-900 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{tema.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tema.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção: Sobre os Autores */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Sobre os Autores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Murilo Mota */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-900 dark:bg-blue-700 flex items-center justify-center text-white text-3xl font-bold mb-4">
                MM
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Murilo Mota</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Fundador e editor do Globalismo. Pesquisador independente interessado em geopolítica,
                economia internacional e os impactos da globalização nas sociedades contemporâneas.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/omurilomota"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/omurilomota"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Twitter/X"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/murilo-henrique-622354358/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Matheus Pereira */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-green-900 dark:bg-green-700 flex items-center justify-center text-white text-3xl font-bold mb-4">
                MP
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Matheus Pereira</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Co-fundador e desenvolvedor do Globalismo. Engenheiro de software com foco em tecnologias web
                e experiências digitais. Responsável pela arquitetura técnica e desenvolvimento da plataforma.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/MatheusPereira77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <Link
                  href="/contato"
                  className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Contato"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Fontes e Referências */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Fontes e Referências</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Todos os artigos do Globalismo são baseados em fontes acadêmicas e jornalísticas confiáveis.
          Utilizamos principalmente:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'ONU', desc: 'Organização das Nações Unidas', url: 'https://www.un.org' },
            { name: 'FMI', desc: 'Fundo Monetário Internacional', url: 'https://www.imf.org' },
            { name: 'Banco Mundial', desc: 'Dados e pesquisas globais', url: 'https://www.worldbank.org' },
            { name: 'OMC', desc: 'Organização Mundial do Comércio', url: 'https://www.wto.org' },
            { name: 'CEBRI', desc: 'Centro Brasileiro de Relações Internacionais', url: 'https://cebri.org' },
            { name: 'Forbes Brasil', desc: 'Economia e negócios', url: 'https://forbes.com.br' },
          ].map((fonte) => (
            <a
              key={fonte.name}
              href={fonte.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors block"
            >
              <h3 className="font-semibold text-blue-900 dark:text-blue-400">{fonte.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{fonte.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Seção: Colaboradores */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Colaboradores</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <Users className="w-6 h-6 text-blue-900 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quer Contribuir?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aceitamos colaborações que agreguem à discussão sobre globalização e seus impactos.
                Se você tem interesse em escrever para o Globalismo, entre em contato conosco.
              </p>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas do Site */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">O Globalismo em Números</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: '12+', label: 'Artigos Publicados' },
            { num: '4', label: 'Categorias' },
            { num: '100%', label: 'Conteúdo Gratuito' },
            { num: '24/7', label: 'Disponível' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-400">{stat.num}</div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
