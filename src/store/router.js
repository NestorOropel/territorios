import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router',
  () => {
    // console.log("Location.pathname", document.location.pathname)
    let ruta = 'start'
    if (document.location.pathname == '/print') ruta = 'print'
    
    
    const page = ref(null)

    setTimeout(() => {
      if (document.location.pathname == '/map') {
        page.value = 'map_viewer'
        return
      }

      if (document.location.pathname == '/informe') {
        page.value = 'registroTrabajado'
        return
      }

      if (page.value == 'map_viewer') {
        page.value = 'start'
      }

      

      if (!page.value) {
        page.value = ruta
      }

    }, 200);
    
    
    return {
      page,
    }


  },
  { 
    persist: {
    key: 'router',
    storage: localStorage,
    debug: true,
  }
})
