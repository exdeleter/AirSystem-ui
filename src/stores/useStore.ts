import type {AxiosInstance} from "axios";
import axios from "axios";
import {ref} from 'vue';

export default function useAirlineStore() {
  const apiClient: AxiosInstance = axios.create({
    baseURL: `https://localhost:44352/api/Airline`,
    headers: { 'Content-Type': 'application/json' }
  });

  const record : any = ref({});

  async function send() {
    if (record.value.id && record.value.id != "00000000-0000-0000-0000-000000000000") {
      await apiClient.put('', {
        "shortName": record.value?.shortName,
        "fullName": record.value?.fullName,
        "icaoCode":  record.value?.icaoCode,
        "iataCode":  record.value?.iataCode,
        "website": record.value?.website,
        "callSign": record.value?.callSign,
        "logoUrl": record.value?.logoUrl,
        "cityId": record.value?.cityId,
        "id": record.value?.id
      })

      alert(`Запись с идентификатором ${record.value.id} успешно обновлена.`)

      return;
    }

    await apiClient.post('', {
      "shortName": record.value?.shortName,
      "fullName": record.value?.fullName,
      "icaoCode":  record.value?.icaoCode,
      "iataCode":  record.value?.iataCode,
      "website": record.value?.website,
      "callSign": record.value?.callSign,
      "logoUrl": record.value?.logoUrl,
      "cityId": record.value?.cityId,
    })

    alert(`Запись с идентификатором ${record.value.id} успешно сохранена.`)
  }

  async function get(id: string ) {
    if (id && id != "00000000-0000-0000-0000-000000000000") {
      const res = await apiClient.get(`/${id}`);
      record.value = res.data
    }
  }

  return {
    apiClient,
    send,
    get,
    record
  }
}
