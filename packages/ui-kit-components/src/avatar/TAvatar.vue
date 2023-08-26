<script setup lang="ts">
import { useAvatar } from './hooks'
import type { TAvatarEmits, TAvatarProps, TAvatarSlots } from './TAvatar.model'
import { TAvatarDefaultProps } from './TAvatar.model'
import TAvatarImage from './TAvatarImage.vue'
import TAvatarPresenceWrapper from './TAvatarPresenceWrapper.vue'
import TAvatarStatusWrapper from './TAvatarStatusWrapper.vue'

defineOptions({
  name: 'TAvatar',
})

const props = withDefaults(defineProps<TAvatarProps>(), TAvatarDefaultProps)

const emit = defineEmits<TAvatarEmits>()

const slots = defineSlots<TAvatarSlots>()

const { innerTagComputed, innerAttributesComputed, classes, styles, isValidIconSize, getStatusSize } = useAvatar(
  props,
  emit,
)
</script>

<template>
  <component :is="tag" class="t-avatar" :class="classes" :style="styles">
    <component :is="innerTagComputed" class="t-avatar__inner" v-bind="innerAttributesComputed">
      <TAvatarImage :alt="name" :appearance="appearance" :size="size" :src="src" />
    </component>

    <TAvatarPresenceWrapper
      v-if="isValidIconSize && presence && !status"
      :appearance="appearance"
      :size="getStatusSize()"
      :presence="presence"
    >
      <template v-if="slots.presenceIcon" #default>
        <slot name="presenceIcon"></slot>
      </template>
    </TAvatarPresenceWrapper>

    <TAvatarStatusWrapper
      v-if="isValidIconSize && status"
      :appearance="appearance"
      :size="getStatusSize()"
      :border-color="borderColor"
      :status="status"
    >
      <template v-if="slots.statusIcon" #default>
        <slot name="statusIcon"></slot>
      </template>
    </TAvatarStatusWrapper>
  </component>
</template>
