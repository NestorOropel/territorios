<template>
  <div id="mapContainer"></div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch  } from 'vue'
import { useMapStore } from '@/store/map'
import { useMzNumbers } from '@/store/map/mzNumber';


const m = useMapStore()
const mzNumbers = useMzNumbers()
const props = defineProps({
  center: Array
})

const emit = defineEmits(['mapClick', 'mapMoveend', 'mapMoveend', 'zoomstart', 'zoomend', 'ready'])

onMounted(() =>{
  let service = m.L.map("mapContainer").setView(props.center, 17)
  m.setMap(service);
  m.L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(m.map);
  m.map.on("click", function (e) {
    emit("mapClick", e)
  });
  m.map.on("moveend", function (e) {
    
    emit("mapMoveend", e)
  });
  m.map.on("zoomstart", function (e) {
    emit("zoomstart", e)
  });
  m.map.on("zoomend", function (e) {
    emit("zoomend", e)
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


var numbers = []
const setNumbers = (data) => {
  // console.log("setNumbers",data)
  for ( let i in numbers) {
    m.map.removeLayer(numbers[i])
  }
  for (let i in data) {
    let mark = m.L.marker(data[i][0], { icon: m.nIcons[data[i][1]]}).addTo(m.map);
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