import Model from "../model/Model.js";
import Brick from "../model/Brick.js";

export class Canvas{
    static width = 600;
    static height = 600;
    
    constructor(){
        this.barbell= Model.barbell;
        this.ball = Model.ball    

        this.#bindSetupAndDrawFunctionToThis();
    }

    #bindSetupAndDrawFunctionToThis(){
        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
    }
    
    setup(p5) {        
        p5.noCursor();
        p5.createCanvas(Canvas.width,Canvas.height);
    }
    
    draw(p5) {
        p5.background(220);
        if (Model.player.life > 0) {
            this.#gameLoop(p5);
        }
        else{
            this.#displayMessage(p5, "Perdu !");
            p5.noLoop();
        }
    }

    #gameLoop(p5){
        this.#drawBricks(p5);
        this.#drawBarbell(p5);
        this.#drawBall(p5);

       
        if (Brick.nbBrick == 0) {
            this.#displayMessage(p5, "Gagné !");
            p5.noLoop();
        }
    }

    #drawBricks(p5){
        p5.rectMode(p5.CORNER)
        p5.fill(132 , 46 , 27)
        Brick.matrixBrick.forEach((arrayBrick, i) => {
            arrayBrick.forEach((brick, j) =>{
                if(brick instanceof Brick){
                    p5.rect(brick.x, brick.y, brick.width, brick.height);
                }
            })
        });
    }

    #drawBarbell(p5){
        p5.rectMode(p5.CENTER);
        p5.fill(255 , 255 , 255);
        p5.rect(Model.barbell.coordX, Model.barbell.coordY, Model.barbell.width, Model.barbell.height,Model.barbell.width/10,Model.barbell.width/10,Model.barbell.width/10,Model.barbell.width/10);
    }

    #drawBall(p5){
        p5.fill(0,0,255);
        p5.circle(Model.ball.position.x, Model.ball.position.y,Model.ball.getDiameter());
    }

    #displayMessage(p5, message){
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(32);
        p5.background(0);
        p5.fill(255); 
        p5.text(message, p5.width / 2, p5.height / 2);
    }
        
}

export default Canvas;
