<template>
  <div class="p-8 surface-ground w-screen min-h-screen">
    <!-- The `multiple` attribute lets users select multiple files. -->
    <div class="grid w-full h-full ">
      <div class="col bg-blue-600 text-white text-left p-8 line-height-3">
        <h1 class="font-light">¡Bienvenido!</h1>
        <h2 class="font-light">Ya puedes empezar a dibujar los mapas de tu territorio con seguridad y privacidad.</h2>
        
        <div class="mt-5">
          <h3 class="mt-0 font-light">¿Ya tienes tu archivo .territorio?</h3>
          <p>Solo toca abrir y buscalo en tu equipo. Recuerda tambien bajar la nueva versión una vez que termines.</p>
          <FileUpload ref="fileInput" chooseLabel="Abrir" chooseIcon="pi pi-folder-open" uploadIcon="pi pi-folder-open" mode="basic" name="file" accept=".territorio" @select="fileChange" />
        </div>

        <div class="mt-5">
          <h3 class="mt-0 font-light">¿Aun no tienes tu archivo .territorio?</h3>
          <p>Solo toca Nuevo. Recuerda tambien bajar la nueva versión una vez que termines.</p>
          <Button label="Nuevo"  class="p-button-success" icon="pi pi-file" @click="newDoc" />
        </div>


        
      </div>
      <div class="col bg-white  p-8 text-left line-height-3">
        <h1 class="font-light">Información</h1>
        
        <h3 class="mt-0 font-light">¿Porque es seguro y privado?</h3>
        <ul class="pl-3">
          <li>No guarda datos.</li>
          <li>Todos los datos se procesan en el navegador, no se procesan en servidores externos*. </li>
          <li>Los datos solo llegan al navegador y son borrados cuando cierras la pagina.</li>
          <li>El codigo fuente esta disponible y puedes implementarlo en tu equipo.</li>
        </ul>
        <p class="text-xs">
          * El sistema utiliza el servicio externo OpenStreeMap para mostrar los mapas.
        </p>

        <h3 class="font-light">¿Donde estan los datos?</h3>
        <p>
          Tomemos como ejemplo a Excel, al abrir Excel lo encontras sin datos, cargas los datos y guardas en un archivo lo que hiciste.
        </p>
        <p>
         Excel no tiene los datos, los tiene el archivo, si queres trabajar con los datos abris el archivo en Excel. De la misma manera aqui. Tendras un archivo .territorio que tendra los datos, el archivo con los datos estara en tu equipo, no en esta aplicación web.
        </p>

        <h3 class="font-light">¿Porque no guardamos datos?</h3>
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
const route = useRouterStore()
const fileInput = ref('null')
const newDoc = () => {
  route.$patch({page: "home"});
}
const fileChange = (e) => {
  console.log("fileChange", e)
  try {
    let file = e.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (data) {
      console.log( JSON.parse(data.target.result));
      route.$patch({page: "home"});
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
