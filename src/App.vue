<template>
  <div>
    <div class="flex">

      <div class="menu flex-none flex">
        <Menu />
      </div>
      <div class="flex-1 flex">
        <EditorTarjeta />
      </div>
    </div>
  </div>
</template>

<script>
// import EditorTarjeta from '@/page/tarjeta/EditorTarjeta.vue'

export default {
  name: 'App',

}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
