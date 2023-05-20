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
import { useSalidaStore } from '@/store/useSalidaStore';
import { useProximaSalida } from '@/composables/useProximaSalida';
import { useTerritoriosStore } from "@/store/territorios";
import { useUrl } from '@/composables/useUrl';

import { ref } from 'vue'

const territorios = useTerritoriosStore();
const { getItemUrl } = useUrl();
const salida = useSalidaStore();
const value = ref(null);
const form = ref({});
const showForm = ref(false);

const { getProximaSalida } = useProximaSalida()

const getDayName = (date) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  return days[date.getDay()];
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
  salida.addSalida(form.value);
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
</script>
<template>
  <div class="grid p-4 text-left align-content-start w-full">
    <div class="col-12 flex justify-content-between">
      <h2 class="m-0">Salidas</h2>
      <div class="noprint">
        <Button icon="pi pi-print" class="mr-2" @click="print" />
        <Button type="button" icon="pi pi-plus" label="Agregar"  @click="showForm =  true" />
      </div>
    </div>
    <div class="col-12">
      <!-- {{ salida.list.data }} -->
      <DataTable :value="salida.list.data" :paginator="false" class="p-datatable-customers w-full print-salida" @rowReorder="onRowReorder" showGridlines :rows="30"
        dataKey="id"   responsiveLayout="scroll"
        >
        <template #empty>
          Ningun registro encontrado
        </template>
        <Column rowReorder headerStyle="width: 3rem" headerClass="noprint" bodyClass="noprint" :reorderableColumn="false" />
        <Column field="date" header="Dia" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">
            <div class="flex flex-column">
              <div>{{ getDayName(data.date) }}</div>
              <div style="font-size: 0.5rem;">{{ data.date.toLocaleDateString() }}</div>
            </div>
          </template>
        </Column>
        <Column field="hour" header="Hora" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.hour }}</template>
        </Column>
        <Column field="puntoEncuentro" header="Punto de Encuentro"  :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">
            <a :href="'https://www.google.es/maps?q='+data.puntoEncuentro.latlng.lat+','+data.puntoEncuentro.latlng.lng" target="_blank">{{ data.puntoEncuentro.name }}</a>
            <!-- {{ data.puntoEncuentro }} -->
          </template>
        </Column>
        <Column field="territorios" header="Territorios" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">
            <a v-for="(item, k) in data.territorios" :key="k" class="ml-2 terr" :href="getItemUrl(item.item)" target="_blank">{{ item.territorio }} </a>
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
      <div class="w-full py-2 onlyprint text-xs">
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
        <Dropdown v-model="form.puntoEncuentro" :options="territorios.puntoEncuentro" option-label="name" placeholder="Seleccione punto de encuentro" class="w-full" />
      </div>
      <div class="col-4">
        <div class="pb-2">
          Conductor:
        </div>
        <Dropdown v-model="form.conductor" :options="salida.conductores" placeholder="Seleccione hora" class="w-full" />
      </div>
    </div>
    <div class="col-12 noprint" v-show="showForm">
      <div class="pb-2 flex" v-if="form.territorios">
        Territorios: <div v-for="(item, k) in form.territorios" :key="k" class="ml-2">{{ item.territorio }}</div>
      </div>
      <div class="pb-2 flex" v-if="form.puntoEncuentro">
        Punto de encuentro: <div class="ml-2">{{ form.puntoEncuentro.name }}</div>
      </div>

      <Button label="Guardar" class="p-button-success noprint" @click="save()"  />
      <Button label="Cancelar" class="p-button-secondary noprint ml-2" @click="cancel()"  />

    </div>

    <div class="col-12 noprint" v-show="showForm">  
      <Divider />
    </div>

    <div class="col-12 noprint" v-show="showForm">
      <h2 class="m-0">Parametros</h2>
    </div>

    <div class="col-12 grid noprint" v-show="showForm">
      <div class="col-3">
        <div class="pb-2">
          Territorios: <span class="text-xs cursor-pointer" style="color: blue;"
            @click="getRecomedaciones()">Actualizar</span>
        </div>
        <Listbox v-model="form.territorios" multiple :options="recomendacionTerr" optionLabel="territorio"
          class="w-full md:w-14rem" listStyle="max-height:250px">
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
                <div class="pb-2">
                  Seleccionar puntos de encuentro:
                </div>
                <div v-for="(punto, pk) in item.item.puntoEncuentro" :key="pk" >
                  <div class="cursor-pointer font-bold"  @click="form.puntoEncuentro = punto">{{ punto.name }}</div>
                </div>
              </div>
              <div class="col-12">
                <Button @click="item.showMap = !item.showMap" label="Mapa" />
                <MapByName v-if="item.showMap" :zona="item.item.zona" :numero="item.item.numero" />
              </div>
            </div>
          </TabPanel>
          
        </TabView>
      </div>
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

  a.terr {
    border: 1px solid #495057 !important;
    padding: .5rem;
    border-radius: .5rem;
  }
  
</style>
