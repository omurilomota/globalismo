'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 bg-blue-900 dark:bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800 dark:hover:bg-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:ring-offset-2"
      aria-label="Voltar ao topo"
      type="button"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
