var img;
var detector;
var myVid;
var objectResults = [];
var pixelFont;
var cnv;

function preload(){
  //img = loadImage("images/cleanboi.jpg");
  pixelFont = loadFont("assets/font2.ttf");
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  
  cnv = createCanvas(1280, 720);
 // cnv.mouseClicked();
  
  //img.resize(width,height);
  let constraints = {
    video: {
      mandatory: {
        minWidth: width,
        minHeight: height
      },
    },
  };
  myVid = createCapture(constraints, videoLoaded);

  //myVid = createCapture(VIDEO, videoLoaded);
  
  //detector.detect(img, objectCallback);
  //image(img,0,0);
  
}

function videoLoaded(){
  //myVid.position(width/2, height/2);
  myVid.hide();
  detector.detect(myVid, objectCallback);
}



function draw() {
  background(0);
  
  textFont(pixelFont);
  textSize(50);
  textAlign(CENTER);

  
    // if (mouseIsPressed){
    //   image(myVid,0,0);
    // } else {
    //   return false;
    // }

  //function mouseClicked(){
    image(myVid,0,0);
  //} 
  //function mainPage() {
  for (var i=0;i<objectResults.length;i++){
    var obj = objectResults[i];
    noFill();
    stroke(0,0,255);
    strokeWeight(3);
    rect(obj.x, obj.y, obj.width, obj.height);
    
    text(obj.label, obj.x, obj.y-30);

    //results
    if (i === 1) {
      text("this must be a: " +  obj.label, width/2, 100);
      } else { 
      text(`this must be either of these: ${objectResults[0].label}, ${objectResults[1].label}` , width/2, 100);
      }
    text("i am "+ round(obj.confidence * 100) + "% confident on this one!", width/2, height-20);
    
 //}
}
 


  
  
}

function startPage(){
  fill(0);
  rect(0,0,width,height);
 }

function objectCallback(error, results) { //ml5 callbacks is always error first(!!)
  if (error) {
    console.log(error);
  } else{
   // console.log(results);
    objectResults = results;
    detector.detect(myVid, objectCallback); //recursive function - function that calls itself!
  }
  }