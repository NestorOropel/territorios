module.exports = {
  // getIcons: (L) => {
  //   var n1 = L.icon({ iconUrl: 'number/1-c.png', iconSize: [32, 32], alt: '1' });
  //   return [
  //     n1,
  //   ]let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // }
  getIcons: (L) => {
    const icons = [];
    for (let i = 0; i <= 99; i++) {
      const icon = L.icon({
        iconUrl: `number/${i}-c.png`,
        iconSize: [32, 32],
        alt: i.toString()
      });
      icons.push(icon);
    }
    return icons;
  }
}
