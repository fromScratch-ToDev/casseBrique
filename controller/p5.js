import Brick from "../model/Brick.js";
import Ball from "../model/Ball.js";
import { Barbell, Player } from "../model/model.js"

let cols = Brick.matrixBrick.length;
let rows = Brick.matrixBrick[0].length;

function setup() {
    angleMode(DEGREES)
    Ball.position = createVector(Barbell.coordX,Barbell.coordY - (Barbell.height/2) - (Ball.radius));
    Ball.velocity = createVector(0,0);
    createCanvas(600,600);

    strokeWeight(1);
    
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
                    rect(brick.x, brick.y, rectWidth, rectHeight);
                }
            })
        });
        rectMode(CENTER);
        fill(255 , 255 , 255);
        rect(Barbell.coordX, Barbell.coordY, Barbell.width, Barbell.height,Barbell.width/10,Barbell.width/10,Barbell.width/10,Barbell.width/10);
        fill(0,0,255);
        circle(Ball.position.x, Ball.position.y,Ball.getDiameter());
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
    if (!Ball.isThrow) {
        Ball.velocity.add(0,-8)
        Ball.isThrow = true;
    }
}

function mouseMoved(event) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        Barbell.coordX = mouseX;
        if (!Ball.isThrow) {
            Ball.position.x = mouseX; 
        }
    }
}

window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.mouseMoved = mouseMoved;
