<template>
  <div>
    <Sidebar :visible.sync="visibleLeft" :showCloseIcon="false">
      <template #header>
        <div class="flex justify-content-between align-content-center align-items-center w-full">
          <h3 class="p-0 m-0">Menu</h3>
          <Button  class="" icon="pi pi-times" @click="visibleLeft = false" />
        </div>
      </template>
      <div class="flex flex-column ">

      </div>
    </Sidebar>
    <div class="flex flex-column justify-content-between align-content-between h-full">
      <div class="flex flex-column buttonspace">
        <!-- <Button icon="pi pi-th-large" @click="visibleLeft = true" /> -->
        <Button icon="pi pi-plus" title="Agregar nuevo territorio" class="p-button-outlined p-button-secondary" @click="newPlane" />
        <Button icon="pi pi-list" title="Listar territorios" class="p-button-outlined p-button-secondary" @click="route.$patch({page: 'listaTerritorio'})" />
        <Button icon="pi pi-map" title="Mapa de territorio" class="p-button-outlined p-button-secondary" @click="route.$patch({page: 'mapaTerritorios'})" />
        <Button icon="pi pi-chart-line" title="Estadisticas" class="p-button-outlined p-button-secondary" @click="route.$patch({page: 'estadisticas'})" />
        <Button icon="pi pi-briefcase" title="Salidas" class="p-button-outlined p-button-secondary" @click="route.$patch({page: 'salidas'})" />
      </div>
      <div class="flex flex-column buttonspace">
        <Button icon="pi pi-cog" class="p-button-warning" title="Descargar archivo con los cambios" @click="route.$patch({page: 'downloadTerritorio'})" />
        <!-- <Button icon="pi pi-power-off" class="p-button-outlined p-button-secondary" title="Inicio" @click="route.$patch({page: 'start'})" /> -->
      </div>
    </div>
    
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouterStore } from '@/store/router'
import { useTerritorioStore } from "@/store/territorio";
const terr = useTerritorioStore();
const route = useRouterStore()
const visibleLeft = ref(false)
const options = ref([
  {
    name: "Nuevo territorio"
  }
])

const newPlane = () => {
  terr.$reset();
  route.$patch({page: 'formTerritorio'})
}

</script>

<style>
.p-sidebar-header-content {
  display: flex;
  width: 100%;
}
.menu {
  padding: 10px;
  border-right: 2px solid black;
}
.buttonspace button {
  margin-bottom: 10px;
}
</style>
