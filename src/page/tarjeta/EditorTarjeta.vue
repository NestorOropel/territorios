<template>
  <div class="w-full">
    <div class="grid max-page w-full min-h-screen">
      <div class="col col-6 pb-0 pl-4">
        <div class="flex flex-column h-full">
          <div>
            
            <h1 class="text-left mb-0">
              Tarjeta de Territorio {{ terr.zona }}{{ terr.numero }}
            </h1>
          </div>
          <div>
            <h5 class="text-left  text-red-700">Instrucciones</h5>
            <div class="text-left">
              <div v-show="step == 0">
                <div class="mb-5 line-height-3">
                  <h3>1. Identificar Territorio</h3>
                  <p>
                    Escribe en Zona una letra (A - Z) y en Numero el numero del territorio
                    dentro de esa Zona.
                  </p>
                  <p>
                    <b>Numero</b> es lo que normalmente usas como numero de territorio. El sistema te permite agregar del numero 1 al 99.
                  </p>

                  <p>
                    <b>Zona</b> es una letra, debes usarla si tienes mas de 99 territorios o si quieres dividir todo el territorio de la congregación en varias partes. Los territorios entonces serian por ejemplo: N1, N2, S1, S2, etc.
                  </p>
                  <p>
                    Las zonas pueden estar asociadas a puntos cardinales (N, S, E, O) o grupo de la
                    congregación o lo que tu decidas.
                  </p>
                  <p>Si ya completaste los campos Zona y Numero presiona Continuar.</p>
                </div>
                <TarjetaTerritorio v-show="step == 0" />

                <div class="flex justify-content-end">
                  <Button label="Continuar" class="p-button-outlined" v-bind:disabled="!terr.numero || terr.numero < 1" @click="step = 1" />
                </div>
                <div class="msg text-red-500 mt-3 text-sm" v-show="!terr.numero || terr.numero < 1">
                  <b>Importante:</b> El boton continuar se habilitara cuando cumplas con lo minimo requerido en las instrucciones de una manera aceptable. <b>Presta atencion a las instrucciones</b>
                </div>
                
              </div>
              <div v-show="step == 1">
                <div class="mb-5 line-height-3">
                  <h3>
                    2. Dibujar limites del territorio {{ terr.zona }}{{ terr.numero }}
                  </h3>
                  <p>
                    Tienes que <b>hacer click sobre el mapa</b> en cada vertice del
                    territorio {{ terr.zona }}{{ terr.numero }}. Al segundo click veras
                    que empieza a dibujarse una linea, <b>continua</b> hasta que los
                    limites del territorio {{ terr.zona }}{{ terr.numero }} esten bien
                    claros.
                  </p>

                  <p>
                    Si te equivocas a quieres volver a marcar los limites solo preciona el
                    boton "Limpiar Mapa".
                  </p>
                  <p>Si ya concluiste de marcar los limites solo preciona continuar.</p>
                </div>

                <div class="flex justify-content-between">
                  <Button label="Atras" class="p-button-outlined" @click="step = 0" />
                  <Button
                    label="Limpiar Mapa"
                    class="p-button-outlined"
                    @click="clearLimits()"
                  />
                  <Button label="Continuar" class="p-button-outlined" v-bind:disabled="terr.limits.length < 3" @click="step = 2" />
                </div>
                <div class="msg text-red-500 mt-3 text-sm" v-show="terr.limits.length < 3">
                  <b>Importante:</b> El boton continuar se habilitara cuando cumplas con lo minimo requerido en las instrucciones de una manera aceptable. <b>Presta atencion a las instrucciones</b>
                </div>
              </div>
              <div v-show="step == 2">
                <div class="mb-5 line-height-3">
                  <h3>
                    3. Enumerar manzanas de territorio {{ terr.zona }}{{ terr.numero }}
                  </h3>
                  <p>
                    Tienes que <b>hacer click sobre el mapa</b> en cada manzana (o porcion
                    en caso de no contener manzanas completas) del territorio
                    {{ terr.zona }}{{ terr.numero }}. Veras que al hacer click van
                    apareciendo numeros.
                  </p>
                  <p>
                    Si te equivocas a quieres volver a enumerar solo preciona el boton
                    "Limpiar Mapa".
                  </p>
                  <p>Si ya concluiste de enumerar solo preciona continuar.</p>
                  <p class="text-xs">
                    Nota: Esto se utilizara para que te digan que manzanas del territorio
                    se predicaron, por lo tanto, no deberias enumerar espacios verdes o
                    lugares donde no hay personas a las que predicar.
                  </p>
                </div>

                <div class="flex justify-content-between">
                  <Button label="Atras" class="p-button-outlined" @click="step = 1" />
                  <Button
                    label="Limpiar Mapa"
                    class="p-button-outlined"
                    @click="clearMzNumbers()"
                  />
                  <Button label="Continuar" class="p-button-outlined" v-bind:disabled="terr.mzNumbers.length < 1" @click="step = 3" />
                </div>

                <div class="msg text-red-500 mt-3 text-sm" v-show="terr.mzNumbers.length < 1">
                  <b>Importante:</b> El boton continuar se habilitara cuando cumplas con lo minimo requerido en las instrucciones de una manera aceptable. <b>Presta atencion a las instrucciones</b>
                </div>
              </div>
              <div v-show="step == 3">
                <div class="mb-5 line-height-3">
                  <h3>4. Definir diseño de mapa para {{ terr.zona }}{{ terr.numero }}</h3>
                  <p>¡Ya casi terminamos!</p>
                  <div class="msg text-red-500 text-sm" >
                    <b>Recuerda leer atentamente las instrucciones.</b>
                  </div>
                  <h4>
                    Elige que <b>forma</b> se adapta mas al territorio {{ terr.zona }}{{ terr.numero }}.
                  </h4>
                  <div
                    class="flex justify-content-between align-items-center"
                    style="max-width: 300px"
                  >
                    <div @click="terr.$patch({ shape: 3 })">
                      <svg width="50" height="100">
                        <rect x="0" y="0" width="50" height="100" fill="white" stroke="black" />
                      </svg>
                    </div>
                    <div @click="terr.$patch({ shape: 1 })">
                      <svg width="100" height="50">
                        <rect x="0" y="0" width="100" height="50" fill="white" stroke="black" />
                      </svg>
                    </div>
                    <div @click="terr.$patch({ shape: 2 })">
                      <svg width="100" height="100">
                        <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" />
                      </svg>
                    </div>
                  </div>

                  <h4>Rota el mapa para que se aproveche el espacio </h4>
                  <div class="w-50">
                    <h5>Rotacion: {{ terr.angle }}</h5>
                    <Slider v-model="terr.angle" :min="-50" :max="50" />
                    <p class="text-xs">Mueve el punto para rotar</p>
                  </div>

                  <h4>Asigna el zoom al mapa </h4>
                  <div class="w-50">
                    <h5>Zoom: {{ terr.zoom }}</h5>
                    <Slider v-model="terr.zoom" :step=".25" :min="14" :max="19" />
                    <p class="text-xs">Mueve el punto para hacer zoom</p>
                  </div>

                  <h4>¡Importante! Mueve el mapa para que todo quede centrado.</h4>

                  <h4 class="text-green-700 font-light">¡Si ya terminaste todos los pasos presiona <b>Guardar</b>!</h4>
                 
                </div>

                <div class="flex justify-content-between">
                  <Button label="Atras" class="p-button-outlined" @click="step = 2" />

                  <Button label="Guardar" class="p-button-outlined" @click="step = 4" />
                </div>
              </div>
              <div class="" v-show="step == 4">
                <h2>4</h2>
                <Button
                  label="Guardar Territorio"
                  class="p-button-outlined"
                  @click="configureMap()"
                />
                <p>Guarda cambios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-6 pb-0">
        <MapaBase
          v-if="step != 3"
          class="map"
          :center="terr.center"
          @mapClick="onMapClick"
          @mapMoveend="onMapMoveend"
          @zoomstart="zoomstart"
          @zoomend="zoomend"
          @ready="ready"
        ></MapaBase>
        <MapaTerritorio
          v-if="step == 3"
          class="map"
          :center="terr.center"
          :shape="terr.shape"
          :rotate="terr.angle"
          :zoom="terr.zoom"
          :mzNumbers="terr.mzNumbers"
          listen="true"
          :limits="terr.limits"
          @ready="ready"
        ></MapaTerritorio>
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

const terrList = useTerritoriosStore();
const terr = useTerritorioStore();
const m = useMapStore();

const mzNumbers = useMzNumbers();

const angle = ref(0)

var polTerr;
const step = ref(0);
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
};
const onMapMoveend = (e) => {};

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
.max-page {
  min-height: 90vh;
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
