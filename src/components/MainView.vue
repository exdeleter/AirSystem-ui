<script setup lang="ts">

</script>

<template>
  <div class="main-menu">
      <RouterView></RouterView>
  </div>
</template>

<style lang="postcss">
@import "src/assets/base.css";

.main-menu {
    @apply back border-t-2 border-color-main;
    width: 100%;
    height: 90vh;
}
</style>