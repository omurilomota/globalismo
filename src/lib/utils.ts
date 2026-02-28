/**
 * @fileoverview Funções utilitárias do projeto Globalismo.
 * Contém funções auxiliares usadas em diversas partes da aplicação
 * para formatação de dados, manipulação de strings e estilos.
 * 
 * @module lib/utils
 * @author Globalismo
 * @version 1.0.0
 */

// Importa o tipo ClassValue da biblioteca clsx para manipulação de classes
import { type ClassValue, clsx } from 'clsx';

// Importa a função twMerge da biblioteca tailwind-merge para mesclar classes do Tailwind
import { twMerge } from 'tailwind-merge';

/**
 * Função utilitária para mesclar nomes de classes CSS.
 * Combina as funcionalidades do clsx (para condições) e tailwind-merge
 * (para evitar conflitos de classes Tailwind).
 * 
 * Esta função é especialmente útil quando se tem classes condicionais
 * ou quando componentes recebem classes de diferentes fontes.
 * 
 * @function cn
 * @param {...ClassValue[]} inputs - Valores de classe para mesclar
 * @returns {string} String com as classes mescladas
 * @example
 * // Classes simples
 * cn('text-lg', 'font-bold');
 * 
 * // Com condição
 * cn('text-lg', isActive && 'font-bold');
 * 
 * // Combinando com classes vindas de props
 * cn('base-classes', className);
 */
export function cn(...inputs: ClassValue[]) {
  // Usa clsx para processar os valores e twMerge para mesclar
  return twMerge(clsx(inputs));
}

/**
 * Formata uma data no formato ISO para o padrão brasileiro.
 * Converte strings como "2024-01-15" para "15 de janeiro de 2024".
 * 
 * @function formatDate
 * @param {string} dateString - Data no formato ISO (YYYY-MM-DD)
 * @returns {string} Data formatada em português brasileiro
 * @example
 * formatDate('2024-01-15'); // "15 de janeiro de 2024"
 * formatDate('2025-12-25'); // "25 de dezembro de 2025"
 */
export function formatDate(dateString: string): string {
  // Converte a string ISO para objeto Date
  const date = new Date(dateString);
  
  // Formata a data para o locale pt-BR
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',    // Dia com 2 dígitos (01, 15, 31)
    month: 'long',     // Mês por extenso (janeiro, fevereiro, ...)
    year: 'numeric'    // Ano com 4 dígitos (2024, 2025, ...)
  });
}

/**
 * Converte um texto para um slug URL-friendly.
 * Remove acentos, caracteres especiais e substitui espaços por hífens.
 * 
 * Este slug é usado para criar URLs amigáveis para artigos e páginas.
 * 
 * @function slugify
 * @param {string} text - Texto a ser convertido para slug
 * @returns {string} Slug URL-friendly
 * @example
 * slugify('Olá Mundo');           // "ola-mundo"
 * slugify('Meu Artigo!!!');       // "meu-artigo"
 * slugify('Test@#$%  World');    // "test--world"
 */
export function slugify(text: string): string {
  return text
    // Converte todo o texto para minúsculas
    .toLowerCase()
    // Normaliza caracteres Unicode (separa letras acentuadas)
    .normalize('NFD')
    // Remove os diacríticos (acentos) resultantes da normalização
    .replace(/[\u0300-\u036f]/g, '')
    // Remove caracteres que não são letras, números, espaços ou hifens
    .replace(/[^\w\s-]/g, '')
    // Substitui um ou mais espaços por um único hífen
    .replace(/\s+/g, '-')
    // Substitui múltiplos hifens por um único hífen
    .replace(/--+/g, '-')
    // Remove espaços em branco do início e fim
    .trim();
}

/**
 * Calcula o tempo estimado de leitura de um conteúdo.
 * Considera uma velocidade média de 200 palavras por minuto.
 * Remove tags HTML antes de contar as palavras.
 * 
 * @function getReadingTime
 * @param {string} content - Conteúdo HTML ou texto puro
 * @returns {number} Tempo estimado de leitura em minutos
 * @example
 * // Texto com aproximadamente 200 palavras
 * getReadingTime('palavra '.repeat(200)); // 1
 * 
 * // Conteúdo HTML
 * getReadingTime('<p>Olá mundo</p><p>Outro parágrafo</p>');
 */
export function getReadingTime(content: string): number {
  // Define a velocidade média de leitura (palavras por minuto)
  const wordsPerMinute = 200;
  
  // Remove todas as tags HTML do conteúdo
  const words = content.replace(/<[^>]*>/g, '')
    // Divide o texto em palavras (por espaços em branco)
    .split(/\s+/).length;
  
  // Calcula o tempo de leitura e arredonda para cima
  return Math.ceil(words / wordsPerMinute);
}
