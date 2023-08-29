import { RefPalette } from '../../ref'

export const SysColorBlanket = {
  default: {
    light: RefPalette.neutral['500-a'],
    dark: 'rgb(16 18 20 / 60%)',
  },
  selected: {
    light: 'rgb(56 139 255 / 7.8%)',
    dark: 'rgb(29 122 252 / 7.8%)',
  },
  danger: {
    light: 'rgb(239 92 72 / 7.8%)',
    dark: 'rgb(227 73 53 / 7.8%)',
  },
} as const
