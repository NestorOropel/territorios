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
    <div class="grid territorios gap-1" v-if="mode != 'print'">
      <div class="col-4" v-for="(item, index) in territorios.list" :key="index" @click="() => edit(item)">
        <h2>
          {{ item.zona }}{{ item.numero }}
        </h2>
        <p>{{item.referencia}}</p>
        <!-- <p>{{ item.mapConfig }} {{ item.zoom }}</p> -->
        <MapaTerritorio
          v-if="mode== 'map'"
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
      </div>
    </div>
    <div class="grid territorios gap-1" v-if="mode == 'print'">
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

<style>
  h1, h2 {
    font-weight: lighter;
  }
  .territorios > div {
    border: 1px solid rgb(210, 159, 48);
    cursor: pointer;
  }
   
</style>
