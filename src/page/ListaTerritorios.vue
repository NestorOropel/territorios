<template>
  <div>
    
      {{ territorios.list }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouterStore } from '@/store/router'
import { useTerritoriosStore } from '@/store/territorios'
// import { ref } from 'vue'
const territorios = useTerritoriosStore()
const route = useRouterStore()

const visibleLeft = ref(false)

</script>

<style>
.p-sidebar-header-content {
  display: flex;
  width: 100%;
}
.menu {
  padding: 10px;
  border-right: 2px solid black;
}
.buttonspace button {
  margin-bottom: 10px;
}
</style>
