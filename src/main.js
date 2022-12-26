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
import InputNumber from 'primevue/inputnumber';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import Slider from 'primevue/slider';

import FileUpload from 'primevue/fileupload';

// componentes creados
import Menu from '@/components/Menu/Menu.vue'
import MapaBase from '@/components/MapaBase/MapaBase.vue'
import MapaTerritorio from '@/components/MapaTerritorio/MapaTerritorio.vue'
import TarjetaTerritorio from '@/components/TarjetaTerritorio/TarjetaTerritorio.vue'
import EditorTarjeta from '@/page/tarjeta/EditorTarjeta.vue'
import DownloadTerritorio from '@/page/DownloadTerritorio.vue'
import ListaTerritorios from '@/page/ListaTerritorios.vue'
import PageStart from '@/page/PageStart.vue'


const pinia = createPinia()
const app = createApp(App);

app
.use(PrimeVue)
.use(pinia)
.component('InputText', InputText)
.component('InputNumber', InputNumber)
.component('Button', Button)
.component('Sidebar', Sidebar)
.component('Slider', Slider)
.component('FileUpload', FileUpload)
.component('Menu', Menu)
.component('PageStart', PageStart)
.component('EditorTarjeta', EditorTarjeta)
.component('MapaBase', MapaBase)
.component('MapaTerritorio', MapaTerritorio)
.component('ListaTerritorios', ListaTerritorios)
.component('TarjetaTerritorio', TarjetaTerritorio)
.component('DownloadTerritorio', DownloadTerritorio)
.mount('#app');
