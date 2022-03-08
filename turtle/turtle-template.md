# Turtle Art in JavaScript

Let's make some art with the turtle. The turtle is a little creature that carries around a pen which it can lift `up()` or put `down()`. 

You can tell the turtle to move `forward(distance)` and to turn `right(angle)` or `left(angle)`. 

You can also change the `setColor("color")` and the `setSize(number)`.

We have only a few functions we need to learn and they are all listed below.

```
const width = 300;
const height = 300;

setCanvasSize(width, height); // set the canvas size
fillScreen("white"); // set the background

const t = createTurtle(150, 150); // create a drawing turtle with starting x and y

t.forward(30) // go forward and leave a trail
t.setColor("blue") // change the color
t.right(45); // turn right 45 degrees
t.arc(32, 40); // make and arc with angle 32 and radius 40
t.left(30); // turn left 30 degrees
t.setSize(3); // set the pen size
t.goto(50, 200); // go to x 50 and y 200
t.setAngle(90); // set the angle to 90 degrees
t.up(); // pick up the pen so you don't draw
t.forward(40);
t.down(); // put down the pen so you do draw
t.forward(30);

t.startFill(); // begin tracking points to fill shape
t.setColor("red");
t.arc(130, 50);
t.endFill(); // fill in shape

```

That's every command you need to learn.

With just a few of them you can make amazing patterns like this:

<img width="300" src="https://cloud-kqt6eg66r-hack-club-bot.vercel.app/0screen_shot_2022-02-24_at_10.20.46_am.png" alt="pattern"></img>

## Challenges

See if you can make these patterns:

**Squiral:**

<img width="300" src="https://cloud-iv130nu4p-hack-club-bot.vercel.app/0screen_shot_2022-02-24_at_10.23.00_am.png" alt="squiral"></img>

```js
setCanvasSize(300, 300);
fillScreen("white");

const t = createTurtle(150, 150);

t.setSize(2)

for (let i = 0; i < 430; i += 5) {
  t.forward(i);
  t.right(90);
}
```

**Dashed Line:**

![dashed line](https://user-images.githubusercontent.com/27078897/156391799-8bdccc18-f53f-461a-b9d7-ec117d3a7412.png)

```js
setCanvasSize(300, 300);
fillScreen("white");

const t = createTurtle(0, 150);

t.setSize(2);

for (let i = 0; i < 430; i += 1) {
  t.up();
  if (i % 2 === 0) t.down();
  t.forward(14);
}
```

**Alternating Arcs:**

![alternating arcs](https://user-images.githubusercontent.com/27078897/156395531-d3768b16-e2d5-407d-8903-cc9d39ff4a5c.png)

```js
setCanvasSize(300, 300);
fillScreen("white");

const t = createTurtle(161, 150);

for (let i = 0; i < 18; i += 1) {
  let angle = (i % 2 === 0 ? -1 : 1) * 232;
  t.arc(angle, 11);
  t.right(20);
}
```

**Shrinking Squares:**

![squares](https://user-images.githubusercontent.com/27078897/156402582-91c40880-4c6f-46c5-b313-b49d133e97ff.png)

```js
const w = 300;
const h = 300;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

t.setSize(0);

function rect(x, y, w, h) {
  t.up();
  t.goto(x - w/2, y - h/2);
  t.down();
  t.setAngle(0);
  t.forward(w);
  t.right(90);
  t.forward(h);
  t.right(90);
  t.forward(w);
  t.right(90);
  t.forward(h);
}

for (let i = 30; i > 1; i -= 3) {
  t.startFill();
  t.setColor(`hsla(${360/10*i}, ${100}%, ${71}%, ${100}%)`);
  rect(w/2, h/2, i*10, i*10);
  t.endFill();
}

```

**Random Dots**

![random dots](https://user-images.githubusercontent.com/27078897/156422518-09727e3a-f0c7-4d89-ba05-ce3cd23d1943.png)

```js
const w = 300;
const h = 300;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

t.setSize(36);
t.setColor(`rgba(0, 0, 0, ${68}%)`);

const random = (min, max) => Math.random()*(max-min) + min;

for (let i = 0; i < 12; i += 1) {
  t.up();
  t.goto(random(5, 278), random(33, 265));
  t.down();
  t.forward(0);
}
```

**Follow the Sines**

![sine rectangles](https://user-images.githubusercontent.com/27078897/156425746-5f2e02d8-ae91-46f7-ab3a-6af25f46909e.png)

```js
const w = 300;
const h = 300;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

t.setSize(0);

function rect(x, y, w, h) {
  t.up();
  t.goto(x - w/2, y - h/2);
  t.down();
  t.setAngle(0);
  t.forward(w);
  t.right(90);
  t.forward(h);
  t.right(90);
  t.forward(w);
  t.right(90);
  t.forward(h);
}

for (let i = 0; i < 252; i += 1) {
  t.startFill();
  t.setColor(`hsla(${360/10*i}, ${100}%, ${73}%, ${63}%)`);
  rect(i*2 + -73, Math.sin(i/10)*77+157, -57 , 3);
  t.endFill();
}
```

**Bright**

![bright](https://user-images.githubusercontent.com/27078897/156447502-3380f3bf-a340-437a-a747-bccff2392521.png)

```js
const w = 300;
const h = 300;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

for (let i = 65; i > 1; i--) {
  t.up();
  t.goto(w/2, h/2);
  t.down();
  t.setSize(i*4);
  t.setColor(`hsla(${67-i}, ${100}%, ${70}%, ${35}%)`);
  t.forward(0);
}
```

## Useful Snippets

Random number:

```js
const random = (min, max) => Math.random()*(max-min) + min;
```

Change color:

```js
turtle.setColor(`hsla(${66}, ${104}%, ${70}%, ${84}%)`);
```

Oscillations:

```
Math.sin(t/frequency)*amplitude+baseline
```

## Miscellaneous

[GitHub of this document.](https://github.com/hackclub/micros/blob/main/turtle/turtle-template.md)


