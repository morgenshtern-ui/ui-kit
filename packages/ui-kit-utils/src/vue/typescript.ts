import type { AppContext, Plugin } from 'vue'

import type { Arrayable } from '../typescript'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

export type ClassValue = Arrayable<string | Record<string, boolean>>
