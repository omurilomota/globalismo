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
 * @module app/[locale]/sobre/page
 * @author Globalismo
 * @version 1.1.0
 */

import { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/articles';
import { Github, Twitter, Linkedin, Mail, BookOpen, Users, Target, Lightbulb } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    pt: 'Sobre o Projeto',
    en: 'About the Project',
    de: 'Über das Projekt',
    es: 'Sobre el Proyecto'
  };
  
  const descriptions: Record<string, string> = {
    pt: 'Conheça o Globalismo - um espaço para reflexão crítica sobre os impactos da globalização na economia, política e cultura.',
    en: 'Learn about Globalismo - a space for critical reflection on the impacts of globalization on economy, politics and culture.',
    de: 'Erfahren Sie mehr über Globalismo - ein Raum für kritische Reflexion über die Auswirkungen der Globalisierung auf Wirtschaft, Politik und Kultur.',
    es: 'Conoce Globalismo - un espacio para la reflexión crítica sobre los impactos de la globalización en la economía, política y cultura.'
  };

  return {
    title: titles[locale] || titles.pt,
    description: descriptions[locale] || descriptions.pt,
    alternates: {
      canonical: getCanonicalUrl(`/${locale}/sobre`)
    }
  };
}

export default async function SobrePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section com introdução */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {locale === 'es' ? 'Sobre el Globalismo' : locale === 'en' ? 'About Globalismo' : locale === 'de' ? 'Über Globalismo' : 'Sobre o Globalismo'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {locale === 'es' ? 'Un espacio dedicado a la reflexión crítica sobre los impactos de la globalización en diferentes dimensiones de la sociedad contemporánea.'
            : locale === 'en' ? 'A space dedicated to critical reflection on the impacts of globalization in different dimensions of contemporary society.'
            : locale === 'de' ? 'Ein Raum für kritische Reflexion über die Auswirkungen der Globalisierung auf verschiedene Dimensionen der contemporary Gesellschaft.'
            : 'Um espaço dedicado à reflexão crítica sobre os impactos da globalização em diferentes dimensões da sociedade contemporânea.'}
        </p>
      </div>

      {/* Cards de Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <Target className="w-8 h-8 text-blue-900 dark:text-blue-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {locale === 'es' ? 'Misión' : locale === 'en' ? 'Mission' : locale === 'de' ? 'Mission' : 'Missão'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {locale === 'es' ? 'Promover la comprensión de los fenómenos globales que dan forma a nuestro mundo, abarcando cuestiones económicas, políticas, culturales y sociales.'
              : locale === 'en' ? 'Promote understanding of global phenomena shaping our world, covering economic, political, cultural and social issues.'
              : locale === 'de' ? 'Das Verständnis globaler Phänomene fördern, die unsere Welt prägen, einschließlich wirtschaftlicher, politischer, kultureller und sozialer Fragen.'
              : 'Promover o entendimento sobre fenômenos globais que moldam nosso mundo, abrangendo questões econômicas, políticas, culturais e sociais.'}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <BookOpen className="w-8 h-8 text-green-900 dark:text-green-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {locale === 'es' ? 'Educación' : locale === 'en' ? 'Education' : locale === 'de' ? 'Bildung' : 'Educação'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {locale === 'es' ? 'Proporcionar contenido informativo neutral y fundamentado, presentando múltiples perspectivas sobre el globalismo.'
              : locale === 'en' ? 'Provide neutral, evidence-based informational content, presenting multiple perspectives on globalism.'
              : locale === 'de' ? 'Stellen Sie neutrale, evidenzbasierte Informationen zur Verfügung und präsentieren Sie mehrere Perspektiven zum Globalismus.'
              : 'Disponibilizar conteúdo informativo neutro e embasado, apresentando múltiplas perspectivas sobre globalismo.'}
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <Lightbulb className="w-8 h-8 text-purple-900 dark:text-purple-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {locale === 'es' ? 'Pensamiento Crítico' : locale === 'en' ? 'Critical Thinking' : locale === 'de' ? 'Kritisches Denken' : 'Pensamento Crítico'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {locale === 'es' ? 'Valoramos el pensamiento independiente y la diversidad de perspectivas, reconociendo oportunidades y desafíos.'
              : locale === 'en' ? 'We value independent thinking and diversity of perspectives, recognizing opportunities and challenges.'
              : locale === 'de' ? 'Wir schätzen unabhängiges Denken und Vielfalt der Perspektiven und erkennen Chancen und Herausforderungen.'
              : 'Valorizamos o pensamento independente e a diversidade de perspectivas, reconhecendo oportunidades e desafios.'}
          </p>
        </div>
      </div>

      {/* Seção: Temas Abordados */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {locale === 'es' ? 'Temas Abordados' : locale === 'en' ? 'Topics Covered' : locale === 'de' ? 'Behandelte Themen' : 'Temas Abordados'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: locale === 'es' ? 'Economía Global' : locale === 'en' ? 'Global Economy' : locale === 'de' ? 'Weltwirtschaft' : 'Economia Global', desc: locale === 'es' ? 'Mercados internacionales, comercio y finanzas' : locale === 'en' ? 'International markets, trade and finance' : locale === 'de' ? 'Internationale Märkte, Handel und Finanzen' : 'Mercados internacionais, comércio e finanças' },
            { title: locale === 'es' ? 'Política Internacional' : locale === 'en' ? 'International Politics' : locale === 'de' ? 'Internationale Politik' : 'Política Internacional', desc: locale === 'es' ? 'Gobernanza mundial y relaciones entre Estados' : locale === 'en' ? 'World governance and relations between states' : locale === 'de' ? 'Weltführung und Beziehungen zwischen Staaten' : 'Governance mundial e relações entre Estados' },
            { title: locale === 'es' ? 'Cultura e Identidad' : locale === 'en' ? 'Culture and Identity' : locale === 'de' ? 'Kultur und Identität' : 'Cultura e Identidade', desc: locale === 'es' ? 'Impactos culturales en la era digital' : locale === 'en' ? 'Cultural impacts in the digital age' : locale === 'de' ? 'Kulturelle Auswirkungen im digitalen Zeitalter' : 'Impactos culturais na era digital' },
            { title: locale === 'es' ? 'Masa Transnacional' : locale === 'en' ? 'Transnational Media' : locale === 'de' ? 'Transnationale Medien' : 'Mídia Transnacional', desc: locale === 'es' ? 'Comunicación e integración social global' : locale === 'en' ? 'Communication and global social integration' : locale === 'de' ? 'Kommunikation und globale soziale Integration' : 'Comunicação e integração social global' },
            { title: locale === 'es' ? 'Desigualdad Social' : locale === 'en' ? 'Social Inequality' : locale === 'de' ? 'Soziale Ungleichheit' : 'Desigualdade Social', desc: locale === 'es' ? 'Justicia social y disparidades globales' : locale === 'en' ? 'Social justice and global disparities' : locale === 'de' ? 'Soziale Gerechtigkeit und globale Disparitäten' : 'Justiça social e disparidades globais' },
            { title: locale === 'es' ? 'Bloques Económicos' : locale === 'en' ? 'Economic Blocks' : locale === 'de' ? 'Wirtschaftsblöcke' : 'Blocos Econômicos', desc: locale === 'es' ? 'UE, MERCOSUR, BRICS y otras organizaciones' : locale === 'en' ? 'EU, MERCOSUR, BRICS and other organizations' : locale === 'de' ? 'EU, MERCOSUR, BRICS und andere Organisationen' : 'UE, MERCOSUL, BRICS e outras organizações' },
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
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {locale === 'es' ? 'Sobre los Autores' : locale === 'en' ? 'About the Authors' : locale === 'de' ? 'Über die Autoren' : 'Sobre os Autores'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Murilo Mota */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-900 dark:bg-blue-700 flex items-center justify-center text-white text-3xl font-bold mb-4">
                MM
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Murilo Mota</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {locale === 'es' ? 'Fundador y editor del Globalismo. Investigador independiente interesado en geopolítica, economía internacional y los impactos de la globalización en las sociedades contemporáneas.'
                  : locale === 'en' ? 'Founder and editor of Globalismo. Independent researcher interested in geopolitics, international economy and the impacts of globalization on contemporary societies.'
                  : locale === 'de' ? 'Gründer und Herausgeber von Globalismo. Unabhängiger Forscher an Geopolitik, internationaler Wirtschaft und den Auswirkungen der Globalisierung auf zeitgenössische Gesellschaften.'
                  : 'Fundador e editor do Globalismo. Pesquisador independente interessado em geopolítica, economia internacional e os impactos da globalização nas sociedades contemporâneas.'}
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/omurilomota" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://x.com/omurilomota" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Twitter/X">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/murilo-henrique-622354358/" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="LinkedIn">
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
                {locale === 'es' ? 'Co-fundador y desarrollador del Globalismo. Ingeniero de software con enfoque en tecnologías web y experiencias digitales.'
                  : locale === 'en' ? 'Co-founder and developer of Globalismo. Software engineer focused on web technologies and digital experiences.'
                  : locale === 'de' ? 'Mitgründer und Entwickler von Globalismo. Software-Ingenieur mit Fokus auf Web-Technologien und digitale Erfahrungen.'
                  : 'Co-fundador e desenvolvedor do Globalismo. Engenheiro de software com foco em tecnologias web e experiências digitais.'}
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/MatheusPereira77" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <Link href={`/${locale}/contato`} className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Contato">
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Colaboradores */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {locale === 'es' ? 'Equipo y Colaboradores' : locale === 'en' ? 'Team and Collaborators' : locale === 'de' ? 'Team und Mitarbeiter' : 'Equipe e Colaboradores'}
        </h2>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <Users className="w-6 h-6 text-blue-900 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'es' ? '¿Quieres Contribuir?' : locale === 'en' ? 'Want to Contribute?' : locale === 'de' ? 'Möchten Sie beitragen?' : 'Quer Contribuir?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {locale === 'es' ? 'Aceptamos colaboraciones que agreguen a la discusión sobre globalización y sus impactos. Si tienes interés en escribir para el Globalismo, contactanos.'
                  : locale === 'en' ? 'We accept collaborations that add to the discussion about globalization and its impacts. If you are interested in writing for Globalismo, contact us.'
                  : locale === 'de' ? 'Wir akzeptieren Beiträge, die zur Diskussion über Globalisierung und ihre Auswirkungen beitragen. Wenn Sie an einem Beitrag für Globalismo interessiert sind, kontaktieren Sie uns.'
                  : 'Aceitamos colaborações que agreguem à discussão sobre globalização e seus impactos. Se você tem interesse em escrever para o Globalismo, entre em contato conosco.'}
              </p>
              <Link href={`/${locale}/contato`} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                <Mail className="w-4 h-4" />
                {locale === 'es' ? 'Contactar' : locale === 'en' ? 'Contact Us' : locale === 'de' ? 'Kontaktieren Sie uns' : 'Entre em Contato'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas do Site */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {locale === 'es' ? 'El Globalismo en Números' : locale === 'en' ? 'Globalismo in Numbers' : locale === 'de' ? 'Globalismo in Zahlen' : 'O Globalismo em Números'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: '12+', label: locale === 'es' ? 'Artículos Publicados' : locale === 'en' ? 'Published Articles' : locale === 'de' ? 'Veröffentlichte Artikel' : 'Artigos Publicados' },
            { num: '4', label: locale === 'es' ? 'Categorías' : locale === 'en' ? 'Categories' : locale === 'de' ? 'Kategorien' : 'Categorias' },
            { num: '100%', label: locale === 'es' ? 'Contenido Gratuito' : locale === 'en' ? 'Free Content' : locale === 'de' ? 'Kostenlose Inhalte' : 'Conteúdo Gratuito' },
            { num: '24/7', label: locale === 'es' ? 'Disponible' : locale === 'en' ? 'Available' : locale === 'de' ? 'Verfügbar' : 'Disponível' },
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
