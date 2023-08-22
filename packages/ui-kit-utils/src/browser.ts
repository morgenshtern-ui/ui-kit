export const isClient = typeof window !== 'undefined'

export function isFirefox(): boolean {
  return isClient && /firefox/i.test(window.navigator.userAgent)
}
