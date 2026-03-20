<template>
  <v-container class="py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="5">
        <h1 class="text-h4 font-weight-bold">Artistas</h1>
        <p class="text-subtitle-1">Top 20 global 2025</p>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Buscar artista"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="3" class="d-flex justify-end">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
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
        <v-card class="h-100 d-flex flex-column">
          <v-img :src="artist.imageUrl" height="220" cover />

          <v-card-title>{{ artist.name }}</v-card-title>

          <v-card-text class="flex-grow-1">
            <p class="mb-2">
              <strong>Genre:</strong> {{ artist.genre }}
            </p>
            <p>
              <strong>Country:</strong> {{ artist.country }}
            </p>
          </v-card-text>

          <v-card-actions>
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
        <v-alert type="info" variant="tonal">
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