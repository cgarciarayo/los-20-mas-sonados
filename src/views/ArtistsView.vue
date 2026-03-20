<template>
  <v-container class="py-8">
    <v-row class="mb-6" align="center" justify="space-between">
      <v-col cols="12" md="6">
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
    </v-row>

    <v-row>
      <v-col
        v-for="artist in filteredArtists"
        :key="artist.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100">
          <v-img :src="artist.imageUrl" height="220" cover />

          <v-card-title>{{ artist.name }}</v-card-title>

          <v-card-text>
            <p class="mb-2"><strong>Genre:</strong> {{ artist.genre }}</p>
            <p><strong>Country:</strong> {{ artist.country }}</p>
          </v-card-text>
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
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useArtistsStore } from '../stores/artistsStore'

const artistsStore = useArtistsStore()
const search = ref('')

const filteredArtists = computed(() => {
  const searchValue = search.value.trim().toLowerCase()

  if (!searchValue) {
    return artistsStore.artists
  }

  return artistsStore.artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchValue)
  )
})
</script>