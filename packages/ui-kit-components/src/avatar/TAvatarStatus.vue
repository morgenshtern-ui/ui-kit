<script setup lang="ts">
import TAvatarIconWrapper from './TAvatarIconWrapper.vue'
import type { TAvatarStatusProps, TAvatarStatusSlots } from './TAvatarStatus.model'

defineOptions({
  name: 'TAvatarStatus',
})

defineProps<TAvatarStatusProps>()

defineSlots<TAvatarStatusSlots>()
</script>

<template>
  <TAvatarIconWrapper :bg-color="borderColor" :label="status">
    <svg v-if="status" aria-hidden="true" height="100%" width="100%" viewBox="0 0 8 8">
      <template v-if="status === 'approved'">
        <circle fill="var(--t-sys-color-icon-success)" cx="4" cy="4" r="4" />
        <path
          fill="var(--t-sys-elevation-surface-overlay)"
          d="M2.471 3.529a.667.667 0 1 0-.942.942l1.333 1.334c.26.26.682.26.943 0L6.47 3.138a.667.667 0 1 0-.942-.943L3.333 4.391l-.862-.862Z"
        />
      </template>
      <template v-else-if="status === 'declined'">
        <circle fill="var(--t-sys-color-icon-danger)" cx="4" cy="4" r="4" />
        <path
          fill="var(--t-sys-elevation-surface-overlay)"
          d="m4.9 4 .92-.92a.62.62 0 0 0 0-.88.63.63 0 0 0-.89 0l-.92.92-.94-.94a.63.63 0 0 0-.89 0 .62.62 0 0 0 0 .88l.95.95-.93.93a.62.62 0 0 0 0 .88c.25.24.65.24.89 0l.92-.93.9.9c.24.25.64.25.88 0a.62.62 0 0 0 0-.87L4.9 4Z"
        />
      </template>
      <template v-else-if="status === 'locked'">
        <circle fill="var(--t-sys-color-text-subtlest)" cx="4" cy="4" r="4" />
        <path
          fill="var(--t-sys-elevation-surface-overlay)"
          d="M4.13 1.22H4.1c-.74 0-1.34.59-1.34 1.32v.68h.68v-.68c0-.36.3-.66.67-.66h.01c.37 0 .67.3.67.66v.68h.68v-.68c0-.73-.6-1.32-1.34-1.32m-1.37 2h.68v.66h-.68v-.66Zm2.03 0h.68v.66H4.8v-.66Zm0 .66H2.76c-.37 0-.67.3-.67.67v1a1 1 0 0 0 1 1h2.05a1 1 0 0 0 1-1v-1c0-.37-.3-.67-.67-.67H4.8Z"
        />
      </template>
    </svg>

    <slot v-else></slot>
  </TAvatarIconWrapper>
</template>
