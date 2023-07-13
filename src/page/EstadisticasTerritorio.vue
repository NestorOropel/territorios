<script setup>
import Chart from "primevue/chart";
import Calendar from "primevue/calendar";
// import InputMask from "primevue/inputmask";
import { ref } from "vue";
import { useTerritoriosStore } from "@/store/territorios";
import { useTrabajoStore } from "@/store/useTrabajoStore";

const territorios = useTerritoriosStore();
const trabajo = useTrabajoStore();
// const chartData = ref();
const charptOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
});

const pages = ref([]);
const start = ref(null);
const generar = () => {
  // console.log("estadisticas>>", trabajo.data);
  let page = {};
  if (!start.value) {
    return;
  }
  const date = start.value;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  añoServicio.value = month > 8 ? year + 1 : year;
  // console.log("añoServicio>>", añoServicio.value);
  let startTimestamp = date.getTime();
  let maxRegistro = 0;
  //history.inicio >= start.value;
  for (let i in trabajo.data) {
    const registro = trabajo.data[i].history.filter((item) => {
      // console.log("item>>", startTimestamp, item);
      return item.inicio >= startTimestamp;
    });
    trabajo.data[i].registro = registro;
    if (registro.length > maxRegistro) {
      maxRegistro = registro.length;
    }
  }

  let totalPages = maxRegistro / 4;
  // redondear hacia arriba totalPages
  totalPages = Math.ceil(totalPages);
  // console.log("totalPages>>", totalPages, maxRegistro);
  for (let i = 0; i < totalPages; i++) {
    page[i] = [];
  }
  if (totalPages == 0) {
    return;
  }
  // 20 per page
  for (let i in trabajo.data) {
    // console.log("estadisticas>>", trabajo.data[i]);
    if (page[0].length == 20) {
      for (let j = 0; j < totalPages; j++) {
        pages.value.push(page[j]);
        page[j] = [];
      }
    }

    trabajo.data[i].name = i;
    for (let j = 0; j < totalPages; j++) {
      let starIndex = j * 4;
      const informe = trabajo.data[i].registro.slice(starIndex, starIndex + 4);
      if (informe.length < 4) {
        const addToInforme = 4 - informe.length;
        // console.log("informe>>", i, informe, informe.length, addToInforme);
        for (let k = 0; k < addToInforme ; k++) {
          // console.log("informe>>", i, k, informe.length);
          informe.push({});
        }
      }
      page[j].push({ ...trabajo.data[i], informe });
    }
  }
  for (let j = 0; j < totalPages; j++) {
    if (page[j].length == 0) {
      break;
    }
    pages.value.push(page[j]);
    page[j] = [];
  }
};

// año de servicio comienza en septiembre
const añoServicio = ref(null);
</script>
<template>
  <div class="grid mx-auto">
    <div class="col-12 noprint">
      <h1 class="text-center">Informes de territorio</h1>
      <div>
        Seleccione fecha de inicio:
        <Calendar v-model="start" dateFormat="dd/mm/yy" />
        <Button @click="generar" label="Generar" />
      </div>
    </div>

    <!-- <div v-for="(item, k) in trabajo.state.work" :key="k" class="col text-center">
      <Chart type="pie" :data="prepareChart(item)" :options="charptOptions" class="md:w-20rem mx-auto" />
      <div class="">
        <h2>{{ Number.parseFloat((100 / territorios.state.totalManzanas) * item.count).toFixed(2) }}%</h2>
        <h5>Iniciado: {{ trabajo.getDate(item.min) }}</h5>
        <h5 v-if="item.count == territorios.state.totalManzanas">Finalizado: {{ trabajo.getDate(item.max) }}</h5>
      </div>
    </div> -->

    <div class="page" v-for="page in pages">
      <div>
        <h1>REGISTRO DE ASIGNACIÓN DE TERRITORIO</h1>
      </div>
      <div class="text-left">
        <h3>Año de Servicio: <span class="year">{{ añoServicio }}</span></h3>
      </div>
      <div>
        <div class="table">
          <table>
            <tr>
              <th class="border-right-1" style="width: 12mm">
                Núm<br />de terr.
              </th>
              <th class="border-right-3" style="width: 22mm">
                Última fecha<br />
                en que se<br />
                completó*
              </th>
              <th class="border-right-2">
                <div class="grid grid-nogutter">
                  <div class="col-12 ptop">Asignado a</div>
                  <div class="col-6 pleft">Fecha en que<br />se asignó</div>
                  <div class="col-6 right">Fecha en que<br />se completó</div>
                </div>
              </th>
              <th class="border-right-2">
                <div class="grid grid-nogutter">
                  <div class="col-12 ptop">Asignado a</div>
                  <div class="col-6 pleft">Fecha en que<br />se asignó</div>
                  <div class="col-6 right">Fecha en que<br />se completó</div>
                </div>
              </th>
              <th class="border-right-2">
                <div class="grid grid-nogutter">
                  <div class="col-12 ptop">Asignado a</div>
                  <div class="col-6 pleft">Fecha en que<br />se asignó</div>
                  <div class="col-6 right">Fecha en que<br />se completó</div>
                </div>
              </th>
              <th class="border-right-2">
                <div class="grid grid-nogutter">
                  <div class="col-12 ptop">Asignado a</div>
                  <div class="col-6 pleft">Fecha en que<br />se asignó</div>
                  <div class="col-6 right">Fecha en que<br />se completó</div>
                </div>
              </th>
            </tr>
            <tr v-for="(item, key) in page" class="row">
              <td class="border-right-1">
                {{ item.name }}
              </td>
              <td class="border-right-3"></td>
              <td class="border-right-2" v-for="informe in item.informe">
                <div class="grid grid-nogutter">
                  <div class="col-12 ptop">
                    <div style="margin-top: 4px;">
                      {{ informe.conductor }}
                    </div>
                  </div>
                  <div class="col-6 pleft">
                    <span v-if="informe.inicio">
                      <div style="margin-top: 4px;">
                        {{trabajo.getDate(informe.inicio)}}
                      </div>
                  </span>
                  </div>
                  <div class="col-6">
                    <span v-if="informe.fin">
                      <div style="margin-top: 4px;">
                        {{trabajo.getDate(informe.fin)}}
                      </div>
                  </span>
                  </div>
                </div>
              </td>
              
            </tr>
          </table>
        </div>
      </div>
      <div class="text-left">
        <p class="msg">
          *Cuando comience una nueva página, anote en esta columna la última
          fecha en que los territorios se completaron.
        </p>

        <p class="foot">S-13-S 1/22</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  page-break-before: always;
  width: 220mm;
  height: 297mm;
  /* border: 1px solid black; */
  margin: 0 auto;
  /* padding: 10mm; */
  color: black;
}
.page,
.page * {
  font-family: Arial, Helvetica, sans-serif !important;
}

h1 {
  margin-top: 13mm;
  font-size: 23px;
  margin-left: -8mm;
}

h3 {
  font-size: 15.5px;
  margin-top: 5mm;
}

.table {
  font-size: 12px;
  border: 3px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  font-weight: lighter;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: rgb(217 217 217);
  font-weight: 400;
  padding: 0px 0px;
  font-size: 1em;
}
.pleft,
.bl {
  border-right: 1px solid black;
}
.ptop {
  border-bottom: 1px solid black;
}
th .ptop {
  padding: 2px 0;
}

th .pleft {
  /* height: 19mm; */
  padding-bottom: 2px;
}
th,
td {
  border-bottom: 2px solid black;
}
td {
  padding: 0px 0px;
}
td .pleft,
td .ptop {
  height: 6mm;
}
.msg {
  font-size: 14.3px;
  padding-top: 1mm;
}

.foot {
  margin-top: 2mm;
}

.year {
  border-bottom: 1.5px solid black;
  width: 23mm;
  display: inline-block;
  text-align: center;
  padding-bottom: 1mm;
  margin-left: 1mm;
}
</style>
