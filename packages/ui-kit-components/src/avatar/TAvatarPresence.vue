<script setup lang="ts">
import TAvatarIconWrapper from './TAvatarIconWrapper.vue'
import type { TAvatarPresenceProps, TAvatarPresenceSlots } from './TAvatarPresence.model'

defineOptions({
  name: 'TAvatarPresence',
})

defineProps<TAvatarPresenceProps>()

defineSlots<TAvatarPresenceSlots>()
</script>

<template>
  <TAvatarIconWrapper :bg-color="borderColor" :label="presence">
    <svg v-if="presence" aria-hidden="true" height="100%" width="100%" viewBox="0 0 8 8">
      <template v-if="presence === 'busy'">
        <circle cx="4" cy="4" r="4" fill="var(--t-sys-color-icon-danger)" />
        <path
          fill="var(--t-sys-elevation-surface-overlay)"
          d="m3.3 1.9 2.8 2.8c.2.2.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0L1.9 3.3a.5.5 0 0 1 0-.7l.7-.7c.2-.2.5-.2.7 0z"
        />
      </template>
      <template v-else-if="presence === 'focus'">
        <path
          fill="var(--t-sys-color-icon-discovery)"
          d="M4 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.333a2.667 2.667 0 1 0 0-5.334 2.667 2.667 0 0 0 0 5.334Zm0-1.334a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666Z"
        />
      </template>
      <template v-else-if="presence === 'offline'">
        <path
          fill="var(--t-sys-color-text-subtlest)"
          d="M4 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
        <path fill="var(--t-sys-elevation-surface-overlay)" d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </template>
      <template v-else-if="presence === 'online'">
        <circle fill="var(--t-sys-color-icon-success)" cx="4" cy="4" r="4" />
      </template>
    </svg>

    <slot v-else></slot>
  </TAvatarIconWrapper>
</template>
