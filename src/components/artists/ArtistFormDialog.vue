<template>
  <v-dialog
    :model-value="modelValue"
    max-width="700"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="dialog-card">
      <v-card-title class="dialog-title">
        {{ isEditMode ? 'Editar artista' : 'Añadir artista' }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.name"
                label="Nombre del artista"
                variant="outlined"
                :error-messages="errors.name"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.genre"
                label="Género"
                variant="outlined"
                :error-messages="errors.genre"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.country"
                label="País"
                variant="outlined"
                :error-messages="errors.country"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.imageUrl"
                label="URL de la imagen"
                variant="outlined"
                :error-messages="errors.imageUrl"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />

        <v-btn variant="text" class="dialog-cancel" @click="handleCancel">
          Cancelar
        </v-btn>

        <v-btn color="primary" class="dialog-confirm" @click="handleSubmit">
          {{ isEditMode ? 'Guardar cambios' : 'Añadir artista' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  artistToEdit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'update:modelValue',
  'save'
])

const createEmptyForm = () => ({
  id: null,
  name: '',
  genre: '',
  country: '',
  imageUrl: ''
})

const form = reactive(createEmptyForm())

const errors = reactive({
  name: '',
  genre: '',
  country: '',
  imageUrl: ''
})

const isEditMode = computed(() => {
  return props.artistToEdit !== null
})

const resetForm = () => {
  Object.assign(form, createEmptyForm())
  resetErrors()
}

const resetErrors = () => {
  errors.name = ''
  errors.genre = ''
  errors.country = ''
  errors.imageUrl = ''
}

const loadArtistData = () => {
  if (props.artistToEdit) {
    form.id = props.artistToEdit.id
    form.name = props.artistToEdit.name
    form.genre = props.artistToEdit.genre
    form.country = props.artistToEdit.country
    form.imageUrl = props.artistToEdit.imageUrl
  } else {
    resetForm()
  }
}

const validateForm = () => {
  resetErrors()
  let isValid = true

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    isValid = false
  }

  if (!form.genre.trim()) {
    errors.genre = 'El género es obligatorio'
    isValid = false
  }

  if (!form.country.trim()) {
    errors.country = 'El país es obligatorio'
    isValid = false
  }

  if (!form.imageUrl.trim()) {
    errors.imageUrl = 'La imagen es obligatoria'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  emit('save', {
    id: form.id,
    name: form.name.trim(),
    genre: form.genre.trim(),
    country: form.country.trim(),
    imageUrl: form.imageUrl.trim()
  })

  handleCancel()
}

const handleCancel = () => {
  emit('update:modelValue', false)
  resetForm()
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      loadArtistData()
    }
  }
)

watch(
  () => props.artistToEdit,
  () => {
    if (props.modelValue) {
      loadArtistData()
    }
  }
)
</script>

<style scoped>
.dialog-card {
  background: rgba(20, 20, 20, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  color: #ffffff;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
}

.dialog-cancel {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.dialog-confirm {
  font-weight: 700;
}
</style>