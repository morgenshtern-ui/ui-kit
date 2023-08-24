/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, getCurrentInstance } from 'vue'

export function useProp<T>(name: string) {
  const vm = getCurrentInstance()

  return computed<T | undefined>(() => (vm?.proxy?.$props as any)?.[name])
}
