<template>
  <div class="section-header">
    <div v-if="badge" class="section-badge mb-3">
      {{ badge }}
    </div>

    <h1 class="page-title">
      {{ title }}
    </h1>

    <p v-if="subtitle" class="page-subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.section-header {
  color: #ffffff;
}

.section-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #ffffff;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}
</style>