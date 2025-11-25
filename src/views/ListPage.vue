<template>
  <div class="list-page">
    <h1>Personatges de Dragon Ball</h1>

    <div v-if="loading" class="loading">Carregant personatges...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="characters-grid">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConstantsStore } from '../stores/constants'
import CharacterCard from '../components/CharacterCard.vue'

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

const constants = useConstantsStore()
const characters = ref<Character[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchCharacters = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch(`${constants.apiURL}/characters?limit=100`)

    if (!response.ok) {
      throw new Error('Error al carregar els personatges')
    }

    const data = await response.json()
    characters.value = data.items || data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconegut'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCharacters()
})
</script>

<style scoped>
.list-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #ff6b00;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #d32f2f;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
</style>
