/**
 * @fileoverview Configuração de roteamento para internacionalização.
 *
 * @module i18n/routing
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import NextLink from 'next/link';

export const Link = NextLink;
export { usePathname, useRouter };
