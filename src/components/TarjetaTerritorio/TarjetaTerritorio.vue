<template>
  <div class="text-left">
    <h2>Tarjeta de Territorio</h2>
    <div class="grid">
      <div class="col-6">
        <label>Zona *</label>
        <div class="p-inputgroup pt-1">
          <InputText placeholder="Zona (A - Z)"  v-model="terr.zona" />
        </div>
          <p class="text-xs">* Si hay mas de 99 territorios es necesario dividirlo en zonas</p>
      </div>
      <div class="col-6">
        <label>Numero </label>
        <div class="p-inputgroup pt-1">
          <InputText placeholder="Numero de territorio (1 a 99)" v-model="terr.numero" />
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col">
        <!-- <p class="text-xs">
          <strong>Puntos Limites:</strong> 
          <ul>
            <li v-for="(item, index) in terr.limits" :key="index">
              {{item}}
            </li>
          </ul>
        </p>

        <p class="text-xs">
          <strong>Manzanas:</strong> 
          <ul>
            <li v-for="(item, index) in terr.mzNumbers" :key="index">
              {{item}}
            </li>
          </ul>
        </p>
        <p class="text-xs">
          <strong>Centro en mapa:</strong> {{ terr.center }}
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTerritorioStore } from '@/store/territorio'
// import { ref } from 'vue'
const terr = useTerritorioStore()

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: lighter;
}
label {
  font-weight: bold;
}
</style>
