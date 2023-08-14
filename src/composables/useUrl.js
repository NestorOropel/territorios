import { useRouterStore } from "@/store/router";
import { useTerritoriosStore } from "@/store/territorios";
import { useTrabajoStore } from '@/store/useTrabajoStore';

const url = location.origin;
export const useUrl = () => {
  const route = useRouterStore();
  const territorios = useTerritoriosStore();
  const trabajo = useTrabajoStore();

  // get url with object item in query
  const getItemUrl = (item, pendiente) => {
    // console.log("getItemUrl", item, pendiente)
    const itemUrl = JSON.parse(JSON.stringify(item));
    delete itemUrl.puntoEncuentro;
    delete itemUrl.uuid;
    if (pendiente) {
      itemUrl.pendiente = pendiente;
    }

    // console.log("itemurl", itemUrl)

    return `${url}/map?item=${encodeURIComponent(JSON.stringify(getArrayItem(itemUrl)))}`
  }



  const getFullMapUrl = (terrAsignados, puntoEncuentro) => {
    let items = [];
    console.log('getFullMapUrl', terrAsignados, puntoEncuentro)

    for (let i in terrAsignados) {
      // console.log('i', i, terrAsignados[i])
      const terr = terrAsignados[i];
      const item = {...territorios.data[terr]};
      if (item) {
        item.pendiente = trabajo.data[terr].manzanasPendientes;
        delete item.puntoEncuentro;
        delete item.uuid;
        items.push(getArrayItem(item))
      }
    }
    console.log('items', items)

    const fullMapUrl = `${url}/map?items=${encodeURIComponent(JSON.stringify(items))}&puntoEncuentro=${encodeURIComponent(JSON.stringify(puntoEncuentro))}`
    return fullMapUrl;
  } 

  const getArrayItem = (item) => {
    const { numero, zona, center, color, angle, zoom, mzNumbers, referencia, limits, notas, pendiente } = item;
    const arrItem = [numero, zona, center, [color.backgroundColor, color.color], angle, zoom, mzNumbers, referencia, limits, notas, pendiente];
    return arrItem;
  }

  const getQuery = () => {
    console.log("getQuery", window.location)
    const urlString = window.location.href;

    // Creamos un objeto URL con la URL proporcionada
    const miURL = new URL(urlString);

    // Obtenemos el objeto URLSearchParams a partir del query de la URL
    const parametrosURL = miURL.searchParams;

    // Creamos un objeto vacío para almacenar los parámetros del query
    const parametrosObjeto = {};

    // Iteramos sobre los parámetros y los almacenamos en el objeto
    for (const [clave, valor] of parametrosURL.entries()) {
      parametrosObjeto[clave] = decodeURIComponent(valor);
    }

    return parametrosObjeto;

  }

  function crearArrayNumeros(n1, n2) {
    return Array.from({ length: n2 - n1 + 1 }, (_, index) => n1 + index);
  }
  

  const prepareItem = (item) => {
    let [numero, zona, center, color, angle, zoom, mzNumbers, referencia, limits, notas, pendiente] = item;
    console.log('prepareItem', pendiente, item)
    if (!pendiente) pendiente = crearArrayNumeros(1, mzNumbers.length);
    const objItem = {
      numero, zona, center, color: { backgroundColor: color[0], color: color[1] }, angle, zoom, mzNumbers, referencia, limits, notas, pendiente
    }
    return objItem;
  }

  const getItemFromQuery = () => {
    // console.log("getItemFromQuery", window.location)
    
    let query = getQuery();
    console.log("query", query)
    // console.log("query", query)
    if (query.items) {
      query.items = JSON.parse(query.items);
      const items = query.items.map(item => prepareItem(item));
      console.log('items', items)
      return items;
    }

    let item = false;
    try {
      item = JSON.parse(query.item);
    }
    catch (error) {
      console.log('no json', error)
    }
    if (!item) {
      // route.$patch({page: 'listaTerritorio'})
      return {};
    }   

    return prepareItem(item);
  }

  const getLinkInforme = (item, manzanas) => {
    const { numero, zona } = item;
    const date = new Date();
    const timestamp = date.getTime();
    const manzanasTrue = []
    for( let k in manzanas){
      if (manzanas[k]) manzanasTrue.push(parseInt(k))
    };
    const arrItem = [numero, zona, manzanasTrue, timestamp];
    return `${url}/informe?data=${encodeURIComponent(JSON.stringify(arrItem))}`;
  }

  const getInforme = () => {
    // console.log("getInforme", window.location)
    let query = window.location.href.split('informe?data=')[1];
    query = decodeURIComponent(query);
    let data = false;
    // console.log("data", query)
    try {
      data = JSON.parse(query);
    }
    catch (error) {
      console.log('no json', error)
    }
    if (!data) {
      route.$patch({page: 'listaTerritorio'})
      return {};
    }  
    // if (!data) return {};
    const [numero, zona, manzanas, timestamp] = data;
    const objItem = {
      numero, zona, manzanas, timestamp,
      territorio: `${zona}${numero}`
    }
    return objItem;
  }



  return {
    getItemUrl,
    getItemFromQuery,
    getLinkInforme,
    getInforme,
    getFullMapUrl,
    getQuery
  }
}