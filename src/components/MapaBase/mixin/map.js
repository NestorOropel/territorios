import L from "leaflet";
export default {
  props: {
    center: {
      type: Array
    }
  },
  data() {
    return {
      map: null,
    };
  },
  methods: {
    mountMap() {
      this.map = L.map("mapContainer").setView(this.center, 17);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.addListener();
      
      // getBounds()
    }
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
}