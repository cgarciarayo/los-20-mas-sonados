<template>
  <v-container class="page-container py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="4">
  <section-header
    badge="Gestión musical"
    title="Álbumes"
    subtitle="Top 20 global 2025"
  />
</v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="search"
          label="Buscar álbum"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          class="custom-field"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="selectedArtistId"
          :items="artistOptions"
          label="Filtrar por artista"
          variant="outlined"
          density="comfortable"
          hide-details
          class="custom-field"
        />
      </v-col>

      <v-col cols="12" md="2" class="d-flex justify-end">
        <v-btn color="primary" prepend-icon="mdi-plus" class="action-button" @click="openCreateDialog">
          Añadir álbum
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="album in paginatedAlbums"
        :key="album.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="music-card album-card h-100 d-flex flex-column">
          <div class="image-wrapper">
            <v-img :src="album.coverUrl" height="240" cover class="card-image" />

            <div class="image-overlay" />

            <div class="genre-chip">
              {{ album.genre }}
            </div>
          </div>

          <v-card-title class="card-title">
            {{ album.title }}
          </v-card-title>

          <v-card-text class="flex-grow-1 card-text">
            <div class="info-row mb-2">
              <span class="info-label">Artist</span>
              <span class="info-value">{{ getArtistName(album.artistId) }}</span>
            </div>

            <div class="info-row mb-2">
              <span class="info-label">Genre</span>
              <span class="info-value">{{ album.genre }}</span>
            </div>

            <div class="info-row">
              <span class="info-label">Year</span>
              <span class="info-value">{{ album.releaseYear }}</span>
            </div>
          </v-card-text>

          <v-card-actions class="card-actions">
            <v-btn variant="text" color="primary" @click="openEditDialog(album)">
              Editar
            </v-btn>

            <v-btn variant="text" color="error" @click="openDeleteDialog(album)">
              Borrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="filteredAlbums.length === 0">
      <v-col cols="12">
        <v-alert type="info" variant="tonal" class="custom-alert">
          No se han encontrado álbumes con ese criterio de búsqueda.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="filteredAlbums.length > itemsPerPage" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
        />
      </v-col>
    </v-row>

    <album-form-dialog
      v-model="isAlbumDialogOpen"
      :album-to-edit="selectedAlbum"
      :artist-options="artistOptionsForForm"
      @save="saveAlbum"
    />

    <confirm-dialog
      v-model="isConfirmDialogOpen"
      title="Borrar álbum"
      :message="confirmMessage"
      @confirm="confirmDeleteAlbum"
    />
  </v-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AlbumFormDialog from '../components/albums/AlbumFormDialog.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import { useAlbumsStore } from '../stores/albumsStore'
import { useArtistsStore } from '../stores/artistsStore'
import SectionHeader from '../components/common/SectionHeader.vue'

const albumsStore = useAlbumsStore()
const artistsStore = useArtistsStore()

const search = ref('')
const selectedArtistId = ref(0)
const currentPage = ref(1)
const itemsPerPage = 8

const isAlbumDialogOpen = ref(false)
const isConfirmDialogOpen = ref(false)

const selectedAlbum = ref(null)
const albumToDelete = ref(null)

const artistOptions = computed(() => {
  const options = artistsStore.artists.map((artist) => ({
    title: artist.name,
    value: artist.id
  }))

  return [
    {
      title: 'Todos los artistas',
      value: 0
    },
    ...options
  ]
})

const artistOptionsForForm = computed(() => {
  return artistsStore.artists.map((artist) => ({
    title: artist.name,
    value: artist.id
  }))
})

const filteredAlbums = computed(() => {
  const searchValue = search.value.trim().toLowerCase()

  return albumsStore.albums.filter((album) => {
    const matchesSearch = album.title.toLowerCase().includes(searchValue)
    const matchesArtist =
      selectedArtistId.value === 0 || album.artistId === selectedArtistId.value

    return matchesSearch && matchesArtist
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredAlbums.value.length / itemsPerPage)
})

const paginatedAlbums = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return filteredAlbums.value.slice(startIndex, endIndex)
})

const confirmMessage = computed(() => {
  if (!albumToDelete.value) {
    return ''
  }

  return `¿Seguro que deseas borrar el álbum ${albumToDelete.value.title}?`
})

const getArtistName = (artistId) => {
  const artist = artistsStore.getArtistById(artistId)
  return artist ? artist.name : 'Unknown artist'
}

const openCreateDialog = () => {
  selectedAlbum.value = null
  isAlbumDialogOpen.value = true
}

const openEditDialog = (album) => {
  selectedAlbum.value = { ...album }
  isAlbumDialogOpen.value = true
}

const saveAlbum = (albumData) => {
  if (albumData.id) {
    albumsStore.updateAlbum(albumData)
    return
  }

  albumsStore.addAlbum(albumData)
}

const openDeleteDialog = (album) => {
  albumToDelete.value = album
  isConfirmDialogOpen.value = true
}

const confirmDeleteAlbum = () => {
  if (!albumToDelete.value) {
    return
  }

  albumsStore.deleteAlbum(albumToDelete.value.id)
  albumToDelete.value = null
}

watch([search, selectedArtistId], () => {
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

.album-card:hover {
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

.album-card:hover .card-image {
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
  background: rgba(0, 188, 212, 0.88);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  box-shadow: 0 8px 18px rgba(0, 188, 212, 0.22);
}

.card-title {
  color: #ffffff;
  font-size: 1.05rem;
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