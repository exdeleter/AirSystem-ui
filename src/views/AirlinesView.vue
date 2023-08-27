<script lang="ts">
import axios, {AxiosInstance, AxiosResponse} from "axios";
import ASButton from "@/components/ASButton.vue";
import {onMounted, ref} from 'vue';

export default{
    components: { ASButton },
    setup(){
        onMounted(() => {
            getList()
        })

        const records = ref<object>([])

        let columns: Array<object> = [
            { value: '', text: '', size: 'w-10'},
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

        return {
            columns,
            records,
            getList
        }
    }
}
</script>

<template>
  <div class="airlines_view">
      <div class="airlines_view__toolbar">
          <ASButton @clickOne="getList">Add</ASButton>
      </div>
      <div class="table-div">
          <table class="table">
              <thead class="sticky-header">
              <tr class="rounded-lg back-gray">
                  <th class="table_columns__col" v-bind:class = "column.size" v-for="column in columns">{{ column.text }}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="table_columns__row" v-for="record in records">
                  <td class="table_columns__cell" v-for="column in columns">{{ record[column.value] }}</td>
              </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<style scoped>
@import "src/assets/base.css";

.airlines_view {
  @apply p-5 h-full grid grid-rows-[1fr_10fr];
}

.airlines_view__toolbar{
    @apply flex text-2xl text-black
}

.table-div {
    @apply p-4 bg-white rounded-2xl overflow-y-auto;
    height: 100%;
}
.table {
    @apply p-2 bg-white text-black w-full rounded-lg;
    overflow-y: auto
}

.table_columns__col {
    @apply p-2 m-2 border-r-2  border-black;
}

.table_columns__row {
    @apply p-2 m-2 border-2;
}

.table_columns__cell {
    @apply p-2 m-2 border-2;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: white; /* Adjust as needed */
    z-index: 1; /* Ensure header appears above scrolling content */
}
</style>