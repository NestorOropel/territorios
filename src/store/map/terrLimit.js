import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTerrLimits = defineStore('terrLimitsStore', () => {
  const terrLimits = ref([])
  
  function setTerrLimits(data){
    terrLimits.value = data
  }

  return { 
    terrLimits,
    setTerrLimits
  }
})
