<template>
  <div>
    <div class="options flex">
      <div class="pr-2">
        <MultiSelect v-model="zonesComputed" :options="territorios.state.filteredZones" placeholder="Seleccione zonas a mostrar" />
      </div>
      <ToggleButton v-model="showMza" @change="filter()" onIcon="pi pi-check" offIcon="pi pi-times"  onLabel="Manzanas" offLabel="Manzanas" />
      <ToggleButton v-model="showCenter" @change="filter()" onIcon="pi pi-check" offIcon="pi pi-times"  onLabel="Centro Territorio" offLabel="Centro Territorio" />
      <ToggleButton v-model="showLines" @change="filter()" onIcon="pi pi-check" offIcon="pi pi-times"  onLabel="Lineas" offLabel="Lineas" />
    </div>
  </div>
</template>

<script setup>
import ToggleButton from 'primevue/togglebutton';
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

const activeZones = ref([])

const zonesComputed = computed({
  get() {
    return activeZones.value
  },
  set(val) {
    activeZones.value = val
    filter()
  }
})
const showCenter = ref(false)
const showMza = ref(true)
const showLines = ref(false)


var activeGroup;
var activeMarkers;

const filter = () => {
  // console.log("filter", showMza.value )
  if (activeGroup) {
    // console.log("activeGroup", activeGroup)
    activeGroup.eachLayer(l => activeGroup.removeLayer(l))
  }
  if (activeMarkers) activeMarkers.remove()
  if (activeZones.value.length === 0) return;
  let list = territorios.list.filter(item => activeZones.value.indexOf(item.zona) >= 0 )
  let polilines = []
  let numbers = []
  for ( let i in list){
    let item = list[i]
    polilines.push(m.L.polyline([...item.limits, item.limits[0]], m.sectorOption))
    
    if (showCenter.value){

      let center = item.mzNumbers[0][0]
      let icon = L.divIcon({
        className: 'manzana-marker ',
        iconSize:null,
        html:'<div class="icon manzana-marker-center" style="font-size: 1em">'+item.zona+item.numero+'</div><div class="arrow" />'
      });
      numbers.push(m.L.marker(center, { icon }))
    }

    if (showMza.value){
      const colors = (item.color) ? `color: ${item.color.color}; background: ${item.color.backgroundColor}; border: ${item.color.backgroundColor}; ` : '';
      for ( let key in item.mzNumbers){
        if (parseInt(key) === 0) continue;
        // console.log("item.center", item.center)
        let icon = L.divIcon({
          className: 'manzana-marker ',
          iconSize:null,
          html: `<div class="icon manzana-marker-center" style="font-size: 1em; ${colors}">${item.zona}${item.numero}</div><div class="arrow" />`
        });
        numbers.push(m.L.marker(item.mzNumbers[key][0], { icon }))
      }
    }

    // numbers.push(m.L.marker(centerLetter, { icon: m.lIcons[item.zona.toUpperCase()] }))
  }
  
  if (showLines.value) {

    activeGroup = L.featureGroup(polilines).addTo(m.map);
  }
  
  activeMarkers = L.layerGroup(numbers).addTo(m.map);
}

defineExpose({
  filter
})
</script>

<style scoped>
.options {
  margin-top: 10px;
  padding: 10px 0 p;
}
</style>