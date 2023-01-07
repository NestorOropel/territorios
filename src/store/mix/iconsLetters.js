module.exports = {
  // getIcons: (L) => {
  //   var n1 = L.icon({ iconUrl: 'number/1-c.png', iconSize: [32, 32], alt: '1' });
  //   return [
  //     n1,
  //   ]
  // }
  getIcons: (L) => {
    const icons = {};
    let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i in abecedario) {
      let letter = abecedario[i]
      const icon = L.icon({
        iconUrl: `letter/${letter.toLowerCase()}.png`,
        iconSize: [16, 16],
        alt: letter
      });
      icons[letter] = icon;
    }
    return icons;
  }
}
