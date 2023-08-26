<script setup lang="ts">
import { isNil } from '@teleskop-labs/ui-kit-utils'

import TAvatarPresence from './TAvatarPresence.vue'
import type { TAvatarPresenceWrapperProps, TAvatarPresenceWrapperSlots } from './TAvatarPresenceWrapper.model'

defineOptions({
  name: 'TAvatarPresenceWrapper',
})

defineProps<TAvatarPresenceWrapperProps>()

const slots = defineSlots<TAvatarPresenceWrapperSlots>()
</script>

<template>
  <span class="t-avatar__presence-wrapper" aria-hidden="true">
    <TAvatarPresence :border-color="borderColor" :presence="isNil(slots.default) ? presence : undefined">
      <template v-if="slots.default" #default>
        <slot></slot>
      </template>
    </TAvatarPresence>
  </span>
</template>
