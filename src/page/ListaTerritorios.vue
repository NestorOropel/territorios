<template>
  <div class="px-5 py-2 w-full">
    <div class="w-full">
      <div class="flex justify-content-between w-full align-items-center">
        <h1>Lista de territorios</h1>
        <div>
          <SelectButton v-model="mode" :options="modes" optionLabel="value" optionValue="value" dataKey="value" aria-labelledby="custom">
            <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
        </div>
      </div>
      
    </div>
    <div class="grid territorios gap-1">
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

const visibleLeft = ref(false);
const mode = ref('list');
const modes = ref([
  // {icon: 'pi pi-align-left', value: 'Left'},
  // {icon: 'pi pi-align-right', value: 'Right'},
  {icon: 'pi pi-list', value: 'list'},
  {icon: 'pi pi-table', value: 'map'},
]);
const edit = (item) => {
  territorio.$patch(item)
  route.$patch({page: 'formTerritorio'})
}
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
