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

**Dashed Line:**

![dashed line](https://user-images.githubusercontent.com/27078897/156391799-8bdccc18-f53f-461a-b9d7-ec117d3a7412.png)

**Alternating Arcs:**

![alternating arcs](https://user-images.githubusercontent.com/27078897/156395531-d3768b16-e2d5-407d-8903-cc9d39ff4a5c.png)

**Shrinking Squares:**

![squares](https://user-images.githubusercontent.com/27078897/156402582-91c40880-4c6f-46c5-b313-b49d133e97ff.png)

**Random Dots**

![random dots](https://user-images.githubusercontent.com/27078897/156422518-09727e3a-f0c7-4d89-ba05-ce3cd23d1943.png)

**Follow the Sines**

![sine rectangles](https://user-images.githubusercontent.com/27078897/156425746-5f2e02d8-ae91-46f7-ab3a-6af25f46909e.png)

**Bright**

![bright](https://user-images.githubusercontent.com/27078897/156447502-3380f3bf-a340-437a-a747-bccff2392521.png)

**Errode**

![errode](https://user-images.githubusercontent.com/27078897/156428926-71e77279-039f-4162-bb71-81f4cca72fb8.png)

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


