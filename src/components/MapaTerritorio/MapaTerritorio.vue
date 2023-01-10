<template>
  <div ref="parent" class=" flex align-items-center justify-content-center" :class="{ back: listen != 'false' }" :style="style">
    <div class="shape" :style="shapeStyle">
      <!-- puntoEncuentro='+terr.puntoEncuentro+'& -->
      <iframe v-if="ready" :src="'/mapa.html?center='+center+'&listen='+listen+'&zoom='+activeZoom+'&limits='+JSON.stringify(limits)+'&mzNumbers='+JSON.stringify(mzNumbers)" frameborder="0" :style="iframeStyle"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits, computed } from 'vue'
const emit = defineEmits(['reDraw'])
const props = defineProps({
  center: Array,
  limits: Array,
  mapConfig: Object,
  mzNumbers: Array,
  terr: Object,
  listen: {type: String, default: 'false'},
  shape: { type: Number, default: 0 },
  rotate: { type: Number, default: 0 },
  zoom: { type: Number, default: 17 },

})
const parent = ref("null")
const ready = ref(false)
const shapeStyle = ref({ height: '50vh'})
const iframeStyle = ref({ height: '100vh'})
var activeShape = null;

const style = ref({})

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
  emit("reDraw", {h, w})
  // console.log("activeShape", shape,  shapeStyle.value)
  setTimeout(()=>{
    ready.value = true
  }, 200)

}
onMounted(() => {
  if (props.mapConfig){
      reDrawFromConfig()
      rotateMap(props.rotate)
      return
  } 
  
  reDraw(2)
  rotateMap(-18)
})

const reDrawFromConfig = () => {
  let pw = parent.value.offsetWidth
  let {h, w} = props.mapConfig
  // console.log("parent", pw, w)

  let percent = pw/w
  h = h * percent
  w = w * percent
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
  
  // console.log("props.zoom * percent", props.zoom,  percent.toFixed(1) )
  percent = percent.toFixed(1)
  let zoom = props.zoom
  // console.log("new percent ", percent)
  switch(percent){
    case '0.1': 
      zoom -= 3
      break;
    case '0.2': 
      zoom -= 2.3
      break;
    case '0.3': 
      zoom -= 1.8
      break;
    case '0.4': 
      zoom -= 1.2
      break;
    case '0.5': 
      zoom -= 1
      break;
    case '0.6': 
      zoom -= .60
      break;
    case '0.7': 
      zoom -= .30
      break;
    case '0.8': 
      zoom -= .20
      break;
    case '0.9': 
      zoom -= .10
      break;
    case '1.0': 
      // zoom = .10
      break;
    case '1.1': 
      zoom += .10
      break;
    case '1.2': 
      zoom += .30
      break;

  }
  // console.log("props.zoom", props.zoom,  zoom )
  zoomMap(zoom)
}

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