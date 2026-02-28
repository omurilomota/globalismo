/**
 * @fileoverview Configuração de roteamento para internacionalização.
 *
 * @module i18n/routing
 * @author Globalismo
 * @version 1.0.0
 */

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, localePrefix } from '@/i18n/config';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
