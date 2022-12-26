<template>
  
  <div ref="parent" class="back flex align-items-center justify-content-center">
    <!-- <div class="mapContainer" > -->
      <div class="shape" :style="shapeStyle">
        <iframe v-if="ready" :src="'/mapa.html?center='+center+'&listen='+listen+'&zoom='+activeZoom+'&limits='+JSON.stringify(limits)+'&mzNumbers='+JSON.stringify(mzNumbers)" frameborder="0" :style="iframeStyle"></iframe>
      </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue'
const props = defineProps({
  center: Array,
  limits: Array,
  mzNumbers: Array,
  listen: {type: String, default: 'false'},
  shape: { type: Number, default: 0 },
  rotate: { type: Number, default: 0 },
  zoom: { type: Number, default: 17 }
})
const parent = ref("null")
const ready = ref(false)
const shapeStyle = ref({ height: '50vh'})
const iframeStyle = ref({ height: '100vh'})
var activeShape = null;

watch(
  props,
  (props) => {
    reDraw(props.shape)
    rotateMap(props.rotate)
    zoomMap(props.zoom)
  },
  { deep: true }
)
var activeZoom = 17
const zoomMap = (zoom)  => {
  if (activeZoom === zoom) return
  activeZoom = zoom
  ready.value = false
  setTimeout(()=>{
    ready.value = true
  }, 200)
}

var mapAngle = 0
const rotateMap = (angle)  => {
  if (mapAngle === angle) return
  mapAngle = angle
  // console.log("rotateMap", angle)
  iframeStyle.value = {
    ...iframeStyle.value,
    transform: `rotate(${angle}deg)`
  }
}


const reDraw = (shape) => {
  if (shape == 0) return
  if (activeShape === shape) return
  activeShape = shape
  ready.value = false
  let ph = parent.value.offsetHeight
  let pw = parent.value.offsetWidth
  let h, w
  if (shape == 3){
    w = pw * .8
    h = w * 2
    if (h > ph){
      h = ph * .8
      w = h / 2
    }
  } else if (shape == 1){
    w = pw * .8
    h = w / 2
  } else if (shape == 2){
    if (ph < pw){
      h = ph * .8
      w = h
    } else {
      w = pw * .8
      h = w
    }
  }
  
 

  iframeStyle.value = {
    marginTop: -(h * .5) + "px",
    marginLeft: -(w * .5) + "px",
    height: (h * 2) + "px",
    width: (w * 2) + "px"
  }
  shapeStyle.value = {
    height: h + "px",
    width: w + "px",
    position: 'relative',
    overflow: 'hidden'
  }
  
  // console.log("activeShape", shape,  shapeStyle.value)
  setTimeout(()=>{
    ready.value = true
  }, 200)

}
onMounted(() => {
  reDraw(2)
  rotateMap(-18)
})

</script>

<style scoped>
.back {
  background-color: rgb(255, 251, 251);
  height: 100vh;
}
.shape {
  position: absolute;
}
</style>