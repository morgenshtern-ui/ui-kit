import { RefPalette } from '../../ref'

export const SysElevationSurface = {
  default: {
    light: RefPalette.neutral['0'],
    dark: RefPalette['dark-neutral']['100'],
  },
  hovered: {
    light: RefPalette.neutral['200'],
    dark: RefPalette['dark-neutral']['200'],
  },
  pressed: {
    light: RefPalette.neutral['300'],
    dark: RefPalette['dark-neutral']['250'],
  },
  overlay: {
    default: {
      light: RefPalette.neutral['0'],
      dark: RefPalette['dark-neutral']['250'],
    },
    hovered: {
      light: RefPalette.neutral['200'],
      dark: RefPalette['dark-neutral']['300'],
    },
    pressed: {
      light: RefPalette.neutral['300'],
      dark: RefPalette['dark-neutral']['350'],
    },
  },
  raised: {
    default: {
      light: RefPalette.neutral['0'],
      dark: RefPalette['dark-neutral']['200'],
    },
    hovered: {
      light: RefPalette.neutral['200'],
      dark: RefPalette['dark-neutral']['250'],
    },
    pressed: {
      light: RefPalette.neutral['300'],
      dark: RefPalette['dark-neutral']['300'],
    },
  },
  sunken: {
    light: RefPalette.neutral['100'],
    dark: RefPalette['dark-neutral']['0'],
  },
} as const
