var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var table;


function preload() {
  table = loadTable("assets/new.csv", "csv", "header");

}

function setup() {
  restartFunction();

}

function draw() {
  // why draw when you can talk?
}

function showResult() {
  if (myRec.resultValue === true) {

    var resultSplit = split(myRec.resultString, " ");
    var result = 0;
    var results = 0;
    var colorResult = 60;
    for (var i = 0; i < resultSplit.length; i++) {
        var neg = 0;
        var pos = 0;
        var negAvg = 0;
        var posAvg = 0;
      var rows = table.findRows(resultSplit[i], "T");
      if (rows !== null && rows.length >0) {


        for (var x = 0; x < rows.length; x++) {
            neg += rows[x].getNum("N");
            pos += rows[x].getNum("P");
        }
        negAvg = neg / rows.length;
        posAvg = pos / rows.length;
        

      }
      result = result + posAvg;
      result = result - negAvg;
      results++;
      console.log(result);

    }
    var gr = color(140, 60, 90);
    var re = color(0, 60, 90);
    var res = map(result / results, -1, 1, 0, 1);
    colorResult = lerpColor(re, gr, res);
    console.log("!" + res);
    background(colorResult);
    //text(result/results, width / 2, height / 2);
    text(myRec.resultString, width / 2, height / 2);
  }
}

function mouseClicked() {
  restartFunction();
}

function restartFunction() {
  colorMode(HSB, 360, 100, 100);
  // graphics stuff:
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 100);
  fill(0, 0, 0, 255);
  // instructions:
  textSize(32);
  textAlign(CENTER);
  text("say something nice or say something mean", width / 2, height / 2);
  myRec.onResult = showResult;
  myRec.start();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}