import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useConstantsStore = defineStore('constants', () => {
  const apiURL = ref('https://dragonball-api.com/api')
  
  return { apiURL }
})
