<template>
  <div>
    <div class="options">
      <MultiSelect v-model="zonesComputed" :options="territorios.state.filteredZones"  class="col-4" placeholder="Seleccione zonas a mostrar" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits, computed } from 'vue'

import { useTerritoriosStore } from "@/store/territorios";
import { useTerritorioStore } from "@/store/territorio";
import { useMapStore } from "@/store/map";
import { useMzNumbers } from "@/store/map/mzNumber";
import { useTerrLimit } from "@/store/map/terrLimit";

const territorios = useTerritoriosStore();
const terr = useTerritorioStore();
const m = useMapStore();
const mzNumbers = useMzNumbers();
const terrLimit = useTerrLimit();

const activeZones = ref()

const zonesComputed = computed({
  get() {
    return activeZones.value
  },
  set(val) {
    activeZones.value = val
    filter()
  }
})

var activeGroup;
var activeMarkers;

const filter = () => {
  
  let list = territorios.list.filter(item => activeZones.value.indexOf(item.zona) >= 0 )
  let polilines = []
  let numbers = []
  for ( let i in list){
    let item = list[i]
    polilines.push(m.L.polyline([...item.limits, item.limits[0]], m.sectorOption))
    // let center = 
    let centerLetter = [item.center[0] + 0.000000007, item.center[1] - 0.0003405139329020585]
    let center = [centerLetter[0] - 0.00020 , centerLetter[1] - 0.000002]
    // console.log("item.center", item.center)
    let icon = L.divIcon({
      className: 'map-marker ',
      iconSize:null,
      html:'<div class="icon" style="font-size: 1em">'+item.zona+item.numero+'</div><div class="arrow" />'
    });

    numbers.push(m.L.marker(center, { icon }))
    // numbers.push(m.L.marker(centerLetter, { icon: m.lIcons[item.zona.toUpperCase()] }))
  }
  if (activeGroup) {
    // console.log("activeGroup", activeGroup)
    activeGroup.eachLayer(l => activeGroup.removeLayer(l))
  }
  activeGroup = L.featureGroup(polilines).addTo(m.map);
  
  if (activeMarkers) activeMarkers.remove()
  activeMarkers = L.layerGroup(numbers).addTo(m.map);
}
</script>

<style scoped>
.options {
  margin-top: 10px;
  padding: 10px 0 p;
}
</style>