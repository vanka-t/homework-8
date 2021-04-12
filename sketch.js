var img;
var detector;
var myVid;
var objectResults = [];

function preload(){
  //img = loadImage("images/cleanboi.jpg");
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  
  createCanvas(1000, 800);
  
  
  //img.resize(width,height);
  myVid = createCapture(VIDEO, videoLoaded);
  
  //detector.detect(img, objectCallback);
  //image(img,0,0);
}

function videoLoaded(){
  //myVid.position(width/2, height/2);
  myVid.hide();
  detector.detect(myVid, objectCallback);
}

function draw() {
  image(myVid,0,0);
  for (var i=0;i<objectResults.length;i++){
    var obj = objectResults[i];
    noFill();
    stroke(0,0,255);
    strokeWeight(3);
    rect(obj.x, obj.y, obj.width, obj.height);
    textSize(20);
    text(obj.label, obj.x+30, obj.y-30);

  }
 
}

function objectCallback(error, results) { //ml5 callbacks is always error first(!!)
  if (error) {
    console.error(error);
  } else{
   // console.log(results);
    objectResults = results;
    detector.detect(myVid, objectCallback); //recursive function - function that calls itself!
  }
  }