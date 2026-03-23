<template>
  <v-container class="py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="4">
        <h1 class="text-h4 font-weight-bold">Explorar música</h1>
        <p class="text-subtitle-1">Búsqueda con iTunes Search API</p>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchTerm"
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="selectedEntity"
          :items="entityOptions"
          label="Tipo"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="2" class="d-flex justify-end">
        <v-btn color="primary" @click="loadResults">
          Cargar resultados
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="isLoading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="item in paginatedResults"
        :key="item.trackId || item.collectionId || item.artistId"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100 d-flex flex-column" @click="openDetail(item)">
          <v-img
            :src="item.artworkUrl100 || item.artworkUrl60"
            height="220"
            cover
          />

          <v-card-title>
            {{ item.collectionName || item.trackName || item.artistName }}
          </v-card-title>

          <v-card-text class="flex-grow-1">
            <p class="mb-2">
              <strong>Artista:</strong> {{ item.artistName || 'No disponible' }}
            </p>
            <p class="mb-2">
              <strong>Género:</strong> {{ item.primaryGenreName || 'No disponible' }}
            </p>
            <p>
              <strong>Tipo:</strong> {{ item.kind || item.wrapperType || 'No disponible' }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!isLoading && results.length === 0">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          No hay resultados. Pulsa el botón para buscar en la API.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="results.length > itemsPerPage" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination v-model="currentPage" :length="totalPages" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchTerm = ref('Taylor Swift')
const selectedEntity = ref('album')
const results = ref([])
const isLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 8

const entityOptions = [
  { title: 'Álbumes', value: 'album' },
  { title: 'Canciones', value: 'song' },
  { title: 'Artistas', value: 'musicArtist' }
]

const totalPages = computed(() => {
  return Math.ceil(results.value.length / itemsPerPage)
})

const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return results.value.slice(startIndex, endIndex)
})

const loadResults = async () => {
  isLoading.value = true

  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: searchTerm.value,
        media: 'music',
        entity: selectedEntity.value,
        country: 'ES',
        limit: 24
      }
    })

    results.value = response.data.results
    currentPage.value = 1
  } catch (error) {
    console.error('Error loading iTunes results:', error)
    results.value = []
  } finally {
    isLoading.value = false
  }
}

const openDetail = (item) => {
  router.push({
    name: 'api-detail',
    query: {
      item: JSON.stringify(item)
    }
  })
}

watch([searchTerm, selectedEntity], () => {
  currentPage.value = 1
})
</script>