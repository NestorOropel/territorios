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
    <div>

      <Button icon="pi pi-th-large" @click="visibleLeft = true" />

      <Button icon="pi pi-th-large" @click="downloadFile" />
    </div>
    
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visibleLeft = ref(false)
const options = ref([
  {
    name: "Nuevo territorio"
  }
])
  
const downloadFile = () => {
  //create or obtain the file's content
  let data = terr.getData()
  console.log("data", data)
  var content = JSON.stringify(data);
  //create a file and put the content, name and type
  var file = new File(["\ufeff"+content], 'myFile.territorio', {type: "text/plain:charset=UTF-8"});

  //create a ObjectURL in order to download the created file
  let url = window.URL.createObjectURL(file);

  //create a hidden link and set the href and click it
  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);
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
