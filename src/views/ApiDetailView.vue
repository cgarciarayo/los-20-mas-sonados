<template>
  <v-container class="detail-page py-8">
    <v-btn
      class="back-button mb-6"
      variant="text"
      prepend-icon="mdi-arrow-left"
      @click="$router.back()"
    >
      Volver
    </v-btn>

    <v-row v-if="item" justify="center">
      <v-col cols="12" lg="10">
        <v-card class="detail-card pa-4 pa-md-8">
          <v-row align="center">
            <v-col cols="12" md="4">
              <v-card class="image-card">
                <v-img
                  :src="item.artworkUrl100 || item.artworkUrl60 || fallbackImage"
                  height="360"
                  cover
                />
              </v-card>
            </v-col>

            <v-col cols="12" md="8">
              <div class="detail-badge mb-4">Detalle musical</div>

              <h1 class="detail-title mb-4">
                {{ item.collectionName || item.trackName || item.artistName }}
              </h1>

              <div class="detail-info">
                <p class="mb-3">
                  <strong>Artista:</strong> {{ item.artistName || 'No disponible' }}
                </p>

                <p class="mb-3">
                  <strong>Tipo:</strong> {{ item.kind || item.wrapperType || 'No disponible' }}
                </p>

                <p class="mb-3">
                  <strong>Género:</strong> {{ item.primaryGenreName || 'No disponible' }}
                </p>

                <p class="mb-3">
                  <strong>Álbum:</strong> {{ item.collectionName || 'No disponible' }}
                </p>

                <p class="mb-3">
                  <strong>País:</strong> {{ item.country || 'No disponible' }}
                </p>

                <p class="mb-3">
                  <strong>Fecha de lanzamiento:</strong>
                  {{ formattedReleaseDate }}
                </p>
              </div>

              <v-btn
                v-if="item.collectionViewUrl || item.trackViewUrl || item.artistViewUrl"
                class="mt-4 external-button"
                color="primary"
                :href="item.collectionViewUrl || item.trackViewUrl || item.artistViewUrl"
                target="_blank"
              >
                Ver en iTunes
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col cols="12" md="8">
        <v-alert type="warning" variant="tonal" class="custom-alert">
          No se ha encontrado información para este elemento.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const fallbackImage = 'https://via.placeholder.com/500x500?text=No+Image'

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

const formattedReleaseDate = computed(() => {
  if (!item.value?.releaseDate) {
    return 'No disponible'
  }

  return new Date(item.value.releaseDate).toLocaleDateString('es-ES')
})
</script>

<style scoped>
.detail-page {
  color: #ffffff;
}

.back-button {
  color: #ffffff;
  font-weight: 600;
}

.detail-card {
  background: rgba(20, 20, 20, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.32);
}

.image-card {
  background: transparent;
  border-radius: 20px;
  overflow: hidden;
}

.detail-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 193, 7, 0.16);
  color: #ffe082;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
}

.detail-info {
  color: rgba(255, 255, 255, 0.82);
  font-size: 1rem;
  line-height: 1.7;
}

.external-button {
  font-weight: 700;
}

.custom-alert {
  border-radius: 16px;
}
</style>