<template>
  <div class="w-full">
    <div class="grid max-page w-full min-h-screen">
      <div class="col col-6 pb-0 pl-4">
        <div class="flex flex-column h-full">
          <div>
            <TarjetaTerritorio v-show="step == 0" />
            <h1 v-show="step > 0" class="text-left mb-0">
              Territorio {{ terr.zona }}{{ terr.numero }}
            </h1>
          </div>
          <div>
            <h5 class="text-left font-light">Instrucciones</h5>
            <div class="text-left">
              <div v-show="step == 0">
                <div class="mb-5 line-height-3">
                  <h3>1. Identificar Territorio</h3>
                  <p>
                    Escribe en Zona una letra (A - Z) y en Numero el numero del territorio
                    dentro de esa Zona.
                  </p>

                  <p>
                    Las zonas te sirven para dividir territorios grandes en porciones mas
                    pequeñas; pueden estar asociadas a puntos cardinales o grupo de la
                    congregación.
                  </p>
                  <p>Si ya completaste los campos Zona y Numero presiona Continuar.</p>
                </div>

                <div class="flex justify-content-end">
                  <Button label="Continuar" class="p-button-outlined" @click="step = 1" />
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
                  <Button label="Continuar" class="p-button-outlined" @click="step = 2" />
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
                  <Button label="Continuar" class="p-button-outlined" @click="step = 3" />
                </div>
              </div>
              <div v-show="step == 3">
                <div class="mb-5 line-height-3">
                  <h3>4. Definir diseño de mapa para {{ terr.zona }}{{ terr.numero }}</h3>
                  <p>¡Ya casi terminamos!</p>
                  <p>
                    A. Elige que tipo de diseño se adapta mas al tamaño del territorio
                    {{ terr.zona }}{{ terr.numero }}.
                  </p>
                  <div
                    class="flex justify-content-between align-items-center"
                    style="max-width: 300px"
                  >
                    <div>
                      <svg width="50" height="100">
                        <rect
                          x="0"
                          y="0"
                          width="50"
                          height="100"
                          fill="white"
                          stroke="black"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg width="100" height="50">
                        <rect
                          x="0"
                          y="0"
                          width="100"
                          height="50"
                          fill="white"
                          stroke="black"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg width="100" height="100">
                        <rect
                          x="0"
                          y="0"
                          width="100"
                          height="100"
                          fill="white"
                          stroke="black"
                        />
                      </svg>
                    </div>
                  </div>
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
                  <Button label="Atras" class="p-button-outlined" @click="step = 2" />
                  <Button
                    label="Limpiar Mapa"
                    class="p-button-outlined"
                    @click="clearMzNumbers()"
                  />
                  <Button label="Continuar" class="p-button-outlined" @click="step = 4" />
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
          v-if="step != 2"
          class="map"
          :center="center"
          @mapClick="onMapClick"
          @mapMoveend="onMapMoveend"
          @zoomstart="zoomstart"
          @zoomend="zoomend"
          @ready="ready"
        ></MapaBase>
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

const center = ref([-31.5653073, -68.5638051]);
const setCenter = () => {
  terr.center = m.getCenter();
};

var polTerr;
const step = ref(3);
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
  polTerr = m.L.polyline([...terr.limits, terr.limits[0]], m.sectorOption).addTo(m.map);
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

terrList.setActive(1);
const configureMap = () => {
  let data = [
    {
      type: "Feature",
      properties: { party: "Republican" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-104.05, 48.99],
            [-97.22, 48.98],
            [-96.58, 45.94],
            [-104.03, 45.94],
            [-104.05, 48.99],
          ],
        ],
      },
    },
  ];
  m.L.geoJson(data, {
    invert: true,
  }).addTo(m.map);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.max-page {
  min-height: 90vh;
}
. p {
  color: grey;
  font-size: 0.8em;
}
.stepActive {
  /* border-top: 1px solid red; */
  background-color: aliceblue;
}
</style>
