<script setup>
  import Chart from 'primevue/chart';
  import { ref } from "vue";
  import { useTerritoriosStore } from "@/store/territorios";
  import { useTrabajoStore } from "@/store/useTrabajoStore";

  const territorios = useTerritoriosStore();
  const trabajo = useTrabajoStore();
  // const chartData = ref();
  const chartOptions = ref({
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
});

const prepareChart = (item) => {
  const hecho = item.count;
  const pendiente = territorios.state.totalManzanas - hecho;
  const data = {
    labels: ['Trabajado', 'Pendiente'],
    datasets: [
        {
            data: [hecho, pendiente],
            backgroundColor: [
                "#4caf50",
                "#E0E0E0"
            ],
            hoverBackgroundColor: [
                "#6ebe71",
                "#ff8980"
            ]
        }
    ]
  };
  return data;
}

</script>
<template>
  <div class="grid mx-auto">
    <div class="col-12">
      <h1 class="text-center">Estadísticas de territorio</h1>
      
    </div>
    
    <div v-for="(item, k) in trabajo.state.work" :key="k" class="col text-center">
      <Chart type="pie" :data="prepareChart(item)" :options="chartOptions" class="md:w-20rem mx-auto" />
      <div class="">
        <h2>{{ Number.parseFloat((100 / territorios.state.totalManzanas) * item.count).toFixed(2) }}%</h2>
        <h5>Iniciado: {{ trabajo.getDate(item.min) }}</h5>
        <h5 v-if="item.count == territorios.state.totalManzanas">Finalizado: {{ trabajo.getDate(item.max) }}</h5>
      </div>
    </div>

  </div>
</template>