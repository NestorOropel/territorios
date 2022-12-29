// stores/counter.js
import { defineStore } from 'pinia'
import { ref, reactive } from "vue";
import uuid from './mix/uuid'

export const useTerritoriosStore = defineStore('territorios', () => {
  const list = ref([])
  const activeId = ref(null)
  const setActive = (id) => {
    activeId = id;
  }
  const addTerritorio = (data) => {
    list = [...this.list, data]
  }

  const update = async (data) => {
    console.log("update", data)
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

  return {
    list,
    addTerritorio,
    update
  }
})
