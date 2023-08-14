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
      vecesCompletado: 0,
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

  const getTerritorio = async ({ territorio }) => {
    // console.log("getTerritorio", territorio, date, conductor)
    detail = data.value[territorio.toUpperCase()]
    // console.log("getTerritorio detail 0010", detail)



    if (!detail) {

      // console.log("detail no")
      detail = await template(territorio)
      // console.log("getTerritorio detail 22", detail)
      // await addDetalle({date, conductor})
    }
    // console.log("getTerritorio detail", detail)
    return detail;
  }

  const addDetalle = async ({ date, conductor }) => {
    // si hay un detalle activo, no se puede iniciar otro
    // console.log("addDetalle", detail.active)
    if ( detail.active !== false) return
    // platilla de history
    let tHistory = await templateHistory(date, conductor)
    
    // // si no detalles, se crea uno
    // if (detail.history.length === 0) {
    //   detail.history.push(tHistory)
    //   detail.ultimoInicio = date
    //   detail.active = 0;
    //   return;
    // }
    // si hay no hay detalle activo, se crea uno
    detail.history.push(tHistory)
    detail.ultimoInicio = date
    detail.active = detail.history.length - 1;
  }

  const updateHistory = async (params, indexs=false) => {
    const { date, conductor, time, notas, manzanas } = params
    if (indexs === null ) indexs = false
    // console.log("updateHistory", indexs, typeof indexs, detail)
    const active = indexs === false ? detail.active:  indexs?.history
    // cono
    let hDetail = detail.history[active];
    // console.log("updateHistory hDetail", active, hDetail)
    let newDoc = {
      fecha: date,
      manzanas,
      time,
      conductor,
      notas: ""
    }
    // console.log("updateHistory newDoc", active,  hDetail)
    if (indexs === false) {
      hDetail.detalle.push(newDoc);
    } else {
      hDetail.detalle[indexs?.detail] = newDoc
    }
    return;
  }

  const removeDetail = async (territorio, indexHistory, indexDetail) => {
    await getTerritorio({territorio})
    // console.log("removeDetail", detail, indexHistory, indexDetail)
    detail.history[indexHistory].detalle.splice(indexDetail, 1)
    await updateStats()
  }

  const updateStats = async () => {
    let vecesCompletado = 0;
    let manzanasPendientes = [...detail.manzanas]
    
    let ultimoInicio = null;
    let ultimoFin = null;
    let activo = false;

    // itera sobre los detalles de todos los historicos y actualiza los stats
    for (let i in detail.history) {
      // console.log("updateStats detail.history", i, detail.history[i])
      for (let j in detail.history[i].detalle) {
        let item = detail.history[i].detalle[j]
        if (j == 0) {
          ultimoInicio = item.fecha
        }
        if (typeof item.manzanas === "object" && !Array.isArray(item.manzanas)) item.manzanas = Object.values(item.manzanas)
        let newPendiente = []
        for (let k in manzanasPendientes) {
          let mzna = manzanasPendientes[k]
          if (!item.manzanas.includes(mzna) && !item.manzanas.includes(mzna.toString())) {
            newPendiente.push(mzna)
          }
        }
        manzanasPendientes = [...newPendiente]
        // console.log("manzanasPendientes", item.manzanas, manzanasPendientes)
        // console.log("manzanasPendientes", j, detail.history[i].detalle.length - 1, detail.history[i].detalle)
        if (j == detail.history[i].detalle.length - 1) {
          // console.log("newPendiente.length",  newPendiente.length, newPendiente)
          if (newPendiente.length === 0) {
            detail.history[i].fin = item.fecha
            ultimoFin = item.fecha
            vecesCompletado++
            manzanasPendientes = [...detail.manzanas]
            activo = false
          } else {
            ultimoFin = null
            activo = i
          }
        }
      }
      // console.log("manzanasPendientes", manzanasPendientes)
      // if (manzanasPendientes.length > 0) {
      //   activo = i
      // } else {
      //   activo = false
      // }
    }
    let manzanasPendientesTotal = manzanasPendientes.length
    // console.log("updateStats", vecesCompletado, manzanasPendientes, manzanasPendientesTotal, ultimoInicio, ultimoFin, activo)
    detail.vecesCompletado = vecesCompletado
    detail.manzanasPendientes = manzanasPendientes
    detail.manzanasPendientesTotal = manzanasPendientesTotal
    detail.ultimoInicio = ultimoInicio
    detail.ultimoFin = ultimoFin
    detail.active = activo
  }

  const setHistory = async (params, indexs=false) => {
    
    await updateStats()
    // console.log("setHistory detail", detail)

    if (!indexs) await addDetalle(params)
    await updateHistory(params, indexs)
    await updateStats()
  }

  const setRegistro = async (params, indexs) => {
    // console.log("setRegistro", params)
    await getTerritorio(params);
    // console.log("setRegistro detail", detail)
    await setHistory(params, indexs)
    data.value[params.territorio.toUpperCase()] = JSON.parse(JSON.stringify(detail))
    return
  }
  const getDate = (timestamp, err = "") => {
    if (!timestamp) return err
    const date = new Date(parseInt(timestamp));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  const iniciados = ref([])
  const getIniciados = () => {
    let result = []
    for (let i in data.value) {
      let item = data.value[i]
      let noFin = item.history.filter((h) => h.fin === null)
      if (noFin.length > 0) {
        // console.log("item iniciados", item)
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
    iniciados.value = result;
    return result
  }
  const getNoTrabajados = () => {
    let result = []
    for (let i in data.value) {
      let item = data.value[i]
      if (item.history.length > 0) continue;
      result.push({
        territorio: i,
        manzanasPendientesTotal: item.manzanasPendientesTotal,
        ultimoFin: item.ultimoFin,
      })
    }
    //order by manzanasPendientesTotal desc
    result.sort((a, b) => {
      return b.manzanasPendientesTotal - a.manzanasPendientesTotal
    })
    return result;
  }

  const getCompletados = () => {
    let result = []
    for (let i in data.value) {
      let item = data.value[i]
      if (item.history.length === 0) continue;
      let noFin = item.history.filter((h) => h.fin === null)
      if (noFin.length > 0) continue;
      const ultimo = item.history[item.history.length - 1]
      if (item.manzanasPendientesTotal === 0) {
        // esto soluciona un error de manzanasPendientesTotal (YA NO SE PRODUCE) que afecto a registros viejos
        data.value[i].manzanasPendientesTotal = item.manzanasTotal
        data.value[i].manzanasPendientes = [...item.manzanas]
      }
      result.push({
        territorio: i,
        manzanasPendientesTotal: item.manzanasPendientesTotal,

        ultimoFin: ultimo.fin,
        ultimoInicio: ultimo.inicio,
      })
    }
    //order by ultimoInicio desc
    result.sort((a, b) => {
      return b.ultimoFin - a.ultimoFin
    })
    return result;
  }





  const setTodos = async () => {
    let noTrabajados = await getNoTrabajados()
    let completados = await getCompletados()
    await getIniciados()
    // console.log("todos", noTrabajados, completados, iniciados.value)
    todos.value = [...noTrabajados, ...completados, ...iniciados.value]
  }


  const todos = ref([])

  const syncHistory = async () => {
    // console.log("syncHistory", data.value)
    for (let i in territorios.list) {
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
    getIniciados,
    todos,
    setTodos,
    removeDetail,
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
