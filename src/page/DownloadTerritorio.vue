<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="px-8 py-4 surface-ground ">
    <!-- The `multiple` attribute lets users select multiple files. -->
    <div class="grid w-full h-full ">

      <div class="col bg-white  p-8 text-left line-height-3">
        <!-- <h3 class="mb-0 mt-0 font-light">Abrir</h3> -->
        <p class="mt-1">
          Para abrir o crear un nuevo archivo ve a la pagina de inicio. Ten en cuenta siempre guardar los cambios antes de abrir un nuevo archivo.
        </p>
        <div>
          <Button label="Pagina de Inicio" class="p-button-success" icon="pi pi-home" @click="confirm1('start')" />
        </div>
        <h1 class="font-light">Guardar datos</h1>

        <div>
          <p>Guardar la información cada vez que haces un cambio es una buena practica.</p>
        </div>
        <h3 class="mb-0 font-light">¿Como guardo?</h3>
        <p class="mt-1">Al tocar el boton guardar te descargara una archivo. Puedes sobreescribir el archivo anterior para
          que tenga los nuevos cambios o crear un archivo nuevo el cual sera una nueva version (como cuando usas "guardar
          como" en Excel).</p>
        <h3 class="mb-0 font-light">Privacidad</h3>
        <p class="mt-1">No compartas el archivo con quienes no necesitan los datos. No lo subas a redes sociales.</p>
        <div>
          <Button label="Guardar" class="p-button-success" icon="pi pi-save" @click="downloadFile" />
        </div>
        <h3 class="mb-0 font-light">Eliminar datos del navegador</h3>
        <p class="mt-1">Los datos han sido almacenados en la cache de este navegador para la persistencia cuando recargas
          la pantalla, para eliminarlos toca el boton eliminar. Te recomendamos descargar una copia de los datos antes de
          hacerlo presionando el boton Guardar.</p>
        <div>
          <Button label="Eliminar" class="p-button-danger" icon="pi pi-save" @click="confirm1('clear')" />
        </div>
        
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTerritoriosStore } from '@/store/territorios'
import { useSalidaStore } from "@/store/useSalidaStore";
import { useTrabajoStore } from "@/store/useTrabajoStore";
import { useMapStore } from '@/store/map'
import { useRouterStore } from '@/store/router'
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const territorios = useTerritoriosStore()
const trabajo = useTrabajoStore()
const salida = useSalidaStore();
const route = useRouterStore()

const m = useMapStore()
const confirm1 = (type) => {
    confirm.require({
        message: 'Se perderan los cambios que no haya guardado y descargado, ¿Deseas guardar y descargar los datos?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          await downloadFile();
          op_execute(type);
        },
        reject: () => {
          op_execute(type);
        }
    });
};

const op_execute = (type) => {
  if(type == 'start')
  {
    toStart();
  } else if (type == 'clear')
  {
    clear();
  }
}
const toStart = () => {
  route.$patch({ page: 'start' });
}

const downloadFile = () => new Promise((resolve, reject) => {
  //create or obtain the file's content
  let data = {
    version: 1,
    center: m.center,
    territorios: territorios.list,
    puntoEncuentro: territorios.puntoEncuentro,
    trabajo: trabajo.data,
    salida: {
      horarios: salida.horarios,
      conductores: salida.conductores,
      list: salida.list,
      history: salida.history
    }
  }
  // console.log("data", data)
  var content = JSON.stringify(data);
  const blob = new Blob([content], { type: 'application/json' });
  //create a file and put the content, name and type
  var file = new File([blob], 'miterritorio.json');

  //create a ObjectURL in order to download the created file
  let url = window.URL.createObjectURL(file);

  //create a hidden link and set the href and click it
  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);
  setTimeout(() => {
    return resolve();
  }, 1000);
})

const clear = () => {
  localStorage.clear()
  window.location.reload();
}
</script>

<style>
.open
{
  position: relative;
  width: 60%;
  height: 50px;
  overflow: none;
}

.open p
{
  height: 100%;
  text-align: center;
}

.open input
{
  height: 100%;
  position: absolute;
  opacity: 0;
}</style>
