<script setup>
import { useSalidaStore } from '@/store/useSalidaStore';
import Dropdown from 'primevue/dropdown';
import Chips from 'primevue/chips';
import { computed, defineEmits, defineProps } from 'vue';

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  dropdown: {
    type: Boolean,
    default: false
  }
});

const salida = useSalidaStore();

const val = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
})
</script>
<template>
  <div>
    <div v-if="!props.dropdown" class="p-fluid">
      <div class="pb-2">
        Conductores de salidas:
      </div>
      <Chips v-model="salida.conductores" separator="," placeholder="Separar valores con coma (,)" class="w-full" />
    </div>
    <div v-else class="p-fluid">
      <div class="pb-2">
        Conductor:
      </div>
      <Dropdown v-model="val" :options="salida.conductores" placeholder="Seleccione hora" class="w-full" />
    </div>

  </div>
</template>