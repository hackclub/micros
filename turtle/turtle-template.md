# Turtle Art in JavaScript

Let's make some art with the turtle.

We have only a few functions we need to learn.

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

![pattern](https://cloud-kqt6eg66r-hack-club-bot.vercel.app/0screen_shot_2022-02-24_at_10.20.46_am.png)

## Challenges

See if you can make this pattern:

![squiral](https://cloud-iv130nu4p-hack-club-bot.vercel.app/0screen_shot_2022-02-24_at_10.23.00_am.png)


## Useful Snippets

Change color:

```js
setCanvasSize(300, 300);
fillScreen("white");

const t = createTurtle(0, 150);

t.setSize(30);
t.setColor(`hsla(${66}, ${104}%, ${70}%, ${84}%)`);
```

Making a rectangle:
```js
const w = 430;
const h = 297;

setCanvasSize(w, h);
fillScreen("white");

const t = createTurtle(w/2, h/2);

t
  .setSize(0)
  .startFill()
  .forward(143)
  .right(90)
  .forward(75)
  .right(90)
  .forward(143)
  .setColor(`hsla(${92}, ${100}%, ${56}%, ${120}%)`)
  .endFill()
```

