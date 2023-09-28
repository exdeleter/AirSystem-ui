<script setup lang="ts">

</script>

<template>
  <div class="logo-place">
      <img style="max-height:100%; max-width:100%;" src="/LOGO.svg" alt="logo">
      <h6 class="logo-place__header">AirSystem</h6>
  </div>
</template>

<style scoped>
@import "src/assets/base.css";

.logo-place {
    @apply back items-center flex pl-5 py-2 border-color-main border-r-2;
    color: black;
    width: 100%;
    height: 10vh;
}

.logo-place__header {
    @apply p-5 text-xl;
    font-family: 'Black Ops One', sans-serif;
}
</style>