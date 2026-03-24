<template>
  <v-container class="page-container py-8">
    <v-row class="mb-6" align="center" justify="space-between">
     <v-col cols="12" md="5">
  <section-header
    badge="Gestión musical"
    title="Artistas"
    subtitle="Top 20 global 2025"
  />
</v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Buscar artista"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          class="custom-field"
        />
      </v-col>

      <v-col cols="12" md="3" class="d-flex justify-end">
        <v-btn color="primary" prepend-icon="mdi-plus" class="action-button" @click="openCreateDialog">
          Añadir artista
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="artist in paginatedArtists"
        :key="artist.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="music-card artist-card h-100 d-flex flex-column">
          <div class="image-wrapper">
            <v-img :src="artist.imageUrl" height="240" cover class="card-image" />

            <div class="image-overlay" />

            <div class="genre-chip">
              {{ artist.genre }}
            </div>
          </div>

          <v-card-title class="card-title">
            {{ artist.name }}
          </v-card-title>

          <v-card-text class="flex-grow-1 card-text">
            <div class="info-row mb-2">
              <span class="info-label">Genre</span>
              <span class="info-value">{{ artist.genre }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Country</span>
              <span class="info-value">{{ artist.country }}</span>
            </div>
          </v-card-text>

          <v-card-actions class="card-actions">
            <v-btn variant="text" color="primary" @click="openEditDialog(artist)">
              Editar
            </v-btn>

            <v-btn variant="text" color="error" @click="handleDeleteClick(artist)">
              Borrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="filteredArtists.length === 0">
      <v-col cols="12">
        <v-alert type="info" variant="tonal" class="custom-alert">
          No se han encontrado artistas con ese criterio de búsqueda.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="filteredArtists.length > itemsPerPage" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
        />
      </v-col>
    </v-row>

    <artist-form-dialog
      v-model="isArtistDialogOpen"
      :artist-to-edit="selectedArtist"
      @save="saveArtist"
    />

    <confirm-dialog
      v-model="isConfirmDialogOpen"
      title="Borrar artista"
      :message="confirmMessage"
      @confirm="confirmDeleteArtist"
    />

    <v-snackbar v-model="isSnackbarOpen" color="error">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ArtistFormDialog from '../components/artists/ArtistFormDialog.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import { useArtistsStore } from '../stores/artistsStore'
import { useAlbumsStore } from '../stores/albumsStore'
import SectionHeader from '../components/common/SectionHeader.vue'

const artistsStore = useArtistsStore()
const albumsStore = useAlbumsStore()

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 8

const isArtistDialogOpen = ref(false)
const isConfirmDialogOpen = ref(false)
const isSnackbarOpen = ref(false)

const selectedArtist = ref(null)
const artistToDelete = ref(null)
const snackbarMessage = ref('')

const filteredArtists = computed(() => {
  const searchValue = search.value.trim().toLowerCase()

  if (!searchValue) {
    return artistsStore.artists
  }

  return artistsStore.artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchValue)
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredArtists.value.length / itemsPerPage)
})

const paginatedArtists = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return filteredArtists.value.slice(startIndex, endIndex)
})

const confirmMessage = computed(() => {
  if (!artistToDelete.value) {
    return ''
  }

  return `¿Seguro que deseas borrar a ${artistToDelete.value.name}?`
})

const openCreateDialog = () => {
  selectedArtist.value = null
  isArtistDialogOpen.value = true
}

const openEditDialog = (artist) => {
  selectedArtist.value = { ...artist }
  isArtistDialogOpen.value = true
}

const saveArtist = (artistData) => {
  if (artistData.id) {
    artistsStore.updateArtist(artistData)
    return
  }

  artistsStore.addArtist(artistData)
}

const handleDeleteClick = (artist) => {
  const artistAlbums = albumsStore.getAlbumsByArtistId(artist.id)

  if (artistAlbums.length > 0) {
    snackbarMessage.value = 'No se puede borrar un artista que tiene álbumes asociados'
    isSnackbarOpen.value = true
    return
  }

  artistToDelete.value = artist
  isConfirmDialogOpen.value = true
}

const confirmDeleteArtist = () => {
  if (!artistToDelete.value) {
    return
  }

  artistsStore.deleteArtist(artistToDelete.value.id)
  artistToDelete.value = null
}

watch(search, () => {
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
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.28);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.artist-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 45px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.16);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.card-image {
  transition: transform 0.35s ease;
}

.artist-card:hover .card-image {
  transform: scale(1.06);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba(0, 0, 0, 0.35) 100%);
  pointer-events: none;
}

.genre-chip {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 64, 129, 0.88);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  box-shadow: 0 8px 18px rgba(255, 64, 129, 0.25);
}

.card-title {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.3;
  padding-bottom: 0.5rem;
}

.card-text {
  color: rgba(255, 255, 255, 0.82);
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.info-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.info-value {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.88);
}

.card-actions {
  padding: 0 12px 14px;
}

.action-button {
  font-weight: 700;
}

.custom-alert {
  border-radius: 16px;
}
</style>