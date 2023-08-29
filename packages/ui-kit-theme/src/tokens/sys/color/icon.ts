import { RefPalette } from '../../ref'

export const SysColorIcon = {
  default: {
    light: RefPalette.neutral['800'],
    dark: RefPalette['dark-neutral']['800'],
  },
  accent: {
    lime: {
      light: RefPalette.lime['600'],
      dark: RefPalette.lime['500'],
    },
    red: {
      light: RefPalette.red['600'],
      dark: RefPalette.red['500'],
    },
    orange: {
      light: RefPalette.orange['600'],
      dark: RefPalette.orange['500'],
    },
    yellow: {
      light: RefPalette.yellow['600'],
      dark: RefPalette.yellow['500'],
    },
    green: {
      light: RefPalette.green['600'],
      dark: RefPalette.green['500'],
    },
    teal: {
      light: RefPalette.teal['600'],
      dark: RefPalette.teal['500'],
    },
    blue: {
      light: RefPalette.blue['600'],
      dark: RefPalette.blue['500'],
    },
    purple: {
      light: RefPalette.purple['600'],
      dark: RefPalette.purple['500'],
    },
    magenta: {
      light: RefPalette.magenta['600'],
      dark: RefPalette.magenta['500'],
    },
    gray: {
      light: RefPalette.neutral['600'],
      dark: RefPalette['dark-neutral']['600'],
    },
  },
  disabled: {
    light: RefPalette.neutral['400-a'],
    dark: RefPalette['dark-neutral']['400-a'],
  },
  inverse: {
    light: RefPalette.neutral['0'],
    dark: RefPalette['dark-neutral']['100'],
  },
  selected: {
    light: RefPalette.blue['700'],
    dark: RefPalette.blue['400'],
  },
  brand: {
    light: RefPalette.blue['700'],
    dark: RefPalette.blue['400'],
  },
  danger: {
    light: RefPalette.red['600'],
    dark: RefPalette.red['500'],
  },
  warning: {
    default: {
      light: RefPalette.orange['600'],
      dark: RefPalette.orange['500'],
    },
    inverse: {
      light: RefPalette.neutral['1000'],
      dark: RefPalette['dark-neutral']['100'],
    },
  },
  success: {
    light: RefPalette.blue['600'],
    dark: RefPalette.blue['500'],
  },
  discovery: {
    light: RefPalette.blue['600'],
    dark: RefPalette.blue['500'],
  },
  information: {
    light: RefPalette.blue['600'],
    dark: RefPalette.blue['500'],
  },
  subtle: {
    light: RefPalette.neutral['700'],
    dark: RefPalette['dark-neutral']['700'],
  },
} as const
