/**
 * @fileoverview Comentários usando Giscus (GitHub Issues based).
 *
 * Sistema de comentários gratuito e sem necessidade de backend.
 * Os comentários são armazenados como issues no repositório do GitHub.
 *
 * @module components/articles/Comments
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useTheme } from 'next-themes';
import Giscus, { Theme } from '@giscus/react';

interface CommentsProps {
  articleSlug: string;
}

export default function Comments({ articleSlug }: CommentsProps) {
  const { theme, resolvedTheme } = useTheme();

  const getGiscusTheme = (): Theme => {
    const currentTheme = resolvedTheme || theme || 'light';
    return currentTheme === 'dark' ? 'dark' : 'light';
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comentários
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <Giscus
          id="comments"
          repo={process.env.NEXT_PUBLIC_GISCUS_REPO || 'omurilomota/globalismo'}
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Comments'}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ''}
          mapping="specific"
          term={articleSlug}
          strict="1"
          reactionsEnabled={process.env.NEXT_PUBLIC_GISCUS_REACTIONS || '1'}
          emitMetadata={process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA || '0'}
          inputPosition={process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION || 'top'}
          theme={getGiscusTheme()}
          lang={process.env.NEXT_PUBLIC_GISCUS_LANG || 'pt'}
          loading="lazy"
        />
      </div>
    </section>
  );
}
