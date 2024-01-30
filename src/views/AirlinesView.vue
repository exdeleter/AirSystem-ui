<script lang="ts">
import axios, {AxiosInstance, AxiosResponse} from "axios";
import ASButton from "@/components/ASButton.vue";
import {onMounted, ref} from 'vue';
import Router from "@/router";
import ASTable from "@/components/ASTable.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPencil } from '@mdi/js';
import { mdiCloseCircle  } from '@mdi/js';

export default{
    components: {
        ASTable,
        ASButton,
        SvgIcon,
        mdiPencil,
        mdiCloseCircle
    },
    setup(){
        onMounted(() => {
            getList()
        })

        const isVisible = ref<boolean>(false);

        const router = Router;
        const records = ref<object>([])

        let columns: Array<object> = [
            { value: 'edit', text: '', size: 'w-8'},
            { value: 'fullName', text: 'Full name'},
            { value: 'shortName', text: 'Short name'},
            { value: 'icaoCode', text: 'ICAO'},
            { value: 'iataCode', text: 'IATA'},
            { value: 'website', text: 'Website'},
            { value: 'logo', text: 'Logo'},
            { value: 'remove', text: '', size: 'w-8'}];

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
            await router.push('Airlines/00000000-0000-0000-0000-000000000000')
        }
        async function redirectToEdit(id) {
            router.push({ path: `Airlines/${id}` })
        }

        async function remove(id) {
            isVisible.value = true;
        }

        async function action(value, id) {
            if (value) {
                await apiClient.delete('', {
                    params: {
                        id: id
                    }
                })

                alert(`Запись с идентификатором: ${id} успешно удалена`);
                isVisible.value = true;
                await getList()
            }

        }

        return {
            columns,
            records,
            add,
            redirectToEdit,
            mdiPencil,
            mdiCloseCircle,
            remove,
            isVisible,
            action
        }
    }
}
</script>

<template>
  <div class="airlines-view">
      <div class="airlines-view__toolbar">
          <ASButton @clickOne="add">Add</ASButton>
      </div>
       <ASTable
           :columns="columns"
           :records="records"
       >
           <template #edit={id}><div @click="redirectToEdit(id)">
               <SvgIcon type="mdi" :path="mdiPencil"></SvgIcon>
           </div>
           </template>
           <template #remove={id}><div @click="remove(id)">
               <SvgIcon type="mdi" :path="mdiCloseCircle"></SvgIcon>
           </div>
           </template>
       </ASTable>
  </div>
  <div class="modal" v-if="isVisible">
      <div class="modal__body">
          <p>Are you sure want to delete record?</p>
          <div class="modal__body__button">
              <ASButton @click="emit(false)">Yes</ASButton>
              <ASButton>No</ASButton>
          </div>
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

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #cececeb5;
}

.modal__body {
    @apply p-2 bg-white text-black;
    border: 2px solid #74a2cf;
    border-radius: 10px;
    text-align: center;
    padding: 20px 40px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
}

.modal__body__button{
    display: flex;
    justify-content: space-between
}
</style>