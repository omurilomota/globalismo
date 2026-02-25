import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Link
          key={i}
          href={getPageUrl(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            i === currentPage
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {i}
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Página anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Próxima página"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </nav>
  );
}
