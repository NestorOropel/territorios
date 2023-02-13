<template>
  <div class="p-8 surface-ground w-screen min-h-screen">
    <!-- The `multiple` attribute lets users select multiple files. -->
    <div class="grid w-full h-full ">
      <div class="col bg-blue-600 text-white text-left p-8 line-height-3">
        <h1 class="font-light">¡Bienvenido!</h1>
        <h2 class="font-light">Ya puedes dibujar tus mapas de territorio de manera segura y privada.</h2>
        
        <div class="mt-5">
          <h3 class="mt-0 font-light">¿Ya tienes tu archivo .territorio?</h3>
          <p>Solo tienes que abrir el archivo en tu equipo y buscarlo. No olvides descargar la nueva versión una vez hayas terminado.</p>
          <FileUpload ref="fileInput" chooseLabel="Abrir" chooseIcon="pi pi-folder-open" uploadIcon="pi pi-folder-open" mode="basic" name="file" accept=".territorio,application/json" @select="fileChange" />
        </div>

        <div class="mt-5">
          <h3 class="mt-0 font-light">¿Aún no tienes tu archivo .territorio?</h3>
          <p>Solo tienes que hacer clic en 'Nuevo'. Cuando hayas terminado, no olvides descargar la última versión.</p>
          <Button label="Nuevo"  class="p-button-success" icon="pi pi-file" @click="newDoc" />
        </div>


        
      </div>
      <div class="col bg-white  p-8 text-left line-height-3">
        <h1 class="font-light">Información</h1>
        
        <h3 class="mt-0 font-light">¿Porqué es seguro y privado?</h3>
        <ul class="pl-3">
          <li>No almacena ningun dato.</li>
          <li>Todos los datos se procesan en el navegador, no se procesan en servidores externos.* </li>
          <li>Los datos solo llegan al navegador y se eliminan cuando cierras la página.</li>
          <li>El código fuente está disponible y puedes utilizarlo en tu equipo.</li>
        </ul>
        <p class="text-xs">
          * El sistema utiliza el servicio externo OpenStreeMap para mostrar los mapas.
        </p>

        <h3 class="font-light">¿Dónde estan los datos?</h3>
        <p>
          Como ejemplo, cuando abres Excel, la hoja de cálculo está vacía. Luego, cargas tus datos y los guardas en un archivo.
        </p>
        <p>
          Excel no guarda los datos, sino que los encuentra en el archivo que abres. De manera similar, aquí tienes un archivo .territorio que contiene tus datos. Este archivo se encuentra en tu equipo, no en esta aplicación web.
        </p>

        <h3 class="font-light">¿Porqué no guardamos datos?</h3>
        <ul class="pl-3">
          <li>Privacidad.</li>
          <li>Ahorro, guardar datos es caro.</li>
          <li>No es información que necesite estar diponible para muchos usuarios.</li>
        </ul>

        <p class="text-xs">
          Codigo fuente: <a href="https://github.com/NestorOropel/territorios" target="blank" >https://github.com/NestorOropel/territorios</a>
        </p>
        
      </div>
  </div>
    

  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouterStore } from '@/store/router'
import { useTerritoriosStore } from '@/store/territorios'
import { useMapStore } from '@/store/map'
const m = useMapStore()
const territorios = useTerritoriosStore()
const route = useRouterStore()
const fileInput = ref('null')
const newDoc = () => {
  territorios.$patch({list: [], activeId: null})
  m.$reset();
  route.$patch({page: "formTerritorio"});
}
const fileChange = (e) => {
  console.log("fileChange", e)
  try {
    let file = e.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (result) {
      // console.log( );
      let data = JSON.parse(result.target.result)
      for (let i = 0; i < data.territorios.length; i++) {
        if (!data.territorios[i].color) {
          data.territorios[i].color = {
            backgroundColor: 'rgb(255, 255, 254)',
            color: '#000000',
          }
        }
      }
      territorios.$patch({list: data.territorios})
      m.$patch({center: data.center || [-31.5653073, -68.5638051]})
      route.$patch({page: "listaTerritorio"});
    }
    reader.onerror = function (err) {
      console.error(err.target.result);
    }
  }
  catch(e){
    console.error(e)
    alert("Ocurrio un error. Recarga y vuelve a intentar.")
  }
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
