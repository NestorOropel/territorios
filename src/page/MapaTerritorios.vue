<template>
  <div class="w-full">
    <div class="p-3">
      <div class="header">
        <h1>Mapa de Territorio</h1>
        <div class="options">
          <MapControl ref="control" @setSize="setSize"   />
        </div>
      </div>
      <div class="grid grid-nogutter max-page w-full">    
        <div class="col">
          <MapaBase
            v-if="step != 3"
            class="map"
            :style="size"
            :center="terr.center"
            @mapClick="onMapClick"
            @mapMoveend="onMapMoveend"
            @zoomstart="zoomstart"
            @zoomend="zoomend"
            :saveCenter="false"
            @ready="ready"
          ></MapaBase>
        </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTerritoriosStore } from "@/store/territorios";
import { useTerritorioStore } from "@/store/territorio";
import { useMapStore } from "@/store/map";
import { useMzNumbers } from "@/store/map/mzNumber";

const territorios = useTerritoriosStore();
const terr = useTerritorioStore();
const m = useMapStore();
const mzNumbers = useMzNumbers();
const angle = ref(0)
const step = ref(0);
const control = ref('');
const size = ref('');

const setSize = (data) => {
  step.value = 3
  size.value = data.value
  setTimeout(()=> { step.value = 0 }, 200)
}

var polTerr;
const clearLimits = () => {
  // terr.limits.value = []
  terr.$patch({ limits: [] });
  if (polTerr) m.map.removeLayer(polTerr);
  polTerr = [];
};

const clearMzNumbers = () => {
  terr.$patch({ mzNumbers: [] });
  mzNumbers.$patch({ mzNumbers: [] });
};

const onMapClick = (e) => {
  if (step.value == 1) configureLimit(e);
  if (step.value == 2) configureMzNumber(e);
};

const guardar = () => {
  // console.log("territorios", territorios)
  territorios.update(terr.getData())
  
  terr.$reset()
  step.value = 0;
}
const configureLimit = (data) => {
  if (polTerr) m.map.removeLayer(polTerr);
  if (data) terr.addLimit([data.latlng.lat, data.latlng.lng]);
  if (terr.limits.length > 0) polTerr = m.L.polyline([...terr.limits, terr.limits[0]], m.sectorOption).addTo(m.map);
};

const configureMzNumber = (data) => {
  if (data) terr.addMzNumber([data.latlng, terr.mzNumbers.length]);
  console.log(terr.mzNumbers);
  mzNumbers.setMzNumbers(terr.mzNumbers);
};

const zoomstart = () => {
  if (polTerr) m.map.removeLayer(polTerr);
};
const zoomend = () => {
  configureLimit();
  control.value.filter()
};
const onMapMoveend = (e) => {
  terr.$patch({ center: m.getCenter() });
};

const ready = () => {
  configureLimit();
};

window.addEventListener('storage',function(e){
   if(e.storageArea===sessionStorage && e.key == 'center'){
    //  console.log('change', e.newValue);
     terr.$patch({ center: JSON.parse(e.newValue) });
   } 
   // else, event is caused by an update to localStorage, ignore it
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: left;
  padding-bottom: 10px;
}
h1, h2 {
  font-weight: lighter;
  margin: 0;
  padding: 0;
}
.max-page {
  min-height: 85vh;
  height: calc(100vh - 8em);
}
/* p {
  color: grey;
  font-size: 0.8em;
} */
.stepActive {
  /* border-top: 1px solid red; */
  background-color: aliceblue;
}
</style>
