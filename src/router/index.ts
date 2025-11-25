import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ListPage from '../views/ListPage.vue'
import DetailPage from '../views/DetailPage.vue'
import AboutPage from '../views/AboutPage.vue'
import CombatPage from '../views/CombatPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/list',
      name: 'list',
      component: ListPage,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage,
    },
    {
      path: '/combat',
      name: 'combat',
      component: CombatPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
  ],
})

export default router
