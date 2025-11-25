<template>
  <div class="detail-page">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregant personatge...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <RouterLink to="/list" class="back-link">← Tornar a la llista</RouterLink>
    </div>

    <div v-else-if="character" class="character-detail">
      <button @click="goBack" class="back-button">← Tornar</button>

      <div class="detail-content">
        <div class="image-section">
          <img :src="character.image" :alt="character.name" class="character-image" />
        </div>

        <div class="info-section">
          <h1>{{ character.name }}</h1>

          <div class="info-grid">
            <div class="info-item">
              <span class="label">Raça</span>
              <span class="value">{{ character.race }}</span>
            </div>

            <div class="info-item">
              <span class="label">Gènere</span>
              <span class="value">{{ character.gender }}</span>
            </div>

            <div class="info-item">
              <span class="label">Ki</span>
              <span class="value highlight">{{ character.ki }}</span>
            </div>

            <div class="info-item">
              <span class="label">Ki Màxim</span>
              <span class="value highlight">{{ character.maxKi }}</span>
            </div>

            <div class="info-item full-width">
              <span class="label">Afiliació</span>
              <span class="value">{{ character.affiliation }}</span>
            </div>
          </div>

          <div class="description">
            <h2>Descripció</h2>
            <p>{{ character.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConstantsStore } from '../stores/constants'

interface Character {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  gender: string
  description: string
  image: string
  affiliation: string
}

const route = useRoute()
const router = useRouter()
const constants = useConstantsStore()

const character = ref<Character | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchCharacter = async () => {
  try {
    loading.value = true
    error.value = null
    const id = route.params.id
    const response = await fetch(`${constants.apiURL}/characters/${id}`)

    if (!response.ok) {
      throw new Error('Personatge no trobat')
    }

    character.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconegut'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/list')
}

onMounted(() => {
  fetchCharacter()
})
</script>

<style scoped>
.detail-page {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-top: var(--spacing-md);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.back-button {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: var(--spacing-lg);
  transition: background 0.2s ease;
}

.back-button:hover {
  background: var(--color-accent);
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: 0 1px 3px var(--color-shadow);
}

.image-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.character-image {
  width: 100%;
  max-height: 50vh;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.info-section h1 {
  color: var(--color-text);
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  background: var(--color-background);
  padding: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.full-width {
  grid-column: span 2;
}

.label {
  display: block;
  color: var(--color-text-light);
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.value {
  display: block;
  color: var(--color-text);
  font-weight: 600;
  font-size: 1rem;
}

.value.highlight {
  color: var(--color-primary);
}

.description {
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--color-primary);
}

.description h2 {
  color: var(--color-text);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.description p {
  color: var(--color-text-light);
  line-height: 1.6;
  font-size: 0.9375rem;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }
}
</style>
