<script setup lang="ts">
// import { RouterView } from 'vue-router'
import { TAvatar } from '@teleskop-labs/ui-kit-components'

// const src = 'https://ulibky.ru/wp-content/uploads/2019/10/avatarki_dlya_vatsap_dlya_devushek_42_28061027.jpg'
// const src = 'https://i.pinimg.com/736x/08/16/01/08160149fee430ae84b6db466fc352dd.jpg'
const src = 'https://i.pinimg.com/originals/37/19/f7/3719f73bc788e438be142cc7214df6da.jpg'
</script>

<template>
  <div class="t-demo-box">
    <div class="t-demo-box">
      <TAvatar name="Scott Farquhar" presence="online" />
    </div>
    <div class="t-demo-box">
      <TAvatar :src="src" name="Scott Farquhar" />
    </div>
    <div class="t-demo-box">
      <TAvatar :src="src" name="Scott Farquhar" presence="online" />
    </div>
  </div>
</template>
