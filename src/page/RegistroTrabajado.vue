<script setup>
  import MapByName from '@/components/MapByName/MapByName.vue';
  import { useTrabajoStore } from '@/store/useTrabajoStore';
  import { useUrl } from '@/composables/useUrl';
  import { ref } from 'vue'
  const { getInforme } = useUrl();

  const trabajo = useTrabajoStore();
  const informe = ref(null);
  const save = () => {
    for (let mza of informe.value.manzanas) {
      // console.log("mza", mza)
      trabajo.setRegistro(informe.value.territorio, mza, informe.value.timestamp);
    }
  }

  setTimeout( async () => {
    // const { zona, numero } = getInforme();
    informe.value = getInforme();
    console.log("informe", informe.value)
  }, 1000);
</script>
<template>
  <div class="grid w-full py-2">
    <!-- {{ trabajo.getInforme() }} -->
    <div class="col-4 informe">
      <h1  class="m-0 p-0">Registro de trabajo en territorio {{informe.zona}}{{informe.numero}}</h1>
      <!-- <h2>Territorio: </h2> -->
      <h3 class="m-0 p-0">Informado el {{trabajo.getDate(informe.timestamp)}}</h3>
  
      <h3  class="m-0 p-0 pt-2">Manzanas Trabajadas:</h3>
      <div v-for="(mza, k ) in informe.manzanas" :key="k" class="py-2 ">
        <div>{{ mza }}</div>
        <div class="text-xs">Registro anterior: {{ trabajo.getLastRegistro(informe.territorio, mza) }}</div>
      </div>
      <div class="pt-2">
        <Button label="Guardar" severity="success" class="p-button-success" @click="save" />
      </div>
    </div>

    <div class="col-8">
      <MapByName :zona="informe.zona" :numero="informe.numero" classMap="" />
    </div>
  </div>
</template>

<style scoped>
  .informe {
    padding: 1rem;
    text-align: left;
  }
  .informe * {
    /* margin: 0;
    padding: 0; */
    font-weight: normal;
  }

  
</style>