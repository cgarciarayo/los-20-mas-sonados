import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistsView from '../views/ArtistsView.vue'
import AlbumsView from '../views/AlbumsView.vue'
import ApiView from '../views/ApiView.vue'
import ApiDetailView from '../views/ApiDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artists',
      name: 'artists',
      component: ArtistsView
    },
    {
      path: '/albums',
      name: 'albums',
      component: AlbumsView
    },
    {
      path: '/api',
      name: 'api',
      component: ApiView
    },
    {
      path: '/api/detail',
      name: 'api-detail',
      component: ApiDetailView
    }
  ]
})

export default router