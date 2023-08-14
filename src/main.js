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
import ConfirmationService from 'primevue/confirmationservice';

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
.use(PrimeVue, {
  locale: {
    "startsWith": "Comience con",
    "contains": "Contenga",
    "notContains": "No contenga",
    "endsWith": "Termine con",
    "equals": "Igual a",
    "notEquals": "Diferente a",
    "noFilter": "Sin filtro",
    "lt": "Menor que",
    "lte": "Menor o igual a",
    "gt": "Mayor que",
    "gte": "Mayor o igual a",
    "dateIs": "Fecha igual a",
    "dateIsNot": "Fecha diferente a",
    "dateBefore": "Fecha antes de",
    "dateAfter": "Fecha después de",
    "custom": "Personalizar",
    "clear": "Limpiar",
    "apply": "Aplicar",
    "matchAll": "Coincidir todo",
    "matchAny": "Coincidir con cualquiera",
    "addRule": "Agregar regla",
    "removeRule": "Eliminar regla",
    "accept": "Sí",
    "reject": "No",
    "choose": "Escoger",
    "upload": "Subir",
    "cancel": "Cancelar",
    "dayNames": [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ],
    "dayNamesShort": [
        "Dom",
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb"
    ],
    "dayNamesMin": [
        "D",
        "L",
        "M",
        "X",
        "J",
        "V",
        "S"
    ],
    "monthNames": [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ],
    "monthNamesShort": [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
    ],
    "today": "Hoy",
    "weekHeader": "Sem",
    "firstDayOfWeek": 1,
    "showMonthAfterYear": false,
    "dateFormat": "dd/mm/yy",
    "weak": "Débil",
    "medium": "Medio",
    "strong": "Fuerte",
    "passwordPrompt": "Escriba una contraseña",
    "emptyFilterMessage": "Sin opciones disponibles",
    "emptyMessage": "No se han encontrado resultados",
    "aria": {
        "trueLabel": "Verdadero",
        "falseLabel": "Falso",
        "nullLabel": "No seleccionado",
        "star": "1 estrella",
        "stars": "{star} estrellas",
        "selectAll": "Seleccionar todos",
        "unselectAll": "Deseleccionar todos",
        "close": "Cerrar",
        "previous": "Anterior",
        "next": "Siguiente",
        "navigation": "Navegación",
        "scrollTop": "Desplazarse arriba",
        "moveTop": "Mover arriba",
        "moveUp": "Subir",
        "moveDown": "Bajar",
        "moveBottom": "Desplazarse abajo",
        "moveToTarget": "Mover al objectivo",
        "moveToSource": "Mover al fuente",
        "moveAllToTarget": "Mover todo al objetivo",
        "moveAllToSource": "Mover todo al fuente",
        "pageLabel": "{page}",
        "firstPageLabel": "Primera Página",
        "lastPageLabel": "Última Página",
        "nextPageLabel": "Siguiente Página",
        "previousPageLabel": "Página Anterior",
        "rowsPerPageLabel": "Filas por página",
        "jumpToPageDropdownLabel": "Ir al menú desplegable de página",
        "jumpToPageInputLabel": "Ir a la entrada de página",
        "selectRow": "Seleccionar fila",
        "unselectRow": "Desmarcar fila",
        "expandRow": "Expandir Fila",
        "collapseRow": "Reducir Fila",
        "showFilterMenu": "Mostrar menú del filtro",
        "hideFilterMenu": "Ocultar menú del filtro",
        "filterOperator": "Operador de filtro",
        "filterConstraint": "Restricción de filtro",
        "editRow": "Editar fila",
        "saveEdit": "Guardar editado",
        "cancelEdit": "Cancelar editado",
        "listView": "Vista de lista",
        "gridView": "Vista de cuadrícula",
        "slide": "Deslizar",
        "slideNumber": "{slideNumber}",
        "zoomImage": "Ampliar imagen",
        "zoomIn": "Ampliar",
        "zoomOut": "Reducir",
        "rotateRight": "Girar derecha",
        "rotateLeft": "Girar izquierda"
     }
}
})
.use(ConfirmationService)
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
