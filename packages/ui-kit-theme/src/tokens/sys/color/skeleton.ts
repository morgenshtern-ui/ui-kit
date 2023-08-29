import { RefPalette } from '../../ref'

export const SysColorSkeleton = {
  default: {
    light: RefPalette.neutral['200-a'],
    dark: RefPalette['dark-neutral']['200-a'],
  },
  subtle: {
    light: RefPalette.neutral['100-a'],
    dark: RefPalette['dark-neutral']['100-a'],
  },
} as const
