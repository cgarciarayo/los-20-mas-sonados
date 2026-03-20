<template>
  <v-app-bar elevation="2">
    <v-container class="d-flex align-center">
      <router-link to="/" class="app-logo">
        Los 20 más sonados
      </router-link>

      <v-spacer />

      <v-btn variant="text" to="/">
        Inicio
      </v-btn>

      <v-btn variant="text" to="/artists">
        Artistas
      </v-btn>

      <v-btn variant="text" to="/albums">
        Álbumes
      </v-btn>

      <v-btn variant="text" to="/api">
        API
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
</script>

<style scoped>
.app-logo {
  color: inherit;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
}
</style>