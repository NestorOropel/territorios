<template>
  <div class="hello">
    <MapaBase 
      class="map" 
      :center="[-31.5653073,-68.5638051]"
    ></MapaBase>
  </div>
</template>

<script>
import MapaBase from '@/components/MapaBase/MapaBase.vue'
export default {
  components: {
    MapaBase
  },
  name: 'TestMapa',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* map {
  width: 50%;
  height: 50%;
} */
</style>
