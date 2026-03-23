<template>
  <v-app class="app-shell">
    <app-header />

    <v-main class="app-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeader from './components/common/AppHeader.vue'
</script>

<style scoped>
.app-shell {
  background:
    radial-gradient(circle at top left, rgba(255, 64, 129, 0.12), transparent 30%),
    radial-gradient(circle at top right, rgba(0, 188, 212, 0.12), transparent 30%),
    linear-gradient(180deg, #111111 0%, #181818 100%);
  min-height: 100vh;
}

.app-main {
  color: #ffffff;
}
</style>