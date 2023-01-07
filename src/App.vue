<template>
  <div>
    <div>
      <PageStart v-if="route.page == 'start'"/>
      
      <ListaTerritorios v-else-if="route.page == 'print'" :print="true" />
      <div v-else  class="flex">
        <div class="menu noprint">
          <Menu  />
        </div>
        <div class="flex-1 flex">
          <EditorTarjeta v-if="route.page == 'formTerritorio'" />
          <DownloadTerritorio v-if="route.page == 'downloadTerritorio'" />
          <ListaTerritorios v-if="route.page == 'listaTerritorio'" />
          <MapaTerritorios v-if="route.page == 'mapaTerritorios'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouterStore } from '@/store/router'
const route = useRouterStore()

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
body {
  margin: 0;
}
* {
  font-family: 'Roboto', sans-serif;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.menu {
  padding: 10px;
  border-right: 2px solid black;
  height: 100vh;
  flex: none;
  display: flex;
}

@media print {
    /* Aquí irían tus reglas CSS específicas para imprimir */
    .noprint {
      display: none !important;
    }
} 
</style>
