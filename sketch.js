var img;
var detector;
var myVid;
var objectResults = [];
var pixelFont;
var cnv;
var buttonYes, buttonNo, buttonGuess;
var bx, by, xOffset, yOffset, overButton, locked, buttonSize; //adjustments for mousePressed for buttonYes

function preload(){
  //img = loadImage("images/cleanboi.jpg");
  pixelFont = loadFont("assets/font2.ttf");
  detector = ml5.objectDetector("cocossd");
  buttonNo = loadImage("images/incorrect.png");
  buttonYes = loadImage("images/correct.png");
}

function setup() {
  
  cnv = createCanvas(1280, 1000);
 // cnv.mouseClicked();
  
  //img.resize(width,height);
  let constraints = {
    video: {
      mandatory: {
        minWidth: width,
        //width: { min: 640, ideal: width},
        minHeight: 720
        //height: { min: 600, ideal: 720 },
        //frameRate: { max: 30 }
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
buttonSize = 100;
  if ( //inspired by p5 examples
    mouseX > bx - buttonSize &&
    mouseX < bx + buttonSize &&
    mouseY > by - buttonSize &&
    mouseY < by + buttonSize
  ) {
    overButton = true;
    if (!locked) {
      ellipseMode(CENTER);
      fill(255);
      ellipse(bx,by,buttonSize+10,buttonSize+10);
    }
  } else {
    //console.log("ur the 2nd best")
    overButton = false;
  }
    // if (mouseIsPressed){
    //   image(myVid,0,0);
    // } else {
    //   return false;
    // }

  //function mouseClicked(){
    imageMode(CENTER);
    image(myVid,width/2,height/2);
  //} 
  //function mainPage() {
  for (var i=0;i<objectResults.length;i++){
    var obj = objectResults[i];
    noFill();
    stroke(0,0,255);
    strokeWeight(3);
    rect(obj.x, obj.y, obj.width, obj.height);
    
    text(obj.label, obj.x, obj.y-30);

    
    //if (i === 1) { //results
    fill(255);
    rect(200,10, width- 200, 90);
    noFill();
    var y = 50;
      text("this must be a: " +  objectResults[0].label , width/2, y);
      // } else { 
      // text(`this must be either of these: ${objectResults[0].label}, ${objectResults[1].label}` , width/2, 100);
      // }
    text("i am "+ round(obj.confidence * 100) + "% confident on this one!", width/2, y+50);
    text("Did I guess right?",width/2,height-50);
    buttonYes.resize(buttonSize,buttonSize);

    //BUTTONYES SETTINGS
    bx = width/4;
    by = height-50;
    xOffset = 0.0;
    yOffset = 0.0;
    image(buttonYes, bx,by);
    //image(buttonNo, width-bx,by);
    fill(255);

    
    imageMode(CENTER);


 //}
}
  
}

function mousePressed() {
  if (overButton) {
    locked = true;
    console.log("ur soooo cooool");
  } else {
    locked = false;
  }
  console.log("ur soooo cooool2");
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}
function mouseReleased() {
  locked = false;
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