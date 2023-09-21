import { createRouter, createWebHistory } from 'vue-router'
import AircraftsView from "@/views/AircraftsView.vue";
import AirlinesView from "@/views/AirlinesView.vue";
import AirlineForm from "@/views/AirlineForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {
        title: "Select style",
      },
      path: "/Aircrafts",
      component: AircraftsView,
    },
    {
      meta: {
        title: "Select style",
      },
      path: "/Airlines",
      component: AirlinesView,
    },
    {
      path: '/airline-edit/:id',
      component: AirlineForm,
      props: true
    }
  ]
})

export default router
