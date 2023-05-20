
const url = location.origin;
export const useUrl = () => {
  // get url with object item in query
  const getItemUrl = (item) => {
    // console.log("getItemUrl", item)
    return `${url}/map?item=${encodeURIComponent(JSON.stringify(getArrayItem(item)))}`
  }

  const getArrayItem = (item) => {
    const { numero, zona, center, color, angle, zoom, mzNumbers, referencia, limits, notas } = item;
    const arrItem = [numero, zona, center, [color.backgroundColor, color.color], angle, zoom, mzNumbers, referencia, limits, notas];
    return arrItem;
  }

  const getItemFromQuery = () => {
    // console.log("getItemFromQuery", window.location)
    const query = new URLSearchParams(window.location.search);
    // console.log("query", query.get('item'))
    const item = JSON.parse(query.get('item'));
    const [numero, zona, center, color, angle, zoom, mzNumbers, referencia, limits, notas] = item;
    const objItem = {
      numero, zona, center, color: { backgroundColor: color[0], color: color[1] }, angle, zoom, mzNumbers, referencia, limits, notas
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
    const query = new URLSearchParams(window.location.search);
    const data = JSON.parse(query.get('data'));
    if (!data) return {};
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