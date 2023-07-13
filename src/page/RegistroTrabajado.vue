<script setup>
  import MapByName from '@/components/MapByName/MapByName.vue';
  import { useTrabajoStore } from '@/store/useTrabajoStore';
  import { useUrl } from '@/composables/useUrl';
  import { ref, onMounted } from 'vue'
  const { getInforme } = useUrl();

  const trabajo = useTrabajoStore();
  const informe = ref(null);
  const save = async () => {
    const manzanas = [...informe.value.manzanas]
    informe.value = null
    let params = {
      territorio: `${terr.zona}${terr.numero}`,
      manzanas,
      date: date.value.getTime(),
      // conductor: conductor.value,
    }
    await trabajo.setRegistro(params)
  }
  onMounted(() => {
    // console.log("informe", informe.value)
    informe.value = getInforme();
  })

</script>
<template>
  <div class="grid w-full py-2" v-if="informe">
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
      <!-- {{ informe }} -->
      <MapByName v-if="informe" :zona="informe.zona" :numero="informe.numero" classMap="" />
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