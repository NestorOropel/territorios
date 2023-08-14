<script setup>
import { onMounted, ref } from "vue";
import { useUrl } from "@/composables/useUrl";
import Divider from 'primevue/divider';
import ToggleButton from "primevue/togglebutton";
import { useMapStore } from "@/store/map";


const m = useMapStore();
const { getItemFromQuery, getLinkInforme, getQuery } = useUrl();
const data = getItemFromQuery();
const items = ref(Array.isArray(data) ? data : [data]);

const mzNumbers = (item) => {
  let obj = {};
  for (let i in item.mzNumbers) {
    if (i == 0) continue;
    // console.log("data.mzNumbers[i]", data.mzNumbers[i])
    obj[i] = false;
  }
  return obj;
};
const worked = ref();
const sendWhatsapp = () => {
  let trabajado = "";
  for (let i in items.value) {
    const manzanasTrue = [];
    const work = items.value[i].worked;
    for (let k in work) {
      if (work[k]) manzanasTrue.push(parseInt(k));
    }
    trabajado += `*${items.value[i].zona}${
      items.value[i].numero
    }*\n*Manzanas*: ${manzanasTrue.join(", ")}\n\n`;
  }

  let msg = `Hola hermano, le informo lo trabajado.\n\n${trabajado}¡Gracias!\n\n${getLinkInforme(
    data,
    worked.value
  )}`;

  window.open(
    "https://api.whatsapp.com/send?text=" + encodeURIComponent(msg),
    "_blank"
  );
};
const getSrc = () => {
  // const src = ref('/mapa.html?showLimits=1&center='+item.value.center+'&zoom='+item.value.zoom+'&limits='+JSON.stringify(item.value.limits)+'&mzNumbers='+JSON.stringify(item.value.mzNumbers));
  return (
    "/mapa.html?showLimits=1&center=" +
    items.value.center +
    "&zoom=" +
    items.value.zoom +
    "&limits=" +
    JSON.stringify(items.value.limits) +
    "&mzNumbers=" +
    JSON.stringify(items.value.mzNumbers)
  );
};
const obtenerUbicacion = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        const yourLocation = [latitude, longitude];
        m.L.marker(yourLocation, {
          icon: L.icon({
            iconUrl: `p2.png`,
            iconSize: [32, 32],
            alt: "Tu ubicación",
          }),
        }).addTo(m.map);

        center.value = [...yourLocation];

        m.map.setView(new m.L.LatLng(yourLocation[0], yourLocation[1]), 14);

        // alert("Latitud: " + latitude + ", Longitud: " + longitude);
      },
      function (error) {
        // Si ocurre un error al obtener la ubicación
        alert("Error al obtener la ubicación: " + error.message);
        // const center = `-31.5634895, -68.5689508`
        // const you = 1;
        // src.value = '/mapa.html?showLimits=1&center='+center+'&zoom='+item.value.zoom+'&limits='+JSON.stringify(item.value.limits)+'&mzNumbers='+JSON.stringify(item.value.mzNumbers)+'&you='+JSON.stringify(you);
      }
    );
  } else {
    alert("Geolocalización no está disponible en este navegador.");
  }
};
// console.log("color", item.value.color)
sessionStorage.setItem("color", JSON.stringify(items.value.color));

const getManzanaStyle = (item, status) => {
  if (status && status === true) return ``;
  const color = item.color;
  if (!color) return "";
  return `color: ${color.color}; background: ${color.backgroundColor}; border: ${color.backgroundColor}; `;
};
const setManzanas = (item) => {
  let manzanas = item.mzNumbers;
  let numbers = [];

  const colors = getManzanaStyle(item);
  // console.log("colors", colors);
  const poligonColor = item.color?.backgroundColor ? item.color?.backgroundColor : 'red';
  var polygon = L.polygon(item.limits, {color: poligonColor, opacity: 0.1}).addTo(m.map);

  for (let key in manzanas) {
    if (parseInt(key) === 0) continue;
    // console.log("item.center", item.center)
    // let label = showMzaNro.value ? key : item.zona+item.numero
    
    const opacity = item.pendiente.includes(parseInt(key)) ? 1 : 0.3;

    let label = key;
    let icon = L.divIcon({
      className: "manzana-marker ",
      iconSize: null,
      html: `<div class="icon manzana-marker-center" style="font-size: 1em; ${colors} opacity: ${opacity};">${label}</div><div class="arrow" />`,
    });
    numbers.push(m.L.marker(manzanas[key][0], { icon }));
  }

  L.layerGroup(numbers).addTo(m.map);
};
const query = getQuery();
const puntoEncuentro = query.puntoEncuentro
  ? JSON.parse(query.puntoEncuentro)
  : false;
const addPuntoEncuentro = () => {
  // const puntoEncuentro = query.puntoEncuentro
  //   ? JSON.parse(query.puntoEncuentro)
  //   : false;
  if (!puntoEncuentro) return;
  const list = [];
  const icon = L.icon({
    iconUrl: `/pe.png`,
    iconSize: [32, 32],
    alt: "Punto de Encuentro",
  });
  list.push(m.L.marker(puntoEncuentro, { icon }));

  L.layerGroup(list).addTo(m.map);
};

const setWorked = () => {
  for (let i in items.value) {
    let manzanas = mzNumbers(items.value[i]);
    // console.log("manzanas", manzanas)
    for (let k in manzanas) {
      if (!items.value[i].pendiente.includes(parseInt(k))) {
        delete manzanas[k];
      }
    }

    items.value[i].worked = manzanas;
  }
};
const center = ref(items.value[0].center);
onMounted(async () => {
  if (!Array.isArray(items.value)) return;
  m.map.setZoom(15);

  for (let i in items.value) {
    console.log("items.value[i]", items.value[i]);
    if (!items.value[i].pendiente) {
      items.value[i].pendiente = await mzNumbers(items.value[i])
    };
    // console.log("item.value[i]", items.value[i])
    setManzanas(items.value[i]);
  }

  center.value = items.value[0].center;
  addPuntoEncuentro();

  setWorked();
});
</script>

<template>
  
  <div class="grid grid-nogutter align-content-start text-left viewer">
    <div class="col-12 lg:col-6 px-2 lg:px-4 pb-6 bg-white">
      <h1 class="font-light">¡Bienvenido!</h1>
      <h3 class="py-0 mt-1 mb-2 text-lg">Las manzanas/zonas asignadas del territorio son las siguientes:</h3>
      <div v-for="(item, key) in items" class="mt-3">
        <h1 class="m-0 p-0 font-light" >
          <span class="p-1" :style="getManzanaStyle(item, false)">{{ item.zona }}{{ item.numero }}</span>
        </h1>
        <h2 class="m-0 mt-2 p-0 text-sm">{{ item.referencia }}</h2>
        <div class="text-xs">
          {{ item.notas }}
        </div>
        <!-- <div v-if="item.pendiente">
          
          
          
          <div class="flex gap-2" >
            <div v-for="mza in item.pendiente" class="py-1 px-2 border-round-md" :style="getManzanaStyle(item)">
              {{ mza }}
            </div>
          </div>
        </div> -->
        <!-- <h3 class="py-0 mb-1">Informar manzanas trabajadas</h3> -->
        <div class="grid grid-nogutter mt-2">
          <div v-for="(check, k) in item.worked" :key="k" class="mr-2 mb-2">
            <ToggleButton
              v-model="item.worked[k]"
              :disabled="!item.pendiente.includes(parseInt(k))"
              :style="getManzanaStyle(item, item.worked[k])"
              :onLabel="k"
              :offLabel="k"
            />
          </div>
        </div>
      </div>

      <div class="pt-4">
        <Button
        label="Enviar Mensaje"
        severity="success"
        class="p-button-success"
        @click="sendWhatsapp"
        />
      </div>
      <div class="text-sm mt-3">
        Seleccione las manzanas que han sido trabajadas y toque "Enviar Mensaje"
        para informar lo trabajado.
      </div>
      <!-- <div>{{ item }}</div> -->
      <p class="text-red-600 text-xs mt-2">
        Los nombres de territorios solo son de referencía, el territorio no es por barrio. El
        territorio son todas las zonas numeradas que se muestran en el mapa.
      </p>
    </div>
    <div class="col-12 grid grid-nogutter title surface-200 pb-10">
      
      <div
        class="col-12 lg:col-6 pt-0 px-1 py-2 pb-2 lg:px-2 flex justify-content-between"
      >
        <div class="w-full">
          
          <div class="">
            <h1 class="font-light mt-2 mb-3">Mapa</h1>
          </div>
          <div class="flex align-items-center justify-content-start w-full mb-1 gap-2">

            <Button icon="pi pi-map-marker" label="¿Dónde estoy?" severity="warning" @click="obtenerUbicacion" />
            <a :href="`https://www.google.com/maps/search/?api=1&query=${puntoEncuentro.lat},${puntoEncuentro.lng}`" target="_blank" class="flex align-items-center gap-2 bg-indigo-300 p-2 px-3 no-underline border-round-sm text-white">
              <img src="/pe.png" style="height: 1.3rem;"/>
              ¿Cómo llegar?</a>
          </div>
        </div>
        <div>
          
        </div>
        
      </div>
    </div>
    <div class="col-12 lg:col-6 pr-2 pl-1  relative surface-200">
      <div class="absolute" style="top: 10px; right:10px;  z-index:999;">
          
          <img src="/north.png" style="width: 3rem; min-height: 3rem;"/>
        </div>
      <iframe
        :src="getSrc"
        frameborder="0"
        class="map-iframe"
        v-if="!Array.isArray(items)"
      ></iframe>
      <div v-else class="p-0 m-0 mb-4">
        <MapaBase
          class="map-iframe"
          :center="center"
          :saveCenter="false"
          @ready="ready"
        ></MapaBase>
      </div>

      
    </div>
    
  </div>
</template>

<style scoped>
.title {
  /* max-height: 5em; */
}
.viewer {
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
  width: 100vw;
}
.map-iframe {
  width: 99%;
  height: 70vh !important;
  margin-left: 0.5%;
}
</style>
