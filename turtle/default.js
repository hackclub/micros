/*
  Hit the "docs" button to get started 
  drawing with Turtles!
*/

const w = 509;
const h = 579;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

t.setSize(241);

for (let i = 0; i < 430; i += 1) {
  t.setColor(`hsla(${25.3*i}, ${101}%, ${59}%, ${41}%)`)
  t.forward(i);
  t.right(87);
}