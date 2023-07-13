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
        <!-- <Button title="Agregar nuevo territorio" class="p-button-outlined p-button-secondary" @click="newPlane">
          <div class="flex flex-column text-center w-full">
            <i class="pi pi-plus pb-2"></i>
            <span class="text-xs">Nuevo</span>
          </div>
        </Button> -->
        <Button title="Listar territorios" class="p-button-secondary" @click="route.$patch({page: 'listaTerritorio'})">
          <div class="flex flex-column text-center w-full">
            <i class="pi pi-list pb-2"></i>
            <span class="text-xs">Territorios</span>
          </div>
        </Button>
        <Button title="Salidas" class="p-button-secondary" @click="route.$patch({page: 'salidas'})">
          <div class="flex flex-column text-center w-full">
            <i class="pi pi-briefcase pb-2"></i>
            <span class="text-xs">Salidas</span>
          </div>
        </Button>
        <Button title="Mapa de territorio" class="p-button-secondary" @click="route.$patch({page: 'mapaTerritorios'})">
          <div class="flex flex-column text-center w-full">
            <i class="pi pi-map pb-2"></i>
            <span class="text-xs">Mapa</span>
          </div>
        </Button>
        <Button title="Estadisticas" class="p-button-secondary" @click="route.$patch({page: 'estadisticas'})">
          <div class="flex flex-column text-center w-full">
            <i class="pi pi-chart-line pb-2"></i>
            <span class="text-xs">Informes</span>
          </div>
        </Button>
      </div>
      <div class="flex flex-column buttonspace">
        <Button class="p-button-warning" title="Descargar archivo con los cambios" @click="route.$patch({page: 'downloadTerritorio'})">
          <div class="flex flex-column text-center w-full">
            <i class="pi pi-cog pb-2"></i>
            <span class="text-xs">Configuración</span>
          </div>
        </Button>
        <!-- <Button icon="pi pi-power-off" class="p-button-outlined p-button-secondary" title="Inicio" @click="route.$patch({page: 'start'})" /> -->
      </div>
    </div>
    
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouterStore } from '@/store/router'


const route = useRouterStore()
const visibleLeft = ref(false)
// const options = ref([
//   {
//     name: "Nuevo territorio"
//   }
// ])



</script>

<style>
.p-sidebar-header-content {
  display: flex;
  width: 100%;
}
.menu {
  background: #f7f7f7;
  padding: 10px;
  border-right: 2px solid black;

}

.menu .p-button, .menu .p-button-secondary {
  background: white;
  color: black;
  padding: 1rem .25rem;
}
.buttonspace button {
  margin-bottom: 10px;
}
</style>
