



let rotX = 0;
let rotY = 0;
let colores = ['#8CF483', '#FF2DDC', '#2DAFFF'];
let colorActual = 0;
let particulas = [];
let orbitadores = [];
let tam = 150;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  container = document.getElementById('heroCanvasContainer');
const w = container.offsetWidth;
const h = container.offsetHeight;
let canvas = createCanvas(w, h, WEBGL);
canvas.parent(container);

}

function draw() {
  background(0);

  rotX = map(mouseY, 0, height, -PI / 2, PI / 2);
  rotY = map(mouseX, 0, width, -PI, PI);

  push();
  rotateX(rotX);
  rotateY(rotY);


  for (let g = 4; g > 0; g--) {
    strokeWeight(g * 2);
    let col = color(colores[colorActual]);
    col.setAlpha(30);
    stroke(col);
    noFill();
    box(tam + g);
  }

  
  strokeWeight(3);
  stroke(colores[colorActual]);
  noFill();
  box(tam);

  
  for (let i = 0; i < orbitadores.length; i++) {
    let o = orbitadores[i];
    o.ang += o.vel;

    let x = cos(o.ang) * o.r;
    let z = sin(o.ang) * o.r;
    let y = o.y;

    push();
    translate(x, y, z);
    noStroke();
    fill(255, 150);
    sphere(4);
    pop();
  }

  pop();

  
  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];
    p.pos.add(p.vel);
    p.life -= 5;

    push();
    translate(p.pos.x, p.pos.y, p.pos.z);
    noStroke();
    fill(p.col.levels[0], p.col.levels[1], p.col.levels[2], p.life);
    sphere(3);
    pop();

    if (p.life <= 0) {
      particulas.splice(i, 1);
    }
  }
}

function mousePressed() {
  colorActual++;
  if (colorActual >= colores.length) {
    colorActual = 0;
  }

  for (let i = 0; i < 40; i++) {
    let vel = p5.Vector.random3D().mult(random(2, 5));
    particulas.push({
      pos: createVector(0, 0, 0),
      vel: vel,
      life: 255,
      col: color(colores[colorActual])
    });
  }
}


function windowResized() {
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  resizeCanvas(w, h);
};

