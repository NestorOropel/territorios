import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', () => {
  // console.log("Location.pathname", document.location.pathname)
  let ruta = 'start'
  if (document.location.pathname == '/print') ruta = 'print'
  const page = ref(ruta)
  return { page }
})
