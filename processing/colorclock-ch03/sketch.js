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

      if(hour()>8 && hour()<21) addBars("day"); 
      if(hour()>21 || hour()<8) addBars("night");

  	if(getParameterByName("is") == "artcast") {isArtcast = true; }
  if(isArtcast) {
          createCanvas(window.innerHeight, window.innerHeight);
  	  //createCanvas(window.innerWidth, window.innerWidth);

      document.getElementById("name").style['-webkit-transform'] = 'rotate(-90deg)';

    } else {
    	createCanvas(window.innerWidth, window.innerHeight);
    }


  
	window.setInterval(updateBars, 50000);




  stroke(255);
  
  var radius = min(width, height) / 2;
  secondsRadius = radius * 1;
  minutesRadius = radius * 1;
  hoursRadius = radius * 0.50;
  clockDiameter = radius * 1.8;
  
  cx = width / 2;
  cy = height / 2;
updateBars();

}




function draw() {
var thisColor=1;


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

  for(var bar in bars){
      //console.log(bars[bar].name)
      textSize(10);
      strokeWeight(0);
      fill(100,100,100);
      var distanceOnHand = bar * 30;
      text(bars[bar].name, cx + cos(m) * (minutesRadius-distanceOnHand), cy + sin(m) * (minutesRadius-distanceOnHand));
}



var maxDots = 60;
maxDots *= bars.length; 
//n=second();
//n=s;
n = minute(); // update every minute

var cSize;

  if(n!=p){ // every new minute, add a circle to the array with the current data
  	
    //var cSize = random(100);
    //cSize = bars[1].hereNow/5*100; // so if there are 5 here now, make the circle 100px
    //console.log(n+' og '+p+' m er '+m+" s er "+s)

    for(var bar in bars){ // place the dots among the minute hand, 30 pixels apart. More?
     // console.log("bar: "+bar)
      cSize = bars[bar].hereNow/5*100;
      var distanceOnHand = bar * 30;
      
      allData.push([cx + cos(m) * (minutesRadius-distanceOnHand), cy + sin(m) * (minutesRadius-distanceOnHand), cSize, cSize]);
      //allData.push([cx + cos(s) * (secondsRadius-distanceOnHand), cy + sin(s) * (secondsRadius-distanceOnHand), cSize, cSize]);
      if(allData.length>maxDots){allData.shift();} // remove old circles if more than 60
    }
  	p=n;
  }




  var ne = 0;
  
  colorMode(HSB);
  blendMode(REPLACE);

  for(var td in allData) {
  		strokeWeight(0)  		
  		ne+=1;

      // gradually fade out dots      
      var transp = ne/maxDots*125;
      if(allData.length<maxDots) transp = 125;


  		fill(thisColor++ % 255, 255, 255, transp);
      blendMode(SCREEN)
  		ellipse(allData[td][0], allData[td][1], abs(allData[td][2]), abs(allData[td][3]));
  		// ellipse(allData[td][0], allData[td][1], 100, 100);
  }

  // put them on the hands
 //  ellipse(cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius, 10, 10);
  //ellipse(cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius, 15, 15);

  

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


function addBars(whichBars){
  if(whichBars == "night"){

    bars = [];
    //addBar("https://foursquare.com/v/dna-lounge-san-francisco-ca/3fd66200f964a52029f11ee3")
    addBar("https://foursquare.com/v/amnesia/40870b00f964a520b0f21ee3")
    addBar("https://foursquare.com/v/orbit-room-cafe/3fd66200f964a5205aed1ee3");
    addBar("https://foursquare.com/v/500-club/4085b980f964a52089f21ee3");
  }

  if(whichBars == "day"){


    bars = [];
    addBar("https://foursquare.com/v/starbucks/4a1e071af964a520bb7b1fe3");
    addBar("https://foursquare.com/v/coffee-bar/47fde9f4f964a520df4e1fe3");
    addBar("https://foursquare.com/v/front/5023f00ce4b0dc223688cf6f");
  }
}
