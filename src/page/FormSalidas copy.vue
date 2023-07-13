<script setup>
import Chips from 'primevue/chips';
import Calendar from 'primevue/calendar';
import Column from "primevue/column";
import Dropdown from 'primevue/dropdown';
import Listbox from 'primevue/listbox';
import Divider from 'primevue/divider';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import MapByName from '@/components/MapByName/MapByName.vue';
import TerritorioSelector from '@/components/TerritorioSelector.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useSalidaStore } from '@/store/useSalidaStore';
import { useProximaSalida } from '@/composables/useProximaSalida';
import { useTerritoriosStore } from "@/store/territorios";
import { useUrl } from '@/composables/useUrl';

import { ref, onMounted, computed } from 'vue'

const territorios = useTerritoriosStore();
const { getItemUrl } = useUrl();
const salida = useSalidaStore();
const value = ref(null);
const form = ref({});
const showForm = ref(true);

const { getProximaSalida } = useProximaSalida()

const getDayName = (date) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  if (!date.getDay) date = new Date(date)
  return days[date.getDay()];
}

const getLocalDate = (date) => {
  if (!date) return ''
  if (!date.toLocaleDateString) date = new Date(date)
  return date.toLocaleDateString();
}

const notas = ref('');

const recomendacionTerr = ref(null);

const getRecomedaciones = async () => {
  const data = await getProximaSalida();
  recomendacionTerr.value = data;
}

const save = () => {
  // console.log('save', Date.now());
  if (!form.value.puntoEncuentro && !form.value.puntoEncuentro.latlng) return
  form.value.id = Date.now();
  let newForm = JSON.parse(JSON.stringify(form.value));
  newForm.date = form.value.date.getTime();
  salida.addSalida(newForm);
  form.value = {};
}

const cancel = () => {
  form.value = {};
  showForm.value = false;
}

const onRowReorder = (event) => {
  salida.list.data = event.value;
};

const deleteItem = (data) => {
  salida.list.data = salida.list.data.filter((item) => item.id !== data.id);
};
const print = () => {
  window.print();
}

const filters = ref({})
const list = computed(() => {
  return [...(salida.list.data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
})

onMounted(() => {
  // last monday
  let d = new Date();
  let day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  let filterStart = new Date(d.setDate(diff));
  filters.value.date = { 
    operator: FilterOperator.AND, 
    constraints: [{ value: filterStart, matchMode: FilterMatchMode.DATE_AFTER }] 
  }
})

const puntosEncuentro = computed(() => {
  // console.log('puntosEncuentro', form.value.territorios);
  let otros = [];
  for (let i in form.value.territorios) {
    let name = form.value.territorios[i];
    let info = territorios.getTerritorioById(name)
    if (info.puntoEncuentro) {
      for (let j in info.puntoEncuentro) {
        let punto = info.puntoEncuentro[j];
        if (!punto.latlng) continue;
        let index = otros.findIndex((o) => o.latlng.lat === punto.latlng.lat && o.latlng.lng === punto.latlng.lng);
        if (index === -1) {
          otros.push(punto);
        }
      }
    }
  }
  // console.log('otros', otros, territorios.puntoEncuentro);
  return [...territorios.puntoEncuentro, ...otros];
})


</script>
<template>
  <div class="grid p-4 text-left align-content-start w-full">
    <div class="col-12 flex justify-content-between">
      <h2 class="m-0 noprint">Salidas</h2>
      <!-- {{ filters }} -->
      <div class="noprint">
        <Button icon="pi pi-print" class="mr-2" @click="print" />
        <Button type="button" icon="pi pi-plus" label="Agregar"  @click="showForm =  true" />
      </div>
    </div>
    <div class="col-12">
      <!-- {{ salida.list.data }} -->
      <div class="text-white py-3 px-3" style="background: #4a6da7;">
        Salidas de Predicación Sur Rawson
      </div>
      <!-- rgb(83 120 181) -->
      <DataTable v-model:filters="filters" :value="list" :globalFilterFields="['date']" filterDisplay="menu" :paginator="list.length > 30" :rows="30" :rowsPerPageOptions="[5, 10, 20, 50]"  class="p-datatable-customers w-full print-salida" @rowReorder="onRowReorder" showGridlines 
        dataKey="id"   responsiveLayout="scroll"
        >
        <!-- <template #header>
          <div class="flex justify-content-between noprint">
            <div class="flex">
              <Calendar v-model="filterStart" class="w-full" :maxDate="filterEnd" dateFormat="dd/mm/yy"/>
              <div class="px-3 pb-1 mt-2">a</div>
              <Calendar v-model="filterEnd" class="w-full" :minDate="filterStart"  dateFormat="dd/mm/yy"/>
            </div>
          </div>
        </template> -->
        <template #empty>
          Ningun registro encontrado
        </template>
        <Column rowReorder headerStyle="width: 3rem" headerClass="noprint" bodyClass="noprint" :reorderableColumn="false" />
        <Column field="date" header="Dia" filterField="date" dataType="date" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">
            <div class="flex flex-column">
              
               <div class="font-bold" style="color: #4a6da7;" >{{ getDayName(data.date) }}</div>
              <div style="font-size: 0.7rem;">{{ getLocalDate(data.date) }}</div>
            </div>
          </template>
          <template #filter="{ filterModel }">
            <!-- {{ filterModel.value }} -->
            <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />
          </template>
        </Column>
        <Column field="hour" header="Hora" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.hour }}</template>
        </Column>
        <Column field="puntoEncuentro" header="Punto de Encuentro"  :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">
            <div class="flex flex-column">

              <a :href="'https://www.google.es/maps?q='+data.puntoEncuentro.latlng.lat+','+data.puntoEncuentro.latlng.lng" target="_blank">{{ data.puntoEncuentro.name }}</a>
              <div class="pt-1" style="font-size: 0.75rem;" v-if="data.notas">{{ data.notas }}</div>
            </div>
            <!-- {{ data.puntoEncuentro }} -->
          </template>
        </Column>
        <Column field="territorios" header="Territorios" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">
            <a v-for="(item, k) in data.territorios" :key="k" class="ml-2 terr" :href="getItemUrl(item.item, item.manzanas)" target="_blank">{{ item.territorio }} </a>
            <!-- <i class="pi pi-arrow-circle-right"></i> -->
          </template>
        </Column>
        <Column field="conductor" header="Conductor" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.conductor }}</template>
        </Column>
        
        <Column :styles="{ 'min-width': '12rem' }" headerClass="noprint" bodyClass="noprint">
          <template #body="{ data }">
            <!-- <Button type="button" icon="pi pi-pencil" class="p-button-rounded p-button-success p-button-outlined noprint" @click="salida.edit(data)" /> -->
            <Button type="button" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-outlined" @click="deleteItem(data)" />
            <!-- {{ data }} -->
          </template>
        </Column>

      </DataTable>
      <div class="w-full py-2 onlyprint" v-if="notas != ''">{{ notas }}</div>
      <div class="w-full mt-4 onlyprint text-xs">
        En la versión PDF (no en imágenes), toque sobre el punto de encuentro para abrir el GPS y sobre el número de territorio para ver el mapa de territorio. 
      </div>
      <div class="noprint text-sm mt-3" v-show="!showForm">
        <label>Mensaje debajo de las salidas:</label>
        <Textarea v-model="notas" autoResize  rows="1" class="w-full mt-1" />
      </div>
    </div>
    <div class="col-12 noprint" v-show="showForm">
      <h4 class="m-0 pt-6">Creador de Salidas</h4>
    </div>


    <div class="col-12 grid noprint" v-show="showForm">

      

      <div class="col-2">
        <div class="pb-2">
          Dia: <span v-if="form.date">{{ getDayName(form.date) }}</span>
        </div>
        <Calendar v-model="form.date" class="w-full"  dateFormat="dd/mm/yy"/>
      </div>
      <div class="col-2">
        <div class="pb-2">
          Hora:
        </div>
        <Dropdown v-model="form.hour" :options="salida.horarios" placeholder="Seleccione hora" class="w-full" />
      </div>
      
      <div class="col-4">
        <div class="pb-2">
          Punto de Encuentro:
        </div>
        <Dropdown v-model="form.puntoEncuentro" :options="puntosEncuentro" option-label="name" placeholder="Seleccione punto de encuentro" class="w-full" />
      </div>
      <div class="col-4">
        <div class="pb-2">
          Conductor:
        </div>
        <Dropdown v-model="form.conductor" :options="salida.conductores" placeholder="Seleccione hora" class="w-full" />
      </div>
      <div class="col-4 flex flex-column">
        <label for="">Notas: </label>
        <InputText v-model="form.notas" />
      </div>
      
    </div>
    <div class="col-12 grid noprint" v-show="showForm">

      <div class="col-12">
        <div class="pb-2">
          Territorios:
        </div>
        <TerritorioSelector v-model="form.territorios" />
      </div>
      <div class="col-3">
        <div class="pb-2">
          Territorios: <span class="text-xs cursor-pointer" style="color: blue;"
            @click="getRecomedaciones()">Actualizar</span>
        </div>
        <Listbox v-model="form.territorios" multiple :options="recomendacionTerr" optionLabel="territorio"
          class="w-full md:w-14rem" listStyle="max-height:250px" >
          <template #option="slotProps">
            <div class="flex flex-column align-items-start">
              <div>{{ slotProps.option.territorio }} | {{ slotProps.option.ref }}</div>
              <div class="text-xs">Pendiente: {{ slotProps.option.pendiente }} / {{ slotProps.option.total }}</div>
            </div>
          </template>
        </Listbox>
      </div>
      <div class="col">
        
        <TabView v-if="form.territorios">
          <TabPanel v-for="(item, k) in form.territorios" :key="k" :header="item.territorio + ' ' + item.ref ">
            <div class="grid">
              <div class="col-12">
                <div  >
                  <p class="m-0"><span class="font-bold "> Manzanas pendientes: {{ item.pendiente }} de {{ item.total }}</span></p>
                  <p v-if="item.pendiente < item.total" class="text-sm m-0 ">
                    {{ item.manzanas.join(', ') }}
                  </p>
                </div>
                <!-- <div class="pb-2">
                  Seleccionar puntos de encuentro:
                </div>
                <div v-for="(punto, pk) in item.item.puntoEncuentro" :key="pk" >
                  <div class="cursor-pointer font-bold" @click="form.puntoEncuentro = punto">{{ punto.name }}</div>
                </div> -->
              </div>
              <div class="col-12">
                <Button @click="item.showMap = !item.showMap" class="my-2" label="Mapa" />
                <MapByName v-if="item.showMap" :zona="item.item.zona" :numero="item.item.numero" />
              </div>
              <!-- {{ item }} -->
            </div>
          </TabPanel>
          
        </TabView>
      </div>
    </div>

    <div class="col-12 noprint text-primary" v-show="showForm">
      <div class="pb-2 flex" v-if="form.territorios">
        Territorios: <div v-for="(item, k) in form.territorios" :key="k" class="ml-2">{{ item.territorio }}</div>
      </div>
      <!-- <div class="pb-2 flex" v-if="form.puntoEncuentro">
        Punto de encuentro: <div class="ml-2">{{ form.puntoEncuentro.name }}</div>
      </div> -->
      <div class="mt-2">

        <Button label="Guardar" class="p-button-success noprint" @click="save()"  />
        <Button label="Cancelar" class="p-button-secondary noprint ml-2" @click="cancel()"  />
      </div>

    </div>

    <div class="col-12 noprint" v-show="showForm">  
      <Divider />
    </div>

    <div class="col-12 noprint" v-show="showForm">
      <h2 class="m-0">Parametros</h2>
    </div>

    
    <Divider />

    <div class="col-4 noprint" v-show="showForm">
      <div class="pb-2">
        Horarios de salidas:
      </div>
      <Chips v-model="salida.horarios" separator="," placeholder="Separar valores con coma (,)" class="w-full" />

  </div>
  <div class="col-4 noprint" v-show="showForm">
    <div class="pb-2">
      Conductores de salidas:
    </div>
    <Chips v-model="salida.conductores" separator="," placeholder="Separar valores con coma (,)" class="w-full" />

  </div>
</div>
</template>
<style scoped>
  .print-salida a,
  .print-salida a:visited,
  .print-salida a:hover,
  .print-salida a:active
  {
    color: #495057 !important;
    text-decoration: none !important;
  }

  a.terr,
  a.terr:visited,
  a.terr:hover,
  a.terr:active
   {
    border: 1px solid #4a6da7 !important;
    background: #4a6da7;
    color: #fff  !important;
    padding: .5rem;
    border-radius: .5rem;
  }
  
</style>
