'use client';

import { useEffect, useState } from 'react';
import ArticleActions from '@/components/articles/ArticleActions';
import TableOfContents from '@/components/ui/TableOfContents';

interface ArticleContentProps {
  slug: string;
  content: string;
}

export default function ArticleContent({ slug, content }: ArticleContentProps) {
  const [processedContent, setProcessedContent] = useState(content);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = doc.querySelectorAll('h2, h3');
    
    let index = 0;
    elements.forEach((el) => {
      const id = `heading-${index}`;
      el.id = id;
      index++;
    });
    
    setProcessedContent(doc.body.innerHTML);
  }, [content]);

  return (
    <div className="relative">
      <div className="flex justify-end mb-4 print:hidden">
        <ArticleActions slug={slug} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-gray-900 dark:prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
        
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents content={content} />
          </div>
        </aside>
      </div>
    </div>
  );
}
