<template>
  <v-container class="page-container py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="4">
        <div class="section-badge mb-3">Gestión musical</div>
        <h1 class="page-title">Álbumes</h1>
        <p class="page-subtitle">Top 20 global 2025</p>
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
        <v-card class="music-card h-100 d-flex flex-column">
          <v-img :src="album.coverUrl" height="220" cover />

          <v-card-title class="card-title">
            {{ album.title }}
          </v-card-title>

          <v-card-text class="flex-grow-1 card-text">
            <p class="mb-2">
              <strong>Artist:</strong> {{ getArtistName(album.artistId) }}
            </p>
            <p class="mb-2">
              <strong>Genre:</strong> {{ album.genre }}
            </p>
            <p>
              <strong>Year:</strong> {{ album.releaseYear }}
            </p>
          </v-card-text>

          <v-card-actions>
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

.section-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(0, 188, 212, 0.16);
  color: #80deea;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.music-card {
  background: rgba(20, 20, 20, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.28);
}

.card-title {
  color: #ffffff;
  font-weight: 700;
}

.card-text {
  color: rgba(255, 255, 255, 0.82);
}

.action-button {
  font-weight: 700;
}

.custom-alert {
  border-radius: 16px;
}
</style>