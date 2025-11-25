<template>
  <div class="list-page">
    <h1>Personatges de Dragon Ball</h1>

    <SearchBar @search="handleSearch" />

    <div v-if="initialLoading" class="loading">Carregant personatges...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div class="characters-grid">
        <CharacterCard
          v-for="character in filteredCharacters"
          :key="character.id"
          :character="character"
        />
      </div>

      <div v-if="filteredCharacters.length === 0 && searchQuery" class="no-results">
        No s'han trobat personatges amb "{{ searchQuery }}"
      </div>

      <div v-if="loadingMore" class="loading-more">Carregant més personatges...</div>

      <div ref="sentinel" class="sentinel"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useConstantsStore } from '../stores/constants'
import CharacterCard from '../components/CharacterCard.vue'
import SearchBar from '../components/SearchBar.vue'

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
const initialLoading = ref(true)
const loadingMore = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const hasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null)
const searchQuery = ref('')

const ITEMS_PER_PAGE = 8

const filteredCharacters = computed(() => {
  if (!searchQuery.value.trim()) {
    return characters.value
  }
  return characters.value.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const fetchCharacters = async (page: number) => {
  try {
    if (page === 1) {
      initialLoading.value = true
    } else {
      loadingMore.value = true
    }
    error.value = null

    const response = await fetch(
      `${constants.apiURL}/characters?page=${page}&limit=${ITEMS_PER_PAGE}`,
    )

    if (!response.ok) {
      throw new Error('Error al carregar els personatges')
    }

    const data = await response.json()
    const newCharacters = data.items || []

    if (newCharacters.length === 0) {
      hasMore.value = false
    } else {
      characters.value = [...characters.value, ...newCharacters]
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconegut'
  } finally {
    initialLoading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (!loadingMore.value && hasMore.value) {
    currentPage.value++
    fetchCharacters(currentPage.value)
  }
}

let observer: IntersectionObserver | null = null

onMounted(async () => {
  await fetchCharacters(1)

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !loadingMore.value && hasMore.value) {
        loadMore()
      }
    },
    {
      rootMargin: '200px',
    },
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

onUnmounted(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value)
  }
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
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
  font-weight: 800;
  position: relative;
  padding-bottom: 1rem;
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 25vw;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary),
    var(--color-accent),
    var(--color-primary),
    transparent
  );
  border-radius: 2px;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.sentinel {
  height: 1px;
  width: 100%;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-light);
  font-size: 1.1rem;
}
</style>
