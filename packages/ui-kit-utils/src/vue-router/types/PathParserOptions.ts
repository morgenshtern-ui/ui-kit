export type PathParserOptions = Pick<_PathParserOptions, 'end' | 'sensitive' | 'strict'>

/**
 * @internal
 */
interface _PathParserOptions {
  /**
   * Makes the RegExp case-sensitive.
   *
   * @defaultValue `false`
   */
  sensitive?: boolean
  /**
   * Whether to disallow a trailing slash or not.
   *
   * @defaultValue `false`
   */
  strict?: boolean
  /**
   * Should the RegExp match from the beginning by prepending a `^` to it.
   * @internal
   *
   * @defaultValue `true`
   */
  start?: boolean
  /**
   * Should the RegExp match until the end by appending a `$` to it.
   *
   * @defaultValue `true`
   */
  end?: boolean
}
