import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMzNumbers = defineStore('mzNumberStore', () => {
  const mzNumbers = ref([])

  function setMzNumbers(data){
    mzNumbers.value = data
  }
  

  return { 
    mzNumbers,
    setMzNumbers
  }
})
