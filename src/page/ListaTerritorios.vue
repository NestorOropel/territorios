<template>
  <div class="px-5 py-2">
    <div class="grid">
      <h1>Lista de territorios</h1>
    </div>
    <div class="grid territorios gap-1">
      <div class="col" v-for="(item, index) in territorios.list" :key="index" @click="() => edit(item)">
        <h2>
          {{ item.zona }}{{ item.numero }}
        </h2>
        <p>{{item.referencia}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouterStore } from "@/store/router";
import { useTerritoriosStore } from "@/store/territorios";
import { useTerritorioStore } from "@/store/territorio";
// import { ref } from 'vue'
const territorios = useTerritoriosStore();
const territorio = useTerritorioStore();
const route = useRouterStore();

const visibleLeft = ref(false);

const edit = (item) => {
  territorio.$patch(item)
  route.$patch({page: 'formTerritorio'})
}
</script>

<style>
  h1, h2 {
    font-weight: lighter;
  }
  .territorios div {
    border: 1px solid rgb(210, 159, 48);
    cursor: pointer;
  }
</style>
