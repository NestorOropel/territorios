<template>
  <div class="text-left">
    <div class="grid">
      <div class="col-6">
        <label>Numero </label>
        <div class="p-inputgroup pt-1">
          <InputNumber placeholder="Numero de territorio (1 a 99)" v-model="terr.numero" :min="1" :max="99" />
        </div>
      </div>
      <div class="col-6">
        <label>Zona (opcional) *</label>
        <div class="p-inputgroup pt-1">
          <InputText placeholder="Zona (A - Z)"  v-model="terr.zona" maxlength="1" />
        </div>
          <p class="text-xs">* Si hay mas de 99 territorios es necesario dividirlo en zonas</p>
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
