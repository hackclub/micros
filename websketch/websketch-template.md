# the JavaScript canvas

## tracking the mouse:
```
const mouse = { x: 0, y: 0 };
window.onmousemove = ev => (mouse.x = ev.pageX, mouse.y = ev.pageY);
```

## tracking which keys are down:
```
const keys = new Set();
window.onkeydown = ev => keys.add(ev.key);
window.onkeyup = ev => keys.delete(ev.key);

/* during your game's frame loop: */
  if (keys.has('w'))
    console.log("moving forward!");
```

## drawing something 60 times a second:

```
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext('2d');

(function frame() {
  ctx.fillRect(10, 10, 20, 20);
  requestAnimationFrame(frame);
})();
```

## making the square bob up and down so you can see it's animated:
```
  ctx.fillRect(10, 10 + 10*Math.sin(Date.now() * 0.0001), 20, 20);
```

## making sure your canvas is always full screen:
```
const canvas = document.getElementsByTagName("canvas")[0];

(window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeigh;
})();
```
