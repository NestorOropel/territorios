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
  const color = ref({
    backgroundColor: 'rgb(255, 255, 254)',
    color: '#000000',
  })
  const mzNumbers = ref([])
  const puntoEncuentro = ref([])

  const addLimit = (latlng) => {
    limits.value.push(latlng)
  }
  function removeLastLimit(){
    let list = [...limits.value]
    list.pop()
    limits.value = list
  }
  const addMzNumber = (latlng) => {
    mzNumbers.value.push(latlng)
  }
  function removeLastMz(){
    let list = [...mzNumbers.value]
    list.pop()
    mzNumbers.value = list
  }
  const addPuntoEncuentro = (data) => {
    puntoEncuentro.value.push(data)
  }
  function removeLastPE(){
    let list = [...puntoEncuentro.value]
    list.pop()
    puntoEncuentro.value = list
  }




  const setId = () => {
    uuid.value = uuid.new()
  }

  const getData = () => {
    return {
      uuid: uuid.value,
      numero: numero.value,
      zona: zona.value,
      center: JSON.parse(JSON.stringify(center.value)),
      color: JSON.parse(JSON.stringify(color.value)),
      mapConfig: JSON.parse(JSON.stringify(mapConfig.value)),
      limits: JSON.parse(JSON.stringify(limits.value)),
      mzNumbers: JSON.parse(JSON.stringify(mzNumbers.value)),
      puntoEncuentro: JSON.parse(JSON.stringify(puntoEncuentro.value)),
      shape: shape.value, 
      angle: angle.value,
      zoom: zoom.value,
      referencia: referencia.value,
      notas: notas.value,
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
    color,
    puntoEncuentro,
    addLimit,
    removeLastLimit,
    addMzNumber,
    removeLastMz,
    addPuntoEncuentro,
    removeLastPE,
    setId,
    getData
  }
},
{
  // persist: false
  persist: {
    key: 'x_t',
    storage: localStorage,
    paths: [
      'zona',
      'numero',
      'mzNumbers'
    ],
    // debug: true,
  }
}
)
