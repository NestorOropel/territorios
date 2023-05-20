// stores/counter.js
import { defineStore } from 'pinia'

import { ref } from "vue";

export const useSalidaStore = defineStore('salida', () => {
  

  const horarios = ref(["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"])
  const conductores = ref(["Jorge", "Juan", "Pedro", "Luis", "Carlos", "Mario"])
 
  const list = ref({
    data: [],
  })
  const history = ref([])

  const addSalida = (form) => {
    list.value.data.push(form)
  }

  return {
    horarios,
    conductores,
    list,
    addSalida,
    history,
  }
},
{ 
  persist: {
    key: 'salida',
    storage: localStorage,
    paths: ['horarios', 'conductores'],
    // debug: true,
  }
})
