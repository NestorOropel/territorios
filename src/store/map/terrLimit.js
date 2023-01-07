import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTerrLimit = defineStore('terrLimitStore', () => {
  const terrLimit = ref([])
  
  function setTerrLimit(data){
    terrLimit.value = data
  }

  return { 
    terrLimit,
    setTerrLimit
  }
})
