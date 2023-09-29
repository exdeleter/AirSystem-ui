<script lang="ts">
import axios, {AxiosInstance} from "axios";
import ASButton from "@/components/ASButton.vue";
import {onMounted, ref, watch} from 'vue';
import ASInput from "@/components/ASInput.vue";
import useAirlineStore from "@/stores/useStore";

export default{
    components: {ASInput, ASButton },
    props: {
        id: {
            required: true,
            type: String,
        }
    },
    setup(props){
        const store = useAirlineStore();

        const record = ref({});
        const records = ref<object>([])

        const cities = ref<object>([]);

        onMounted(async () => {
            if (props.id != "00000000-0000-0000-0000-000000000000") {
                await store.get(props.id)
            }

            const apiClientCity: AxiosInstance = axios.create({
                baseURL: `https://localhost:44352/api/City`,
                headers: { 'Content-Type': 'application/json' }
            });

            const test = await apiClientCity.get('/list')

            cities.value = test.data
        })

        async function send() {
            await store.send()
        }

        function updatedrp(item){
            record.value.cityId = item.id;
            record.value.city = item
        }

        const test = ref<object>();

        watch(
            () => record.value?.city?.name,
            async (newVal, oldVal) => {
            const apiClientCity: AxiosInstance = axios.create({
                baseURL: `https://localhost:44352/api/City`,
                headers: { 'Content-Type': 'application/json' }
            });

            const test = await apiClientCity.get('/params',
                { params:
                        {
                            name: oldVal
                        }
                }
            )

            cities.value = test.data
        })

        return {
            records,
            record : store.record,
            send,
            cities,
            updatedrp,
            test,
            store
        }
    }
}
</script>

<template>
  <div class="airline-form">
      <div class="grid grid-cols-2">
          <ASInput
              v-model="record.shortName"
              text="Short Name"
          />
          <ASInput
              v-model="record.fullName"
              text="Full Name"
          />
          <ASInput
              v-model="record.iataCode"
              text="IATA"
          />
          <ASInput
              v-model="record.icaoCode"
              text="ICAO"
          />
          <ASInput
              v-model="record.callSign"
              text="Callsign"
          />
          <ASInput
              v-model="record.logoUrl"
              text="Logo URL"
          />
      </div>
      <ASInput
          v-model="record.website"
          text="Website"
      />
    <div class="dropdown">
        <input :value="record?.city?.name"
               class="dropbtn"
               placeholder="Город"
               @input="record.city = { name: $event.target.value}">
        <div class="dropdown-content">
            <div v-for="city in cities"
               @click="updatedrp(city)"
            >
                {{ city.name }}
            </div>
        </div>
    </div>
    <ASButton @clickOne="send">Add</ASButton>
  </div>
</template>

<style scoped>
@import "src/assets/base.css";

.airline-form  {
    @apply p-2 text-black;
}

/* Кнопка выпадающего списка */
.dropbtn {
    @apply border-2;
    padding: 16px;
    @apply m-2 p-2 border-2 border-slate-600 rounded-lg;
    display: inline-block;
}

/* Выпадающее содержимое (скрыто по умолчанию) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    max-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Ссылки внутри выпадающего списка */
.dropdown-content div {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Изменение цвета выпадающих ссылок при наведении курсора */
.dropdown-content div:hover {background-color: #ddd;}

/* Показать выпадающее меню при наведении курсора */
.dropdown:hover .dropdown-content {display: block;}

/* Изменение цвета фона кнопки раскрывающегося списка при отображении содержимого раскрывающегося списка */
.dropdown:hover .dropbtn {
    @apply border-4
}

</style>