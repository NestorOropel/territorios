<template>
  <div class="p-8 surface-ground w-screen h-screen">
    <!-- The `multiple` attribute lets users select multiple files. -->
    <div class="grid w-full h-full ">
      <div class="col bg-blue-600 text-white text-left p-4 line-height-3">
        <h1 class="font-light">¡Bienvenido!</h1>
        <h2 class="font-light">Ya puedes empezar a dibujar los mapas de tu territorio con seguridad y privacidad.</h2>
        
        <h5 class="mt-8 mb-1">Información</h5>
        <h3 class="mt-0 font-light">¿Porque es seguro y privado?</h3>
        <ul class="pl-3">
          <li>No guarda datos.</li>
          <li>Todos los datos se procesan en el navegador, no se procesan en servidores externos. *</li>
          <li>Los datos solo llegan al navegador y son borrados cuando cierras la pagina</li>
          <li>El codigo fuente esta disponible y puedes implementarlo en tu equipo.</li>
        </ul>
        <p class="text-xs">
          * El sistema utiliza el servicio externo OpenStreeMap para mostrar los mapas.
        </p>

        <h3 class="font-light">¿Donde estan los datos?</h3>
        <p>
          Tomemos como ejemplo a Excel, para usarlo tu al abrir Excel lo encuentras sin datos, cargas los datos y guardas en un archivo lo que hicieste. Excel no tiene los datos, lo tiene el archivo, si quieres trabajar con los datos abres el archivo. De la misma manera aqui. Tendras un archivo .territorio que tendra los datos, el archivo con los datos estara en tu equipo, no en Internet.
        </p>

        <h3 class="font-light">¿Porque no guardamos datos?</h3>
        <p>Facil, en primer lugar privacidad y segundo que guardar datos es caro.</p>

        <p class="text-xs">
          Codigo fuente: <a href="https://github.com/NestorOropel/territorios" target="blank" class="text-white">https://github.com/NestorOropel/territorios</a>
        </p>


        
      </div>
      <div class="col bg-white  p-4">
        <input ref="fileInput" type="file" id="file-selector" accept=".territorio" @change="fileChange" />
      </div>
  </div>
    

  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouterStore } from '@/store/router'
const route = useRouterStore()
const fileInput = ref('null')

const fileChange = (e) => {
  console.log("fileChange", e.target.files)
  try {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (e) {
      console.log( JSON.parse(e.target.result));
    }
    reader.onerror = function (e) {
      console.error(e.target.result);
    }
  }
  catch(e){
    console.error(e)
    alert("Ocurrio un error. Recarga y vuelve a intentar.")
  }
}




</script>
