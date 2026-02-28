/**
 * @fileoverview Utilitário de sanitização HTML para server-side.
 * 
 * Este módulo fornece funções para sanitizar conteúdo HTML,
 * removendo scripts maliciosos e código potencialmente perigoso.
 * Versão para uso server-side (Node.js).
 * 
 * @module lib/sanitize
 * @author Globalismo
 * @version 1.0.0
 */

/**
 * Escapa caracteres especiais HTML.
 * 
 * @function escapeHtml
 * @param {string} text - Texto a ser escapado
 * @returns {string} Texto com caracteres especiais escapados
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Tags HTML proibidas por segurança.
 */
const FORBID_TAGS = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'link', 'meta', 'base'];

/**
 * Atributos perigosos que podem executar código.
 */
const DANGEROUS_ATTRS = [
  'onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur',
  'onsubmit', 'onchange', 'onkeydown', 'onkeyup', 'onkeypress',
];

/**
 * Sanitiza uma string HTML, removendo código malicioso.
 * Versão server-side para ser usada nas páginas SSR/SSG.
 * Também adiciona IDs aos títulos para links internos.
 * 
 * @function sanitizeHtml
 * @param {string} html - String HTML a ser sanitizada
 * @returns {string} HTML sanitizado
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Criar um parser DOM simples usando regex
  let sanitized = html;

  // Remove tags perigosas
  FORBID_TAGS.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
    // Também remove tags auto-fechantes
    const selfClosing = new RegExp(`<${tag}[^>]*/>`, 'gi');
    sanitized = selfClosing.test(sanitized) ? sanitized.replace(selfClosing, '') : sanitized;
  });

  // Remove atributos de event handlers
  DANGEROUS_ATTRS.forEach(attr => {
    const regex = new RegExp(`\\s*${attr}=["'][^"']*["']`, 'gi');
    sanitized = sanitized.replace(regex, '');
    const singleQuotes = new RegExp(`\\s*${attr}=['][^']*[']`, 'gi');
    sanitized = singleQuotes.test(sanitized) ? sanitized.replace(singleQuotes, '') : sanitized;
  });

  // Remove javascript: URLs
  const jsUrlRegex = /href\s*=\s*["']javascript:[^"']*["']/gi;
  sanitized = sanitized.replace(jsUrlRegex, '');

  // Remove data: URLs potencialmente perigosos
  const dataUrlRegex = /href\s*=\s*["']data:[^"']*["']/gi;
  sanitized = sanitized.replace(dataUrlRegex, '');

  // Adiciona IDs aos títulos h2 e h3 para links internos
  let headingIndex = 0;
  sanitized = sanitized.replace(/<(h2|h3)([^>]*)>/gi, (match, tag, attrs) => {
    const id = `heading-${headingIndex}`;
    headingIndex++;
    // Se já tem ID, mantém; caso contrário adiciona
    if (attrs.includes('id=')) {
      return match;
    }
    return `<${tag}${attrs} id="${id}">`;
  });

  return sanitized;
}

/**
 * Sanitiza texto plain, escapando caracteres especiais HTML.
 * 
 * @function sanitizeText
 * @param {string} text - Texto a ser sanitizado
 * @returns {string} Texto sanitizado
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  return escapeHtml(text);
}

/**
 * Valida se uma string é um email válido.
 * 
 * @function isValidEmail
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se válido
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida se uma string contém apenas caracteres seguros.
 * 
 * @function isSafeString
 * @param {string} str - String a ser validada
 * @param {number} maxLength - Comprimento máximo
 * @returns {boolean} True se segura
 */
export function isSafeString(str: string, maxLength: number = 255): boolean {
  if (!str || typeof str !== 'string') {
    return false;
  }
  if (str.length > maxLength || str.length === 0) {
    return false;
  }
  const safeRegex = /^[a-zA-Z0-9\s\-_áéíóúàèìòùãẽĩõũâêîôûäëïöüÁÉÍÓÚÀÈÌÒÙÃẼĨÕŨÂÊÎÔÛÄËÏÖÜçÇ.,;!?()]+$/;
  return safeRegex.test(str.trim());
}

/**
 * Sanitiza URL, garantindo que seja http/https.
 * 
 * @function sanitizeUrl
 * @param {string} url - URL a ser sanitizada
 * @returns {string | null} URL segura ou null
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return null;
    }
    return urlObj.href;
  } catch {
    return null;
  }
}

/**
 * Sanitiza objeto de artigo completo.
 * Usado para sanitizar todos os campos de uma vez.
 * Preserva todos os campos originais do artigo.
 * 
 * @function sanitizeArticle
 * @param {Object} article - Objeto do artigo completo
 * @returns {Object} Artigo com campos relevantes sanitizados
 */
export function sanitizeArticle<T extends {
  titulo?: string;
  resumo?: string;
  conteudo?: string;
  autor?: string;
  tags?: string[];
  categorias?: string[];
  slug?: string;
  dataPublicacao?: string;
  tempoLeitura?: number;
  id?: string;
  imagemCapa?: string;
  fontes?: string[];
}>(article: T): T & {
  titulo: string;
  resumo: string;
  conteudo: string;
  autor: string;
  tags: string[];
  categorias: string[];
  fontes: string[];
} {
  return {
    ...article,
    titulo: sanitizeText(article.titulo || '').slice(0, 200),
    resumo: sanitizeText(article.resumo || '').slice(0, 500),
    conteudo: sanitizeHtml(article.conteudo || ''),
    autor: sanitizeText(article.autor || '').slice(0, 100),
    tags: (article.tags || []).map(tag => sanitizeText(tag).slice(0, 50)).filter(Boolean),
    categorias: (article.categorias || []).map(cat => sanitizeText(cat).slice(0, 50)).filter(Boolean),
    fontes: (article.fontes || []).map(f => sanitizeText(f).slice(0, 200)).filter(Boolean),
  };
}

export default {
  sanitizeHtml,
  sanitizeText,
  isValidEmail,
  isSafeString,
  sanitizeUrl,
  sanitizeArticle,
};
