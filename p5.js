let rows = Brick.matrixBrick.length;
let cols = Brick.matrixBrick[0].length;

function setup() {
  createCanvas(600, 600);
}


function draw() {
   
    if (Player.life > 0) {
        
        background(220);
        rectMode(CORNER)
        
        let rectWidth =Brick.width;
        let rectHeight = Brick.height;
        fill(132 , 46 , 27)
        Brick.matrixBrick.forEach((arrayBrick, i) => {
            arrayBrick.forEach((brick, j) =>{
                if(brick instanceof Brick){
                    rect(j * rectWidth, i * rectHeight, rectWidth, rectHeight);
                }
            })
        });
        rectMode(CENTER);
        fill(255 , 255 , 255);
        rect(Barbell.coordX, Barbell.coordY, Barbell.width, Barbell.height,Barbell.width/10,Barbell.width/10,Barbell.width/10,Barbell.width/10);
        fill(0,0,255);
        circle(Ball.getCoordX(), Ball.getCoordY(),Ball.getDiameter());
        Ball.Move();
        
        if (Brick.nbBrick == 0) {
            textAlign(CENTER, CENTER);
            textSize(32);
            background(0);
            fill(255); 
            text('Gagné!', width / 2, height / 2);
            noLoop();
        }
    }
    else{
        textAlign(CENTER, CENTER);
        textSize(32);
        background(0);
        fill(255); 
        text('Perdu!', width / 2, height / 2);
        noLoop();
    }
}


function mouseClicked() {
    Ball.Throwing();
}

function mouseMoved(event) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        Barbell.coordX = mouseX;
        if (!Ball.isThrow) {
            Ball.setCoordX(mouseX); 
        }
    }
}