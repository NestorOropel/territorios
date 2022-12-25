import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTerritorioStore = defineStore('territorio', () => {
  const zona = ref('A')
  const numero = ref(1)
  const center = ref([])
  const limits = ref([
    [ -31.563407260699503, -68.56227278709413 ],
    [ -31.56558751330084, -68.56315255165102 ],
    [ -31.564815060662163, -68.56587767601015 ],
    [ -31.562630219151135, -68.56499791145326 ],
  ])
  const mzNumbers = ref([])

  const addLimit = (latlng) => {
    limits.value.push(latlng)
  }
  const addMzNumber = (latlng) => {
    mzNumbers.value.push(latlng)
  }

  return { 
    numero, zona, center, limits, mzNumbers, 
    addLimit,
    addMzNumber,
  }
})
