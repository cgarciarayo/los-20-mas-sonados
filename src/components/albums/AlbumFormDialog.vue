<template>
  <v-dialog
    :model-value="modelValue"
    max-width="700"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="dialog-card">
      <v-card-title class="dialog-title">
        {{ isEditMode ? 'Editar álbum' : 'Añadir álbum' }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.title"
                label="Título del álbum"
                variant="outlined"
                :error-messages="errors.title"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="form.artistId"
                :items="artistOptions"
                label="Artista"
                variant="outlined"
                :error-messages="errors.artistId"
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
                v-model="form.releaseYear"
                label="Año"
                type="number"
                variant="outlined"
                :error-messages="errors.releaseYear"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.coverUrl"
                label="URL de la portada"
                variant="outlined"
                :error-messages="errors.coverUrl"
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
          {{ isEditMode ? 'Guardar cambios' : 'Añadir álbum' }}
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
  albumToEdit: {
    type: Object,
    default: null
  },
  artistOptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'update:modelValue',
  'save'
])

const createEmptyForm = () => ({
  id: null,
  title: '',
  artistId: null,
  genre: '',
  releaseYear: '',
  coverUrl: ''
})

const form = reactive(createEmptyForm())

const errors = reactive({
  title: '',
  artistId: '',
  genre: '',
  releaseYear: '',
  coverUrl: ''
})

const isEditMode = computed(() => {
  return props.albumToEdit !== null
})

const resetErrors = () => {
  errors.title = ''
  errors.artistId = ''
  errors.genre = ''
  errors.releaseYear = ''
  errors.coverUrl = ''
}

const resetForm = () => {
  Object.assign(form, createEmptyForm())
  resetErrors()
}

const loadAlbumData = () => {
  if (props.albumToEdit) {
    form.id = props.albumToEdit.id
    form.title = props.albumToEdit.title
    form.artistId = props.albumToEdit.artistId
    form.genre = props.albumToEdit.genre
    form.releaseYear = props.albumToEdit.releaseYear
    form.coverUrl = props.albumToEdit.coverUrl
  } else {
    resetForm()
  }
}

const validateForm = () => {
  resetErrors()
  let isValid = true

  if (!form.title.trim()) {
    errors.title = 'El título es obligatorio'
    isValid = false
  }

  if (!form.artistId) {
    errors.artistId = 'El artista es obligatorio'
    isValid = false
  }

  if (!form.genre.trim()) {
    errors.genre = 'El género es obligatorio'
    isValid = false
  }

  if (!form.releaseYear) {
    errors.releaseYear = 'El año es obligatorio'
    isValid = false
  }

  if (!form.coverUrl.trim()) {
    errors.coverUrl = 'La portada es obligatoria'
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
    title: form.title.trim(),
    artistId: Number(form.artistId),
    genre: form.genre.trim(),
    releaseYear: Number(form.releaseYear),
    coverUrl: form.coverUrl.trim()
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
      loadAlbumData()
    }
  }
)

watch(
  () => props.albumToEdit,
  () => {
    if (props.modelValue) {
      loadAlbumData()
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