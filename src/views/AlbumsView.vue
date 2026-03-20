<template>
  <v-container class="py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-bold">Álbumes</h1>
        <p class="text-subtitle-1">Top 20 global 2025</p>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Buscar álbum"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="album in filteredAlbums"
        :key="album.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100">
          <v-img :src="album.coverUrl" height="220" cover />

          <v-card-title>{{ album.title }}</v-card-title>

          <v-card-text>
            <p class="mb-2">
              <strong>Artist:</strong> {{ getArtistName(album.artistId) }}
            </p>
            <p class="mb-2"><strong>Genre:</strong> {{ album.genre }}</p>
            <p><strong>Year:</strong> {{ album.releaseYear }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="filteredAlbums.length === 0">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          No se han encontrado álbumes con ese criterio de búsqueda.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAlbumsStore } from '../stores/albumsStore'
import { useArtistsStore } from '../stores/artistsStore'

const albumsStore = useAlbumsStore()
const artistsStore = useArtistsStore()
const search = ref('')

const filteredAlbums = computed(() => {
  const searchValue = search.value.trim().toLowerCase()

  if (!searchValue) {
    return albumsStore.albums
  }

  return albumsStore.albums.filter((album) =>
    album.title.toLowerCase().includes(searchValue)
  )
})

const getArtistName = (artistId) => {
  const artist = artistsStore.getArtistById(artistId)
  return artist ? artist.name : 'Unknown artist'
}
</script>