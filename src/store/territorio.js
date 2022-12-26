import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTerritorioStore = defineStore('territorio', () => {
  const zona = ref('')
  const numero = ref()
  const center = ref([-31.5653073, -68.5638051])
  const shape = ref(0)
  const angle = ref(-19)
  const zoom = ref(17)
  const limits = ref([])
  const mzNumbers = ref([])

  const addLimit = (latlng) => {
    limits.value.push(latlng)
  }
  const addMzNumber = (latlng) => {
    mzNumbers.value.push(latlng)
  }

  const getData = () => {
    return {
      numero: numero.value,
      zona: zona.value,
      center: center.value,
      limits: limits.value,
      mzNumbers: mzNumbers.value,
      shape: shape.value, 
      angle: angle.value,
      zoom: zoom.value,
    }
  }
  return { 
    numero, zona, center, limits, mzNumbers, shape, 
    angle,
    zoom,
    addLimit,
    addMzNumber,
    getData
  }
})
