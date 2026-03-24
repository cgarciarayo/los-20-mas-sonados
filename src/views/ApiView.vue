<template>
  <v-container class="page-container py-8">
    <v-row class="mb-6" align="center" justify="space-between">
     <v-col cols="12" md="4">
  <section-header
    badge="Descubrir música"
    title="Explorar música"
    subtitle="Búsqueda con iTunes Search API"
  />
</v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchTerm"
          label="Buscar"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          class="custom-field"
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
          class="custom-field"
        />
      </v-col>

      <v-col cols="12" md="2" class="d-flex justify-end">
        <v-btn color="primary" class="action-button" @click="loadResults">
          Cargar resultados
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="itunesStore.isLoading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>

    <v-row v-else-if="itunesStore.errorMessage">
      <v-col cols="12">
        <v-alert type="error" variant="tonal" class="custom-alert">
          {{ itunesStore.errorMessage }}
        </v-alert>
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
        <v-card class="music-card h-100 d-flex flex-column api-card" @click="openDetail(item)">
          <v-img
            :src="item.artworkUrl100 || item.artworkUrl60 || fallbackImage"
            height="220"
            cover
          />

          <v-card-title class="card-title">
            {{ item.collectionName || item.trackName || item.artistName }}
          </v-card-title>

          <v-card-text class="flex-grow-1 card-text">
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

    <v-row v-if="!itunesStore.isLoading && itunesStore.results.length === 0 && !itunesStore.errorMessage">
      <v-col cols="12">
        <v-alert type="info" variant="tonal" class="custom-alert">
          No hay resultados. Pulsa el botón para buscar en la API.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="itunesStore.results.length > itemsPerPage" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination v-model="currentPage" :length="totalPages" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useItunesStore } from '../stores/itunesStore'
import SectionHeader from '../components/common/SectionHeader.vue'

const router = useRouter()
const itunesStore = useItunesStore()

const searchTerm = ref('Taylor Swift')
const selectedEntity = ref('album')
const currentPage = ref(1)
const itemsPerPage = 8
const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image'

const entityOptions = [
  { title: 'Álbumes', value: 'album' },
  { title: 'Canciones', value: 'song' },
  { title: 'Artistas', value: 'musicArtist' }
]

const totalPages = computed(() => {
  return Math.ceil(itunesStore.results.length / itemsPerPage)
})

const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return itunesStore.results.slice(startIndex, endIndex)
})

const loadResults = async () => {
  await itunesStore.searchMusic(searchTerm.value, selectedEntity.value)
  currentPage.value = 1
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

<style scoped>
.page-container {
  color: #ffffff;
}

.music-card {
  background: rgba(20, 20, 20, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.music-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
}

.card-title {
  color: #ffffff;
  font-weight: 700;
}

.card-text {
  color: rgba(255, 255, 255, 0.82);
}

.api-card {
  cursor: pointer;
}

.action-button {
  font-weight: 700;
}

.custom-alert {
  border-radius: 16px;
}
</style>