import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato conosco. Tire dúvidas, faça sugestões ou proponha parcerias.'
};

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fale Conosco</h1>
          <p className="text-gray-600 mb-8">
            Tem alguma dúvida, sugestão ou gostaria de contribuir com o projeto? 
            Preencha o formulário e entraremos em contato.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contato@globalismo.com.br</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Horário de atendimento</h3>
              <p className="text-gray-600">Segunda a sexta, das 9h às 18h</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Manifestação</h3>
              <p className="text-gray-600 text-sm">
                Para reclamações, sugestões ou elogios sobre nossos conteúdos, 
                utilize o formulário ao lado. Responderemos em até 72 horas úteis.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
