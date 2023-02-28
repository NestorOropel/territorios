<template>
  <div class="px-5 py-2 w-full">
    <div class="w-full">
      <div class="flex justify-content-between w-full align-items-center">
        <h1>Lista de territorios</h1>
        <div class="noprint">
          <SelectButton  v-if="!props.print" v-model="mode" :options="modes" optionLabel="value" optionValue="value" dataKey="value" aria-labelledby="custom">
            <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
          <Button v-if="props.print" icon="pi pi-print" @click="print" />
        </div>
      </div>
      
    </div>
    <div class="grid territorios" v-if="mode != 'print'">

      <div class="col-4" v-for="(item, index) in territorios.list" :key="index" @click="() => edit(item)">
        <div class="tarjeta">

          <div class="titles">
            <div>
              <h5>Referencía</h5>
              <p>{{item.referencia}}</p>
            </div>
            <h2>{{ item.zona }}{{ item.numero }}</h2>
          </div>
          
          <div class="detalle" v-if="mode== 'map'">
            <MapaTerritorio
            class="map"
            :center="item.center"
            :shape="item.shape"
            :rotate="item.angle"
            :zoom="item.zoom"
            :mzNumbers="item.mzNumbers"
            listen="false"
            :limits="item.limits"
            :mapConfig="item.mapConfig"
          ></MapaTerritorio>
            <h5 v-if="item.notas">Notas</h5>
            <div class="notas">{{ item.notas }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid territorios" v-if="mode == 'print'">
      <iframe ref="iframe" style="height:297mm; width:210mm; " src="/print" @load="loadIframe"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouterStore } from "@/store/router";
import { useTerritoriosStore } from "@/store/territorios";
import { useTerritorioStore } from "@/store/territorio";
// import { ref } from 'vue'
const territorios = useTerritoriosStore();
const territorio = useTerritorioStore();
const route = useRouterStore();
const iframe = ref("null")
const props = defineProps({
  print: {type: Boolean, default: false},
})

const visibleLeft = ref(false);

let activeMode = props.print ? 'map' : 'list';
console.log("activeMode", activeMode)
const mode = ref(activeMode);
const modes = ref([
  // {icon: 'pi pi-align-left', value: 'Left'},
  // {icon: 'pi pi-align-right', value: 'Right'},
  {icon: 'pi pi-list', value: 'list'},
  {icon: 'pi pi-table', value: 'map'},
  {icon: 'pi pi-print', value: 'print'},
]);

const edit = (item) => {
  territorio.$patch(item)
  route.$patch({page: 'formTerritorio'})
}

const loadIframe = () => {
  // console.log("load iframe")
  var frame = iframe.value;
  frame.contentWindow.postMessage({call:'sendList', value: JSON.parse(JSON.stringify(territorios.list))});
}

const print = () => {
  window.print();
}
window.addEventListener('message', function(event) {
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  // console.log("origen", origin, event)
  if (origin !== 'http://localhost:8080' && origin !== 'https://territorios.web.app') return;
  // console.log("origen ok")
  if (typeof event.data == 'object' && event.data.call=='sendList') {
    // console.log("message", event.data)
    territorios.$patch({list: event.data.value})
    
  }
}, false);
</script>

<style scoped>
  h1, h2 {
    font-weight: lighter;
  }
  div.tarjeta {
    border: 1px solid rgb(219, 218, 216);
    padding: 5px;
    background: rgb(253, 253, 253);
    cursor: pointer;
    height: 100%;
  }
  .territorios {
    align-items: stretch;
  }
  .titles {
    text-align: left;
    padding: 5px 0px 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
  .titles h2, .titles p {
    margin: 0;
    padding: 0;
    color: darkslategrey;
  }
  .titles h2 {
    font-weight: normal;
  }
  .titles p {
    
    padding-left: 0px;
    font-size: .9em;
    
    
  }
  .detalle {
    margin: 0px 0 0;
    text-align: left;
  }
  h5 {
    margin: 0;
    padding: 0;
  }
  .detalle h5 {
    padding-top: 10px;
  }
  .notas {
    
    font-size: .9em;
  }
</style>
