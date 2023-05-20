<script setup>
import { useTerritoriosStore } from "@/store/territorios";

const territorios = useTerritoriosStore();

const fileChange = (e) => {
  console.log("fileChange", e, territorios.list.value)
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
      console.log("data.territorios", data.territorios)
      territorios.$patch({
        list: [
          ...territorios.list,
          ...data.territorios
        ]
      })
      
      // route.$patch({page: "listaTerritorio"});
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
<template>
  <FileUpload ref="fileInput" chooseLabel="Importar" chooseIcon="pi pi-file-import" uploadIcon="pi pi-file-import" mode="basic" name="file" accept=".territorio,application/json" @select="fileChange" />
</template>