import { createRouter, createWebHistory } from 'vue-router'
import AircraftsView from "@/views/AircraftsView.vue";
import AirlinesView from "@/views/AirlinesView.vue";

//TODO delete later
const About = { template: '<div>About</div>' }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {
        title: "Select style",
      },
      path: "/main",
      name: "style",
      component: About,
    },
    {
      meta: {
        title: "Select style",
      },
      path: "/Aircrafts",
      name: "style",
      component: AircraftsView,
    },
    {
      meta: {
        title: "Select style",
      },
      path: "/Airlines",
      name: "style",
      component: AirlinesView,
    },
  ]
})

export default router
