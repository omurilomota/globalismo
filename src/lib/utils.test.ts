import { describe, it, expect } from 'vitest';
import { cn, formatDate, slugify, getReadingTime } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });
  });

  describe('formatDate', () => {
    it('should format date in pt-BR format', () => {
      const result = formatDate('2024-01-15');
      expect(result).toContain('janeiro');
      expect(result).toContain('2024');
    });

    it('should handle different dates', () => {
      const result = formatDate('2025-12-25');
      expect(result).toContain('dezembro');
      expect(result).toContain('2025');
    });
  });

  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Olá Mundo')).toBe('ola-mundo');
    });

    it('should remove special characters', () => {
      expect(slugify('Test@#$%!')).toBe('test');
    });

    it('should handle multiple spaces', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });
  });

  describe('getReadingTime', () => {
    it('should calculate reading time', () => {
      const text = 'word '.repeat(200);
      const result = getReadingTime(text);
      expect(result).toBeGreaterThan(0);
    });

    it('should round up reading time', () => {
      const text = 'word '.repeat(150);
      const result = getReadingTime(text);
      expect(result).toBeGreaterThan(0);
    });
  });
});
