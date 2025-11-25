<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  search: [value: string]
}>()

const searchQuery = ref('')

watch(searchQuery, (newValue) => {
  emit('search', newValue)
})

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cerca per nom de personatge..."
        class="search-input"
      />
      <button v-if="searchQuery" @click="clearSearch" class="clear-button" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: var(--spacing-lg);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  color: var(--color-text-light);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.875rem 3rem 0.875rem 3rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  background: var(--color-card-bg);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-light);
}

.clear-button {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.clear-button svg {
  width: 20px;
  height: 20px;
  color: var(--color-text-light);
}

.clear-button:hover {
  background: var(--color-background);
}

.clear-button:hover svg {
  color: var(--color-primary);
}
</style>
