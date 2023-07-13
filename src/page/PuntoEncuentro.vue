<template>
  <div class="px-5 py-2 w-full text-left">
    <div class="w-full">
      <div class="flex justify-content-between w-full align-items-center">
        <div>
          <h1 class="ml-0 pl-0">Lista de Puntos de Encuentro</h1>
          <p>Solo se listan puntos de encuentros no asignados en los territorios</p>
        </div>
        <div class="noprint flex">
          <PuntosDeEncuentro class="mx-2" />
        </div>
      </div>

    </div>
    <div class="card">
      <DataTable :value="territorios.puntoEncuentro" :paginator="false" class="p-datatable-customers" showGridlines :rows="30"
        dataKey="id" :filters.sync="filters1" filterDisplay="menu"  responsiveLayout="scroll"
        :globalFilterFields="['lugar']">
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
        <Column field="lugar" header="Punto de Encuentro" :styles="{ 'min-width': '12rem' }">
          <template #body="{ data }">{{ data.name }}</template>
        </Column>

      </DataTable>
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
// import ImportTerr from "@/components/ImportTerr.vue";
import PuntosDeEncuentro from "@/components/PuntosDeEncuentro.vue";
// import { ref } from 'vue'
const territorios = useTerritoriosStore();
const territorio = useTerritorioStore();
const route = useRouterStore();
const { getItemUrl } = useUrl();


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
