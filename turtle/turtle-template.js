document.body.innerHTML = `
  <style>
    body {
      margin: 0px;
    }
    
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      background: darkgrey;
      overflow: scroll;
    }

    .options {
      display: flex;
      position: fixed;
      right: 20px;
      bottom: 20px;
    }

    canvas {
      background: white;
    }
  </style>

  <main>
    <canvas></canvas>
    <div class="options">
      <span>draw turtles:</span>
      <input type="checkbox" checked="true" class="draw-turtles"></input>
    </div>
  </main>
`

const norm = vec => {
  const mag = Math.sqrt(vec[0]**2 + vec[1]**2);

  return [vec[0]/mag, vec[1]/mag];
}

class Turtle {
  constructor(canvas) {
    this.drawing = true;
    this.location = { x: 0, y: 0 };
    this.angle = 0;
    this.size = 1;
    this.color = "black";
    this.strokeType = "round";

    this._fillArray = [];
    this._ctx = canvas.getContext("2d");

    this._ctx.lineCap = "round";
  }

  up() {
    this.drawing = false;

    return this;
  }

  down() {
    this.drawing = true;

    return this;
  }

  setStrokeType(type) { // round | flat
    this.strokeType = type;

    return this;
  }

  goto(x, y) {
    
    if (this.drawing) {
      this._ctx.lineWidth = this.size === 0 ? 0.000000001 : this.size;
      this._ctx.strokeStyle = this.color;
      this._ctx.fillStyle = this.color; 

      const dx = x - this.location.x;
      const dy = y - this.location.y;

      // const angle = Math.atan2(dy/dx);
      // // const corner

      // const corner0 = [
      //   this.location.x 
      // ]

      const normVec = norm([ dx, dy ]);
      const backtrack = this.strokeType === "flat" ? -5 : 0;
      
      this._ctx.beginPath();
      this._ctx.moveTo(
        this.location.x + normVec[0] * backtrack, 
        this.location.y + normVec[1] * backtrack
      )
      this._ctx.lineTo(
        x, 
        y
      );
      this._ctx.stroke();

      // if (this.strokeType === "round") {
      //   const radius = this.size/2;

      //   this._ctx.beginPath();
      //   this._ctx.arc(this.location.x, this.location.y, radius, -Math.PI/2, Math.PI/2, true);
      //   this._ctx.fill();
        
      //   this._ctx.beginPath();
      //   this._ctx.arc(x, y, radius, Math.PI/2, -Math.PI/2, true);
      //   this._ctx.fill();
      // }
    }


    this.location = { x, y };
    this._fillArray.push(this.location);
    
    return this;
  }

  startFill() {
    this._fillArray = [this.location];

    return this;
  }

  endFill() {
    if (this._fillArray.length <= 1) return

    const c = this._ctx;
    c.fillStyle = this.color; 
    c.beginPath();
    const [first, ...rest] = this._fillArray;

    c.moveTo(first.x, first.y);
    rest.forEach(p => c.lineTo(p.x, p.y));
    c.fill();

    return this;
  }

  forward(distance) {
    const last = this.location;
    const a = this.angle/180 * Math.PI;
    const x = last.x + distance * Math.cos(a);
    const y = last.y + distance * Math.sin(a);

    this.goto(x, y);

    return this;
  }

  arc(angle, radius) {
    const theta = Math.abs(angle);
    
    const length = radius*theta/180*Math.PI;

    const ogAngle = this.angle;
    const thetaStep = 1;
    const steps = theta/thetaStep;
    const distanceStep = length/steps;

    for (let i = 0; i < steps; i++) {
      if (angle >= 0) this.right(thetaStep);
      else this.left(thetaStep);

      this.forward(distanceStep);
    }

    this.setAngle(ogAngle + angle);

    return this;
  }

  setAngle(theta) {
    this.angle = theta;

    return this;
  }

  right(theta) {
    this.angle += theta;

    return this;
  }

  left(theta) {
    this.angle -= theta;

    return this;
  }

  setSize(newSize) {
    this.size = newSize >= 0 ? newSize : 0;

    return this;
  }

  setColor(newColor) {
    this.color = newColor;
    
    return this;
  }

  
}

// STATE
let turtles = [];
let drawTurtles = true;


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.translate(0.5, 0.5);

function setCanvasSize(width, height) {
  canvas.width = width;
  canvas.height = height;
}


function createTurtle(x, y) {
  const t = new Turtle(canvas);
  t.up().goto(x, y).down();
  turtles.push(t);
  return t;
}

function fillScreen(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTurtle(t) {
  const startX = t.location.x;
  const startY = t.location.y;

  ctx.save();
  ctx.translate(startX, startY);
  ctx.rotate((t.angle-90)*Math.PI/180);
  ctx.translate(-startX, -startY)

  ctx.beginPath()
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX - 5, startY - 10)
  ctx.lineTo(startX + 5, startY - 10)
  ctx.lineTo(startX, startY)
  ctx.stroke()
  ctx.closePath()

  ctx.fillStyle = "green";
  ctx.fill();

  ctx.restore();
}

document
  .querySelector(".draw-turtles")
  .addEventListener("input", () => {
    drawTurtles = !drawTurtles;
  })


// whole template is run on initialization
// when code is sent this function is run
export default function(program) {
  const func = new Function("setCanvasSize", "fillScreen", "createTurtle", program);
  fillScreen("white");
  turtles = [];

  func(setCanvasSize, fillScreen, createTurtle);

  if (drawTurtles) {
    turtles.forEach(drawTurtle);
  }
}


