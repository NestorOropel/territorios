<script setup>
import { onMounted, ref, computed } from "vue";
import { useTerritorioStore } from "@/store/territorio";
import { useTrabajoStore } from "@/store/useTrabajoStore";
import MapByName from "@/components/MapByName/MapByName.vue";
import MenuConductores from "@/components/MenuConductores.vue";
import ToggleButton from 'primevue/togglebutton';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

const terr = useTerritorioStore();
const trabajo = useTrabajoStore();
const history = ref({});

const mzNumbers = () => {
  let obj = {}
  for (let i in terr.mzNumbers) {
    if (i == 0) continue
    // console.log("data.mzNumbers[i]", data.mzNumbers[i])
    obj[i] = false
  }
  return obj
}
const worked = ref(mzNumbers());
onMounted(() => {
  // const t = `${terr.zona}${terr.numero}`
  // history.value = trabajo.data[`${terr.zona}${terr.numero}`.toUpperCase()];
})

const register = async () => {
  const manzanas = []
  for (let i in worked.value) {
    if (worked.value[i]) {
      manzanas.push(i)
      worked.value[i] = false
    }
  };
  let params = {
    territorio: `${terr.zona}${terr.numero}`,
    manzanas: manzanas,
    date: date.value.getTime(),
    conductor: conductor.value,
  }
  await trabajo.setRegistro(params, editIndex.value)
  // history.value = trabajo.getTerritorioStats(`${terr.zona}${terr.numero}`);
  showNew.value = false;
}

const date = ref(new Date());
const conductor = ref()
const showNew = ref(false);
const editIndex = ref(null);
const newRegister = () => {
  showNew.value = true;
  editIndex.value = null;
  date.value = new Date();
  conductor.value = null;
  worked.value = mzNumbers();
}

const edit = (indexHistory, indexDetail) => {
  console.log("index", indexHistory, doc.value.history)
  const item = doc.value.history[indexHistory]
  const detail = item.detalle[indexDetail]
  console.log("edit", item)
  editIndex.value = {history: indexHistory,  detail: indexDetail};
  showNew.value = true;
  date.value = new Date(item.inicio);
  conductor.value = item.conductor;

  worked.value = mzNumbers();
  for (let i in worked.value) {
    if (detail.manzanas.includes(i)) {
      worked.value[i] = true
    }
  };



}

const selectAllOption = ref(0)
const selectAll = () => {
  const nv = selectAllOption.value + 1
  const option = nv <= 3 ? nv : 0;
  selectAllOption.value = option;
  const total = terr.mzNumbers.length + 1;
  const p50 = total / 2
  if (option === 1) {
    for (let i in terr.mzNumbers) {
      if (i == 0) continue
      worked.value[i] = true
    }
  } else if (option === 2) {
    for (let i in terr.mzNumbers) {
      if (i == 0) continue
      if (i< p50){
        worked.value[i] = true
        continue
      }
      worked.value[i] = false
    }
  } else if (option === 3) {
    for (let i in terr.mzNumbers) {
      if (i == 0) continue
      if (i< p50){
        worked.value[i] = false
        continue
      }
      worked.value[i] = true
    }
  } else {
    for (let i in terr.mzNumbers) {
      if (i == 0) continue
      worked.value[i] = false
    }
  }
}

const doc = computed({
  get: () => {
    const datos = JSON.parse(JSON.stringify(trabajo.data[`${terr.zona}${terr.numero}`.toUpperCase()]))
    // console.log("datos", datos)
    if (typeof datos.manzanasPendientes === "object" && !Array.isArray(datos.manzanasPendientes)) datos.manzanasPendientes = Object.values(datos.manzanasPendientes)
    // order history desc by inicio
    if (datos.history) {
      datos.history.sort((a, b) => {
        if (a.inicio > b.inicio) return -1
        if (a.inicio < b.inicio) return 1
        return 0
      })
    }
    return datos || {}
  }
})

const ultimoTrabajo = computed({
  get: () => {
    if (!doc.value.ultimoFin) return null
    return new Date(doc.value.ultimoFin)
  },
  set: (val) => {
    // console.log("val", val)
    
    trabajo.data[`${terr.zona}${terr.numero}`.toUpperCase()].ultimoFin = val.getTime()
  }
})
</script>
<template>
  <div class="grid w-full pt-2 text-left">
    <div class="col-4 pl-4">
      <div class="flex">
        <h1 class="m-0">{{ terr.zona }}{{ terr.numero }}</h1>
      </div>
      <div class="pt-2">{{terr.referencia}}</div>
      <div class="pt-2">{{terr.notas}}</div>
      <div class="pt-2">
        <div @click="trabajo.$patch({data: {}})">
          <h3>Detalle</h3>
          <p  class="pb-2">Ultima vez iniciado: <span>{{ doc?.ultimoInicio ? trabajo.getDate(doc?.ultimoInicio) : "-"}}</span></p>
          <p>Ultima vez completado: <span>{{ doc?.ultimoFin ? trabajo.getDate(doc?.ultimoFin) : "-"}}</span></p>
          <!-- <Calendar v-model="ultimoTrabajo" placeholder="Ultima vez trabajado" class="my-3" showIcon dateFormat="dd/mm/yy" /> -->
          <p class="text-sm">Manzanas Pendientes: <span>{{ doc.manzanasPendientes.join(", ") }}</span></p>
          <p class="text-xs mt-2">Veces completado: <span>{{ doc.vecesCompletado }}</span></p>
        </div>
      </div>
      <div v-if="showNew">
        <h3>Nuevo Informe</h3>
        <div class="pb-3">
          <Calendar v-model="date" showIcon dateFormat="dd/mm/yy" />
        </div>
        <div class="pb-3">
          <MenuConductores :dropdown="true" v-model="conductor" />
        </div>
        <div class="pb-2">
          Seleccione las manzanas que han sido trabajadas
        </div>
        <div class="grid grid-nogutter">
          <div v-for="(check, k) in worked" :key="k" class="mr-2 mb-2">
            <ToggleButton v-model="worked[k]" :onLabel="k" :offLabel="k" />
          </div>
          <div class="mr-2 mb-2">
            <Button label="Todos" @click="selectAll" />
          </div>
        </div>
        <div class="pt-3">
          <Button label="Registrar" class="p-button-success" @click="register" />
          <Button label="Cancelar" class="p-button-secondary ml-2"  @click="showNew = false" />
        </div>

        <div>
          <h4 class="mt-6 mb-1">Parametros</h4>
          <MenuConductores />
        </div>
      </div>
      <div v-if="!showNew">
        <div class="flex justify-content-between mt-2">
          <h3 class="mt-1">Historial</h3>
          <div>
            <Button icon="pi pi-plus" size="small" text  @click="newRegister()" />
          </div>
        </div>
        <!-- {{ history }} -->

        <!-- {{trabajo.data[`${terr.zona}${terr.numero}`.toUpperCase()]}} -->
        <div class="table">
          <div v-for="(item, k) in doc.history" :key="k" class="" >
            <div class="col-fixed text-base pr-3 m-0 pl-0">
              <h5 class="m-0">Inicio</h5>
              <div> {{trabajo.getDate(item.inicio)}}</div>


              <div v-if="item.fin">

                <h5 class="m-0 mt-2">Fin</h5>
                <div> {{trabajo.getDate(item.fin)}}</div>
              </div>

              <h5 class="m-0 mt-2">Conductor</h5>
              <div> {{item.conductor}}</div>
              
            </div>
            <div class="col px-3">
              <!-- {{item}} -->
              <div v-for="(detail, index) in item.detalle" :key="index" class="w-full mb-2">
                <div class="text-xs">{{ trabajo.getDate(detail.fecha) }} - {{ detail.conductor }}</div>
                <div class="py-2">{{ detail.manzanas.join(", ") }}</div>
                <div>

                  <Button icon="pi pi-pencil" size="small" text  @click="edit(k, index)" />
                  <Button icon="pi pi-trash" size="small" text  @click="trabajo.removeDetail(`${terr.zona}${terr.numero}`, k, index)" />
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <MapByName :zona="terr.zona" :numero="terr.numero" />
    </div>
  </div>
</template>
<style>
.table {
  border-top: 1px solid #ccc;
}

.table > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
}

.table > div > div:first-child {
  border-right: 1px solid #ccc;
}
</style>