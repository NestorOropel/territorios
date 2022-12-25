export default {
  methods: {
    handleClick(){
      function onMapClick(e) {
        console.log("e", e)  
        alert("You clicked the map at " + e.latlng);
        this.map
      }
  
      this.map.on('click', onMapClick);
    },
    addListener(){
      let map = this.map
      this.map.on("moveend", function () {
        console.log(map.getCenter().toString());
      });
    }

  }
}