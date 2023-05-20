<script setup>
  import { defineProps, ref } from 'vue'
  import { useTerritoriosStore } from "@/store/territorios";
  const territorios = useTerritoriosStore();

  const props = defineProps({
    zona: {
      type: String,
      default: null
    },
    numero: {
      type: String,
      default: null
    },
  })

  const item = ref(null)

  setTimeout(() => {
    item.value = territorios.getTerritorio(props.zona, props.numero)
  }, 1000)
</script>

<template>
  <div v-if="item">
    <iframe :src="'/mapa.html?center='+item.center+'&zoom='+item.zoom+'&limits='+JSON.stringify(item.limits)+'&mzNumbers='+JSON.stringify(item.mzNumbers)" frameborder="0" id="map-iframe"></iframe>
  </div>
</template>

<style scoped>

 #map-iframe {
   width: 100%;
   min-height: 80vh;
 }
</style>