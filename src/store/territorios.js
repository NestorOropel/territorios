// stores/counter.js
import { defineStore } from 'pinia'
import { ref, reactive, computed } from "vue";
import uuid from './mix/uuid'

export const useTerritoriosStore = defineStore('territorios', () => {
  const list = ref([])
  const puntoEncuentro = ref([])
  const activeId = ref(null)
  const setActive = (id) => {
    activeId = id;
  }
  const addTerritorio = (data) => {
    list = [...this.list, data]
  }

  const update = async (data) => {
    // console.log("update", data)
    if (!data.uuid) {
      data.uuid = await uuid.new()
      list.value = [...list.value, data]
      return
    }
    let nList = list.value
    let i = nList.findIndex(item => item.uuid == data.uuid);

    list.value =  [...nList.slice(0,i ), data, ...nList.slice(i + 1)]

    // territorios.$patch({list: [...territorios.list, ]})
  }
  
  const state = reactive({
    filteredZones: computed(() => {
      const zonas = list.value.map(item => item.zona);
      const zonasSinDuplicados = zonas.filter((zona, index) => zonas.indexOf(zona) === index);
      return zonasSinDuplicados;
    }),
    totalManzanas: computed(() => {
      // console.log("totalManzanas", list.value)
      return list.value.reduce((acc, item) => {
        // console.log("totalManzanas", item)
        return acc + item.mzNumbers.length - 1
      }, 0)
    }),
    filteredTerr: computed(() => {
      const data = list.value.map(item => {
        return {
          ...item,
          name: `${item.zona}${item.numero} - ${item.referencia}`
        }
      });
      const dataSinDuplicados = data.filter((zona, index) => data.indexOf(zona) === index);
      return dataSinDuplicados;
    }),
    //order by mzNumbers
    orderByMzNumbers: computed(() => {
      return list.value.sort((a, b) => {
        return a.mzNumbers[0] - b.mzNumbers[0]
      })
    }),
  });

  const getTerritorio = (zona, numero) => {
    // console.log("getTerritorio", zona, numero, list.value)
    return list.value.find(item => {
      // console.log("getTerritorio", item)
      return item.zona == zona && item.numero == numero
    })
  }

  return {
    list,
    puntoEncuentro,
    addTerritorio,
    update,
    getTerritorio,
    state
  }
},
{ 
  persist: {
    key: 'territorios',
    storage: localStorage,
    paths: [
      'list',
      'puntoEncuentro',
    ],
    // debug: true,
  }
})
