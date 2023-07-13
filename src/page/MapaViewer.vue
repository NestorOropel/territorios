<script setup>
  import { ref } from 'vue';
  import { useUrl } from '@/composables/useUrl';
  import ToggleButton from 'primevue/togglebutton';

  const { getItemFromQuery, getLinkInforme } = useUrl();
  const data = getItemFromQuery()
  const item = ref(data);

  const mzNumbers = () => {
    let obj = {}
    for ( let i in data.mzNumbers) {
      if (i == 0) continue
      // console.log("data.mzNumbers[i]", data.mzNumbers[i])
      obj[i] = false
    }
    return obj
  }
  const worked = ref(mzNumbers());
  const sendWhatsapp = () => {

    const manzanasTrue = []
    for( let k in worked.value){
      if (worked.value[k]) manzanasTrue.push(parseInt(k))
    };

    let msg = `Hola hermano, le informo lo trabajado.\n\nTerritorio: *${item.value.zona}${item.value.numero}*\n\nManzanas: *${manzanasTrue.join(", ")}*\n\n¡Gracias!\n\n${getLinkInforme(data, worked.value)}`;

    window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(msg), "_blank")
    
  }
  // console.log("color", item.value.color)
  sessionStorage.setItem("color", JSON.stringify(item.value.color))
</script>

<template>
  <div class="grid grid-nogutter align-content-start text-left viewer">
    <div class="col-12 title">
      <div class="pt-2 px-4 pb-2 lg:px-2">
        <h1 class="m-0 p-0 font-light">{{ item.zona }}{{ item.numero }}</h1>
        <h2 class="m-0 p-0 text-sm">{{ item.referencia }}</h2>
        <div class="text-xs">
          {{ item.notas }}
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6">
      <iframe :src="'/mapa.html?center='+item.center+'&zoom='+item.zoom+'&limits='+JSON.stringify(item.limits)+'&mzNumbers='+JSON.stringify(item.mzNumbers)" frameborder="0" id="map-iframe"></iframe>
    </div>
    <div class="col-12 lg:col-6 px-4 pb-6">
      
      <div v-if="item.pendiente">
        <h3 class="py-0 mb-1">Manzanas a trabajar</h3>
        <div>
          {{ item.pendiente.join(", ") }}
        </div>
      </div>
      <h3 class="py-0 mb-1">
        Informar manzanas trabajadas
      </h3>
      <div class="pb-3">
        Seleccione las manzanas que han sido trabajadas
      </div>
      <div class="grid grid-nogutter" v-if="item.pendiente">
        <div v-for="(check, k) in worked" :key="k"  class="mr-2 mb-2">
          <ToggleButton  v-model="worked[k]" :disabled="!item.pendiente.includes(parseInt(k))" :class="{ 'bg-red-600 text-white': !item.pendiente.includes(parseInt(k)) }" :onLabel="k" :offLabel="k" />
        </div>
      </div>

      <div class="grid grid-nogutter" v-if="!item.pendiente">
        <div v-for="(check, k) in worked" :key="k"  class="mr-2 mb-2">
          <ToggleButton  v-model="worked[k]" :onLabel="k" :offLabel="k" />
        </div>
      </div>
      

      <div class="pt-2">
        <Button label="Enviar Mensaje" severity="success" class="p-button-success" @click="sendWhatsapp" />
      </div>
      <!-- <div>{{ item }}</div> -->
    </div>
  </div>
</template>

<style scoped>
.title {
  max-height: 5em;
  
}
 .viewer {
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
  width: 100vw;
 }
 #map-iframe {
   width: 99%;
   height: 70vh;
   margin-left: .5%;
 }
</style>