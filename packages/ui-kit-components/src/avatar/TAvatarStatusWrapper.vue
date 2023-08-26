<script setup lang="ts">
import { isNil } from '@teleskop-labs/ui-kit-utils'

import TAvatarStatus from './TAvatarStatus.vue'
import type { TAvatarStatusWrapperProps, TAvatarStatusWrapperSlots } from './TAvatarStatusWrapper.model'

defineOptions({
  name: 'TAvatarStatusWrapper',
})

defineProps<TAvatarStatusWrapperProps>()

const slots = defineSlots<TAvatarStatusWrapperSlots>()
</script>

<template>
  <span class="t-avatar__status-wrapper" aria-hidden="true">
    <TAvatarStatus :border-color="borderColor" :status="isNil(slots.default) ? status : undefined">
      <template v-if="slots.default" #default>
        <slot></slot>
      </template>
    </TAvatarStatus>
  </span>
</template>
