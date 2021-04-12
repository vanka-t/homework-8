var img;
var detector;
var myVid;
var objectResults = [];
var pixelFont;
var cnv;
var buttonYes, buttonNo, buttonGuess;
var bx, by, xOffset, yOffset, overButton, locked, overButton2, locked2, buttonSize; //adjustments for mousePressed for buttonYes/No
var score = 0;

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
  
  let constraints = { //video settings and resize for the detector to fit at wanted location
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

  

  
}

function videoLoaded(){
  //myVid.position(width/2, height/2);
  myVid.hide();
  detector.detect(myVid, objectCallback);
}



function draw() {
  background(0);
  
  textFont(pixelFont);
  textAlign(CENTER);

  buttonSize = 100;
//buttonYES
  if ( //inspired by p5 examples
    mouseX > bx - buttonSize && //syncing mouse with button settings
    mouseX < bx + buttonSize &&
    mouseY > by - buttonSize &&
    mouseY < by + buttonSize
  ) {
    overButton = true;
    if (!locked) { //if mouse scrolls past buttons, WHITE CIRCLES show up in back
      ellipseMode(CENTER);
      fill(255);
      ellipse(bx,by,buttonSize+10,buttonSize+10);
    }
  } else {
    //console.log("ur the 2nd best")
    overButton = false;
  }

//buttonNO
  if ( 
    mouseX > width-bx - buttonSize && 
    mouseX < width-bx + buttonSize &&
    mouseY > by - buttonSize &&
    mouseY < by + buttonSize
  ) {
    overButton2 = true;
    if (!locked2) { //if mouse scrolls past buttons, WHITE CIRCLES show up in back
      ellipseMode(CENTER);
      fill(255);
      ellipse(width-bx,by,buttonSize+10,buttonSize+10);
    }
  } else {
    //console.log("ur the 2nd best")
    overButton2 = false;
  }

    imageMode(CENTER);
    image(myVid,width/2,height/2);

    //RESULTS DISPLAY
  for (var i=0;i<objectResults.length;i++){
    var obj = objectResults[i];
    noFill();
    stroke(0,0,255);
    strokeWeight(3);
    rect(obj.x, obj.y, obj.width, obj.height);
    
    textSize(50);
    var y = 50;
    text("i am "+ round(obj.confidence * 100) + "% confident on this one!", width/2, y+50);
    text("Did I guess right?",width/2,height-50);

    
    if (i >= 1) { //results
    fill(255);
    rect(200,10, width-420, 90);
    //console.log(width/2 - 200);
    noFill();
    
      text("this must be a: " +  objectResults[0].label , width/2, y);
      console.log(objectResults);
       } else { 
       //  console.log("ur mom");
      // text(`this must be either of these: ${objectResults[0].label}, ${objectResults[1].label}` , width/2, 100);
       }
    
    
    
    

    buttonYes.resize(buttonSize,buttonSize);
    buttonNo.resize(buttonSize,buttonSize);

    //BUTTONYES && BUTTONNO SETTINGS
    bx = width/4;
    by = height-50;
    xOffset = 0.0;
    yOffset = 0.0;
    image(buttonYes, bx,by);
    image(buttonNo, width-bx,by);
    fill(255);
    textSize(20);
    stroke(255,0,0);
    text(obj.label, obj.x, obj.y-30);
    text("Score: " + score,width/2,height-100);
      

    
    imageMode(CENTER);


 //}
}
  
}

function mousePressed() {
  if (overButton) {
    locked = true;
    score ++;
    
  } else {
    locked = false;
  }
  console.log("ur soooo cooool2");
  xOffset = mouseX - bx;
  yOffset = mouseY - by;


if (overButton2) {
  locked2 = true;
  console.log("ur soooo cooool!!");
} else {
  locked = false;
}
console.log("ur soooo cooool22");
xOffset = mouseX - bx;
yOffset = mouseY - by;

}

function mouseReleased() {
  locked = false;
  locked2 = false;
}

function startPage(){ //***if you have time, start page before game runs***
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