import { ref } from 'vue'
import { defineStore } from 'pinia'

import * as Lvue from "leaflet";
import * as fIcons from './mix/iconsNumbers'
import * as LIcons from './mix/iconsLetters'
// import L from "@/libraries/leaflet.snogylop.js";

export const useMapStore = defineStore('mapa', () => {
  const map = ref(null)
  const center = ref([-31.5653073, -68.5638051])
  

  var sectorOption = ref({
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  })

  const iconMarker = ref([
    L.icon({
      iconUrl: `/pe.png`,
      iconSize: [32, 32],
      alt: 'Punto de Encuentro'
    })
  ]);

  const icons = fIcons.getIcons(L);
  const nIcons = ref(icons);
  const iconsLetter = LIcons.getIcons(L)
  const lIcons = ref(iconsLetter);

  function setMap(data) {
    map.value = data
  }

  function getCenter() {
    let center = map.value.getBounds().getCenter()
    return [center.lat, center.lng];
  }

  return { 
    map,
    nIcons,
    lIcons,
    sectorOption,
    iconMarker,
    L: Lvue,
    setMap,
    getCenter,
    center,
  }
},
{ 
  persist: {
    key: 'map',
    storage: localStorage,
    debug: true,
    paths: ['center'],
  }
})
