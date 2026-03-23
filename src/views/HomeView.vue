<template>
  <v-container fluid class="home-view">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="home-card pa-8 pa-md-12 text-center">
          <div class="hero-badge mb-4">
            Top global 2025
          </div>

          <h1 class="hero-title mb-4">
            Los 20 más sonados
          </h1>

          <p class="hero-text mb-8">
            Descubre los artistas y álbumes más escuchados del año, gestiona tu catálogo
            musical y explora nuevos resultados desde la API de iTunes.
          </p>

          <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
              <v-btn
                block
                size="large"
                class="hero-button-primary"
                to="/artists"
              >
                Ver artistas
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-btn
                block
                size="large"
                variant="outlined"
                class="hero-button-secondary"
                to="/albums"
              >
                Ver álbumes
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-btn
                block
                size="large"
                variant="outlined"
                class="hero-button-secondary"
                to="/api"
              >
                Explorar música
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
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
}

.home-card {
  background: rgba(18, 18, 18, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.hero-badge {
  display: inline-block;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  background: rgba(255, 64, 129, 0.18);
  color: #ff80ab;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-title {
  color: #ffffff;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
}

.hero-text {
  max-width: 700px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-button-primary {
  background: linear-gradient(90deg, #ff4081 0%, #ff6ec7 100%);
  color: #ffffff;
  font-weight: 700;
}

.hero-button-secondary {
  border-color: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  font-weight: 700;
}
</style>