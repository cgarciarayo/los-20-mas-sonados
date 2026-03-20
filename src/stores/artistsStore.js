import { defineStore } from 'pinia'

export const useArtistsStore = defineStore('artists', {
  state: () => ({
    artists: []
  })
})