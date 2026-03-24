import axios from 'axios'
import { defineStore } from 'pinia'

export const useItunesStore = defineStore('itunes', {
  state: () => ({
    results: [],
    isLoading: false,
    errorMessage: ''
  }),

  actions: {
    async searchMusic(searchTerm, entity) {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const response = await axios.get('https://itunes.apple.com/search', {
          params: {
            term: searchTerm,
            media: 'music',
            entity,
            country: 'ES',
            limit: 24
          }
        })

        this.results = response.data.results
      } catch (error) {
        console.error('Error loading iTunes results:', error)
        this.results = []
        this.errorMessage = 'No se han podido cargar los resultados de la API.'
      } finally {
        this.isLoading = false
      }
    },

    clearResults() {
      this.results = []
      this.errorMessage = ''
    }
  }
})