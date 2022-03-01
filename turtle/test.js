const w = 206;
const h = 359;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

for (let i = 0; i < 2; i += 1) {
  t.arc(-55, 46)
}