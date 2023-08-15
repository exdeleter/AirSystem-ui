import { createRouter, createWebHistory } from 'vue-router'

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
  ]
})

export default router
