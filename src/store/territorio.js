import { ref } from 'vue'
import { defineStore } from 'pinia'
import uuid from './mix/uuid'

export const useTerritorioStore = defineStore('territorio', () => {
  const uuid = ref()
  const zona = ref('')
  const numero = ref()
  const referencia = ref('')
  const notas = ref('')
  const center = ref(null)
  const shape = ref(0)
  const angle = ref(-19)
  const zoom = ref(17)
  const limits = ref([])
  const mapConfig = ref({})
  const mzNumbers = ref([])
  const puntoEncuentro = ref([])

  const addLimit = (latlng) => {
    limits.value.push(latlng)
  }
  const addMzNumber = (latlng) => {
    mzNumbers.value.push(latlng)
  }
  const addPuntoEncuentro = (data) => {
    puntoEncuentro.value.push(data)
  }

  const setId = () => {
    uuid.value = uuid.new()
  }

  const getData = () => {
    return {
      uuid: uuid.value,
      numero: numero.value,
      zona: zona.value,
      center: center.value,
      limits: limits.value,
      mzNumbers: mzNumbers.value,
      shape: shape.value, 
      angle: angle.value,
      zoom: zoom.value,
      referencia: referencia.value,
      notas: notas.value,
      mapConfig: mapConfig.value,
      puntoEncuentro: puntoEncuentro.value
    }
  }
  return { 
    uuid,
    mapConfig,
    numero, zona, center, limits, mzNumbers, shape, 
    angle,
    zoom,
    referencia,
    notas,
    puntoEncuentro,
    addLimit,
    addMzNumber,
    addPuntoEncuentro,
    setId,
    getData,
  }
})
