/*
  Hit the "docs" button to get started
  writing generative pixel art!
*/

render({
    size: [300, 300],
    forEachPixel(x, y) {
      const [r, g, b, a] = sample(x, y);
      return [r + x, g + y, b, a];
    }
})
