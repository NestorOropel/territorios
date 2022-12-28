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
        <Button icon="pi pi-plus" title="Agregar nuevo territorio" class="p-button-outlined p-button-secondary" @click="route.$patch({page: 'formTerritorio'})" />
        <Button icon="pi pi-list" title="Listar territorios" class="p-button-outlined p-button-secondary" @click="route.$patch({page: 'listaTerritorio'})" />
      </div>

      <Button icon="pi pi-download" class="p-button-danger" title="Descargar archivo con los cambios" @click="route.$patch({page: 'downloadTerritorio'})" />
    </div>
    
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouterStore } from '@/store/router'
const route = useRouterStore()
const visibleLeft = ref(false)
const options = ref([
  {
    name: "Nuevo territorio"
  }
])
   
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
