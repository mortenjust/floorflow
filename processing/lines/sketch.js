// http://localhost/processing/lines/

var px, py, x = 0, y = 0
var xspeed = .03;
var yspeed = 3;

var places = [];
places[0] = 3;
places[1] = 2;
places[2] = 5;


function setup() {
createCanvas(640,480)

	
		
	px = 0; 
	py = height*.5;

  
}

function draw() {

 strokeWeight(10)
 color(0,0,0,20)
 x += xspeed;
 y = height*.5;
 line(px, py, x, y); 
 px = x; py= y;

}

