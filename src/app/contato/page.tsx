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
 * @module app/contato/page
 * @author Globalismo
 * @version 1.0.0
 */

import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { getCanonicalUrl } from '@/lib/articles';

// Configuração de metadados SEO para a página de contato
export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato conosco. Tire dúvidas, faça sugestões ou proponha parcerias.',
  // URL canônica para evitar conteúdo duplicado
  alternates: {
    canonical: getCanonicalUrl('/contato')
  }
};

/**
 * Página de contato do Globalismo.
 * Apresenta informações de contato e formulário para mensagens.
 * Layout em duas colunas: informações à esquerda, formulário à direita.
 * 
 * @component
 * @returns {JSX.Element} Página de contato com formulário
 */
export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Grid responsivo: 1 coluna mobile, 2 colunas desktop */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Coluna esquerda: informações de contato */}
        <div>
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Fale Conosco</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Tem alguma dúvida, sugestão ou gostaria de contribuir com o projeto? 
            Preencha o formulário e entraremos em contato.
          </p>

          {/* Seções de informações de contato */}
          <div className="space-y-6">
            {/* Informações de email */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">contato@globalismo.com.br</p>
            </div>
            
            {/* Horário de atendimento */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Horário de atendimento</h3>
              <p className="text-gray-600 dark:text-gray-400">Segunda a sexta, das 9h às 18h</p>
            </div>
            
            {/* Informações sobre manifestação/feedback */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Manifestação</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Para reclamações, sugestões ou elogios sobre nossos conteúdos, 
                utilize o formulário ao lado. Responderemos em até 72 horas úteis.
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
