<script lang="ts">
import axios, {AxiosInstance, AxiosResponse} from "axios";
import ASButton from "@/components/ASButton.vue";
import {onMounted, ref} from 'vue';
import Router from "@/router";
import ASTable from "@/components/ASTable.vue";

export default{
    components: {ASTable, ASButton },
    setup(){
        onMounted(() => {
            getList()
        })

        const router = Router;
        const records = ref<object>([])

        let columns: Array<object> = [
            { value: 'edit', text: '', size: 'w-8'},
            { value: 'fullName', text: 'Full name'},
            { value: 'shortName', text: 'Short name'},
            { value: 'icaoCode', text: 'ICAO'},
            { value: 'iataCode', text: 'IATA'},
            { value: 'website', text: 'Website'},
            { value: 'logo', text: 'Logo'}];

        const apiClient: AxiosInstance = axios.create({
            baseURL: `https://localhost:44352/api/Airline`,
            headers: { 'Content-Type': 'application/json' }
        });

        async function getList() : Promise<AxiosResponse<any>>{
            const test = await apiClient.get('/list')

            records.value = test.data
            return test.data
        }

        async function add() : Promise<AxiosResponse<any>>{
            await router.push('airline-edit/00000000-0000-0000-0000-000000000000')
        }
        async function redirectToEdit(id) {
            router.push({ path: `/airline-edit/${id}` })
        }

        return {
            columns,
            records,
            getList,
            add,
            redirectToEdit
        }
    }
}
</script>

<template>
  <div class="airlines-view">
      <div class="airlines-view__toolbar">
          <ASButton @clickOne="add">Add</ASButton>
      </div>
      <div class="table-div">
         <ASTable
             :columns="columns"
             :records="records"
         >
             <template #edit={id}><div @click="redirectToEdit(id)">Edit</div>
             </template>
         </ASTable>
      </div>
  </div>
</template>

<style scoped>
@import "src/assets/base.css";

.airlines-view {
  @apply p-5 h-full grid grid-rows-[1fr_10fr];
}

.airlines-view__toolbar{
    @apply flex text-2xl text-black
}

.table-div {
    @apply p-4 bg-white rounded-2xl overflow-y-auto;
    height: 100%;
}

</style>