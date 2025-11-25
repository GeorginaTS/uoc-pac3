<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConstantsStore } from '@/stores/constants'

interface Character {
  id: number
  name: string
  ki: string
  maxKi: string
  race: string
  image: string
  affiliation: string
}

const constants = useConstantsStore()

const characters = ref<Character[]>([])
const fighter1 = ref<Character | null>(null)
const fighter2 = ref<Character | null>(null)
const winner = ref<Character | null>(null)
const battleLog = ref<string[]>([])
const isLoading = ref(true)
const isBattling = ref(false)

const fetchCharacters = async () => {
  try {
    const response = await fetch(`${constants.apiURL}/characters?limit=50`)
    const data = await response.json()
    characters.value = data.items
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching characters:', error)
    isLoading.value = false
  }
}

const canBattle = computed(() => {
  return fighter1.value && !isBattling.value
})

const zFighters = computed(() => {
  return characters.value.filter((c) => c.affiliation === 'Z Fighter')
})

const selectFighter1 = (character: Character) => {
  if (character.affiliation !== 'Z Fighter') return
  fighter1.value = character
  fighter2.value = null
  resetBattle()
}

const resetBattle = () => {
  winner.value = null
  battleLog.value = []
}

const parseKi = (kiString: string): number => {
  const cleaned = kiString.replace(/\./g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

const startBattle = () => {
  if (!fighter1.value) return

  // Seleccionar un enemic aleatori (no Z Fighter)
  const enemies = characters.value.filter(
    (c) => c.affiliation !== 'Z Fighter' && c.id !== fighter1.value?.id,
  )
  if (enemies.length === 0) return

  const randomIndex = Math.floor(Math.random() * enemies.length)
  const randomEnemy = enemies[randomIndex]
  if (!randomEnemy) return

  fighter2.value = randomEnemy

  isBattling.value = true
  battleLog.value = []
  winner.value = null

  const f1Power = parseKi(fighter1.value.ki)
  const f2Power = parseKi(fighter2.value.ki)
  const f1MaxPower = parseKi(fighter1.value.maxKi)
  const f2MaxPower = parseKi(fighter2.value.maxKi)

  battleLog.value.push(`${fighter1.value.name} vs ${fighter2.value.name}`)
  battleLog.value.push(
    `${fighter1.value.name} - Ki: ${fighter1.value.ki} / Max: ${fighter1.value.maxKi}`,
  )
  battleLog.value.push(
    `${fighter2.value.name} - Ki: ${fighter2.value.ki} / Max: ${fighter2.value.maxKi}`,
  )
  battleLog.value.push('---')

  setTimeout(() => {
    battleLog.value.push('El combat comença!')
  }, 500)

  // Primer atac amb Ki normal
  setTimeout(() => {
    battleLog.value.push('--- Primer Atac (Ki Normal) ---')
    const f1Attack1 = f1Power * (0.9 + Math.random() * 0.2)
    const f2Attack1 = f2Power * (0.9 + Math.random() * 0.2)

    if (f1Attack1 > f2Attack1) {
      battleLog.value.push(`${fighter1.value!.name} guanya el primer atac!`)
    } else if (f2Attack1 > f1Attack1) {
      battleLog.value.push(`${fighter2.value!.name} guanya el primer atac!`)
    } else {
      battleLog.value.push('Primer atac empatat!')
    }
  }, 1500)

  // Segon atac amb Ki Màxim
  setTimeout(() => {
    battleLog.value.push('--- Segon Atac (Ki Màxim) ---')
    const f1Attack2 = f1MaxPower * (0.9 + Math.random() * 0.2)
    const f2Attack2 = f2MaxPower * (0.9 + Math.random() * 0.2)

    if (f1Attack2 > f2Attack2) {
      battleLog.value.push(`${fighter1.value!.name} guanya el segon atac amb tot el seu poder!`)
    } else if (f2Attack2 > f1Attack2) {
      battleLog.value.push(`${fighter2.value!.name} guanya el segon atac amb tot el seu poder!`)
    } else {
      battleLog.value.push('Segon atac empatat!')
    }
  }, 3000)

  // Resultat final
  setTimeout(() => {
    battleLog.value.push('--- Resultat Final ---')
    const f1FinalPower = ((f1Power + f1MaxPower) / 2) * (0.9 + Math.random() * 0.2)
    const f2FinalPower = ((f2Power + f2MaxPower) / 2) * (0.9 + Math.random() * 0.2)

    if (f1FinalPower > f2FinalPower) {
      winner.value = fighter1.value
      battleLog.value.push(`🏆 ${fighter1.value!.name} guanya el combat!`)
    } else if (f2FinalPower > f1FinalPower) {
      winner.value = fighter2.value
      battleLog.value.push(`🏆 ${fighter2.value!.name} guanya el combat!`)
    } else {
      battleLog.value.push('⚔️ Empat! Tots dos lluitadors són igual de forts!')
    }

    isBattling.value = false
  }, 4500)
}

fetchCharacters()
</script>

<template>
  <main class="combat-page">
    <h1>Arena de Combat</h1>

    <div v-if="isLoading" class="loading">Carregant lluitadors...</div>

    <div v-else class="combat-container">
      <section class="fighters-section">
        <div class="fighter-slot">
          <h2>Lluitador 1 (Z Fighter)</h2>
          <div v-if="fighter1" class="selected-fighter">
            <img :src="fighter1.image" :alt="fighter1.name" />
            <h3>{{ fighter1.name }}</h3>
            <p>Ki: {{ fighter1.ki }}</p>
            <p>Raça: {{ fighter1.race }}</p>
          </div>
          <div v-else class="empty-slot">
            <span>Selecciona un lluitador</span>
          </div>
        </div>

        <div class="vs-separator">
          <span class="vs-text">VS</span>
          <button
            v-if="canBattle"
            @click="startBattle"
            class="battle-button"
            :disabled="isBattling"
          >
            {{ isBattling ? 'Combatent...' : 'Començar Combat!' }}
          </button>
          <div v-if="battleLog.length > 0" class="battle-log">
            <h3 class="log-title">⚔️ Registre del Combat ⚔️</h3>
            <div class="log-content">
              <p v-for="(log, index) in battleLog" :key="index" class="log-entry">{{ log }}</p>
            </div>
          </div>
        </div>

        <div class="fighter-slot">
          <h2>Lluitador 2 (Enemic)</h2>
          <div v-if="fighter2" class="selected-fighter">
            <img :src="fighter2.image" :alt="fighter2.name" />
            <h3>{{ fighter2.name }}</h3>
            <p>Ki: {{ fighter2.ki }}</p>
            <p>Raça: {{ fighter2.race }}</p>
          </div>
          <div v-else class="empty-slot">
            <span>S'assignarà automàticament</span>
          </div>
        </div>
      </section>

      <section class="characters-grid">
        <h2>Selecciona el teu Lluitador</h2>
        <div class="grid">
          <div
            v-for="character in zFighters"
            :key="character.id"
            class="character-item"
            :class="{
              selected1: fighter1?.id === character.id,
            }"
          >
            <img :src="character.image" :alt="character.name" />
            <h3>{{ character.name }}</h3>
            <div class="action-buttons">
              <button @click="selectFighter1(character)" class="select-btn btn-1">
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.combat-page {
  padding: var(--spacing-lg);
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: var(--color-text);
  font-size: 2.5rem;
  margin-bottom: var(--spacing-xl);
  position: relative;
  padding-bottom: var(--spacing-md);
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-sm);
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-text-light);
  padding: var(--spacing-xl);
}

.combat-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.fighters-section {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-lg);
  align-items: start;
}

.fighter-slot {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 4px 6px var(--color-shadow);
}

.fighter-slot h2 {
  text-align: center;
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  font-size: 1.5rem;
}

.selected-fighter {
  text-align: center;
}

.selected-fighter img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: var(--spacing-md);
  border-radius: var(--radius-sm);
}

.selected-fighter h3 {
  color: var(--color-text);
  font-size: 1.3rem;
  margin-bottom: var(--spacing-sm);
}

.selected-fighter p {
  color: var(--color-text-light);
  margin: var(--spacing-xs) 0;
}

.empty-slot {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-light);
  font-size: 1.1rem;
}

.vs-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding-top: 60px;
}

.vs-text {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-primary);
  text-shadow: 2px 2px 4px var(--color-shadow);
}

.battle-button {
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px var(--color-shadow);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.battle-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px var(--color-shadow-hover);
}

.battle-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.battle-log {
  margin-top: var(--spacing-md);
  width: 100%;
  max-width: 400px;
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: 0 4px 12px var(--color-shadow);
  border: 2px solid var(--color-primary);
}

.log-title {
  color: var(--color-primary);
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 var(--spacing-sm) 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.log-content {
  background: var(--color-background);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
}

.log-entry {
  color: var(--color-text);
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-border);
  animation: fadeIn 0.3s ease;
}

.log-entry:last-child {
  border-bottom: none;
  font-weight: 700;
  color: var(--color-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.characters-grid h2 {
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  font-size: 1.5rem;
  margin-top: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.character-item {
  background: var(--color-card-bg);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: 0 4px 6px var(--color-shadow);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.character-item img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.character-item h3 {
  color: var(--color-text);
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
}

.character-item.selected1 {
  border-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.4);
}

.character-item.selected2 {
  border-color: var(--color-secondary);
  box-shadow: 0 0 15px rgba(0, 78, 137, 0.4);
}

.action-buttons {
  display: flex;
  gap: var(--spacing-xs);
  flex-direction: column;
}

.select-btn {
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.btn-1 {
  background: var(--color-primary);
}

.btn-1:hover:not(:disabled) {
  background: var(--color-accent);
  transform: translateY(-2px);
}

.btn-2 {
  background: var(--color-secondary);
}

.btn-2:hover:not(:disabled) {
  opacity: 0.8;
  transform: translateY(-2px);
}

.select-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .fighters-section {
    grid-template-columns: 1fr;
  }

  .vs-separator {
    padding-top: 0;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
