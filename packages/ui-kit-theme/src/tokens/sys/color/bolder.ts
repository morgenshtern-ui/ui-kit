import { RefPalette } from '../../ref'

export const SysColorBolder = {
  default: {
    light: RefPalette.neutral['300-a'],
    dark: RefPalette['dark-neutral']['300-a'],
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
    light: RefPalette.neutral['200-a'],
    dark: RefPalette['dark-neutral']['200-a'],
  },
  focused: {
    light: RefPalette.blue['500'],
    dark: RefPalette.blue['300'],
  },
  input: {
    light: RefPalette.neutral['300-a'],
    dark: RefPalette['dark-neutral']['300-a'],
  },
  inverse: {
    light: RefPalette.neutral['0'],
    dark: RefPalette['dark-neutral']['0'],
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
    light: RefPalette.yellow['600'],
    dark: RefPalette.yellow['500'],
  },
  success: {
    light: RefPalette.green['600'],
    dark: RefPalette.green['500'],
  },
  discovery: {
    light: RefPalette.purple['600'],
    dark: RefPalette.purple['500'],
  },
  information: {
    light: RefPalette.purple['600'],
    dark: RefPalette.purple['500'],
  },
  bold: {
    light: RefPalette.purple['600'],
    dark: RefPalette.purple['600'],
  },
} as const
