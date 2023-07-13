<script setup>
  import { useTrabajoStore } from "@/store/useTrabajoStore";
  import { useTerritoriosStore } from "@/store/territorios";
  import TabView from 'primevue/tabview';
  import TabPanel from 'primevue/tabpanel';
  import { ref, defineEmits, defineProps, computed } from "vue";

  const emit = defineEmits(["update:modelValue"]);
  const props = defineProps({
    modelValue: {
      type: Array,
      default: [],
    },
  });

  const territorios = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val)
  });

  const selectTerritorio = (territorio) => {
    if (territorios.value.includes(territorio)) {
      territorios.value = territorios.value.filter((t) => t !== territorio);
    } else {
      territorios.value = [...territorios.value, territorio];
    }
  };

  const trabajo = useTrabajoStore();
  const terr = useTerritoriosStore();
  const changeTab = (e) => {

    if (e === 1) {
      trabajo.setTodos();
    } else {
      trabajo.getIniciados();
    }
  };
</script>

<template>
  
<TabView @update:activeIndex="changeTab">
    <TabPanel :header="`Iniciados (${ trabajo.iniciados.length })`">
        <div class="grid grid-nogutter">
          <div class="col-auto territorio" v-for="(item, index) in trabajo.iniciados" :key="index" @click="selectTerritorio(item.territorio)">
            <div>
              <h2>{{ item.territorio }}</h2>
              <h4>{{ terr.data[item.territorio].referencia }}</h4>
              <h5>{{ trabajo.getDate(item.ultimoInicio) }}</h5>
              <p>Pendiente: {{ item.manzanasPendientesTotal }}</p>
            </div>
          </div>
        </div>
    </TabPanel>
    <TabPanel :header="`Todos (${terr.list.length})`">
      <div class="mb-2">Ordenados por fecha en que se trabajo, primeros los que se completaron hace mas tiempo.</div>
      <div class="flex flex-wrap">
          <div class="flex-1 territorio flex flex-column justify-content-between" v-for="(item, index) in trabajo.todos" :key="index" @click="selectTerritorio(item.territorio)">
            <!-- <div class="flex flex-column justify-content-between"> -->
              <h2>{{ item.territorio }}</h2>
              <h4>{{ terr.data[item.territorio].referencia }}</h4>
              <!-- <p>Ultimo Trabajo: </p>   -->
              <h5 v-if="item.ultimoInicio || item.ultimoFin" class="text-blue-300">
                {{trabajo.getDate(item.ultimoInicio)}} a {{trabajo.getDate(item.ultimoFin, 'pendiente')}}
              </h5>
              <p>Pendientes: {{ item.manzanasPendientesTotal }}</p>
            <!-- </div> -->
          </div>
        </div>
    </TabPanel>
    <!-- <TabPanel header="Header III"></TabPanel> -->
</TabView>
</template>

<style>
.territorio {
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}
.territorio {
  padding: 1rem;
  min-width: 10rem;
}

h2, h4, p {
  margin: 0; 
}
h5 {
  margin: 0.5rem 0; 
}

</style>