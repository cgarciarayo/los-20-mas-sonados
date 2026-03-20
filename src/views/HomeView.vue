<template>
  <v-container fluid class="home-view">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6 text-center">
          <h1 class="text-h3 font-weight-bold mb-4">Los 20 más sonados</h1>
          <p class="text-subtitle-1 mb-6">Top global 2025</p>

          <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
              <v-btn block size="large" to="/artists">
                Ver artistas
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-btn block size="large" to="/albums">
                Ver álbumes
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>