<template>
  <v-container class="py-8">
    <v-btn class="mb-6" variant="text" prepend-icon="mdi-arrow-left" @click="$router.back()">
      Volver
    </v-btn>

    <v-row v-if="item">
      <v-col cols="12" md="4">
        <v-card>
          <v-img :src="item.artworkUrl100 || item.artworkUrl60" height="320" cover />
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="pa-6">
          <h1 class="text-h4 font-weight-bold mb-4">
            {{ item.collectionName || item.trackName || item.artistName }}
          </h1>

          <p class="mb-2">
            <strong>Artista:</strong> {{ item.artistName || 'No disponible' }}
          </p>

          <p class="mb-2">
            <strong>Tipo:</strong> {{ item.kind || item.wrapperType || 'No disponible' }}
          </p>

          <p class="mb-2">
            <strong>Género:</strong> {{ item.primaryGenreName || 'No disponible' }}
          </p>

          <p class="mb-2">
            <strong>Álbum:</strong> {{ item.collectionName || 'No disponible' }}
          </p>

          <p class="mb-2">
            <strong>País:</strong> {{ item.country || 'No disponible' }}
          </p>

          <a
            v-if="item.collectionViewUrl || item.trackViewUrl || item.artistViewUrl"
            :href="item.collectionViewUrl || item.trackViewUrl || item.artistViewUrl"
            target="_blank"
          >
            Ver en iTunes
          </a>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="warning" variant="tonal">
      No se ha encontrado información para este elemento.
    </v-alert>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const item = computed(() => {
  const rawItem = route.query.item

  if (!rawItem) {
    return null
  }

  try {
    return JSON.parse(rawItem)
  } catch {
    return null
  }
})
</script>