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
imgput.oninput = () => {
  const fr = new FileReader();
  fr.onloadend = () => {
    img.onload = () => evaluate(lastProgram);
    img.src = fr.result;
  }
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
  let m = (Math.round(x * 5) % 2) ^ (Math.round(y * 5) % 2);
  return [m, 0, m, 1];
};

// whole template is run on initialization
// when code is sent this function is run
export default function evaluate(program) {
  if (program === null) return;
  lastProgram = program;

  const imgData = imgput.files.length ? getImageData(img) : undefined;
  const { size: [w, h], forEachPixel } = new Function("sample", program)(
    !imgData ? defaultTex : (x, y) => {
      const { width: w, height: h } = img;
      const realMod = (x, n) => ((x % n) + n) % n

      const i = (Math.floor(realMod(x * w, w)) * w + Math.floor(realMod(y * h, h))) * 4;
      return [...imgData.data.slice(i, i+4)].map(x => x / 255);
    }
  );

  canvas.width = w, canvas.height = h;

  const pixels = new Uint8ClampedArray(w * h * 4);
  let wtr = 0;

  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++) {
      const [r, g, b, a = 255] = forEachPixel(x/w, y/h).map(x => x * 255);
      pixels[wtr++] = r;
      pixels[wtr++] = g;
      pixels[wtr++] = b;
      pixels[wtr++] = a;
    }

  ctx.putImageData(new ImageData(pixels, w, h), 0, 0);
}
