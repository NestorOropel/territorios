import { useTerritoriosStore } from "@/store/territorios";
import { useSalidaStore } from "@/store/useSalidaStore";
import { useTrabajoStore } from "@/store/useTrabajoStore";

export const useProximaSalida = () => {
  const territorios = useTerritoriosStore();
  const salidas = useSalidaStore();
  const trabajo = useTrabajoStore();
  
  const getZoneAndNumber = (territorio) => {
    //example: A12
    const zone = territorio.substring(0, 1);
    const number = territorio.substring(1, territorio.length);
    return {zone, number}
  }

  const getProximaSalida = () => {
    // console.log("getProximaSalida")
    // let data  = [];
    

    // define work positions
    let workPositions = 0;
    for (let i in trabajo.state.work) {
      // si no tiene todas las manzanas terminadas
      if (trabajo.state.work[i].count < territorios.state.totalManzanas) {
        workPositions = i
        break;
      }
    }

    const incompletos = [];
    const completos = [];
    const keysInList = [];

    // verify if territory as completed
    const trabajados = trabajo.getTerritorioByPosition(workPositions);
    for (let key in trabajados) {
      //si esta completo
      const {zone, number} = getZoneAndNumber(key);
      const territorio = territorios.getTerritorio(zone, number);
      const totalManzanas = territorio.mzNumbers.length - 1;

      if (trabajados[key].count == totalManzanas) {
        completos.push({key, zone, number});
        keysInList.push(key);
        continue;
      }
      //si no esta completo
      let terr = {
        territorio: key,
        ref: territorio.referencia,
        pendiente: totalManzanas - trabajados[key].count,
        total: totalManzanas,
        manzanas: [],
        item: territorio
      }


      // console.log("revisar manzanas pendientes", key, trabajados[key].mza)
      // establecer manzanas pendientes
      for (let i = 1; i <= totalManzanas; i++) {
        if (trabajados[key].mza.indexOf(i.toString()) == -1) {
          terr.manzanas.push(i);
        }
      }

      incompletos.push(terr);
      keysInList.push(key);

    }

    let todo = [];

    // verificar all territories
    for (let i in territorios.list) {
      const key = territorios.list[i].zona + territorios.list[i].numero;

      if (keysInList.indexOf(key) == -1) {

        let terr = {
          territorio: key,
          ref: territorios.list[i].referencia,
          pendiente: territorios.list[i].mzNumbers.length - 1,
          total: territorios.list[i].mzNumbers.length - 1,
          item: territorios.list[i],
        }

        todo.push(terr);
      }
    }

    //falta verificar que no este ya en una salida de la semana que se esta creando

    //ordenar por cantidad de manzanas pendientes, de mayor a menor
    incompletos.sort((a, b) => {
      return b.pendiente - a.pendiente
    })
    todo.sort((a, b) => {
      return b.pendiente - a.pendiente
    })
    
   

    return [ ...incompletos, ...todo]
  }


  return {
    getProximaSalida
  }
}