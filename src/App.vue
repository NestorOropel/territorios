<template>
  <div>
    <div class="flex">
      <PageStart v-if="route.page == 'start'"/>
      <div v-else>
        <div class="menu flex-none flex">
          <Menu />
        </div>
        <div class="flex-1 flex">
          <EditorTarjeta />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouterStore } from '@/store/router'
const route = useRouterStore()

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
body {
  margin: 0;
}
* {
  font-family: 'Roboto', sans-serif;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.menu {
  padding: 10px;
  border-right: 2px solid black;
}
</style>
