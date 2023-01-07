<template>
  <div class="p-8 surface-ground ">
    <!-- The `multiple` attribute lets users select multiple files. -->
    <div class="grid w-full h-full ">
      
      <div class="col bg-white  p-8 text-left line-height-3">
        <h1 class="font-light">Guardar datos</h1>
        
        <div>
          <p>Guardar la información cada vez que haces un cambio es una buena practica.</p>
        </div>

        <h3 class="mb-0 font-light">¿Como guardo?</h3>
        <p  class="mt-1">Al tocar el boton guardar te descargara una archivo. Puedes sobreescribir el archivo anterior para que tenga los nuevos cambios o crear un archivo nuevo el cual sera una nueva version (como cuando usas "guardar como" en Excel).</p>
        
        <h3 class="mb-0 font-light">Privacidad</h3>
        <p class="mt-1">No compartas el archivo con quienes no necesitan los datos. No lo subas a redes sociales.</p>

        <div>
          <Button label="Guardar"  class="p-button-success" icon="pi pi-save" @click="downloadFile" />
        </div>
      </div>
  </div>
    

  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTerritoriosStore } from '@/store/territorios'
import { useMapStore } from '@/store/map'
const territorios = useTerritoriosStore()
const m = useMapStore()

const downloadFile = () => {
  //create or obtain the file's content
  let data = {
    version: 1,
    center: m.center,
    territorios: territorios.list
  }
  console.log("data", data)
  var content = JSON.stringify(data);
  //create a file and put the content, name and type
  var file = new File(["\ufeff"+content], 'miterritorio.territorio', {type: "text/plain:charset=UTF-8"});

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
.open {
  position: relative;
  width: 60%;
  height: 50px;
  overflow: none;
}
.open p {
  height: 100%;
  text-align: center;
}
.open  input{
  height: 100%;
  position: absolute;
  opacity: 0;
}
</style>
