<template>
  <v-dialog
    :model-value="modelValue"
    max-width="500"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="dialog-card">
      <v-card-title class="dialog-title">
        {{ title }}
      </v-card-title>

      <v-card-text class="dialog-text">
        {{ message }}
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />

        <v-btn variant="text" class="dialog-cancel" @click="handleCancel">
          Cancelar
        </v-btn>

        <v-btn color="error" class="dialog-confirm" @click="handleConfirm">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirmar acción'
  },
  message: {
    type: String,
    default: '¿Estás seguro de que deseas continuar?'
  }
})

const emit = defineEmits([
  'update:modelValue',
  'confirm'
])

const handleCancel = () => {
  emit('update:modelValue', false)
}

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.dialog-card {
  background: rgba(20, 20, 20, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  color: #ffffff;
}

.dialog-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffffff;
}

.dialog-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
}

.dialog-cancel {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.dialog-confirm {
  font-weight: 700;
}
</style>