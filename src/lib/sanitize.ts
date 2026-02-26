/**
 * Utilitário de sanitização de HTML para prevenir ataques XSS
 * Utiliza DOMPurify, uma biblioteca testada em combate para sanitização de HTML
 */

import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
  'sub', 'sup', 'del', 'ins', 'mark', 'small', 'cite', 'dfn', 'abbr',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption'
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target'],
  abbr: ['title'],
  blockquote: ['cite'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan', 'scope'],
};

const DANGEROUS_PATTERNS = [
  /javascript:/gi,
  /data:/gi,
  /vbscript:/gi,
  /on\w+\s*=/gi, // Event handlers like onclick, onerror, etc.
  /<script\b[^>]*>([\s\S]*?)<\/script>/gim,
  /<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim,
  /<object\b[^>]*>([\s\S]*?)<\/object>/gim,
  /<embed\b[^>]*>/gim,
];

/**
 * Sanitiza uma string HTML removendo tags e atributos perigosos
 * Utiliza DOMPurify, uma biblioteca testada em combate para sanitização de HTML
 * @param html - String HTML a ser sanitizada
 * @returns String HTML sanitizada
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ALLOWED_TAGS,
    ALLOWED_ATTR: Object.values(ALLOWED_ATTRIBUTES).flat()
  });
}

/**
 * Sanitiza texto simples removendo tags HTML
 * @param text - Texto a ser sanitizado
 * @returns Texto sem tags HTML
 */
export function stripHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  return text.replace(/<[^>]*>/g, '').trim();
}

/**
 * Escapa caracteres especiais HTML
 * @param text - Texto a ser escapado
 * @returns Texto com caracteres escapados
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  const map: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Valida se uma URL é segura
 * @param url - URL a ser validada
 * @returns true se a URL for segura, false caso contrário
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(url);
    
    // Verifica protocolo
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return false;
    }

    // Verifica por javascript: e data:
    if (DANGEROUS_PATTERNS.some(p => p.test(url))) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
