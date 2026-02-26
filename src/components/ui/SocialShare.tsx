'use client';

import { useState } from 'react';
import { Share2, Check, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Não foi possível copiar o link', 'error');
    }
  };

  const share = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Compartilhar:</span>
      
      <button
        onClick={() => share('twitter')}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
        aria-label="Compartilhar no Twitter"
        type="button"
      >
        <Twitter className="w-4 h-4" aria-hidden="true" />
      </button>

      <button
        onClick={() => share('linkedin')}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
        aria-label="Compartilhar no LinkedIn"
        type="button"
      >
        <Linkedin className="w-4 h-4" aria-hidden="true" />
      </button>

      <button
        onClick={() => share('whatsapp')}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-900 dark:focus:ring-green-400"
        aria-label="Compartilhar no WhatsApp"
        type="button"
      >
        <Share2 className="w-4 h-4" aria-hidden="true" />
      </button>

      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400"
        aria-label={copied ? 'Link copiado!' : 'Copiar link'}
        type="button"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
        ) : (
          <LinkIcon className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
