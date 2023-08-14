import { ref } from 'vue'
import { defineStore } from 'pinia'

import * as Lvue from "leaflet";
import * as fIcons from './mix/iconsNumbers'
import * as LIcons from './mix/iconsLetters'

import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
// import L from "@/libraries/leaflet.snogylop.js";

export const useMapStore = defineStore('mapa', () => {
  const map = ref(null)
  const center = ref([-31.5653073, -68.5638051])
  
  L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

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
  const tile = ref('OpenStreetMap');
  const layers = ref([
    'OpenStreetMap',
    'Stadia Alidade Smooth',
    'Stadia Alidade Smooth Dark',
    'OSM Hot',
  ]);

  function setMap(data) {
    map.value = data
  }

  function getCenter() {
    let center = map.value.getBounds().getCenter()
    return [center.lat, center.lng];
  }

  //http://ivansanchez.gitlab.io/Leaflet.GridLayer.GoogleMutant/demo.html

  function setTileLayer(){
    console.log("setTileLayer", tile.value)
    if (tile.value == 'Stadia Alidade Smooth'){
      Lvue.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(map.value);
    } else if (tile.value == 'Stadia Alidade Smooth Dark'){
      Lvue.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(map.value);
    } else if (tile.value == 'OSM Hot') {
      Lvue.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      }).addTo(map.value);
    } else {
      console.log("aqui")
      Lvue.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.value);
    }
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
    layers,
    tile,
    setTileLayer,
  }
},
{ 
  persist: {
    key: 'map',
    storage: localStorage,
    debug: true,
    paths: ['center', 'tile'],
  }
})
