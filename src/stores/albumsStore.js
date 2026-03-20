import { defineStore } from 'pinia'

export const useAlbumsStore = defineStore('albums', {
  state: () => ({
    albums: []
  })
})