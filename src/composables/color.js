import { computed } from 'vue';

export function terrColors(terr) {
  
  const color = computed({
    get: () => terr.color?.backgroundColor || 'rgb(255, 255, 254)',
    set: (value) => {
      console.log("se1t color", value)
      if (value === undefined) return
      terr.$patch({ 
        color: {
          backgroundColor: '#'+value,
          color: getContrastingColor(value),
        }
      })
    }
  })
  // expose managed state as return value
  return { color }
}


function getContrastingColor(backgroundColor) {
  // Convertir el color de fondo a RGB
  const r = parseInt(backgroundColor.substr(0, 2), 16);
  const g = parseInt(backgroundColor.substr(2, 2), 16);
  const b = parseInt(backgroundColor.substr(4, 2), 16);
  
  // Calcular la luminosidad del color de fondo
  const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  // Devolver un color de tipografía que contraste en base a la luminosidad
  if (luminosity > 128) {
    return '#000000';
  } else {
    return '#FFFFFF';
  }
}