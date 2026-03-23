<template>
  <v-app-bar class="app-header" flat>
    <v-container class="d-flex align-center">
      <router-link to="/" class="app-logo">
        Los 20 más sonados
      </router-link>

      <v-spacer />

      <v-btn variant="text" class="nav-button" to="/">
        Inicio
      </v-btn>

      <v-btn variant="text" class="nav-button" to="/artists">
        Artistas
      </v-btn>

      <v-btn variant="text" class="nav-button" to="/albums">
        Álbumes
      </v-btn>

      <v-btn variant="text" class="nav-button" to="/api">
        API
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
</script>

<style scoped>
.app-header {
  background: linear-gradient(90deg, #121212 0%, #1e1e1e 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.app-logo {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-decoration: none;
  text-transform: uppercase;
}

.nav-button {
  color: #ffffff;
  font-weight: 600;
}
</style>