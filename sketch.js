var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var table;

function preload() {
  table = loadTable("assets/new.csv", "csv", "header");

}

function setup() {
  colorMode(HSB,360,100,100);
  // graphics stuff:
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 100);
  fill(0, 0, 0, 255);
  // instructions:
  textSize(32);
  textAlign(CENTER);
  text("say something", width / 2, height / 2);
  myRec.onResult = showResult;
  myRec.start();

}

function draw() {
  // why draw when you can talk?
}

function showResult() {
  if (myRec.resultValue === true) {

    var resultSplit = split(myRec.resultString," ");
    var result = 0;
    var results = 0;
    var colorResult = 60;
    for (var i = 0; i < resultSplit.length; i++) {

      var row = table.findRow(resultSplit[i], "T");
      if (row !== null) {
        if(row.getNum("P") !== 0){
          result = result + (row.getNum("P"));
          results++;
        }
        if(row.getNum("N") !== 0){
          result = result - (row.getNum("N"));
          results ++;
        }
      }
        if(result === 0){
          results = 1;
        }
        console.log(result);
      
    }
    colorResult = map(result/results,-1,1,0,120);
    console.log("!"+ colorResult);
    background(colorResult, 60, 90);
    //text(result/results, width / 2, height / 2);
    text(myRec.resultString, width / 2, height / 2);
  }
}

function mouseClicked() {
 setup(); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}