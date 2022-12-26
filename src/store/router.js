import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', () => {
  const page = ref('downloadTerritorio')
  
  return { page }
})
