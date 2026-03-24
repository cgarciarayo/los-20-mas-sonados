<template>
  <v-container fluid class="home-view">
    <div class="home-overlay" />

    <v-row justify="center" align="center" class="home-content">
      <v-col cols="12" lg="10">
        <v-row align="center">
          <v-col cols="12" md="7">
            <div class="hero-copy">
              <div class="hero-kicker mb-4">
                Top global 2025 · Tus artistas favoritos
              </div>

              <h1 class="hero-title mb-5">
                Los 20 más sonados
              </h1>

              <p class="hero-text mb-8">
               La escena que más ha sonado este 2025. Artistas potentes, álbumes que han marcado el ritmo y nos han acompañado en todo momento.
              </p>

              <div class="hero-actions">
                <v-btn
                  size="x-large"
                  class="hero-button-primary"
                  to="/artists"
                >
                  Artistas
                </v-btn>

                <v-btn
                  size="x-large"
                  variant="outlined"
                  class="hero-button-secondary"
                  to="/albums"
                >
                  Álbumes
                </v-btn>

                <v-btn
                  size="x-large"
                  variant="text"
                  class="hero-button-text"
                  to="/api"
                >
                  Escúchalos
                </v-btn>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5">
            <div class="hero-side-panel">
              <div class="stat-card stat-primary">
                <span class="stat-number stat-number-primary">20</span>
                <span class="stat-label">ARTISTAS DESTACADOS</span>
              </div>

              <div class="stat-card stat-secondary">
                <span class="stat-number stat-number-secondary">20</span>
                <span class="stat-label">ÁLBUMES IMPRESCINDIBLES</span>
              </div>

              <div class="stat-card stat-accent">
                <span class="stat-number stat-number-accent">∞</span>
                <span class="stat-label">EXPLORA MÁS MÚSICA</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 2rem 1.25rem;
  background-image: url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1800&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.home-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(0, 0, 0, 0.78) 10%, rgba(0, 0, 0, 0.52) 55%, rgba(0, 0, 0, 0.78) 100%),
    radial-gradient(circle at top left, rgba(255, 77, 141, 0.22), transparent 28%),
    radial-gradient(circle at bottom right, rgba(126, 231, 255, 0.2), transparent 28%);
}

.home-content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero-copy {
  max-width: 720px;
}

.hero-kicker {
  display: inline-block;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: rgba(255, 77, 141, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffd2e5;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  box-shadow: 0 10px 25px rgba(255, 77, 141, 0.14);
}

.hero-title {
  color: #ffffff;
  font-size: clamp(3rem, 7vw, 5.6rem);
  font-weight: 950;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  text-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
}

.hero-text {
  max-width: 640px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-button-primary {
  background: linear-gradient(90deg, #ff4d8d 0%, #ff7bb1 45%, #ff9ad1 100%);
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.01em;
  box-shadow: 0 14px 30px rgba(255, 77, 141, 0.28);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;
}

.hero-button-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 36px rgba(255, 77, 141, 0.4);
  filter: brightness(1.08);
}

.hero-button-secondary {
  border-color: rgba(255, 255, 255, 0.24);
  color: #ffffff;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.03);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease;
}

.hero-button-secondary:hover {
  transform: translateY(-4px) scale(1.02);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.24);
}

.hero-button-text {
  color: #7ee7ff;
  font-weight: 800;
  transition:
    transform 0.25s ease,
    color 0.25s ease,
    text-shadow 0.25s ease;
}

.hero-button-text:hover {
  transform: translateY(-3px);
  color: #b4f3ff;
  text-shadow: 0 0 14px rgba(126, 231, 255, 0.35);
}

.hero-side-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem 1.35rem;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.24);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease,
    background 0.28s ease;
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 24px 42px rgba(0, 0, 0, 0.34);
  border-color: rgba(255, 255, 255, 0.14);
}

.stat-primary {
  background: rgba(255, 77, 141, 0.14);
}

.stat-primary:hover {
  background: rgba(255, 77, 141, 0.2);
}

.stat-secondary {
  background: rgba(126, 231, 255, 0.12);
}

.stat-secondary:hover {
  background: rgba(126, 231, 255, 0.18);
}

.stat-accent {
  background: rgba(255, 255, 255, 0.06);
}

.stat-accent:hover {
  background: rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 2.7rem;
  font-weight: 950;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 8px 18px rgba(0, 0, 0, 0.22);
}

.stat-number-primary {
  color: #ff9ac4;
  text-shadow: 0 0 18px rgba(255, 77, 141, 0.26);
}

.stat-number-secondary {
  color: #9cefff;
  text-shadow: 0 0 18px rgba(126, 231, 255, 0.26);
}

.stat-number-accent {
  color: #ffffff;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.18);
}

.stat-label {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.02rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.45;
}

@media (max-width: 960px) {
  .home-view {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .hero-title {
    font-size: clamp(2.6rem, 10vw, 4.2rem);
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>