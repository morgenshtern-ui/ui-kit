export function isKorean(text: string) {
  // eslint-disable-next-line unicorn/better-regex
  return /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text)
}
