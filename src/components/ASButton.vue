<script setup lang="ts">

import { PlusIcon } from '@heroicons/vue/24/solid';
const emit = defineEmits(['change', 'update', 'clickOne'])

function click() {
    emit("clickOne")
}
</script>

<template>
  <div class="as-button">
      <div class="as-button_icon"><PlusIcon/></div>
      <button class="as-button__button" @click="click"><slot></slot></button>
  </div>
</template>

<style scoped>
@import "src/assets/base.css";

.as-button {
    @apply m-2 p-2 bg-blue-600 rounded-xl grid grid-cols-[1fr_3fr];
}

.as-button__button {
    @apply text-white
}

.as-button_icon {
    @apply w-8 h-8 text-white
}
</style>