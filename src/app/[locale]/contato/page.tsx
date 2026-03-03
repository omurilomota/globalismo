/**
 * @fileoverview Página de contato do site Globalismo.
 * 
 * Esta página é responsável por:
 * - Fornecer informações de contato do projeto
 * - Exibir formulário de contato para mensagens
 * - Apresentar horário de atendimento e guidelines de resposta
 * 
 * Página estática com formulário interativo do lado do cliente.
 * 
 * @module app/[locale]/contato/page
 * @author Globalismo
 * @version 1.0.0
 */

import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { getCanonicalUrl } from '@/lib/articles';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    pt: 'Contato',
    en: 'Contact',
    de: 'Kontakt',
    es: 'Contacto'
  };
  
  const descriptions: Record<string, string> = {
    pt: 'Entre em contato conosco. Tire dúvidas, faça sugestões ou proponha parcerias.',
    en: 'Contact us. Ask questions, make suggestions or propose partnerships.',
    de: 'Kontaktieren Sie uns. Stellen Sie Fragen, machen Sie Vorschläge oder schlagen Sie Partnerschaften vor.',
    es: 'Contáctenos. Haga preguntas, haga sugerencias o proponga sociedades.'
  };

  return {
    title: titles[locale] || titles.pt,
    description: descriptions[locale] || descriptions.pt,
    alternates: {
      canonical: getCanonicalUrl(`/${locale}/contato`)
    }
  };
}

export default async function ContatoPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Grid responsivo: 1 coluna mobile, 2 colunas desktop */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Coluna esquerda: informações de contato */}
        <div>
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === 'es' ? 'Contáctanos' : locale === 'en' ? 'Contact Us' : locale === 'de' ? 'Kontaktieren Sie uns' : 'Fale Conosco'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {locale === 'es' ? '¿Tienes alguna duda, sugerencia o te gustaría contribuir con el proyecto? Completa el formulario y te contactaremos.'
              : locale === 'en' ? 'Do you have any questions, suggestions or would you like to contribute to the project? Fill out the form and we will get in touch.'
              : locale === 'de' ? 'Haben Sie Fragen, Vorschläge oder möchten Sie zum Projekt beitragen? Füllen Sie das Formular aus und wir werden uns melden.'
              : 'Tem alguma dúvida, sugestão ou gostaria de contribuir com o projeto? Preencha o formulário e entraremos em contato.'}
          </p>

          {/* Seções de informações de contato */}
          <div className="space-y-6">
            {/* Informações de email */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'es' ? 'Correo electrónico' : locale === 'en' ? 'Email' : locale === 'de' ? 'E-Mail' : 'Email'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">contato@globalismo.com.br</p>
            </div>
            
            {/* Horário de atendimento */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'es' ? 'Horario de atención' : locale === 'en' ? 'Business hours' : locale === 'de' ? 'Geschäftszeiten' : 'Horário de atendimento'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'es' ? 'Lunes a viernes, de 9h a 18h' 
                  : locale === 'en' ? 'Monday to Friday, 9am to 6pm' 
                  : locale === 'de' ? 'Montag bis Freitag, 9 bis 18 Uhr' 
                  : 'Segunda a sexta, das 9h às 18h'}
              </p>
            </div>
            
            {/* Informações sobre manifestação/feedback */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {locale === 'es' ? 'Manifestación' : locale === 'en' ? 'Feedback' : locale === 'de' ? 'Rückmeldung' : 'Manifestação'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {locale === 'es' ? 'Para reclamaciones, sugerencias o elogios sobre nuestros contenidos, utiliza el formulario. Responderemos en un plazo de 72 horas hábiles.'
                  : locale === 'en' ? 'For complaints, suggestions or compliments about our content, use the form. We will respond within 72 business hours.'
                  : locale === 'de' ? 'Für Beschwerden, Vorschläge oder Kommentare zu unseren Inhalten nutzen Sie das Formular. Wir antworten innerhalb von 72 Geschäftsstunden.'
                  : 'Para reclamações, sugestões ou elogios sobre nossos conteúdos, utilize o formulário. Responderemos em até 72 horas úteis.'}
              </p>
            </div>
          </div>
        </div>

        {/* Coluna direita: formulário de contato */}
        <div>
          {/* Container com estilo de card para o formulário */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
