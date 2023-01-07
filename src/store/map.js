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
    L: Lvue,
    setMap,
    getCenter,
    center,
  }
})
