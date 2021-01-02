var bars = []; // global var for bar
var cx, cy;
var secondsRadius;
var minutesRadius;
var hoursRadius;
var clockDiameter;
var allData =[];
var n, p;
var isArtcast = false;

function setup() {

  	if(getParameterByName("is") == "artcast") {isArtcast = true; }
  if(isArtcast) {
          createCanvas(window.innerHeight, window.innerHeight);
  	  //createCanvas(window.innerWidth, window.innerWidth);

      document.getElementById("name").style['-webkit-transform'] = 'rotate(-90deg)';

    } else {
    	createCanvas(window.innerWidth, window.innerHeight);
    }


	window.setInterval(updateBars, 15000);
	//addBar("https://foursquare.com/v/orbit-room-cafe/3fd66200f964a5205aed1ee3");
	//addBar("https://foursquare.com/v/umami-burger/525c449e11d20ec2c8e718a6?38383833");
	//addBar("https://foursquare.com/v/starbucks/4a1e071af964a520bb7b1fe3");

  stroke(255);
  
  var radius = min(width, height) / 2;
  secondsRadius = radius * 0.72;
  minutesRadius = radius * 0.60;
  hoursRadius = radius * 0.50;
  clockDiameter = radius * 1.8;
  
  cx = width / 2;
  cy = height / 2;


}



function draw() {

background(0);
  
  // Draw the clock background
  
  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  
  // Draw the hands of the clock
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  //s -= .1
  //h -= .1  

  n=s; 
  if(n!=p){ // if now is not previous, add a circle to the array
  	// allData.push([cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius, 10, 10]);
  	allData.push([cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, 10, 10]);
  	p=n;
  }

  var ne = 0;
  colorMode(HSB)

  for(var td in allData) {

  		strokeWeight(0)  		
  		ne+=1;
  		fill(ne % 255, 255, 255, 100);
  		//ellipse(allData[td][0], allData[td][1], abs(allData[td][2]), abs(allData[td][3]));
  		ellipse(allData[td][0], allData[td][1], td % 60, td % 60);
  }

  // put them on the hands
  ellipse(cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius, 10, 10);
  ellipse(cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, 15, 15);

  

  // Draw the minute ticks
  /*
  strokeWeight(1);
  beginShape(POINTS);
  for (var a = 0; a < 360; a+=1) {
    var angle = radians(a);
    var x = cx + cos(angle) * secondsRadius;
    var y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
  */


}


// bar administration 

function addBar(url, aname){
	bars.push({
		url: url, 
		name: aname
	});
}

function updateBars(){
	for(var bar =0; bar<bars.length; bar++){
		updateBar(bar);
	}
}


function updateBar(b){
		$.getJSON('../../fs.php?url='+bars[b].url, function(d,s){ // klong..klong-klong
				bars[b].hereNow = d.hereNow.count;
				if(!bars[b].name) bars[b].name = d.name; // let's get the official name in 
			});
}


function getParameterByName(name){    name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");    var regex =new RegExp("[\\?&]"+ name +"=([^&#]*)"),        results = regex.exec(location.search);    return results ==null?"": decodeURIComponent(results[1].replace(/\+/g," "));}


