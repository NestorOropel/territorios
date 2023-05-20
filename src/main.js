import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { resetStore } from '@/store/plugins/reset-store'

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
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';
import MultiSelect from 'primevue/multiselect';
import DataTable from "primevue/datatable";

// componentes creados
import Menu from '@/components/Menu/Menu.vue'
import MapaBase from '@/components/MapaBase/MapaBase.vue'
import MapControl from '@/components/MapControl/MapControl.vue'
import MapaTerritorio from '@/components/MapaTerritorio/MapaTerritorio.vue'
import TarjetaTerritorio from '@/components/TarjetaTerritorio/TarjetaTerritorio.vue'
import EditorTarjeta from '@/page/EditorTarjeta.vue'
import DownloadTerritorio from '@/page/DownloadTerritorio.vue'
import ListaTerritorios from '@/page/ListaTerritorios.vue'
import MapaTerritorios from '@/page/MapaTerritorios.vue'
import PageStart from '@/page/PageStart.vue'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(resetStore)
const app = createApp(App);

app
.use(PrimeVue)
.use(pinia)
.component('InputText', InputText)
.component('InputNumber', InputNumber)
.component('Button', Button)
.component('Sidebar', Sidebar)
.component('Slider', Slider)
.component('Textarea', Textarea)
.component('FileUpload', FileUpload)
.component('SelectButton', SelectButton)
.component('MultiSelect', MultiSelect)
.component('DataTable', DataTable)
.component('Menu', Menu)
.component('PageStart', PageStart)
.component('EditorTarjeta', EditorTarjeta)
.component('MapaBase', MapaBase)
.component('MapControl', MapControl)
.component('MapaTerritorio', MapaTerritorio)
.component('ListaTerritorios', ListaTerritorios)
.component('MapaTerritorios', MapaTerritorios)
.component('TarjetaTerritorio', TarjetaTerritorio)
.component('DownloadTerritorio', DownloadTerritorio)
.mount('#app');
