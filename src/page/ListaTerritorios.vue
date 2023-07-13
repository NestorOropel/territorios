<template>
  <div class="px-5 py-2 w-full">
    <div class="w-full">
      <div class="flex justify-content-between w-full align-items-center">
        <h1>Lista de territorios</h1>
        <div class="noprint flex">
          <Button label="Puntos de Encuentro" severity="secondary" class="noprint" @click="route.$patch({ page: 'puntoEncuentro' })"  />
          <Button icon="pi pi-plus" label="Nuevo"  class="ml-2 noprint" @click="newPlane" />
          <Button icon="pi pi-print"  class="ml-2 noprint" @click="print" />
        </div>
      </div>
    </div>
    <div class="card">
      <DataTable :value="territorios.list" :paginator="false" class="p-datatable-customers" showGridlines :rows="30"
        dataKey="id" :filters.sync="filters1" filterDisplay="menu"  responsiveLayout="scroll"
        :globalFilterFields="['zona', 'numero', 'referencia', 'notas']">
        <template #header>
          <div class="flex justify-content-between noprint">
            <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined noprint"
              @click="clearFilter1()" />
            <span class="p-input-icon-left noprint">
              <i class="pi pi-search" />
              <InputText v-model="filters1['global'].value" placeholder="Filtrar" />
            </span>
          </div>
        </template>
        <template #empty>
          Ningun registro encontrado
        </template>
        <Column field="numero" header="Territorio" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.zona }}{{ data.numero }}</template>
        </Column>
        <Column field="referencia" header="Referencia" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.referencia }}</template>
        </Column>
        <Column field="notas" header="Notas" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.notas }}</template>
        </Column>
        <Column  class="text-right" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }" >
            <div class="flex">
              <Button icon="pi pi-history"  severity="success" title="Ver y actualizar trabajo" class="noprint mr-2" outlined  @click="terrWork(data)" />
              <a :href="getItemUrl(data)" target="_blank" class="btn btn-sm btn-secondary"><Button label="Ver" icon="pi pi-eye" outlined  /></a>
              <Button icon="pi pi-pencil" outlined class="noprint ml-2"  @click="edit(data)" />
            </div>
          </template>
        </Column>

      </DataTable>
    </div>
    <div class="text-left noprint py-5">
      <ImportTerr  />
    </div>
  </div>
</template>

<script setup>
import Column from "primevue/column";
import { ref } from "vue";
import { useRouterStore } from "@/store/router";
import { useTerritoriosStore } from "@/store/territorios";
import { useTerritorioStore } from "@/store/territorio";
import { useUrl } from "@/composables/useUrl";
import ImportTerr from "@/components/ImportTerr.vue";
import PuntosDeEncuentro from "@/components/PuntosDeEncuentro.vue";
// import { ref } from 'vue'
const territorios = useTerritoriosStore();
const territorio = useTerritorioStore();
const route = useRouterStore();
const { getItemUrl } = useUrl();

const newPlane = () => {
  territorio.$reset();
  route.$patch({page: 'formTerritorio'})
}


const filters1 = ref({ global: { value: '' } })
const iframe = ref("null")
const props = defineProps({
  print: { type: Boolean, default: false },
})

const visibleLeft = ref(false);

let activeMode = props.print ? 'map' : 'list';
console.log("activeMode", activeMode)
const mode = ref(activeMode);
const modes = ref([
  // {icon: 'pi pi-align-left', value: 'Left'},
  // {icon: 'pi pi-align-right', value: 'Right'},
  { icon: 'pi pi-list', value: 'list' },
  // {icon: 'pi pi-table', value: 'map'},
  // {icon: 'pi pi-print', value: 'print'},
]);

const edit = (item) => {
  territorio.$patch(item)
  route.$patch({ page: 'formTerritorio' })
}

const terrWork = (item) => {
  territorio.$patch(item)
  route.$patch({ page: 'tarjetaTerritorio' })
}

const loadIframe = () => {
  // console.log("load iframe")
  var frame = iframe.value;
  frame.contentWindow.postMessage({ call: 'sendList', value: JSON.parse(JSON.stringify(territorios.list)) });
}

const print = () => {
  window.print();
}
window.addEventListener('message', function (event) {
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  // console.log("origen", origin, event)
  if (origin !== 'http://localhost:8080' && origin !== 'https://territorios.web.app') return;
  // console.log("origen ok")
  if (typeof event.data == 'object' && event.data.call == 'sendList') {
    // console.log("message", event.data)
    territorios.$patch({ list: event.data.value })

  }
}, false);
</script>

<style scoped>
h1,
h2
{
  font-weight: lighter;
}

div.tarjeta
{
  border: 1px solid rgb(219, 218, 216);
  padding: 5px;
  background: rgb(253, 253, 253);
  cursor: pointer;
  height: 100%;
}

.territorios
{
  align-items: stretch;
}

.titles
{
  text-align: left;
  padding: 5px 0px 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}

.titles h2,
.titles p
{
  margin: 0;
  padding: 0;
  color: darkslategrey;
}

.titles h2
{
  font-weight: normal;
}

.titles p
{

  padding-left: 0px;
  font-size: .9em;


}

.detalle
{
  margin: 0px 0 0;
  text-align: left;
}

h5
{
  margin: 0;
  padding: 0;
}

.detalle h5
{
  padding-top: 10px;
}

.notas
{

  font-size: .9em;
}</style>
