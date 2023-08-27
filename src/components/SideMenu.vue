<style lang="postcss">
@import "src/assets/base.css";

.side-menu {
    @apply back border-r-2 border-t-2 border-gray-500;
    color: black;
    width: 100%;
    height: 90vh;
}

.side-menu__element {
    @apply p-2 m-3 grid grid-cols-[40px_minmax(30px,_1fr)_40px] rounded-md border-2 border-gray-500 drop-shadow-lg text-sm
}
</style>

<template>
    <div class="side-menu">
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="main-navbar__btn">
                <li class="side-menu__element" v-for="item in items">
                    <div>ICON</div>
                    <a href="#"  aria-current="page" @click="$router.push(`/${item}`)" >{{ item }}</a>
                    <div>ICON</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    setup() {
        let items: Array<string> = ['Dashboard','Aircrafts', 'Airlines', 'Flight']

        return {
            items
        }
    }
}
</script>
