// stores/counter.js
import { defineStore } from 'pinia'
import { ref, reactive, computed } from "vue";

export const useTrabajoStore = defineStore('trabajo', () => {
  const data = ref({})

  const hasRegistro = (territorio, manzana, timestamp) => {
    // console.log("hasRegistro", timestamp, territorio, manzana)
    const key = `${territorio}-${manzana}`;
    if (!data.value[key]) return false;
    return data.value[key].includes(timestamp);
  }

  const setRegistro = (territorio, manzana, timestamp) => {
    // console.log("setRegistro", data.value, timestamp, territorio, manzana, hasRegistro(timestamp, territorio, manzana))
    if (!hasRegistro(territorio, manzana, timestamp)) {
      const key = `${territorio}-${manzana}`;
      if (!data.value[key]) data.value[key] = [];
      data.value[key].push(timestamp);
    }
  }

  const getLastRegistro = (territorio, manzana) => {
    const key = `${territorio}-${manzana}`;
    if (!data.value[key])  return '-';
    return getDate(data.value[key][data.value[key].length - 1]);
  }

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  const state = reactive({
    work : computed(() => {
      // count keys and get general max and min timestamp by position in array
      const stats = [];
      for (let key in data.value) {
        for (let i in data.value[key]) {
          if (!stats[i]) stats[i] = {min: null, max: null, count: 0};
          stats[i].count++;
          if (stats[i].min == null || stats[i].min > data.value[key][i]) stats[i].min = data.value[key][i];
          if (stats[i].max == null || stats[i].max < data.value[key][i]) stats[i].max = data.value[key][i];
        }
      }
      return stats
    }),
  });

  const getTerritorioByPosition = (position) => {
    let result = {}
    for (let key in data.value) {
      if (data.value[key][position]) {
        const terr = key.split('-')[0];
        if (!result[terr]) result[terr] = {count: 0, mza: []};
        result[terr].count++;
        result[terr].mza.push(key.split('-')[1]);
      }
    }
    return result;
  }

  return {
    data,
    hasRegistro,
    setRegistro,
    getDate,
    getLastRegistro,
    getTerritorioByPosition,
    state
  }
},
{ 
  persist: {
    key: 'trabajo',
    storage: localStorage,
    paths: ['data'],
    // debug: true,
  }
})
