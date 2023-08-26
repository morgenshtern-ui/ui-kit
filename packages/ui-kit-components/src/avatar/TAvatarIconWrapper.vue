<script setup lang="ts">
import {
  TAvatarIconWrapperDefaultProps,
  type TAvatarIconWrapperProps,
  type TAvatarIconWrapperSlots,
} from './TAvatarIconWrapper.model'

defineOptions({
  name: 'TAvatarIconWrapper',
})

withDefaults(defineProps<TAvatarIconWrapperProps>(), TAvatarIconWrapperDefaultProps)

defineSlots<TAvatarIconWrapperSlots>()
</script>

<template>
  <span
    class="t-avatar__icon-wrapper"
    :aria-label="label"
    :role="label ? 'img' : 'presentation'"
    :style="{
      border: `2px solid ${bgColor}`,
      backgroundColor: bgColor,
    }"
  >
    <slot></slot>
  </span>
</template>
