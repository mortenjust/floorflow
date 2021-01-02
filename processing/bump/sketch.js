var px, py, x, y;

function setup() {
   createCanvas(640, 480);
 
}

function draw() {
  
  x = random(3);
  y = random(3)
  
  line(px, py, x, y);
  px = x; py = y;
  
}