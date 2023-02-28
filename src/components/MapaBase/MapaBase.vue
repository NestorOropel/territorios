<template>
  <!-- {{ props.terrID }} -->
  <div id="mapContainer"></div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch, computed } from 'vue'
import { useMapStore } from '@/store/map'
import { useMzNumbers } from '@/store/map/mzNumber';
import { useTerrLimit } from "@/store/map/terrLimit";
const m = useMapStore()
const mzNumbers = useMzNumbers()
const terrLimit = useTerrLimit();
const props = defineProps({
  center: {
    type:Array,
    default: null
  },
  terrID: {
    type: String,
    default: null
  },
  color: {
    type: Object,
    default: null
  },
  saveCenter: {
    type: Boolean,
    default: true
  },
})
var numbers = []

const center = computed({
  get() {
    // console.log("props.center", props.center, m.center)
    return props.center || m.center
  },
  set(val) {
    m.$patch({center: val})
  }
})

const emit = defineEmits(['mapClick', 'mapMoveend', 'mapMoveend', 'zoomstart', 'zoomend', 'ready'])

onMounted(() =>{
  let service = m.L.map("mapContainer", {scrollWheelZoom: false}).setView(center.value, 17)
  m.setMap(service);
  m.setTileLayer()
  m.map.on("click", function (e) {
    emit("mapClick", e)
  });
  var keydown = false
  m.map.on("keydown", function (e) {
    if (keydown) return
    keydown = true
    m.map.scrollWheelZoom.enable();
  });
  m.map.on("keyup", function (e) {
    keydown = false
    m.map.scrollWheelZoom.disable();
  });
  m.map.on("moveend", function (e) {
    emit("mapMoveend", e)
    let data = m.map.getBounds().getCenter()
    // console.log(data)
    if (props.saveCenter)
    center.value = [data.lat, data.lng];
  });
  m.map.on("zoomstart", function (e) {
    console.log("zoomstart", e)

    emit("zoomstart", e)
    for ( let i in numbers) {
      m.map.removeLayer(numbers[i])
    }
  });
  m.map.on("zoomend", function (e) {
    emit("zoomend", e)
    setNumbers(mzNumbers.mzNumbers)
  });
  emit('ready')
})


watch(
  mzNumbers,
  (state) => {
  //  console.log("state watch", state)
   setNumbers(state.mzNumbers)
  },
  { deep: true }
)

watch(
  props.color,
  (state) => {
  //  console.log("state watch", state)
   setNumbers(mzNumbers.mzNumbers)
  },
  { deep: true }
)



const setNumbers = (data) => {
  // console.log("setNumbers",data)
  // console.log('props.color', props.color)
  const colors = (props.color) ? `color: ${props.color.color}; background: ${props.color.backgroundColor}; border: ${props.color.backgroundColor}; ` : '';
  for ( let i in numbers) {
    m.map.removeLayer(numbers[i])
  }
  for (let i in data) {
    if (!props.terrID && parseInt(i) === 0) continue;
    const nro = (parseInt(i) === 0) ? props.terrID : i;
    const classCenter = (parseInt(i) === 0) ? 'manzana-marker-center' : '';
    // console.log('addnumber', nro);
    let icon = L.divIcon({
      className: 'manzana-marker ',
      iconSize:null,
      html: `<div class="icon ${classCenter}" style="font-size: 1em; ${(parseInt(i) === 0) ? '' : colors}">${nro}</div><div class="arrow" />`
    });
    // console.log('addnumber', nro);
    // numbers.push(m.L.marker(center, { icon }))
    let mark = m.L.marker(data[i][0], { icon }).addTo(m.map);
    numbers.push(mark)
  }
}

</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>