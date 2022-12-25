import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';

import "leaflet/dist/leaflet.css"

//primevue
import InputText from "primevue/inputtext";
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

// componentes creados
import Menu from '@/components/Menu/Menu.vue'
import MapaBase from '@/components/MapaBase/MapaBase.vue'
import TarjetaTerritorio from '@/components/TarjetaTerritorio/TarjetaTerritorio.vue'
import EditorTarjeta from '@/page/tarjeta/EditorTarjeta.vue'

const pinia = createPinia()
const app = createApp(App);

app
.use(PrimeVue)
.use(pinia)
.component('InputText', InputText)
.component('Button', Button)
.component('Sidebar', Sidebar)
.component('Menu', Menu)
.component('EditorTarjeta', EditorTarjeta)
.component('MapaBase', MapaBase)
.component('TarjetaTerritorio', TarjetaTerritorio)
.mount('#app');
