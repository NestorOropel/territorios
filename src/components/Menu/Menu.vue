<template>
  <div>
    <Sidebar :visible.sync="visibleLeft" :showCloseIcon="false">
      <template #header>
        <div class="flex justify-content-between align-content-center align-items-center w-full">
          <h3 class="p-0 m-0">Menu</h3>
          <Button  class="" icon="pi pi-times" @click="visibleLeft = false" />
        </div>

      </template>
    </Sidebar>
    <Button icon="pi pi-th-large" @click="visibleLeft = true" />
  </div>
</template>

<script>
// import EditorTarjeta from '@/page/tarjeta/EditorTarjeta.vue'

export default {
  data: () => ({
    visibleLeft: false,
    options: [
      {
        name: "Nuevo territorio"
      }
    ]
  })
}
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
</style>
