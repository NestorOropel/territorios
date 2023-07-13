import { useRouterStore } from "@/store/router";
const url = location.origin;
export const useUrl = () => {
  const route = useRouterStore();

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

  const getArrayItem = (item) => {
    const { numero, zona, center, color, angle, zoom, mzNumbers, referencia, limits, notas, pendiente } = item;
    const arrItem = [numero, zona, center, [color.backgroundColor, color.color], angle, zoom, mzNumbers, referencia, limits, notas, pendiente];
    return arrItem;
  }

  const getItemFromQuery = () => {
    // console.log("getItemFromQuery", window.location)

    let query = window.location.href.split('map?item=')[1];
    query = decodeURIComponent(query);
    // console.log("query", query)

    let item = false;
    try {
      item = JSON.parse(query);
    }
    catch (error) {
      console.log('no json', error)
    }
    if (!item) {
      route.$patch({page: 'listaTerritorio'})
      return {};
    }   
    const [numero, zona, center, color, angle, zoom, mzNumbers, referencia, limits, notas, pendiente] = item;
    const objItem = {
      numero, zona, center, color: { backgroundColor: color[0], color: color[1] }, angle, zoom, mzNumbers, referencia, limits, notas, pendiente
    }
    return objItem;
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
    getInforme
  }
}