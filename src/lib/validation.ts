/**
 * @fileoverview Validador de dados para formulários server-side.
 * 
 * Este módulo fornece funções de validação para dados
 * vindos de formulários, garantindo segurança e integridade.
 * 
 * @module lib/validation
 * @author Globalismo
 * @version 1.0.0
 */

/**
 * Resultado de uma validação.
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Expressão regular para validação de email.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Expressão regular para caracteres seguros em strings.
 */
const SAFE_STRING_REGEX = /^[a-zA-Z0-9\s\-_áéíóúàèìòùãẽĩõũâêîôûäëïöüÁÉÍÓÚÀÈÌÒÙÃẼĨÕŨÂÊÎÔÛÄËÏÖÜçÇ.,;!?()]+$/;

/**
 * Escapa caracteres especiais para prevenir XSS.
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
 * Valida dados do formulário de contato.
 * 
 * @function validateContactForm
 * @param {Object} data - Dados do formulário
 * @returns {ValidationResult} Resultado da validação
 */
export function validateContactForm(data: {
  nome?: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Validar nome
  if (!data.nome || data.nome.trim().length === 0) {
    errors.nome = 'Nome é obrigatório';
  } else if (!SAFE_STRING_REGEX.test(data.nome) || data.nome.length > 100) {
    errors.nome = 'Nome contém caracteres inválidos';
  }
  
  // Validar email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email é obrigatório';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Email inválido';
  }
  
  // Validar assunto
  if (!data.assunto || data.assunto.trim().length === 0) {
    errors.assunto = 'Assunto é obrigatório';
  } else if (!SAFE_STRING_REGEX.test(data.assunto) || data.assunto.length > 150) {
    errors.assunto = 'Assunto contém caracteres inválidos';
  }
  
  // Validar mensagem
  if (!data.mensagem || data.mensagem.trim().length === 0) {
    errors.mensagem = 'Mensagem é obrigatória';
  } else if (data.mensagem.trim().length < 10) {
    errors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
  } else if (data.mensagem.trim().length > 5000) {
    errors.mensagem = 'Mensagem excede o limite de 5000 caracteres';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Valida dados do formulário de newsletter.
 * 
 * @function validateNewsletterForm
 * @param {Object} data - Dados do formulário
 * @returns {ValidationResult} Resultado da validação
 */
export function validateNewsletterForm(data: {
  email?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Validar email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email é obrigatório';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Email inválido';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Limpa e sanitiza dados do formulário de contato.
 * 
 * @function sanitizeContactForm
 * @param {Object} data - Dados do formulário
 * @returns {Object} Dados sanitizados
 */
export function sanitizeContactForm(data: {
  nome?: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
}): {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
} {
  return {
    nome: escapeHtml(data.nome || '').slice(0, 100),
    email: (data.email || '').trim().toLowerCase().slice(0, 254),
    assunto: escapeHtml(data.assunto || '').slice(0, 150),
    mensagem: escapeHtml(data.mensagem || '').slice(0, 5000),
  };
}

/**
 * Limpa e sanitiza dados do formulário de newsletter.
 * 
 * @function sanitizeNewsletterForm
 * @param {Object} data - Dados do formulário
 * @returns {Object} Dados sanitizados
 */
export function sanitizeNewsletterForm(data: {
  email?: string;
}): {
  email: string;
} {
  return {
    email: (data.email || '').trim().toLowerCase().slice(0, 254),
  };
}

/**
 * Valida dados de um comentário.
 * 
 * @function validateComment
 * @param {Object} data - Dados do comentário
 * @returns {ValidationResult} Resultado da validação
 */
export function validateComment(data: {
  author?: string;
  email?: string;
  content?: string;
  articleSlug?: string;
}): ValidationResult & { error?: string } {
  const errors: Record<string, string> = {};
  
  if (!data.articleSlug || data.articleSlug.trim().length === 0) {
    errors.articleSlug = 'Artigo é obrigatório';
  }
  
  if (!data.author || data.author.trim().length === 0) {
    errors.author = 'Nome é obrigatório';
  } else if (!SAFE_STRING_REGEX.test(data.author) || data.author.length > 100) {
    errors.author = 'Nome contém caracteres inválidos';
  }
  
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email é obrigatório';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!data.content || data.content.trim().length === 0) {
    errors.content = 'Comentário é obrigatório';
  } else if (data.content.trim().length < 3) {
    errors.content = 'Comentário deve ter pelo menos 3 caracteres';
  } else if (data.content.trim().length > 2000) {
    errors.content = 'Comentário excede o limite de 2000 caracteres';
  }
  
  const valid = Object.keys(errors).length === 0;
  return {
    valid,
    errors,
    error: valid ? undefined : Object.values(errors)[0],
  };
}

export default {
  validateContactForm,
  validateNewsletterForm,
  sanitizeContactForm,
  sanitizeNewsletterForm,
};
