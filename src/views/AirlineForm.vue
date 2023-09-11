<script lang="ts">
import axios, {AxiosInstance} from "axios";
import ASButton from "@/components/ASButton.vue";
import {onMounted, ref} from 'vue';
import ASInput from "@/components/ASInput.vue";
import Router from "@/router";

export default{
    components: {ASInput, ASButton },
    props: {
        id: {
            required: true,
            type: String,
        }
    },
    setup(props){
        const record = ref({});
        const records = ref<object>([])
        const router = Router;
        let columns: Array<object> = [
            { value: '', text: '', size: 'w-10'},
            { value: 'fullName', text: 'Full name'},
            { value: 'shortName', text: 'Short name'},
            { value: 'icaoCode', text: 'ICAO'},
            { value: 'iataCode', text: 'IATA'},
            { value: 'website', text: 'Website'},
            { value: 'logo', text: 'Logo'}];

        const cities = ref<object>([]);

        const apiClient: AxiosInstance = axios.create({
            baseURL: `https://localhost:44352/api/Airline`,
            headers: { 'Content-Type': 'application/json' }
        });

        onMounted(async () => {
            if (props.id != "00000000-0000-0000-0000-000000000000") {
                const res = await apiClient.get(`/${this.$route.params.id}`);
                debugger;

            }

            const apiClientCity: AxiosInstance = axios.create({
                baseURL: `https://localhost:44352/api/City`,
                headers: { 'Content-Type': 'application/json' }
            });

            const test = await apiClientCity.get('/list')

            cities.value = test.data
        })

        async function send() {
            const response = await apiClient.post('', {
                "shortName": record.value?.shortName,
                "fullName": record.value?.fullName,
                "icaoCode":  record.value?.icaoCode,
                "iataCode":  record.value?.iataCode,
                "website": record.value?.website,
                "callSign": record.value?.callSign,
                "logoUrl": record.value?.logoUrl,
                "cityId": record.value?.cityId,
            })

            alert(JSON.stringify(response.data))
        }

        function updatedrp(item){
            record.value.cityId = item.id;
            record.value.city = item
        }

        return {
            columns,
            records,
            record,
            send,
            cities,
            updatedrp
        }
    }
}
</script>

<template>
  <div class="airline-form">
      <div class="grid grid-cols-2">
          <ASInput
              :modelValue="record.shortName"
              text="Short Name"
              @update:modelValue="newValue => record.shortName = newValue"
          />

          <ASInput
              :modelValue="record.fullName"
              text="Full Name"
              @update:modelValue="newValue => record.fullName = newValue"
          />

          <ASInput
              :modelValue="record.iataCode"
              text="IATA"
              @update:modelValue="newValue => record.iataCode = newValue"
          />

          <ASInput
              :modelValue="record.icaoCode"
              text="ICAO"
              @update:modelValue="newValue => record.icaoCode = newValue"
          />
          <ASInput
              :modelValue="record.callSign"
              text="Callsign"
              @update:modelValue="newValue => record.callSign = newValue"
          />
          <ASInput
              :modelValue="record.logoUrl"
              text="Logo URL"
              @update:modelValue="newValue => record.logoUrl = newValue"
          />
      </div>
      <ASInput
              :modelValue="record.website"
              text="Website"
              @update:modelValue="newValue => record.website = newValue"
      />
    <div class="dropdown">
        <input :value="record?.city?.name" class="dropbtn" placeholder="Город" >
        <div class="dropdown-content">
            <a v-for="city in cities" @click="updatedrp(city)">{{ city.name }}</a>
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
    padding: 16px;
    font-size: 16px;
    border: none;
}

/* Контейнер <div> - необходим для размещения выпадающего содержимого */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Выпадающее содержимое (скрыто по умолчанию) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Ссылки внутри выпадающего списка */
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Изменение цвета выпадающих ссылок при наведении курсора */
.dropdown-content a:hover {background-color: #ddd;}

/* Показать выпадающее меню при наведении курсора */
.dropdown:hover .dropdown-content {display: block;}

/* Изменение цвета фона кнопки раскрывающегося списка при отображении содержимого раскрывающегося списка */
.dropdown:hover .dropbtn {background-color: #3e8e41;}

</style>