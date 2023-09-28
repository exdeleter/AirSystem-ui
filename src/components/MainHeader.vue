<script setup lang="ts">

</script>

<template>
  <div class="main-header">
      <div class="main-header__breadcrumb">
          AirSystem <span class="angle">></span> Airlines <span class="angle">></span> Form
      </div>
  </div>
</template>

<style lang="postcss">
@import "src/assets/base.css";
.main-header {
    @apply back h-6 accent-gray-50 text-black border-color-main items-center grid grid-cols-5;
    height: 10vh;
}

.main-header__breadcrumb {
    @apply bg-gray-400 items-center m-2 p-3 rounded-lg font-semibold
}
.angle {
    @apply text-gray-500
}
</style>