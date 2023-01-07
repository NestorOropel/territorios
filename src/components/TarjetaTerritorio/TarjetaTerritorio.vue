<template>
  <div class="text-left">
    <div class="grid">
      <div class="col-3">
        <label>Número </label>
        <div class="p-inputgroup pt-1">
          <InputText placeholder="Número de territorio (1 a 99)" v-model="numero" maxlength="2"/>
        </div>
      </div>
      <div class="col-3">
        <label>Zona (opcional)</label>
        <div class="p-inputgroup pt-1">
          <InputText placeholder="Zona (A - Z)" title="* Si hay mas de 99 territorios es necesario dividirlo en zonas" v-model="zona" maxlength="1" />
        </div>
      </div>
      <div class="col-6">
        <label>Referencia</label>
        <div class="p-inputgroup pt-1">
          <InputText placeholder="Nombre por el que se conoce el lugar" v-model="terr.referencia" />
        </div>
      </div>
      <div class="col-12">
        <label>Notas</label>
        <div class="p-inputgroup pt-1">
          <Textarea v-model="terr.notas" :autoResize="true" rows="2"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTerritorioStore } from '@/store/territorio'
const terr = useTerritorioStore()

const numero = computed({
  get() {
    return terr.numero
  },
  set(val) {
    let nro = parseInt(val) || 0

    if (isNaN(nro)) return
    if (nro > 99) return
    if (nro < 0) return
    // if (nro === 0) nro = ''
    // console.log("setNumber", nro)
    terr.$patch({numero: nro});
  }
})
const zona = computed({
  get() {
    return terr.zona
  },
  set(val) {
    // console.log("setZona", val)
    terr.$patch({zona: val.toUpperCase()});
  }
})
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
