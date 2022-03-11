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
      <input 
        type="file" 
        id="img" 
        name="img" 
        accept="image/*">
      </input>
    </div>
  </main>
`

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let lastProgram = null;

const imgput = document.getElementById("img");
let img = new Image();
const setImgSrc = src => {
  console.log(src);
  img.onload = () => evaluate(lastProgram);
  img.src = src;
}
setImgSrc("default.png");
imgput.oninput = () => {
  const fr = new FileReader();
  fr.onloadend = () => setImgSrc(fr.result);
  fr.readAsDataURL(imgput.files[0]);
}

const getImageData = img => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width, canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}

/* returns a magenta and black checkerboard */
const defaultTex = (x, y) => {
  x = Math.abs(x), y = Math.abs(y);
  let m = (Math.round(x * 5) % 2) ^ (Math.round(y * 5) % 2);
  return [m, 0, m, 1];
};

const mix = (a, b, t) => Array.from(
  { length: 4 },
  (_, i) => Math.max(0, Math.min(1, a[i] + (b[i] - a[i]) * t)),
)

const distance = (a, b) => {
  const dx = a[0] - b[0],
        dy = a[1] - b[1];
  return Math.sqrt(dx*dx + dy*dy);
}

const angleBetween = (a, b) => {
  return Math.atan2(a[1] - b[1], a[0] - b[0]) * (180/Math.PI) + 180;
}

const angleToPos = angle => [Math.cos(angle * (Math.PI/180)),
                             Math.sin(angle * (Math.PI/180))];

let renderloop;
const render = ({ size: [w, h], forEachPixel }) => {
  canvas.width = w, canvas.height = h;

  if (renderloop != undefined)
    cancelAnimationFrame(renderloop);

  let first;
  (function frame(ts) {
    first = first || ts;
    const secs = (ts - first) / 1000;

    const pixels = new Uint8ClampedArray(w * h * 4);
    let wtr = 0;

    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const [r, g, b, a = 255] = forEachPixel(x/w, y/h, secs).map(x => x * 255);
        pixels[wtr++] = r;
        pixels[wtr++] = g;
        pixels[wtr++] = b;
        pixels[wtr++] = a;
      }

    ctx.putImageData(new ImageData(pixels, w, h), 0, 0);
    renderloop = requestAnimationFrame(frame);
  })();
}

// whole template is run on initialization
// when code is sent this function is run
export default function evaluate(program) {
  if (program === null) return;
  lastProgram = program;

  const imgData = imgput.files.length ? getImageData(img) : undefined;
  const sample = !imgData ? defaultTex : (x, y) => {
    const { width: w, height: h } = img;
    const realMod = (x, n) => ((x % n) + n) % n

    const i = (Math.floor(realMod(y * h, h)) * w + Math.floor(realMod(x * w, w))) * 4;
    return [...imgData.data.slice(i, i+4)].map(x => x / 255);
  }

  const helpers = { mix, render, distance, sample, angleBetween, angleToPos };
  new Function(...Object.keys(helpers), program)(...Object.values(helpers));
}
