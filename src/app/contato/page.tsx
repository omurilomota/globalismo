import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { getCanonicalUrl } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato conosco. Tire dúvidas, faça sugestões ou proponha parcerias.',
  alternates: {
    canonical: getCanonicalUrl('/contato')
  }
};

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Fale Conosco</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Tem alguma dúvida, sugestão ou gostaria de contribuir com o projeto? 
            Preencha o formulário e entraremos em contato.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">contato@globalismo.com.br</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Horário de atendimento</h3>
              <p className="text-gray-600 dark:text-gray-400">Segunda a sexta, das 9h às 18h</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Manifestação</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Para reclamações, sugestões ou elogios sobre nossos conteúdos, 
                utilize o formulário ao lado. Responderemos em até 72 horas úteis.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
