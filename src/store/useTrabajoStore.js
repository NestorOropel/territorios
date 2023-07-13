// stores/counter.js
import { defineStore } from 'pinia'
import { ref, reactive, computed } from "vue";
import { useTerritoriosStore } from './territorios'


export const useTrabajoStore = defineStore('trabajo', () => {
  const territorios = useTerritoriosStore()

  const template = async (territorio) => {
    const info = await territorios.getTerritorioById(territorio)
    console.log("info", info)
    const result =
    {
      history: [],
      manzanas: [],
      manzanasTotal: 0,
      manzanasPendientes: [],
      active: false,
      ultimoInicio: null,
      ultimoFin: null,
       
    }

    result.manzanas = await createArrayManzanas(info.mzNumbers.length - 1)
    result.manzanasTotal = result.manzanas.length
    result.manzanasPendientes = await createArrayManzanas(info.mzNumbers.length - 1)
    result.manzanasPendientesTotal = result.manzanasPendientes.length

    return result;
  }

  const templateHistory = (date, conductor) => ({
    inicio: date,
    fin: null,
    conductor: conductor,
    detalle: []
  })


  const data = ref({})

  const createArrayManzanas = (total) => {
    let arr = []
    for (let i = 1; i <= total; i++) {
      arr.push(i)
    }
    return arr;
  }

  var detail = null;

  const getTerritorio = async ({ territorio, date, conductor }) => {
    // console.log("getTerritorio", territorio, date, conductor)
    detail = data.value[territorio.toUpperCase()]
    console.log("getTerritorio detail 0010", detail)



    if (!detail) {

      // console.log("detail no")
      detail = await template(territorio)
      console.log("getTerritorio detail 22", detail)
      // await addDetalle({date, conductor})
    }
    // console.log("getTerritorio detail", detail)
    return detail;
  }

  const addDetalle = async ({date, conductor}) => {
    // console.log("addDEtail")
    if  (
      // detail.history.length > 0 && 
      detail.active !== false 
    ) return
    // console.log("addDEtail2222")
    let tHistory = await templateHistory(date, conductor)
    detail.history.push(tHistory)
    detail.ultimoInicio = date
    detail.active = detail.history.length - 1;
  }

  const updateHistory = async (params) => {
    const { date, conductor, time, notas, manzanas } = params
    // console.log("updateHistory", detail)
    let hDetail = detail.history[detail.active];
    let newDoc = {
      fecha: date,
      manzanas,
      time,
      conductor,
      notas: ""
    }
    hDetail.detalle.push(newDoc);

    let newPendiente = []
    for (let i in detail.manzanasPendientes){
      let mzna = detail.manzanasPendientes[i]
      if (!manzanas.includes(mzna) && !manzanas.includes(mzna.toString())){
        newPendiente.push(mzna)
      }
    }
    // console.log("newPendiente", newPendiente, manzanas)
    detail.manzanasPendientes = newPendiente
    detail.manzanasPendientesTotal = newPendiente.length

    if (newPendiente.length === 0) {
      hDetail.fin = date
      detail.ultimoFin = date
    }
    detail.active === false
    return;
  }

  const setHistory = async (params) => {
    // console.log("setHistory detail", detail)
    await addDetalle(params)
    await updateHistory(params)
  }


  const setRegistro = async (params) => {
    // console.log("setRegistro", params)
    await getTerritorio(params);
    await setHistory(params)
    data.value[params.territorio.toUpperCase()] = JSON.parse(JSON.stringify(detail))
    return
  }
  const getDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  const iniciados = computed({
    get: () => {
      let result = []
      for (let i in data.value){
        let item = data.value[i]
        if (item.active !== false) {
          result.push({
            territorio: i,
            manzanasPendientesTotal: item.manzanasPendientesTotal,
            ultimoInicio: item.ultimoInicio,

          })
        }
      }
      //order by ultimoInicio asc
      result.sort((a, b) => {
        return a.ultimoInicio - b.ultimoInicio
      })
      return result
    }
  })

  const terminados = computed({
    get: () => {
      let result = []

      // console.log("terminados", territorios.list)

      for (let i in data.value){
        let item = data.value[i]
        if (item.active !== false) continue;
        result.push({
          territorio: i,
          manzanasPendientesTotal: item.manzanasPendientesTotal,
          ultimoFin: item.ultimoFin,

        })
        
      }
      // console.log("terminados result", result)
      //order by ultimoInicio desc
      result.sort((a, b) => {
        return b.ultimoFin - a.ultimoFin
      })
      return result
    }
  })

  const syncHistory = async () => {
    // console.log("syncHistory", data.value)
    for (let i in territorios.list){
      let territorio = territorios.list[i].zona + territorios.list[i].numero
      territorio = territorio.toUpperCase()
      // console.log("data.value", data.value)  
      if (!data.value.hasOwnProperty(territorio)) {
        // console.log("data.value typeof", i, territorio, typeof data.value[territorio],  data.value[territorio])
        data.value[territorio] = await template(territorio)
      }
    }
  }

  setTimeout(() => {
    syncHistory();
  }, 5000);

  return {
    data,
    getDate,
    setRegistro,
    getDate,
    iniciados,
    terminados
  }
},
  {
    persist: {
      key: 'trabajo-data',
      storage: localStorage,
      paths: ['data'],
      // debug: true,
    }
  })
