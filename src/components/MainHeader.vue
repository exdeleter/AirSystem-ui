<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
const router = useRouter();
import Router from "@/router";

const objs = ref([])

watch(
    () => route.path,
    () => {
        objs.value = [
            {
                name:"Airsystem",
                style: 'font-semibold',
                link: "/",
                isLink: true
            },
            { name:">", style:'angle'}]

        const paths = route.path.split('/')

        for(var i = 0;i<paths.length;i++){
            if (paths[i] == '')
                continue;

            objs.value.push({
                name: paths[i],
                link: '/'+paths[i],
                style: 'font-semibold',
                isLink: true
            })

            if (i != paths.length-1) {
                objs.value.push({
                    name: ' > ',
                    style: 'angle'
                })
            }
        }
})
</script>

<template>
  <div class="main-header">
      <div class="main-header__breadcrumb flex">
          <span v-for="val in objs">
              <span v-bind:class = "val.style" v-if="!val.isLink">
                  {{ val.name }}
              </span>
              <span  v-if="val.isLink">
                  <a v-bind:class = "val.style" @click="Router.push(val.link)">{{ val.name }}</a>
              </span>
          </span>
      </div>
  </div>
</template>

<style lang="postcss">
@import "src/assets/base.css";
.main-header {
    @apply back h-6 accent-gray-50 text-black border-color-main items-center grid grid-cols-[auto_1fr_2fr];
    height: 10vh;
}

.main-header__breadcrumb {
    @apply bg-gray-400 items-center m-2 p-3 rounded-lg
}
.angle {
    @apply text-gray-500
}

.after-text-bold{
    @apply font-semibold
}
</style>