export const SysElevationShadow = {
  overflow: {
    default: {
      $light: '0px 0px 8px rgb(9 30 66 / 16%), 0px 0px 1px rgb(9 30 66 / 12%)',
      $dark: '0px 0px 12px rgb(3 4 4 / 56%), 0px 0px 1px rgb(3 4 4 / 50%)',
    },
    perimeter: {
      $light: 'rgb(9 30 66 / 12.2%)',
      $dark: 'rgb(3 4 4 / 50.2%)',
    },
    spread: {
      $light: 'rgb(9 30 66 / 16.1%)',
      $dark: 'rgb(3 4 4 / 56.1%)',
    },
  },
  overlay: {
    $light: '0px 8px 12px rgb(9 30 66 / 15%), 0px 0px 1px rgb(9 30 66 / 31%)',
    $dark: '0px 0px 0px rgb(188 214 240 / 12%), 0px 8px 12px rgb(3 4 4 / 36%), 0px 0px 1px rgb(3 4 4 / 50%)',
  },
  raised: {
    $light: '0px 1px 1px rgb(9 30 66 / 25%), 0px 0px 1px rgb(9 30 66 / 31%)',
    $dark: '0px 0px 0px rgb(0 0 0 / 0%), 0px 1px 1px rgb(3 4 4 / 50%), 0px 0px 1px rgb(3 4 4 / 50%)',
  },
} as const
