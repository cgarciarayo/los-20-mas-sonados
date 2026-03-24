<template>
  <div class="header-wrapper">
    <v-app-bar class="app-header" flat>
      <v-container class="header-shell d-flex align-center">
        <router-link to="/" class="app-logo">
          <span class="logo-kicker">Top global 2025</span>
          <span class="logo-main">Los 20 más sonados</span>
        </router-link>

        <v-spacer />

        <div class="nav-links">
          <v-btn
            variant="text"
            class="nav-button"
            :class="{ 'nav-button-active': isActive('/') }"
            to="/"
          >
            Inicio
          </v-btn>

          <div
            class="nav-preview-wrapper"
            @mouseenter="openPreview('artists')"
            @mouseleave="closePreview"
          >
            <v-btn
              variant="text"
              class="nav-button"
              :class="{ 'nav-button-active': isActive('/artists') }"
              to="/artists"
            >
              Artistas
            </v-btn>

            <transition name="preview-fade">
              <div v-if="activePreview === 'artists'" class="preview-panel">
                <div class="preview-grid">
                  <router-link
                    v-for="artist in featuredArtists"
                    :key="artist.id"
                    to="/artists"
                    class="preview-card"
                  >
                    <img :src="artist.imageUrl" :alt="artist.name" class="preview-image" />
                    <div class="preview-content">
                      <span class="preview-title">{{ artist.name }}</span>
                      <span class="preview-subtitle">{{ artist.genre }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <div
            class="nav-preview-wrapper"
            @mouseenter="openPreview('albums')"
            @mouseleave="closePreview"
          >
            <v-btn
              variant="text"
              class="nav-button"
              :class="{ 'nav-button-active': isActive('/albums') }"
              to="/albums"
            >
              Álbumes
            </v-btn>

            <transition name="preview-fade">
              <div v-if="activePreview === 'albums'" class="preview-panel">
                <div class="preview-grid">
                  <router-link
                    v-for="album in featuredAlbums"
                    :key="album.id"
                    to="/albums"
                    class="preview-card"
                  >
                    <img :src="album.coverUrl" :alt="album.title" class="preview-image" />
                    <div class="preview-content">
                      <span class="preview-title">{{ album.title }}</span>
                      <span class="preview-subtitle">{{ getArtistName(album.artistId) }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>

          <v-btn
            variant="text"
            class="nav-button nav-highlight"
            :class="{ 'nav-button-active': isActive('/api') }"
            to="/api"
          >
            Escúchalos
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useArtistsStore } from '../../stores/artistsStore'
import { useAlbumsStore } from '../../stores/albumsStore'

const route = useRoute()
const artistsStore = useArtistsStore()
const albumsStore = useAlbumsStore()

const activePreview = ref(null)

const featuredArtists = computed(() => artistsStore.artists.slice(0, 4))
const featuredAlbums = computed(() => albumsStore.albums.slice(0, 4))

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}

const openPreview = (section) => {
  activePreview.value = section
}

const closePreview = () => {
  activePreview.value = null
}

const getArtistName = (artistId) => {
  const artist = artistsStore.getArtistById(artistId)
  return artist ? artist.name : 'Unknown artist'
}
</script>

<style scoped>
.header-wrapper {
  position: relative;
  z-index: 1000;
}

.app-header {
  background:
    linear-gradient(90deg, rgba(10, 10, 10, 0.96) 0%, rgba(22, 22, 22, 0.95) 50%, rgba(10, 10, 10, 0.96) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}

:deep(.v-toolbar__content) {
  overflow: visible !important;
}

.header-shell {
  position: relative;
  overflow: visible;
}

.app-logo {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  text-decoration: none;
  line-height: 1;
  transition: transform 0.25s ease, filter 0.25s ease;
}

.app-logo:hover {
  transform: translateY(-1px) scale(1.01);
  filter: brightness(1.08);
}

.logo-kicker {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgba(255, 255, 255, 0.55);
}

.logo-main {
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff4d8d 0%, #ff9ad1 35%, #7ee7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(255, 77, 141, 0.15);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  overflow: visible;
}

.nav-preview-wrapper {
  position: relative;
  overflow: visible;
}

.nav-button {
  position: relative;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.01em;
  border-radius: 999px;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}

.nav-button:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.nav-button-active {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.2);
}

.nav-highlight {
  background: linear-gradient(90deg, rgba(255, 77, 141, 0.18) 0%, rgba(126, 231, 255, 0.14) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-highlight:hover {
  transform: translateY(-2px);
  background: linear-gradient(90deg, rgba(255, 77, 141, 0.28) 0%, rgba(126, 231, 255, 0.22) 100%);
  box-shadow: 0 12px 24px rgba(255, 77, 141, 0.14);
}

.nav-highlight.nav-button-active {
  background: linear-gradient(90deg, rgba(255, 77, 141, 0.3) 0%, rgba(126, 231, 255, 0.24) 100%);
  box-shadow: 0 12px 24px rgba(255, 77, 141, 0.18);
}

.preview-panel {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  width: 520px;
  padding: 16px;
  border-radius: 22px;
  background: rgba(10, 10, 10, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(12px);
  z-index: 9999;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.preview-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    background 0.22s ease;
}

.preview-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.24);
}

.preview-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 12px;
}

.preview-title {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.25;
}

.preview-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.82rem;
  font-weight: 600;
}

.preview-fade-enter-active,
.preview-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.preview-fade-enter-from,
.preview-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}

@media (max-width: 960px) {
  .preview-panel {
    display: none;
  }
}

@media (max-width: 768px) {
  .logo-main {
    font-size: 1.15rem;
  }

  .nav-links {
    gap: 0;
  }

  .nav-button {
    min-width: unset;
    padding-inline: 0.55rem;
    font-size: 0.85rem;
  }
}
</style>