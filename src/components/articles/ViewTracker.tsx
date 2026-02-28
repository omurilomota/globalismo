/**
 * @fileoverview Componente para registrar visualização de artigo.
 *
 * Este componente é montado apenas no client-side para registrar
 * uma visualização quando o artigo é carregado.
 *
 * @module components/articles/ViewTracker
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
  slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // Registra visualização quando componente é montado
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(err => console.error('Erro ao registrar visualização:', err));
  }, [slug]);

  return null; // Componente invisível
}
