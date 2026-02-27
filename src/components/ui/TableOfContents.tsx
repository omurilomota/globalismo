'use client';

import { useMemo, useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = useMemo<TocItem[]>(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = doc.querySelectorAll('h2, h3');
    
    return Array.from(elements).map((el, index) => ({
      id: `heading-${index}`,
      text: el.textContent || '',
      level: parseInt(el.tagName.charAt(1)),
    }));
  }, [content]);

  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4" aria-label="Índice do artigo">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Neste artigo
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-sm text-left transition-colors ${
                activeId === heading.id
                  ? 'text-blue-900 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white'
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
