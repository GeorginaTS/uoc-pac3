<script setup lang="ts">
import { useRouter } from 'vue-router'

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

const props = defineProps<{
  character: Character
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/detail/${props.character.id}`)
}
</script>

<template>
  <div class="character-card" @click="goToDetail">
    <div class="image-container">
      <img :src="character.image" :alt="character.name" class="character-image" />
    </div>
    <div class="card-content">
      <h3>{{ character.name }}</h3>
      <div class="info-row">
        <span class="label">Raça:</span>
        <span class="race">{{ character.race }}</span>
      </div>
      <div class="info-row">
        <span class="label">Ki:</span>
        <span class="ki">{{ character.ki }}</span>
      </div>
      <div class="info-row">
        <span class="label">Afiliació:</span>
        <span class="affiliation">{{ character.affiliation }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: 0 4px 6px var(--color-shadow);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  overflow: hidden;
}

.character-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px var(--color-shadow-hover);
  border-color: var(--color-accent);
}

.image-container {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.character-image {
  width: 100%;
  height: 250px;
  object-fit: contain;
  border-radius: var(--radius-sm);
  transition: transform 0.3s ease;
}

.character-card:hover .character-image {
  transform: scale(1.05);
}

.card-content {
  padding: var(--spacing-sm) 0;
}

.character-card h3 {
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  font-size: 1.3rem;
  font-weight: 700;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  background: var(--color-background);
  border-radius: var(--radius-sm);
}

.label {
  color: var(--color-text-light);
  font-weight: 600;
  font-size: 0.9rem;
}

.race {
  color: var(--color-secondary);
  font-weight: 700;
  font-size: 0.95rem;
}

.ki {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.95rem;
}

.affiliation {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.95rem;
}
</style>
