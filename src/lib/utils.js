import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Safe Tailwind class merger.
 * Usage: cn('base-class', condition && 'conditional-class', 'override-class')
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
