module.exports = {
  getIcons: (L) => {
    var n1 = L.icon({
      iconUrl: 'number/1-c.png',
      // shadowUrl: 'leaf-shadow.png',
  
      iconSize:     [32, 32], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var n2 = L.icon({ iconUrl: 'number/2-c.png', iconSize: [32, 32]});
    var n3 = L.icon({ iconUrl: 'number/3-c.png', iconSize: [32, 32]});
    var n4 = L.icon({ iconUrl: 'number/4-c.png', iconSize: [32, 32]});
    var n5 = L.icon({ iconUrl: 'number/5-c.png', iconSize: [32, 32]});
    var n6 = L.icon({ iconUrl: 'number/6-c.png', iconSize: [32, 32]});
    var n7 = L.icon({ iconUrl: 'number/7-c.png', iconSize: [32, 32]});
    var n8 = L.icon({ iconUrl: 'number/8-c.png', iconSize: [32, 32]});
    var n9 = L.icon({ iconUrl: 'number/9-c.png', iconSize: [32, 32]});

    return [
      n1, n2, n3, n4,
      n5,
      n6,
      n7,
      n8,
      n9,
    ]
  }
}