<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import { useTerritoriosStore } from "@/store/territorios";
import MapaBase from "@/components/MapaBase/MapaBase.vue";

const territorios = useTerritoriosStore();
const visible = ref(false);

const form = ref({
  name: "",
  latlng: {
    lat: 0,
    lng: 0,
  },
})

const click = (e) => {
  form.value.latlng = e.latlng;
  // console.log("click", e.latlng)
}

const save = () => {
  const val = JSON.parse(JSON.stringify( form.value))
  territorios.$patch({
    puntoEncuentro: [...territorios.puntoEncuentro, val]
  })
  visible.value = false;
}

</script>
<template>
  <Button label="Puntos de Encuentro" @click="visible = true"  />
  <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }">
    
    <div class="flex flex-column">
      <label class="pb-1">Lugar</label>
      <InputText v-model="form.name" placeholder="Lugar" autofocus />
      <div class="text-xs pt-2">
        Coordenadas: {{ form.latlng.lat }}, {{ form.latlng.lng }}
      </div>
    </div> 
    <div class="pt-3">
      <MapaBase @mapClick="click" class="map" :setPoint="true" style="height: 40vh;" />
    </div>
    <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="visible = false" text />
        <Button label="Guardar" icon="pi pi-check" @click="save()"  />
    </template>
</Dialog>
</template>
