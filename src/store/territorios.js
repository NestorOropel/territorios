// stores/counter.js
import { defineStore } from 'pinia'

export const useTerritoriosStore = defineStore('territorios', {
  state: () => ({
    list: [
      {
        id: 1,
        zone: "A",
        numero: 1,
      }
    ],
    activeId: null
  }),
  getters: {
    active(state){
      return state.list.filter((territorio) => territorio.id == state.activeId)
    } 
  },
  actions: {
    setActive(id) {
      this.activeId = id;
    },
    addTerritorio(data){
      this.list = [...this.list, data]
    }
  },
})
