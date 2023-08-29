import { RefPalette } from '../../ref'

export const SysColorText = {
  default: {
    $light: RefPalette.neutral['1000'],
    $dark: RefPalette['dark-neutral']['900'],
  },
  accent: {
    lime: {
      default: {
        $light: RefPalette.lime['800'],
        $dark: RefPalette.lime['300'],
      },
      bolder: {
        $light: RefPalette.lime['900'],
        $dark: RefPalette.lime['200'],
      },
    },
    red: {
      default: {
        $light: RefPalette.red['800'],
        $dark: RefPalette.red['300'],
      },
      bolder: {
        $light: RefPalette.red['900'],
        $dark: RefPalette.red['200'],
      },
    },
    orange: {
      default: {
        $light: RefPalette.orange['800'],
        $dark: RefPalette.orange['300'],
      },
      bolder: {
        $light: RefPalette.orange['900'],
        $dark: RefPalette.orange['200'],
      },
    },
    yellow: {
      default: {
        $light: RefPalette.yellow['800'],
        $dark: RefPalette.yellow['300'],
      },
      bolder: {
        $light: RefPalette.yellow['900'],
        $dark: RefPalette.yellow['200'],
      },
    },
    green: {
      default: {
        $light: RefPalette.green['800'],
        $dark: RefPalette.green['300'],
      },
      bolder: {
        $light: RefPalette.green['900'],
        $dark: RefPalette.green['200'],
      },
    },
    teal: {
      default: {
        $light: RefPalette.teal['800'],
        $dark: RefPalette.teal['300'],
      },
      bolder: {
        $light: RefPalette.teal['900'],
        $dark: RefPalette.teal['200'],
      },
    },
    blue: {
      default: {
        $light: RefPalette.blue['800'],
        $dark: RefPalette.blue['300'],
      },
      bolder: {
        $light: RefPalette.blue['900'],
        $dark: RefPalette.blue['200'],
      },
    },
    purple: {
      default: {
        $light: RefPalette.purple['800'],
        $dark: RefPalette.purple['300'],
      },
      bolder: {
        $light: RefPalette.purple['900'],
        $dark: RefPalette.purple['200'],
      },
    },
    magenta: {
      default: {
        $light: RefPalette.magenta['800'],
        $dark: RefPalette.magenta['300'],
      },
      bolder: {
        $light: RefPalette.magenta['900'],
        $dark: RefPalette.magenta['200'],
      },
    },
    gray: {
      default: {
        $light: RefPalette.neutral['800'],
        $dark: RefPalette['dark-neutral']['300'],
      },
      bolder: {
        $light: RefPalette.neutral['1100'],
        $dark: RefPalette['dark-neutral']['1100'],
      },
    },
  },
  disabled: {
    $light: RefPalette.neutral['400-a'],
    $dark: RefPalette['dark-neutral']['400-a'],
  },
  inverse: {
    $light: RefPalette.neutral['0'],
    $dark: RefPalette['dark-neutral']['100'],
  },
  selected: {
    $light: RefPalette.blue['700'],
    $dark: RefPalette.blue['400'],
  },
  brand: {
    $light: RefPalette.blue['700'],
    $dark: RefPalette.blue['400'],
  },
  danger: {
    $light: RefPalette.red['800'],
    $dark: RefPalette.red['300'],
  },
  warning: {
    default: {
      $light: RefPalette.orange['800'],
      $dark: RefPalette.orange['300'],
    },
    inverse: {
      $light: RefPalette.orange['800'],
      $dark: RefPalette.orange['300'],
    },
  },
  success: {
    $light: RefPalette.blue['800'],
    $dark: RefPalette.blue['300'],
  },
  discovery: {
    $light: RefPalette.purple['800'],
    $dark: RefPalette.purple['300'],
  },
  information: {
    $light: RefPalette.blue['800'],
    $dark: RefPalette.blue['300'],
  },
  subtlest: {
    $light: RefPalette.neutral['700'],
    $dark: RefPalette['dark-neutral']['700'],
  },
  subtle: {
    $light: RefPalette.neutral['800'],
    $dark: RefPalette['dark-neutral']['800'],
  },
} as const
