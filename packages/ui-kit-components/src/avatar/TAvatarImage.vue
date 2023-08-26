<script setup lang="ts">
import { TIconPerson, TIconShip } from '@teleskop-labs/atlassian-icons-vue'
import { ref, watch } from 'vue'

import { ICON_BACKGROUND, ICON_COLOR } from './constants'
import type { TAvatarImageProps } from './TAvatarImage.model'
import { TAvatarImageDefaultProps } from './TAvatarImage.model'

defineOptions({
  name: 'TAvatarImage',
})

const props = withDefaults(defineProps<TAvatarImageProps>(), TAvatarImageDefaultProps)

const hasImageErrored = ref(false)

watch(
  () => props.src,
  () => {
    hasImageErrored.value = false
  },
)

function handleError() {
  hasImageErrored.value = true
}
</script>

<template>
  <span v-if="!src || hasImageErrored" class="t-avatar__follback-wrapper">
    <TIconPerson
      v-if="appearance === 'circle'"
      class="t-avatar__follback"
      :label="alt"
      :primary-color="ICON_BACKGROUND"
      :secondary-color="ICON_COLOR"
    />
    <TIconShip
      v-else
      class="t-avatar__follback"
      :label="alt"
      :primary-color="ICON_BACKGROUND"
      :secondary-color="ICON_COLOR"
    />
  </span>
  <img v-else class="t-avatar__image" :src="src" :alt="alt" @error="handleError" />
</template>
